/* =========================================================
   REGAL AFFLUENCE — NEWS & UPDATES CMS
   ---------------------------------------------------------
   Creates the news data model, the editor allow-list, and
   the Row-Level Security policies that enforce who can read
   and write what. This file is additive: it does not alter
   or drop any existing objects.

   Security model
   - Visitors (anon) can only read posts whose status is
     'published' AND whose published_at has passed. Drafts,
     archived posts, and scheduled posts are invisible.
   - Only users listed in public.news_editors can create,
     edit, publish, or delete posts, categories, or images.
     Signing up for an account grants nothing.
   - Scheduling is enforced by the published_at <= now()
     check inside the policy, so no cron job is required.
========================================================= */

/* =========================================================
   EDITORS (ALLOW-LIST)
========================================================= */

create table if not exists public.news_editors (
  user_id uuid primary key
    references auth.users (id) on delete cascade,
  display_name text
    check (display_name is null or char_length(display_name) <= 120),
  created_at timestamptz not null default now()
);

alter table public.news_editors enable row level security;

-- An editor may confirm their own membership. Nobody can
-- insert, update, or delete rows through the API; editors
-- are managed with the SQL editor / service role only.
drop policy if exists "Editors can read their own membership" on public.news_editors;
create policy "Editors can read their own membership"
  on public.news_editors
  for select
  to authenticated
  using (user_id = (select auth.uid()));

revoke all on public.news_editors from anon;
revoke insert, update, delete on public.news_editors from authenticated;
grant select on public.news_editors to authenticated;

create or replace function public.is_news_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.news_editors
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_news_editor() from public;
grant execute on function public.is_news_editor() to anon, authenticated;

/* =========================================================
   CATEGORIES
========================================================= */

create table if not exists public.news_categories (
  slug text primary key
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 60),
  name text not null unique
    check (char_length(btrim(name)) between 1 and 60),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.news_categories enable row level security;

drop policy if exists "Anyone can read categories" on public.news_categories;
create policy "Anyone can read categories"
  on public.news_categories
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Editors can manage categories" on public.news_categories;
create policy "Editors can manage categories"
  on public.news_categories
  for all
  to authenticated
  using ((select public.is_news_editor()))
  with check ((select public.is_news_editor()));

revoke all on public.news_categories from anon;
grant select on public.news_categories to anon, authenticated;
grant insert, update, delete on public.news_categories to authenticated;

insert into public.news_categories (slug, name, sort_order) values
  ('company-news',         'Company News',         10),
  ('announcements',        'Announcements',        20),
  ('real-estate-insights', 'Real Estate Insights', 30),
  ('events',               'Events',               40),
  ('opportunities',        'Opportunities',        50),
  ('community-updates',    'Community Updates',    60)
on conflict (slug) do nothing;

/* =========================================================
   POSTS
========================================================= */

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),

  title text not null
    check (char_length(btrim(title)) between 3 and 200),

  slug text not null unique
    check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) <= 120),

  excerpt text not null default ''
    check (char_length(excerpt) <= 400),

  -- Sanitised HTML produced by the dashboard editor. It is
  -- sanitised again on render, so stored markup is never
  -- trusted by the public site.
  content text not null default ''
    check (char_length(content) <= 200000),

  cover_image_url text
    check (cover_image_url is null or cover_image_url ~ '^https?://'),

  cover_image_alt text not null default ''
    check (char_length(cover_image_alt) <= 250),

  category_slug text
    references public.news_categories (slug)
    on update cascade
    on delete restrict,

  author_name text
    check (author_name is null or char_length(author_name) <= 120),

  status text not null default 'draft'
    check (status in ('draft', 'published', 'archived')),

  is_featured boolean not null default false,

  -- For published posts this is the go-live time. A future
  -- value means the post is scheduled.
  published_at timestamptz,

  seo_title text
    check (seo_title is null or char_length(seo_title) <= 120),

  seo_description text
    check (seo_description is null or char_length(seo_description) <= 320),

  created_by uuid references auth.users (id) on delete set null,
  updated_by uuid references auth.users (id) on delete set null,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  search_vector tsvector generated always as (
    setweight(to_tsvector('english'::regconfig, coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(excerpt, '')), 'B') ||
    setweight(
      to_tsvector(
        'english'::regconfig,
        regexp_replace(coalesce(content, ''), '<[^>]+>', ' ', 'g')
      ),
      'C'
    )
  ) stored,

  constraint news_posts_published_requires_date
    check (status <> 'published' or published_at is not null)
);

create index if not exists news_posts_public_listing_idx
  on public.news_posts (status, published_at desc);

create index if not exists news_posts_category_idx
  on public.news_posts (category_slug, published_at desc);

create index if not exists news_posts_featured_idx
  on public.news_posts (published_at desc)
  where is_featured;

create index if not exists news_posts_updated_idx
  on public.news_posts (updated_at desc);

create index if not exists news_posts_search_idx
  on public.news_posts using gin (search_vector);

/* =========================================================
   POST TRIGGER
   - Records who created / last changed a post (cannot be
     spoofed by the client).
   - Keeps updated_at accurate.
   - Stamps published_at when a post is published without
     an explicit date.
========================================================= */

create or replace function public.news_posts_before_write()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    new.created_by := auth.uid();
    new.created_at := now();
  else
    new.created_by := old.created_by;
    new.created_at := old.created_at;
  end if;

  new.updated_by := auth.uid();
  new.updated_at := now();

  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;

  return new;
end;
$$;

drop trigger if exists news_posts_before_write on public.news_posts;
create trigger news_posts_before_write
  before insert or update on public.news_posts
  for each row
  execute function public.news_posts_before_write();

/* =========================================================
   POST POLICIES
========================================================= */

alter table public.news_posts enable row level security;

drop policy if exists "Public can read live published posts" on public.news_posts;
create policy "Public can read live published posts"
  on public.news_posts
  for select
  to anon, authenticated
  using (status = 'published' and published_at <= now());

drop policy if exists "Editors can read all posts" on public.news_posts;
create policy "Editors can read all posts"
  on public.news_posts
  for select
  to authenticated
  using ((select public.is_news_editor()));

drop policy if exists "Editors can create posts" on public.news_posts;
create policy "Editors can create posts"
  on public.news_posts
  for insert
  to authenticated
  with check ((select public.is_news_editor()));

drop policy if exists "Editors can update posts" on public.news_posts;
create policy "Editors can update posts"
  on public.news_posts
  for update
  to authenticated
  using ((select public.is_news_editor()))
  with check ((select public.is_news_editor()));

drop policy if exists "Editors can delete posts" on public.news_posts;
create policy "Editors can delete posts"
  on public.news_posts
  for delete
  to authenticated
  using ((select public.is_news_editor()));

/* =========================================================
   POST PRIVILEGES
   Visitors get only the columns the public site needs;
   internal audit columns (created_by / updated_by) are
   never readable anonymously.
========================================================= */

revoke all on public.news_posts from anon;

grant select (
  id,
  title,
  slug,
  excerpt,
  content,
  cover_image_url,
  cover_image_alt,
  category_slug,
  author_name,
  status,
  is_featured,
  published_at,
  seo_title,
  seo_description,
  updated_at,
  search_vector
) on public.news_posts to anon;

grant select, insert, update, delete on public.news_posts to authenticated;
