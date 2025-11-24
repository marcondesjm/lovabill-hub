import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

type LandingPageData = {
  slug: string;
  hero_title: string;
  hero_subtitle: string | null;
  hero_badge: string | null;
  hero_image_url: string | null;
  offer_text: string | null;
  bonus_text: string | null;
  delivery_time: string | null;
  cta_text: string | null;
  whatsapp_number: string | null;
  channel_url: string | null;
  is_published: boolean | null;
  meta_title: string | null;
  meta_description: string | null;
  about_name: string | null;
  about_title: string | null;
  about_description: string | null;
  about_image_url: string | null;
  about_highlights: any;
  why_buy_items: any;
  how_to_steps: any;
  benefits_receive: any;
  security_items: any;
  pricing_plans: any;
  testimonials: any;
  faq_items: any;
};

const DynamicLandingPage = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<LandingPageData | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("landing_pages")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        setNotFound(true);
      } else {
        setPageData(data);
        
        // Update SEO meta tags
        if (data.meta_title) {
          document.title = data.meta_title;
        }
        if (data.meta_description) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', data.meta_description);
        }
      }
    } catch (error: any) {
      console.error("Erro ao carregar página:", error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (notFound || !pageData) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {pageData.hero_badge && (
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 font-semibold">
              {pageData.hero_badge}
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            {pageData.hero_title}
          </h1>
          
          {pageData.hero_subtitle && (
            <p className="text-xl text-muted-foreground mb-8">
              {pageData.hero_subtitle}
            </p>
          )}
          
          {pageData.hero_image_url && (
            <div className="mb-8">
              <img
                src={pageData.hero_image_url}
                alt={pageData.hero_title}
                className="mx-auto max-w-md w-full h-auto rounded-lg"
              />
            </div>
          )}
          
          {pageData.bonus_text && (
            <div className="text-3xl md:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent mb-8">
              {pageData.bonus_text}
            </div>
          )}
          
          {pageData.whatsapp_number && (
            <a
              href={`https://wa.me/${pageData.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors"
            >
              {pageData.cta_text || "Falar no WhatsApp"}
            </a>
          )}
        </div>
      </section>
      
      {pageData.offer_text && (
        <div className="w-full bg-primary text-primary-foreground py-3 px-4 text-center font-bold text-sm md:text-base">
          {pageData.offer_text}
        </div>
      )}
      
      {pageData.benefits_receive && Array.isArray(pageData.benefits_receive) && pageData.benefits_receive.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              O que você vai receber
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {pageData.benefits_receive.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-6 bg-background rounded-lg shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                    ✓
                  </div>
                  <p className="text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.why_buy_items && Array.isArray(pageData.why_buy_items) && pageData.why_buy_items.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Por que comprar comigo?
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {pageData.why_buy_items.map((item: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.how_to_steps && Array.isArray(pageData.how_to_steps) && pageData.how_to_steps.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Como funciona?
            </h2>
            <div className="space-y-6">
              {pageData.how_to_steps.map((step: any) => (
                <div key={step.step} className="flex items-start gap-4 p-6 bg-background rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">
                    {step.step}
                  </div>
                  <p className="text-lg">{step.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.pricing_plans && Array.isArray(pageData.pricing_plans) && pageData.pricing_plans.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Escolha seu pacote
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pageData.pricing_plans.map((plan: any, index: number) => (
                <div key={index} className="p-6 bg-background border-2 border-primary/20 rounded-lg hover:border-primary transition-colors">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {plan.credits} créditos
                    </div>
                    <div className="text-3xl font-bold">
                      R$ {plan.price}
                    </div>
                    {plan.bonus && (
                      <div className="text-sm text-success mt-2">
                        +{plan.bonus} bônus
                      </div>
                    )}
                  </div>
                  {pageData.whatsapp_number && (
                    <a
                      href={`https://wa.me/${pageData.whatsapp_number}?text=Olá! Gostaria de comprar o pacote de ${plan.credits} créditos`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold text-center hover:bg-primary/90 transition-colors"
                    >
                      {pageData.cta_text || "Comprar Agora"}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.security_items && Array.isArray(pageData.security_items) && pageData.security_items.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              🔒 Segurança e Privacidade
            </h2>
            <div className="space-y-4">
              {pageData.security_items.map((item: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-background rounded-lg">
                  <span className="text-success text-xl flex-shrink-0">✓</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.about_name && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Sobre Mim
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {pageData.about_image_url && (
                <img
                  src={pageData.about_image_url}
                  alt={pageData.about_name}
                  className="w-48 h-48 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{pageData.about_name}</h3>
                {pageData.about_title && (
                  <p className="text-lg text-primary mb-4">{pageData.about_title}</p>
                )}
                {pageData.about_description && (
                  <p className="text-muted-foreground mb-6">{pageData.about_description}</p>
                )}
                {pageData.about_highlights && Array.isArray(pageData.about_highlights) && (
                  <div className="grid gap-4 md:grid-cols-2">
                    {pageData.about_highlights.map((highlight: any, index: number) => (
                      <div key={index} className="p-4 bg-muted rounded-lg">
                        <h4 className="font-bold mb-1">{highlight.title}</h4>
                        <p className="text-sm text-muted-foreground">{highlight.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                {pageData.channel_url && (
                  <a
                    href={pageData.channel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors"
                  >
                    Ver Canal
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      
      {pageData.testimonials && Array.isArray(pageData.testimonials) && pageData.testimonials.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Depoimentos
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {pageData.testimonials.map((testimonial: any, index: number) => (
                <div key={index} className="p-6 bg-background rounded-lg shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                  <div className="font-bold">{testimonial.name}</div>
                  {testimonial.role && (
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.faq_items && Array.isArray(pageData.faq_items) && pageData.faq_items.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Perguntas Frequentes
            </h2>
            <div className="space-y-4">
              {pageData.faq_items.map((faq: any, index: number) => (
                <details key={index} className="p-6 bg-muted rounded-lg">
                  <summary className="font-bold cursor-pointer">{faq.question}</summary>
                  <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default DynamicLandingPage;
