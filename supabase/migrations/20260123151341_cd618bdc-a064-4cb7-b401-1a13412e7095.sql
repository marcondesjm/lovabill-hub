-- Add pix_color column to landing_pages table
ALTER TABLE public.landing_pages
ADD COLUMN pix_color TEXT DEFAULT 'green';