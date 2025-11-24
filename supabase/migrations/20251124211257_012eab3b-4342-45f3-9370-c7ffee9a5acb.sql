-- Remove a constraint que limita um usuário a ter apenas uma landing page
ALTER TABLE public.landing_pages 
DROP CONSTRAINT IF EXISTS landing_pages_user_id_key;

-- O slug já tem constraint UNIQUE, então está ok
-- Mas vamos adicionar um índice composto para melhor performance
CREATE INDEX IF NOT EXISTS idx_landing_pages_user_slug 
ON public.landing_pages(user_id, slug);

-- Adicionar política para usuários poderem deletar suas próprias páginas
DROP POLICY IF EXISTS "Users can delete own landing page" ON public.landing_pages;
CREATE POLICY "Users can delete own landing page" 
ON public.landing_pages 
FOR DELETE 
USING (auth.uid() = user_id);