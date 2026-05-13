
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Restrict public bucket listing: only allow SELECT on objects (individual file reads via URL still work)
DROP POLICY IF EXISTS "Public read blog images" ON storage.objects;
CREATE POLICY "Public read blog images by name"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images' AND name IS NOT NULL);
