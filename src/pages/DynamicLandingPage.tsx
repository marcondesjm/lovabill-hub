import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  CheckCircle2, 
  Shield, 
  Star, 
  Zap, 
  Clock, 
  CreditCard, 
  HeadphonesIcon,
  MessageCircle,
  Sparkles,
  BadgeCheck,
  Lock,
  Award,
  TrendingUp,
  Users,
  Heart,
  HelpCircle,
  ChevronDown
} from "lucide-react";

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
    <main className="min-h-screen bg-background font-body">
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {pageData.hero_badge && (
            <div className="inline-block px-6 py-2 bg-primary/20 border border-primary/30 text-primary rounded-full mb-8 font-semibold text-sm uppercase tracking-wider">
              🚨 {pageData.hero_badge} 🚨
            </div>
          )}
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6 tracking-wide uppercase drop-shadow-lg">
            {pageData.hero_title}
          </h1>
          
          {pageData.hero_subtitle && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              {pageData.hero_subtitle}
            </p>
          )}
          
          {pageData.hero_image_url && (
            <div className="mb-10">
              <img
                src={pageData.hero_image_url}
                alt={pageData.hero_title}
                className="mx-auto max-w-md w-full h-auto rounded-2xl shadow-2xl border border-border/50"
              />
            </div>
          )}
          
          {pageData.bonus_text && (
            <div className="font-display text-4xl md:text-6xl lg:text-7xl bg-gradient-gold bg-clip-text text-transparent mb-10 tracking-wide uppercase drop-shadow-lg">
              ✨ {pageData.bonus_text} ✨
            </div>
          )}
          
          {pageData.whatsapp_number && (
            <a
              href={`https://wa.me/${pageData.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-5 bg-primary text-primary-foreground rounded-xl font-bold text-xl uppercase tracking-wider hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {pageData.cta_text || "Falar no WhatsApp"}
            </a>
          )}
        </div>
      </section>
      
      {pageData.offer_text && (
        <div className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground py-4 px-4 text-center font-display text-xl md:text-2xl uppercase tracking-wider">
          🔥 {pageData.offer_text} 🔥
        </div>
      )}
      
      {pageData.benefits_receive && Array.isArray(pageData.benefits_receive) && pageData.benefits_receive.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Benefícios Exclusivos</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide">
                O que você vai receber
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {pageData.benefits_receive.map((benefit: string, index: number) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-4 p-6 bg-background rounded-2xl border border-border/50 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg text-foreground/90 leading-relaxed pt-2">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.why_buy_items && Array.isArray(pageData.why_buy_items) && pageData.why_buy_items.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full mb-4">
                <Award className="w-5 h-5 text-success" />
                <span className="text-success font-semibold">Diferenciais</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide">
                Por que comprar comigo?
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pageData.why_buy_items.map((item: any, index: number) => {
                const iconMap: { [key: string]: React.ReactNode } = {
                  "⚡": <Zap className="w-8 h-8" />,
                  "🛡️": <Shield className="w-8 h-8" />,
                  "💳": <CreditCard className="w-8 h-8" />,
                  "🎧": <HeadphonesIcon className="w-8 h-8" />,
                  "⭐": <Star className="w-8 h-8" />,
                  "✅": <BadgeCheck className="w-8 h-8" />,
                  "🔒": <Lock className="w-8 h-8" />,
                  "📈": <TrendingUp className="w-8 h-8" />,
                  "👥": <Users className="w-8 h-8" />,
                  "❤️": <Heart className="w-8 h-8" />,
                  "💬": <MessageCircle className="w-8 h-8" />,
                  "⏰": <Clock className="w-8 h-8" />,
                };
                const IconComponent = iconMap[item.icon] || <Sparkles className="w-8 h-8" />;
                
                return (
                  <div 
                    key={index} 
                    className="group text-center p-6 rounded-2xl bg-gradient-to-b from-card to-card/50 border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {IconComponent}
                    </div>
                    <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      
      {pageData.how_to_steps && Array.isArray(pageData.how_to_steps) && pageData.how_to_steps.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <Zap className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Processo Simples</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide">
                Como funciona?
              </h2>
            </div>
            <div className="space-y-4">
              {pageData.how_to_steps.map((step: any, index: number) => (
                <div 
                  key={step.step} 
                  className="group relative flex items-start gap-6 p-6 bg-background rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.step}
                    </div>
                    {index < pageData.how_to_steps.length - 1 && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
                    )}
                  </div>
                  <div className="pt-3">
                    <p className="text-lg font-medium text-foreground">{step.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.pricing_plans && Array.isArray(pageData.pricing_plans) && pageData.pricing_plans.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-center mb-12">
              Escolha seu pacote
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pageData.pricing_plans.map((plan: any, index: number) => (
                <div key={index} className="group p-8 bg-card border-2 border-primary/20 rounded-2xl hover:border-primary hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-center mb-8">
                    <div className="font-display text-5xl md:text-6xl text-primary mb-2 tracking-wide">
                      {plan.credits} CRÉDITOS
                    </div>
                    <div className="font-display text-4xl md:text-5xl text-foreground">
                      R$ {plan.price}
                    </div>
                    {plan.bonus && (
                      <div className="inline-block mt-4 px-4 py-2 bg-success/20 text-success rounded-full text-sm font-bold uppercase tracking-wider">
                        🎁 +{plan.bonus} bônus
                      </div>
                    )}
                  </div>
                  {pageData.whatsapp_number && (
                    <a
                      href={`https://wa.me/${pageData.whatsapp_number}?text=Olá! Gostaria de comprar o pacote de ${plan.credits} créditos`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-center text-lg uppercase tracking-wider hover:bg-primary/90 transition-all duration-300"
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
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full mb-4">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-success font-semibold">100% Seguro</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl flex items-center justify-center gap-4 uppercase tracking-wide">
                <Lock className="w-10 h-10 text-primary" />
                Segurança e Privacidade
              </h2>
            </div>
            <div className="space-y-4">
              {pageData.security_items.map((item: string, index: number) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-4 p-5 bg-background rounded-xl border border-border/50 hover:border-success/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success/20 to-success/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <p className="text-foreground/90 pt-2">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.about_name && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide text-center mb-12">
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
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/10 rounded-full mb-4">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-yellow-600 font-semibold">Clientes Satisfeitos</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide">
                Depoimentos
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {pageData.testimonials.map((testimonial: any, index: number) => (
                <div 
                  key={index} 
                  className="group p-6 bg-background rounded-2xl border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{testimonial.name}</div>
                      {testimonial.role && (
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {pageData.faq_items && Array.isArray(pageData.faq_items) && pageData.faq_items.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="text-primary font-semibold">Tire suas dúvidas</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl uppercase tracking-wide">
                Perguntas Frequentes
              </h2>
            </div>
            <div className="space-y-4">
              {pageData.faq_items.map((faq: any, index: number) => (
                <details 
                  key={index} 
                  className="group p-6 bg-background rounded-2xl border border-border/50 hover:border-primary/30 transition-all duration-300 [&[open]]:shadow-lg"
                >
                  <summary className="font-bold cursor-pointer flex items-center justify-between gap-4 text-foreground">
                    <span className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-4 h-4 text-primary" />
                      </div>
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-muted-foreground group-open:rotate-180 transition-transform duration-300" />
                  </summary>
                  <p className="mt-4 pl-11 text-muted-foreground leading-relaxed">{faq.answer}</p>
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
