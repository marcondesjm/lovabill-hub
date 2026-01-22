-- Add donation/PIX fields to landing_pages table
ALTER TABLE public.landing_pages
ADD COLUMN pix_key text DEFAULT NULL,
ADD COLUMN pix_name text DEFAULT NULL,
ADD COLUMN pix_enabled boolean DEFAULT false,
ADD COLUMN donation_title text DEFAULT 'Apoie meu trabalho';