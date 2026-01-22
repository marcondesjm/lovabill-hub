-- Add policy for admins to UPDATE any landing page
CREATE POLICY "Admins can update any landing page" 
ON public.landing_pages 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Add policy for admins to SELECT any landing page (for loading all pages in admin panel)
CREATE POLICY "Admins can view all landing pages" 
ON public.landing_pages 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));