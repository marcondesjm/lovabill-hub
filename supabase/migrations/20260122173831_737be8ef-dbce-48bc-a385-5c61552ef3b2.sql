-- Create table for site statistics/counters
CREATE TABLE public.site_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  stat_key TEXT NOT NULL UNIQUE,
  stat_value INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

-- Anyone can view stats (public data)
CREATE POLICY "Anyone can view site stats"
ON public.site_stats
FOR SELECT
USING (true);

-- Only admins can modify stats
CREATE POLICY "Admins can manage site stats"
ON public.site_stats
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for updated_at
CREATE TRIGGER update_site_stats_updated_at
BEFORE UPDATE ON public.site_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();

-- Insert initial counter value
INSERT INTO public.site_stats (stat_key, stat_value)
VALUES ('customers_count', 900);