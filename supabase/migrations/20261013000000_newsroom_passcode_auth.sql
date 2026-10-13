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
