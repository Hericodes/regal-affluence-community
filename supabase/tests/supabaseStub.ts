/* Mirrors the parts of Supabase the migrations depend on. */
export const SUPABASE_STUB = `
  create role anon nologin;
  create role authenticated nologin;
  create role service_role nologin;

  create schema auth;
  create table auth.users (id uuid primary key, email text);
  create table auth.sessions (
    id uuid primary key,
    user_id uuid not null references auth.users (id),
    not_after timestamptz
  );
  create function auth.jwt() returns jsonb
    language sql stable
    as $$ select coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb $$;
  create function auth.uid() returns uuid
    language sql stable
    as $$ select nullif(auth.jwt() ->> 'sub', '')::uuid $$;

  create schema extensions;

  create schema storage;
  create table storage.buckets (
    id text primary key,
    name text not null,
    public boolean default false,
    file_size_limit bigint,
    allowed_mime_types text[]
  );
  create table storage.objects (
    id uuid primary key default gen_random_uuid(),
    bucket_id text references storage.buckets (id),
    name text not null
  );
  alter table storage.objects enable row level security;

  grant usage on schema public, auth, storage to anon, authenticated;
  grant usage on schema public to service_role;
  grant execute on function auth.uid(), auth.jwt() to anon, authenticated;
  grant select, insert, update, delete on storage.objects to anon, authenticated;

  -- Supabase grants broad table privileges by default and
  -- relies on RLS; reproduce that so revokes are tested.
  alter default privileges in schema public
    grant all on tables to anon, authenticated;
`;
