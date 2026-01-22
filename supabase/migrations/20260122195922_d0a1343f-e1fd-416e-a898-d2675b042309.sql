-- Adicionar coluna para nome do canal do YouTube
ALTER TABLE public.landing_pages 
ADD COLUMN channel_name text DEFAULT 'Mestre do Lovable';