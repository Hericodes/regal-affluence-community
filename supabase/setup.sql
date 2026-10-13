/* =========================================================
   REGAL AFFLUENCE — NEWSROOM SETUP (all-in-one)
   ---------------------------------------------------------
   GENERATED FILE — do not edit. Built from
   supabase/migrations by `npm run newsroom:build-setup`.

   Paste this whole file into Supabase → SQL Editor → New
   query, then click Run. It is safe to run again: it only
   creates what is missing and never deletes news content.
========================================================= */

-- ---------------------------------------------------------
-- 20261012000000_news_cms.sql
-- ---------------------------------------------------------

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

-- ---------------------------------------------------------
-- 20261012000100_news_images_storage.sql
-- ---------------------------------------------------------

/* =========================================================
   REGAL AFFLUENCE — NEWS IMAGE STORAGE
   ---------------------------------------------------------
   A public-read bucket for article images. Size and MIME
   type limits are enforced by Supabase Storage itself, and
   only news editors can upload, replace, or delete files.
   Requires: 20261012000000_news_cms.sql
========================================================= */

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'news-images',
  'news-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "News editors can read news images" on storage.objects;
create policy "News editors can read news images"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'news-images' and (select public.is_news_editor()));

drop policy if exists "News editors can upload news images" on storage.objects;
create policy "News editors can upload news images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'news-images' and (select public.is_news_editor()));

drop policy if exists "News editors can update news images" on storage.objects;
create policy "News editors can update news images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'news-images' and (select public.is_news_editor()))
  with check (bucket_id = 'news-images' and (select public.is_news_editor()));

drop policy if exists "News editors can delete news images" on storage.objects;
create policy "News editors can delete news images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'news-images' and (select public.is_news_editor()));

-- ---------------------------------------------------------
-- 20261013000000_newsroom_passcode_auth.sql
-- ---------------------------------------------------------

/* =========================================================
   REGAL AFFLUENCE — NEWSROOM PASSCODE ACCESS
   ---------------------------------------------------------
   Server-side support for the shared-passcode sign-in
   handled by the `newsroom-auth` Edge Function.

   - The passcode is stored only as a bcrypt hash, in a
     table no API role can read. Set or change it from the
     SQL Editor with:
         select public.newsroom_set_passcode('your passcode');
   - Login attempts are rate limited atomically in the
     database: 5 failures per client and 50 in total per
     15 minutes.
   - The hidden newsroom service account is recorded here
     and added to news_editors automatically.
   - is_news_editor() also requires that the session behind
     an access token still exists, so signing out revokes
     access immediately.

   No existing news table or column is changed.
   Requires: 20261012000000_news_cms.sql
========================================================= */

create extension if not exists pgcrypto with schema extensions;

/* =========================================================
   SETTINGS (single row)
========================================================= */

create table if not exists public.newsroom_settings (
  id boolean primary key default true check (id),
  passcode_hash text,
  passcode_updated_at timestamptz,
  service_account_id uuid references auth.users (id) on delete set null
);

insert into public.newsroom_settings (id) values (true)
on conflict (id) do nothing;

-- RLS on with no policies: unreachable through the public API.
alter table public.newsroom_settings enable row level security;
revoke all on public.newsroom_settings from public, anon, authenticated;

/* =========================================================
   LOGIN ATTEMPTS
   client_key is a SHA-256 hash of the caller's IP address;
   raw IP addresses are never stored.
========================================================= */

