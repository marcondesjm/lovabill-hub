CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.7

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$;


--
-- Name: update_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: landing_pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.landing_pages (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    user_id uuid NOT NULL,
    slug text NOT NULL,
    hero_title text DEFAULT 'Créditos Lovable com Desconto'::text NOT NULL,
    hero_subtitle text DEFAULT 'Compre créditos Lovable com até 40% de desconto e acelere seus projetos'::text,
    hero_image_url text,
    offer_text text DEFAULT '🔥 Oferta Limitada: Até 40% de desconto em créditos Lovable!'::text,
    pricing_plans jsonb DEFAULT '[{"bonus": "50", "price": "97", "credits": "100"}, {"bonus": "50", "price": "127", "credits": "150"}, {"bonus": "50", "price": "157", "credits": "200"}, {"bonus": "50", "price": "177", "credits": "250"}, {"bonus": "50", "price": "197", "credits": "300"}, {"bonus": "50", "price": "297", "credits": "400"}, {"bonus": "50", "price": "347", "credits": "500"}, {"bonus": "50", "price": "597", "credits": "1000"}, {"bonus": "50", "price": "697", "credits": "1500"}, {"bonus": "50", "price": "847", "credits": "2000"}]'::jsonb,
    about_name text DEFAULT 'Wallas'::text,
    about_title text DEFAULT 'Especialista em Lovable'::text,
    about_description text DEFAULT 'Com anos de experiência em desenvolvimento no-code e IA, me tornei referência na comunidade brasileira de Lovable.'::text,
    about_highlights jsonb DEFAULT '[{"title": "Criador da Bíblia do Lovable", "description": "O guia definitivo com todas as melhores práticas"}, {"title": "Canal Mestre do Lovable", "description": "Tutoriais e estratégias exclusivas"}, {"title": "Comunidade com +900 Membros", "description": "Líder da maior comunidade brasileira"}, {"title": "Serviço Confiável", "description": "Centenas de clientes satisfeitos"}]'::jsonb,
    testimonials jsonb DEFAULT '[{"name": "Carlos Silva", "role": "Desenvolvedor", "rating": 5, "content": "Excelente serviço!"}, {"name": "Marina Costa", "role": "Empreendedora", "rating": 5, "content": "Muito bom!"}]'::jsonb,
    whatsapp_number text,
    cta_text text DEFAULT 'Comprar Agora'::text,
    meta_title text,
    meta_description text,
    is_published boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    delivery_time text DEFAULT '45 a 120 minutos'::text,
    hero_badge text DEFAULT 'Mestre do Lovable'::text,
    bonus_text text DEFAULT '+50 CRÉDITOS BÔNUS EM TODOS OS PLANOS'::text,
    how_to_steps jsonb DEFAULT '[{"step": 1, "title": "Entre na sua conta Lovable.dev"}, {"step": 2, "title": "Acesse o menu e copie seu Invite Link 🔗"}, {"step": 3, "title": "Escolha o pacote de créditos desejado"}, {"step": 4, "title": "Envie seu link no privado do adm pelo WhatsApp"}, {"step": 5, "title": "Aguarde a confirmação da recarga"}]'::jsonb,
    benefits_receive jsonb DEFAULT '["Créditos válidos diretamente na sua conta Lovable.dev", "Processamento seguro dentro das normas da plataforma", "Serviço 100% digital e instantâneo", "Suporte humano para dúvidas, ajustes e orientações"]'::jsonb,
    security_items jsonb DEFAULT '["Nenhum dado sensível da sua conta é solicitado", "Seu Invite Link é usado somente para liberação dos créditos", "Processamento 100% seguro e dentro das políticas da plataforma"]'::jsonb,
    why_buy_items jsonb DEFAULT '[{"icon": "users", "title": "900+ membros satisfeitos"}, {"icon": "book", "title": "Criador da Bíblia do Lovable"}, {"icon": "clock", "title": "Entrega rápida (45-120 min)"}, {"icon": "message", "title": "Suporte direto via WhatsApp"}]'::jsonb,
    faq_items jsonb DEFAULT '[{"answer": "Os créditos Lovable são adicionados diretamente na sua conta após a confirmação do pagamento.", "question": "Como funcionam os créditos Lovable?"}, {"answer": "O processamento leva entre 45 a 120 minutos após a confirmação do pagamento.", "question": "Quanto tempo leva para receber os créditos?"}, {"answer": "Os créditos não expiram e ficam disponíveis na sua conta.", "question": "Os créditos têm prazo de validade?"}, {"answer": "Sim, o Invite Link não dá acesso à sua conta, apenas permite adicionar créditos.", "question": "É seguro fornecer meu Invite Link?"}, {"answer": "Sim, você pode escolher o pacote que melhor atende suas necessidades.", "question": "Posso escolher qualquer pacote?"}]'::jsonb,
    channel_url text,
    about_image_url text
);


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    email text NOT NULL,
    full_name text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: landing_pages landing_pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.landing_pages
    ADD CONSTRAINT landing_pages_pkey PRIMARY KEY (id);


--
-- Name: landing_pages landing_pages_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.landing_pages
    ADD CONSTRAINT landing_pages_slug_key UNIQUE (slug);


--
-- Name: landing_pages landing_pages_user_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.landing_pages
    ADD CONSTRAINT landing_pages_user_id_key UNIQUE (user_id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: idx_landing_pages_published; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_landing_pages_published ON public.landing_pages USING btree (is_published);


--
-- Name: idx_landing_pages_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_landing_pages_slug ON public.landing_pages USING btree (slug);


--
-- Name: idx_landing_pages_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_landing_pages_user_id ON public.landing_pages USING btree (user_id);


--
-- Name: landing_pages update_landing_pages_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_landing_pages_updated_at BEFORE UPDATE ON public.landing_pages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: profiles update_profiles_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: landing_pages landing_pages_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.landing_pages
    ADD CONSTRAINT landing_pages_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE;


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: landing_pages Anyone can view published landing pages; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can view published landing pages" ON public.landing_pages FOR SELECT USING ((is_published = true));


--
-- Name: landing_pages Users can insert own landing page; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert own landing page" ON public.landing_pages FOR INSERT WITH CHECK ((auth.uid() = user_id));


--
-- Name: profiles Users can insert own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: landing_pages Users can update own landing page; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update own landing page" ON public.landing_pages FOR UPDATE USING ((auth.uid() = user_id));


--
-- Name: profiles Users can update own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING ((auth.uid() = id));


--
-- Name: landing_pages Users can view own landing page; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own landing page" ON public.landing_pages FOR SELECT USING ((auth.uid() = user_id));


--
-- Name: profiles Users can view own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING ((auth.uid() = id));


--
-- Name: landing_pages; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--


