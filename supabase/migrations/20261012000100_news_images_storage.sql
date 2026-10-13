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
