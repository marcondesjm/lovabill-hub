import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
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
  AlertCircle,
  Youtube
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  return (
    <main className="min-h-screen bg-background">
      {/* Offer Banner */}
      {pageData.offer_text && (
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="w-full bg-primary text-primary-foreground py-3 px-4 text-center font-bold text-sm md:text-base"
        >
          <div className="flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{pageData.offer_text}</span>
          </div>
        </motion.div>
      )}
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {pageData.hero_badge && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-block px-4 py-2 bg-primary/20 border border-primary/30 text-primary rounded-full mb-6 font-semibold text-sm uppercase tracking-wider"
            >
              🚨 {pageData.hero_badge} 🚨
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              {pageData.hero_title}
            </h1>
            {pageData.hero_subtitle && (
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {pageData.hero_subtitle}
              </p>
            )}
          </motion.div>

          {pageData.hero_image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <img
                src={pageData.hero_image_url}
                alt={pageData.hero_title}
                className="mx-auto max-w-md w-full h-auto"
              />
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            {pageData.delivery_time && (
              <div className="flex items-center gap-2 text-success">
                <CheckCircle2 className="w-6 h-6" />
                <span className="text-lg font-semibold uppercase">{pageData.delivery_time}</span>
              </div>
            )}
            {pageData.bonus_text && (
              <div className="text-3xl md:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                {pageData.bonus_text}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pricing Table */}
      {pageData.pricing_plans && Array.isArray(pageData.pricing_plans) && pageData.pricing_plans.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground"
            >
              ESCOLHA SEU PACOTE
            </motion.h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 px-6 text-left text-muted-foreground font-semibold">Créditos</th>
                    <th className="py-4 px-6 text-center text-muted-foreground font-semibold">Valor</th>
                    <th className="py-4 px-6 text-right text-muted-foreground font-semibold">Bônus</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.pricing_plans.map((plan: any, index: number) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${plan.featured ? 'bg-primary/10' : ''}`}
                    >
                      <td className="py-4 px-6 text-lg font-bold text-foreground">{plan.credits} créditos</td>
                      <td className="py-4 px-6 text-center text-xl font-bold text-primary">R$ {plan.price}</td>
                      <td className="py-4 px-6 text-right">
                        {plan.bonus && (
                          <span className="inline-block px-3 py-1 bg-success/20 text-success rounded-full text-sm font-bold">
                            +{plan.bonus} bônus
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pageData.delivery_time && (
              <Card className="mt-6 p-4 bg-card border-primary/20">
                <div className="flex items-center justify-center gap-2 text-primary">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{pageData.delivery_time}</span>
                </div>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Why Buy From Me */}
      {pageData.why_buy_items && Array.isArray(pageData.why_buy_items) && pageData.why_buy_items.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
            >
              POR QUE COMPRAR COMIGO?
            </motion.h2>
            <p className="text-center text-muted-foreground mb-12">
              Veja os diferenciais que fazem a diferença
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {pageData.why_buy_items.map((item: any, index: number) => {
                const IconComponent = iconMap[item.icon] || <Sparkles className="w-8 h-8" />;
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="h-full p-6 text-center hover:shadow-lg transition-shadow duration-300">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {IconComponent}
                      </div>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            {pageData.channel_url && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12"
              >
                <Card className="p-8 text-center bg-gradient-to-r from-card to-muted/30">
                  <Youtube className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-2 text-foreground">Conheça meu canal</h3>
                  <p className="text-muted-foreground mb-4">Confira conteúdos exclusivos</p>
                  <a
                    href={pageData.channel_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors"
                  >
                    Visitar Canal
                  </a>
                </Card>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* How It Works */}
      {pageData.how_to_steps && Array.isArray(pageData.how_to_steps) && pageData.how_to_steps.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
            >
              COMO FUNCIONA?
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {pageData.how_to_steps.map((step: any, index: number) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 text-center h-full hover:shadow-lg transition-shadow duration-300">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                      {step.step}
                    </div>
                    <p className="text-sm font-medium text-foreground">{step.title}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {pageData.benefits_receive && Array.isArray(pageData.benefits_receive) && pageData.benefits_receive.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
            >
              O QUE VOCÊ VAI RECEBER
            </motion.h2>
            <p className="text-center text-muted-foreground mb-12">
              Confira todos os benefícios inclusos
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {pageData.benefits_receive.map((benefit: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
                >
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Security */}
      {pageData.security_items && Array.isArray(pageData.security_items) && pageData.security_items.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4 flex items-center justify-center gap-3 text-foreground"
            >
              <Lock className="w-8 h-8 text-primary" />
              SEGURANÇA E PRIVACIDADE
            </motion.h2>
            <p className="text-center text-muted-foreground mb-12">
              Sua compra está 100% protegida
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {pageData.security_items.map((item: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border"
                >
                  <Shield className="w-6 h-6 text-success flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Me */}
      {pageData.about_name && (
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
            >
              👨‍💻 QUEM SOU EU
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {pageData.about_image_url && (
                    <img
                      src={pageData.about_image_url}
                      alt={pageData.about_name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
                    />
                  )}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold text-foreground mb-1">{pageData.about_name}</h3>
                    {pageData.about_title && (
                      <p className="text-primary font-semibold mb-4">{pageData.about_title}</p>
                    )}
                    {pageData.about_description && (
                      <p className="text-muted-foreground">{pageData.about_description}</p>
                    )}
                  </div>
                </div>
                {pageData.about_highlights && Array.isArray(pageData.about_highlights) && pageData.about_highlights.length > 0 && (
                  <div className="grid gap-4 md:grid-cols-2 mt-8">
                    {pageData.about_highlights.map((highlight: any, index: number) => (
                      <div key={index} className="p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-bold text-foreground mb-1">{highlight.title}</h4>
                        <p className="text-sm text-muted-foreground">{highlight.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {pageData.testimonials && Array.isArray(pageData.testimonials) && pageData.testimonials.length > 0 && (
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
            >
              O QUE DIZEM NOSSOS CLIENTES
            </motion.h2>
            <p className="text-center text-muted-foreground mb-12">
              Depoimentos reais de quem já comprou
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pageData.testimonials.map((testimonial: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                    <div className="mt-auto">
                      <p className="font-bold text-foreground">{testimonial.name}</p>
                      {testimonial.role && (
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {pageData.faq_items && Array.isArray(pageData.faq_items) && pageData.faq_items.length > 0 && (
        <section className="py-16 px-4 bg-gradient-to-b from-muted/30 to-background">
          <div className="max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
            >
              PERGUNTAS FREQUENTES
            </motion.h2>
            <p className="text-center text-muted-foreground mb-12">
              Tire suas dúvidas antes de comprar
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {pageData.faq_items.map((faq: any, index: number) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="bg-card border border-border rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Button */}
      {pageData.whatsapp_number && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <a
            href={`https://wa.me/${pageData.whatsapp_number}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-success text-success-foreground rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            {pageData.cta_text || "Falar no WhatsApp"}
          </a>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-muted-foreground border-t border-border">
        <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
      </footer>
    </main>
  );
};

export default DynamicLandingPage;
