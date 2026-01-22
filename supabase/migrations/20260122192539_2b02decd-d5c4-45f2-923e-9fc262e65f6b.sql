-- Permitir que admins deletem qualquer landing page
CREATE POLICY "Admins can delete any landing page"
ON public.landing_pages
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));