import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  BadgeCheck,
  Lock,
  TrendingUp,
  Users,
  Heart,
  AlertCircle,
  Youtube,
  BookOpen,
  Award,
  LogIn,
  Link2,
  Send,
  CheckCircle,
  Copy,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type SectionOrderItem = {
  id: string;
  enabled: boolean;
};

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
  channel_name: string | null;
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
  pix_enabled: boolean | null;
  pix_key: string | null;
  pix_name: string | null;
  pix_color: string | null;
  donation_title: string | null;
  section_order: SectionOrderItem[] | null;
};

const defaultSectionOrder: SectionOrderItem[] = [
  { id: "pricing", enabled: true },
  { id: "why_buy", enabled: true },
  { id: "how_to", enabled: true },
  { id: "benefits", enabled: true },
  { id: "security", enabled: true },
  { id: "about", enabled: true },
  { id: "testimonials", enabled: true },
  { id: "faq", enabled: true },
  { id: "pix", enabled: true },
];

const parseSectionOrder = (data: any): SectionOrderItem[] => {
  if (!data || !Array.isArray(data)) {
    return defaultSectionOrder;
  }
  
  const parsed: SectionOrderItem[] = [];
  
  for (const item of data) {
    if (typeof item === "string") {
      parsed.push({ id: item, enabled: true });
    } else if (typeof item === "object" && item.id) {
      parsed.push({ id: item.id, enabled: item.enabled !== false });
    }
  }
  
  // Add any missing sections at the end
  for (const section of defaultSectionOrder) {
    if (!parsed.find(p => p.id === section.id)) {
      parsed.push(section);
    }
  }
  
  return parsed;
};