create table if not exists public.newsroom_login_attempts (
  id bigint generated always as identity primary key,
  client_key text not null check (char_length(client_key) <= 128),
  succeeded boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists newsroom_login_attempts_client_idx
  on public.newsroom_login_attempts (client_key, created_at desc);

create index if not exists newsroom_login_attempts_created_idx
  on public.newsroom_login_attempts (created_at desc);

alter table public.newsroom_login_attempts enable row level security;
revoke all on public.newsroom_login_attempts from public, anon, authenticated;

/* =========================================================
   SET / CHANGE THE PASSCODE  (SQL Editor only)
   Also signs out every existing newsroom session and
   clears lockouts.
========================================================= */

create or replace function public.newsroom_set_passcode(p_passcode text)
returns text
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_passcode is null or char_length(p_passcode) < 3 then
    raise exception 'The passcode must be at least 3 characters.';
  end if;

  if char_length(p_passcode) > 72 then
    raise exception 'The passcode must be at most 72 characters.';
  end if;

  update public.newsroom_settings
  set passcode_hash = extensions.crypt(p_passcode, extensions.gen_salt('bf', 12)),
      passcode_updated_at = now()
  where id;

  delete from auth.sessions
  where user_id = (select service_account_id from public.newsroom_settings where id);

  delete from public.newsroom_login_attempts;

  if char_length(p_passcode) < 12 then
    return 'Passcode saved. WARNING: it is shorter than 12 characters, so use it for testing only. Set a 4–5 word passphrase before launch.';
  end if;

  return 'Passcode saved. Any existing newsroom sessions have been signed out.';
end;
$$;

/* =========================================================
   ATTEMPT LOGIN  (Edge Function / service role only)
   Rate limit, check and record in one locked transaction,
   so parallel requests cannot slip past the limits.

   status: 'ok' | 'invalid' | 'locked' | 'not_configured'
========================================================= */

create or replace function public.newsroom_attempt_login(
  p_client_key text,
  p_passcode text
)
returns table (status text, retry_after_seconds integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_window constant interval := interval '15 minutes';
  v_client_limit constant integer := 5;
  v_global_limit constant integer := 50;
  v_hash text;
  v_count integer;
  v_oldest timestamptz;
  v_id bigint;
begin
  if p_client_key is null or char_length(p_client_key) = 0 or char_length(p_client_key) > 128 then
    raise exception 'invalid client key';
  end if;

  perform pg_advisory_xact_lock(hashtext('newsroom_login_attempts'));

  select passcode_hash into v_hash from public.newsroom_settings where id;

  if v_hash is null then
    return query select 'not_configured'::text, 0;
    return;
  end if;

  delete from public.newsroom_login_attempts
  where created_at < now() - interval '1 day';

  select count(*), min(created_at) into v_count, v_oldest
  from public.newsroom_login_attempts
  where client_key = p_client_key and not succeeded and created_at > now() - v_window;

  if v_count < v_client_limit then
    select count(*), min(created_at) into v_count, v_oldest
    from public.newsroom_login_attempts
    where not succeeded and created_at > now() - v_window;

    if v_count < v_global_limit then
      v_count := null;
    end if;
  end if;

  if v_count is not null then
    return query select
      'locked'::text,
      greatest(1, ceil(extract(epoch from (v_oldest + v_window - now())))::integer);
    return;
  end if;

  insert into public.newsroom_login_attempts (client_key)
  values (p_client_key)
  returning id into v_id;

  if p_passcode is null or extensions.crypt(p_passcode, v_hash) <> v_hash then
    return query select 'invalid'::text, 0;
    return;
  end if;

  update public.newsroom_login_attempts set succeeded = true where id = v_id;

  delete from public.newsroom_login_attempts
  where client_key = p_client_key and not succeeded;

  return query select 'ok'::text, 0;
end;
$$;

/* =========================================================
   SERVICE ACCOUNT  (Edge Function / service role only)
   Looks up the newsroom account by its email address.

   - Not found: returns null and changes nothing. The Edge
     Function then creates the account through the Auth
     admin API and calls this again.
   - Found: records it in newsroom_settings, makes sure it is
     in news_editors, and returns its id. If a different
     account was recorded before (the email was changed),
     that old account loses newsroom access.
========================================================= */

create or replace function public.newsroom_service_account_id(p_email text)
returns uuid
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_previous uuid;
begin
  select u.id into v_id
  from auth.users u
  where lower(u.email) = lower(p_email);

  if v_id is null then
    return null;
  end if;

  select service_account_id into v_previous from public.newsroom_settings where id;

  if v_previous is distinct from v_id then
    update public.newsroom_settings set service_account_id = v_id where id;

    if v_previous is not null then
      delete from public.news_editors where user_id = v_previous;
    end if;
  end if;

  insert into public.news_editors (user_id, display_name)
  values (v_id, 'Newsroom')
  on conflict (user_id) do nothing;

  return v_id;
end;
$$;

revoke all on function public.newsroom_set_passcode(text) from public, anon, authenticated, service_role;
revoke all on function public.newsroom_attempt_login(text, text) from public, anon, authenticated;
revoke all on function public.newsroom_service_account_id(text) from public, anon, authenticated;
grant execute on function public.newsroom_attempt_login(text, text) to service_role;
grant execute on function public.newsroom_service_account_id(text) to service_role;

/* =========================================================
   EDITOR CHECK — now session-aware
   Same signature and callers as before (every news and
   storage policy uses it). Access additionally requires
   that the session named in the access token still exists
   and has not been time-boxed out; signing out deletes the
   session, which revokes the token at once.
========================================================= */

create or replace function public.is_news_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.news_editors e
    join auth.sessions s
      on s.user_id = e.user_id
    where e.user_id = auth.uid()
      and s.id = nullif(auth.jwt() ->> 'session_id', '')::uuid
      and (s.not_after is null or s.not_after > now())
  );
$$;

revoke all on function public.is_news_editor() from public;
grant execute on function public.is_news_editor() to anon, authenticated;
