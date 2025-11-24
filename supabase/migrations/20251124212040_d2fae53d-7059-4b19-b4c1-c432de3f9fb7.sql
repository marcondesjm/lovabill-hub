-- Criar bucket público para imagens das landing pages
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'landing-images',
  'landing-images',
  true,
  5242880, -- 5MB limite
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir usuários autenticados fazerem upload
CREATE POLICY "Authenticated users can upload landing images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'landing-images'
);

-- Política para permitir usuários autenticados atualizarem suas imagens
CREATE POLICY "Users can update their landing images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'landing-images');

-- Política para permitir usuários autenticados deletarem suas imagens
CREATE POLICY "Users can delete their landing images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'landing-images');

-- Política para permitir acesso público de leitura (visualização)
CREATE POLICY "Public can view landing images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'landing-images');