// PIX Donation Section Component
const PixDonationSection = ({ pixKey, pixName, title, color = "green" }: { pixKey: string; pixName: string; title: string; color?: string }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const colorStyles: Record<string, { button: string; heart: string }> = {
    red: { button: "bg-red-500 hover:bg-red-600", heart: "text-red-500 fill-red-500" },
    green: { button: "bg-green-500 hover:bg-green-600", heart: "text-green-500 fill-green-500" },
    blue: { button: "bg-blue-500 hover:bg-blue-600", heart: "text-blue-500 fill-blue-500" },
    purple: { button: "bg-purple-500 hover:bg-purple-600", heart: "text-purple-500 fill-purple-500" },
    orange: { button: "bg-orange-500 hover:bg-orange-600", heart: "text-orange-500 fill-orange-500" },
    pink: { button: "bg-pink-500 hover:bg-pink-600", heart: "text-pink-500 fill-pink-500" },
    teal: { button: "bg-teal-500 hover:bg-teal-600", heart: "text-teal-500 fill-teal-500" },
    yellow: { button: "bg-yellow-500 hover:bg-yellow-600", heart: "text-yellow-500 fill-yellow-500" }
  };

  const styles = colorStyles[color] || colorStyles.green;

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      toast({
        title: "Chave PIX copiada!",
        description: "Cole no seu app de pagamento para fazer a doação.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Por favor, copie manualmente a chave PIX.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-accent">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 bg-card border-primary/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className={`w-8 h-8 ${styles.heart}`} />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {title}
              </h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Se meu conteúdo te ajudou, considere fazer uma doação via PIX 💚
            </p>

            <div className="bg-secondary/50 rounded-lg p-6 mb-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Chave PIX (Telefone)</p>
              <p className="text-xl md:text-2xl font-mono font-bold text-foreground mb-4 break-all">
                {pixKey}
              </p>
              <p className="text-sm text-muted-foreground">
                Nome: <span className="font-semibold text-foreground">{pixName}</span>
              </p>
            </div>

            <Button
              onClick={handleCopyPix}
              size="lg"
              className={`text-white font-bold rounded-full px-8 gap-2 ${styles.button}`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copiar Chave PIX
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              Qualquer valor é bem-vindo e me ajuda a continuar criando conteúdo 🙏
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
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
        setPageData({
          ...data,
          section_order: parseSectionOrder(data.section_order),
        });
        
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

  // Icon mapping for why_buy_items
  const whyBuyIconMap: { [key: string]: React.ComponentType<any> } = {
    "users": Users,
    "book": BookOpen,
    "clock": Clock,
    "message": MessageCircle,
    "star": Star,
    "shield": Shield,
    "zap": Zap,
    "credit": CreditCard,
    "headphones": HeadphonesIcon,
    "heart": Heart,
    "award": Award,
    "check": BadgeCheck,
    "lock": Lock,
    "trending": TrendingUp,
  };

  // Icon mapping for how_to_steps
  const stepIconMap: { [key: number]: React.ComponentType<any> } = {
    1: LogIn,
    2: Link2,
    3: CreditCard,
    4: Send,
    5: CheckCircle,
  };

  // Icon mapping for benefits
  const benefitIconMap: { [key: number]: React.ComponentType<any> } = {
    0: CreditCard,
    1: Shield,
    2: Zap,
    3: HeadphonesIcon,
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
                <span className="text-lg font-semibold">ENTREGA GARANTIDA</span>
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

      {/* Dynamic Sections based on section_order */}
      {(pageData.section_order || defaultSectionOrder).map((section) => {
        if (!section.enabled) return null;

        switch (section.id) {
          case "pricing":
            return pageData.pricing_plans && Array.isArray(pageData.pricing_plans) && pageData.pricing_plans.length > 0 ? (
              <section key="pricing" className="py-12 px-4 bg-gradient-primary">
                <div className="max-w-6xl mx-auto">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-4 text-foreground font-bold">
                            Pacote de Créditos
                          </th>
                          <th className="text-center py-4 px-4 text-foreground font-bold">
                            Preço
                          </th>
                          <th className="text-center py-4 px-4 text-foreground font-bold">
                            Bônus 🎁
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {pageData.pricing_plans.map((plan: any, index: number) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={`border-b border-border hover:bg-secondary/50 transition-colors ${
                              plan.featured ? "bg-secondary" : ""
                            }`}
                          >
                            <td className="py-4 px-4 text-foreground font-semibold">
                              {plan.credits} Créditos
                            </td>
                            <td className="py-4 px-4 text-center text-foreground font-bold text-lg">
                              R$ {plan.price}
                            </td>
                            <td className="py-4 px-4 text-center">
                              {plan.bonus && (
                                <span className="inline-flex items-center gap-1 text-accent font-bold text-lg">
                                  +{plan.bonus} <Star className="w-5 h-5 fill-current" />
                                </span>
                              )}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {pageData.delivery_time && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="mt-8 text-center"
                    >
                      <Card className="inline-block bg-muted border-border p-4">
                        <p className="text-muted-foreground text-sm">
                          ⏱️ <strong>PRAZO DE ENTREGA:</strong> Os créditos são processados e
                          creditados na sua conta entre {pageData.delivery_time} após a confirmação do
                          pagamento.
                        </p>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </section>
            ) : null;

          case "why_buy":
            return pageData.why_buy_items && Array.isArray(pageData.why_buy_items) && pageData.why_buy_items.length > 0 ? (
              <section key="why_buy" className="py-12 px-4 bg-background">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                      ⭐ Por Que Comprar de Mim?
                    </h2>
                    <p className="text-xl text-muted-foreground">
                      Confiança, experiência e resultados comprovados
                    </p>
                  </motion.div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    {pageData.why_buy_items.map((item: any, index: number) => {
                      const IconComponent = whyBuyIconMap[item.icon] || Star;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-4 h-full bg-card border-border hover:border-success/50 transition-all hover-scale text-center">
                            <IconComponent className="w-8 h-8 text-success mx-auto mb-2" />
                            <p className="text-foreground text-sm font-semibold">
                              {item.title}
                            </p>
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
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="p-8 bg-gradient-accent border-primary/30 text-center">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                          <div className="flex items-center gap-3">
                            <Youtube className="w-12 h-12 text-primary-foreground" />
                            <div className="text-left">
                              <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                                {pageData.channel_name || "Mestre do Lovable"}
                              </h3>
                              <p className="text-primary-foreground/90 text-sm">
                                Confira meu canal no YouTube com tutoriais, dicas e tudo sobre
                                Lovable!
                              </p>
                            </div>
                          </div>
                          <Button
                            onClick={() => window.open(pageData.channel_url!, "_blank")}
                            size="lg"
                            variant="secondary"
                            className="bg-background hover:bg-background/90 text-foreground font-bold px-8 whitespace-nowrap"
                          >
                            VISITAR CANAL
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  )}
                </div>
              </section>
            ) : null;

          case "how_to":
            return pageData.how_to_steps && Array.isArray(pageData.how_to_steps) && pageData.how_to_steps.length > 0 ? (
              <section key="how_to" className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
                  >
                    🌟 Como Solicitar
                  </motion.h2>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pageData.how_to_steps.map((step: any, index: number) => {
                      const IconComponent = stepIconMap[step.step] || CheckCircle;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-6 h-full bg-card border-border hover:border-primary/50 transition-colors">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                                {step.step}
                              </div>
                              <div className="flex-1">
                                <IconComponent className="w-8 h-8 text-accent mb-2" />
                                <p className="text-foreground font-medium">{step.title}</p>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>
            ) : null;

          case "benefits":
            return pageData.benefits_receive && Array.isArray(pageData.benefits_receive) && pageData.benefits_receive.length > 0 ? (
              <section key="benefits" className="py-12 px-4 bg-gradient-primary">
                <div className="max-w-6xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
                  >
                    📂 O Que Recebe
                  </motion.h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {pageData.benefits_receive.map((benefit: string, index: number) => {
                      const IconComponent = benefitIconMap[index] || CheckCircle2;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Card className="p-6 bg-card border-border hover:border-success/50 transition-colors">
                            <div className="flex items-start gap-4">
                              <IconComponent className="w-8 h-8 text-success flex-shrink-0" />
                              <p className="text-foreground">{benefit}</p>
                            </div>
                          </Card>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </section>
            ) : null;

          case "security":
            return pageData.security_items && Array.isArray(pageData.security_items) && pageData.security_items.length > 0 ? (
              <section key="security" className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground"
                  >
                    🛡️ Segurança
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-success text-xl font-semibold mb-8"
                  >
                    Confiável e seguro! ✅
                  </motion.p>

                  <div className="space-y-4">
                    {pageData.security_items.map((item: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-4 bg-card border-border hover:border-success/50 transition-colors">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                            <p className="text-foreground">{item}</p>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null;

          case "about":
            return pageData.about_name ? (
              <section key="about" className="py-12 px-4 bg-gradient-primary">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      👨‍💻 Quem Sou Eu
                    </h2>
                    <div className="inline-block">
                      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        {pageData.about_name}
                      </h3>
                      {pageData.about_title && (
                        <p className="text-xl text-accent font-semibold">
                          {pageData.about_title}
                        </p>
                      )}
                    </div>
                    {pageData.about_description && (
                      <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                        {pageData.about_description}
                      </p>
                    )}
                  </motion.div>

                  {pageData.about_highlights && Array.isArray(pageData.about_highlights) && pageData.about_highlights.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                      {pageData.about_highlights.map((highlight: any, index: number) => {
                        const highlightIcons = [BookOpen, Youtube, Users, Award];
                        const IconComponent = highlightIcons[index] || Award;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Card className="p-6 h-full bg-card border-border hover:border-accent/50 transition-all hover-scale">
                              <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                                  <IconComponent className="w-8 h-8 text-accent" />
                                </div>
                                <div>
                                  <h4 className="text-foreground font-bold text-lg mb-2">
                                    {highlight.title}
                                  </h4>
                                  <p className="text-muted-foreground text-sm">
                                    {highlight.description}
                                  </p>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <Card className="p-8 bg-secondary border-accent/30">
                      <blockquote className="text-center">
                        <p className="text-foreground text-lg md:text-xl italic mb-4">
                          "Minha missão é democratizar o acesso à criação de aplicações com
                          IA, tornando a tecnologia acessível para todos."
                        </p>
                        <footer className="text-accent font-semibold">— {pageData.about_name}</footer>
                      </blockquote>
                    </Card>
                  </motion.div>
                </div>
              </section>
            ) : null;

          case "testimonials":
            return pageData.testimonials && Array.isArray(pageData.testimonials) && pageData.testimonials.length > 0 ? (
              <section key="testimonials" className="py-16 px-4 bg-background">
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      ⭐ Depoimentos de Clientes
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Veja o que nossos clientes têm a dizer sobre a experiência de comprar créditos Lovable
                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {pageData.testimonials.map((testimonial: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-6 h-full bg-card border-border hover:border-accent/50 transition-all hover-scale">
                          <div className="flex flex-col gap-4">
                            <div className="flex gap-1">
                              {[...Array(testimonial.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                              ))}
                            </div>
                            <p className="text-foreground italic">"{testimonial.content}"</p>
                            <div className="mt-auto pt-4 border-t border-border">
                              <p className="font-semibold text-foreground">{testimonial.name}</p>
                              {testimonial.role && (
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            ) : null;

          case "faq":
            return pageData.faq_items && Array.isArray(pageData.faq_items) && pageData.faq_items.length > 0 ? (
              <section key="faq" className="py-12 px-4 bg-gradient-primary">
                <div className="max-w-4xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground"
                  >
                    ❓ Perguntas Frequentes
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <Accordion type="single" collapsible className="space-y-4">
                      {pageData.faq_items.map((faq: any, index: number) => (
                        <AccordionItem
                          key={index}
                          value={`item-${index}`}
                          className="bg-card border border-border rounded-lg px-6"
                        >
                          <AccordionTrigger className="text-left text-foreground hover:text-primary">
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
            ) : null;

          case "pix":
            return pageData.pix_enabled && pageData.pix_key && pageData.pix_name ? (
              <PixDonationSection
                key="pix"
                pixKey={pageData.pix_key}
                pixName={pageData.pix_name}
                title={pageData.donation_title || "Apoie meu trabalho"}
                color={pageData.pix_color || "green"}
              />
            ) : null;

          default:
            return null;
        }
      })}

      {/* CTA Section - Matching Original */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Pronto para começar?
            </h2>
            <p className="text-xl text-muted-foreground">
              Entre em contato agora e garanta seu bônus exclusivo!
            </p>
            {pageData.whatsapp_number && (
              <Button
                onClick={() => window.open(`https://wa.me/${pageData.whatsapp_number}`, "_blank")}
                size="lg"
                className="bg-success hover:bg-success/90 text-success-foreground font-bold text-lg px-8 py-6 rounded-full"
              >
                <MessageCircle className="w-6 h-6 mr-2" />
                {pageData.cta_text || "Falar no WhatsApp"}
              </Button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-muted-foreground border-t border-border">
        <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
      </footer>
    </main>
  );
};

export default DynamicLandingPage;
