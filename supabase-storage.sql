-- Ejecutar en Supabase SQL Editor para habilitar fotos de reportes.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('reportes', 'reportes', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "Usuarios suben sus fotos" on storage.objects;
create policy "Usuarios suben sus fotos"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'reportes'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Fotos de reportes visibles" on storage.objects;
create policy "Fotos de reportes visibles"
on storage.objects for select to public
using (bucket_id = 'reportes');

drop policy if exists "Usuarios borran sus fotos" on storage.objects;
create policy "Usuarios borran sus fotos"
on storage.objects for delete to authenticated
using (
  bucket_id = 'reportes'
  and ((storage.foldername(name))[1] = (select auth.uid())::text
       or public.es_administrador())
);
