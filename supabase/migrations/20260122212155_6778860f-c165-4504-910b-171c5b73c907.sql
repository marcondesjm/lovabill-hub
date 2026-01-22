-- Add section_order column to landing_pages table
ALTER TABLE public.landing_pages
ADD COLUMN section_order JSON DEFAULT '["pricing", "why_buy", "how_to", "benefits", "security", "about", "testimonials", "faq", "pix"]'::json;