import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
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
  Edit3
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { EditorSection } from "@/pages/LandingPageEditor";

type PreviewProps = {
  formData: {
    slug: string;
    hero_title: string;
    hero_subtitle: string;
    hero_badge: string;
    hero_image_url: string;
    offer_text: string;
    bonus_text: string;
    delivery_time: string;
    cta_text: string;
    whatsapp_number: string;
    channel_url: string;
    channel_name: string;
    about_name: string;
    about_title: string;
    about_description: string;
    about_image_url: string;
    about_highlights: any[];
    why_buy_items: any[];
    how_to_steps: any[];
    benefits_receive: string[];
    security_items: string[];
    pricing_plans: any[];
    testimonials: any[];
    faq_items: any[];
    pix_enabled?: boolean;
    pix_key?: string;
    pix_name?: string;
    pix_color?: string;
    donation_title?: string;
  };
  onSectionClick?: (section: EditorSection) => void;
};

const ClickableSection = ({ 
  children, 
  section, 
  onClick,
  className = ""
}: { 
  children: React.ReactNode; 
  section: EditorSection; 
  onClick?: (section: EditorSection) => void;
  className?: string;
}) => {
  if (!onClick) return <>{children}</>;
  
  return (
    <div 
      className={`relative group cursor-pointer ${className}`}
      onClick={() => onClick(section)}
    >
      {children}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 group-hover:bg-primary/5 rounded-lg transition-all pointer-events-none" />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1 pointer-events-none">
        <Edit3 className="w-3 h-3" />
        Editar
      </div>
    </div>
  );
};

export const LandingPagePreview = ({ formData, onSectionClick }: PreviewProps) => {
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
    <div className="bg-background min-h-full overflow-auto">
      {/* Offer Banner */}
      <ClickableSection section="basic" onClick={onSectionClick}>
        {formData.offer_text && (
          <div className="w-full bg-primary text-primary-foreground py-2 px-3 text-center font-bold text-xs">
            <div className="flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" />
              <span>{formData.offer_text}</span>
            </div>
          </div>
        )}
      </ClickableSection>
      
      {/* Hero Section */}
      <ClickableSection section="basic" onClick={onSectionClick}>
        <section className="py-6 px-3">
          <div className="max-w-full mx-auto text-center">
            {formData.hero_badge && (
              <div className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 text-primary rounded-full mb-4 font-semibold text-xs uppercase tracking-wider">
                🚨 {formData.hero_badge} 🚨
              </div>
            )}
            
            <div className="mb-4">
              <h1 className="text-xl font-bold text-foreground mb-2">
                {formData.hero_title || "Título Principal"}
              </h1>
              {formData.hero_subtitle && (
                <p className="text-sm text-muted-foreground">
                  {formData.hero_subtitle}
                </p>
              )}
            </div>

            {formData.hero_image_url && (
              <div className="mb-4">
                <img
                  src={formData.hero_image_url}
                  alt={formData.hero_title}
                  className="mx-auto max-w-[150px] w-full h-auto rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-col items-center gap-2">
              {formData.delivery_time && (
                <div className="flex items-center gap-1 text-success text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="font-semibold">ENTREGA GARANTIDA</span>
                </div>
              )}
              {formData.bonus_text && (
                <div className="text-lg font-bold bg-gradient-gold bg-clip-text text-transparent">
                  {formData.bonus_text}
                </div>
              )}
            </div>
          </div>
        </section>
      </ClickableSection>

      {/* Pricing Table - Matching Original */}
      {formData.pricing_plans?.length > 0 && (
        <ClickableSection section="pricing" onClick={onSectionClick}>
          <section className="py-4 px-3 bg-gradient-primary">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-foreground font-bold">
                      Pacote de Créditos
                    </th>
                    <th className="text-center py-2 px-2 text-foreground font-bold">
                      Preço
                    </th>
                    <th className="text-center py-2 px-2 text-foreground font-bold">
                      Bônus 🎁
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {formData.pricing_plans.slice(0, 5).map((plan: any, index: number) => (
                    <tr
                      key={index}
                      className={`border-b border-border hover:bg-secondary/50 transition-colors ${
                        plan.featured ? "bg-secondary" : ""
                      }`}
                    >
                      <td className="py-2 px-2 text-foreground font-semibold">
                        {plan.credits} Créditos
                      </td>
                      <td className="py-2 px-2 text-center text-foreground font-bold">
                        R$ {plan.price}
                      </td>
                      <td className="py-2 px-2 text-center">
                        {plan.bonus && (
                          <span className="inline-flex items-center gap-1 text-accent font-bold">
                            +{plan.bonus} <Star className="w-3 h-3 fill-current" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {formData.pricing_plans.length > 5 && (
                <div className="py-2 text-center text-xs text-muted-foreground">
                  +{formData.pricing_plans.length - 5} mais planos...
                </div>
              )}
            </div>
            {formData.delivery_time && (
              <Card className="mt-4 bg-muted border-border p-2">
                <p className="text-muted-foreground text-xs text-center">
                  ⏱️ <strong>PRAZO DE ENTREGA:</strong> {formData.delivery_time}
                </p>
              </Card>
            )}
          </section>
        </ClickableSection>
      )}

      {/* Why Buy From Me - Matching Original */}
      {formData.why_buy_items?.length > 0 && (
        <ClickableSection section="content" onClick={onSectionClick}>
          <section className="py-4 px-3 bg-background">
            <div className="text-center mb-4">
              <h2 className="text-base font-bold text-foreground mb-1">
                ⭐ Por Que Comprar de Mim?
              </h2>
              <p className="text-xs text-muted-foreground">
                Confiança, experiência e resultados comprovados
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {formData.why_buy_items.map((item: any, index: number) => {
                const IconComponent = whyBuyIconMap[item.icon] || Star;
                return (
                  <Card key={index} className="p-2 bg-card border-border hover:border-success/50 text-center">
                    <IconComponent className="w-5 h-5 text-success mx-auto mb-1" />
                    <p className="text-foreground text-xs font-semibold">
                      {item.title}
                    </p>
                  </Card>
                );
              })}
            </div>

            {formData.channel_url && (
              <Card className="p-3 bg-gradient-accent border-primary/30 text-center">
                <div className="flex items-center justify-center gap-2">
                  <Youtube className="w-6 h-6 text-primary-foreground" />
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-primary-foreground">
                      {formData.channel_name || "Mestre do Lovable"}
                    </h3>
                    <p className="text-primary-foreground/90 text-xs">
                      YouTube com tutoriais e dicas!
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </section>
        </ClickableSection>
      )}

      {/* How It Works - Matching Original */}
      {formData.how_to_steps?.length > 0 && (
        <ClickableSection section="content" onClick={onSectionClick}>
          <section className="py-4 px-3">
            <h2 className="text-base font-bold text-center mb-4 text-foreground">
              🌟 Como Solicitar
            </h2>

            <div className="space-y-2">
              {formData.how_to_steps.map((step: any, index: number) => {
                const IconComponent = stepIconMap[step.step] || CheckCircle;
                return (
                  <Card key={index} className="p-2 bg-card border-border hover:border-primary/50">
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <IconComponent className="w-4 h-4 text-accent mb-1" />
                        <p className="text-foreground text-xs font-medium">{step.title}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </ClickableSection>
      )}

      {/* Benefits - Matching Original */}
      {formData.benefits_receive?.length > 0 && (
        <ClickableSection section="content" onClick={onSectionClick}>
          <section className="py-4 px-3 bg-gradient-primary">
            <h2 className="text-base font-bold text-center mb-4 text-foreground">
              📂 O Que Recebe
            </h2>

            <div className="space-y-2">
              {formData.benefits_receive.map((benefit: string, index: number) => {
                const IconComponent = benefitIconMap[index] || CheckCircle2;
                return (
                  <Card key={index} className="p-2 bg-card border-border hover:border-success/50">
                    <div className="flex items-start gap-2">
                      <IconComponent className="w-5 h-5 text-success flex-shrink-0" />
                      <p className="text-foreground text-xs">{benefit}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        </ClickableSection>
      )}

      {/* Security - Matching Original */}
      {formData.security_items?.length > 0 && (
        <ClickableSection section="content" onClick={onSectionClick}>
          <section className="py-4 px-3">
            <h2 className="text-base font-bold text-center mb-2 text-foreground">
              🛡️ Segurança
            </h2>
            <p className="text-center text-success text-xs font-semibold mb-4">
              Confiável e seguro! ✅
            </p>

            <div className="space-y-2">
              {formData.security_items.map((item: string, index: number) => (
                <Card key={index} className="p-2 bg-card border-border hover:border-success/50">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-foreground text-xs">{item}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </ClickableSection>
      )}

      {/* About Me - Matching Original */}
      {formData.about_name && (
        <ClickableSection section="about" onClick={onSectionClick}>
          <section className="py-4 px-3 bg-gradient-primary">
            <div className="text-center mb-4">
              <h2 className="text-base font-bold text-foreground mb-2">
                👨‍💻 Quem Sou Eu
              </h2>
              <h3 className="text-lg font-bold text-primary mb-1">
                {formData.about_name}
              </h3>
              {formData.about_title && (
                <p className="text-sm text-accent font-semibold">
                  {formData.about_title}
                </p>
              )}
              {formData.about_description && (
                <p className="mt-2 text-xs text-muted-foreground">
                  {formData.about_description}
                </p>
              )}
            </div>

            {formData.about_highlights?.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {formData.about_highlights.map((highlight: any, index: number) => {
                  const highlightIcons = [BookOpen, Youtube, Users, Award];
                  const IconComponent = highlightIcons[index] || Award;
                  return (
                    <Card key={index} className="p-2 bg-card border-border hover:border-accent/50 text-center">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-1">
                        <IconComponent className="w-4 h-4 text-accent" />
                      </div>
                      <h4 className="text-foreground font-bold text-xs mb-0.5">
                        {highlight.title}
                      </h4>
                      <p className="text-muted-foreground text-xs line-clamp-2">
                        {highlight.description}
                      </p>
                    </Card>
                  );
                })}
              </div>
            )}

            <Card className="p-3 bg-secondary border-accent/30">
              <blockquote className="text-center">
                <p className="text-foreground text-xs italic mb-2">
                  "Minha missão é democratizar o acesso à criação de aplicações com
                  IA..."
                </p>
                <footer className="text-accent font-semibold text-xs">— {formData.about_name}</footer>
              </blockquote>
            </Card>
          </section>
        </ClickableSection>
      )}

      {/* Testimonials - Matching Original */}
      {formData.testimonials?.length > 0 && (
        <ClickableSection section="testimonials" onClick={onSectionClick}>
          <section className="py-4 px-3 bg-background">
            <div className="text-center mb-4">
              <h2 className="text-base font-bold text-foreground mb-1">
                ⭐ Depoimentos de Clientes
              </h2>
              <p className="text-xs text-muted-foreground">
                Veja o que nossos clientes têm a dizer
              </p>
            </div>

            <div className="space-y-2">
              {formData.testimonials.slice(0, 3).map((testimonial: any, index: number) => (
                <Card key={index} className="p-3 bg-card border-border hover:border-accent/50">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-foreground italic text-xs">"{testimonial.content}"</p>
                    <div className="pt-2 border-t border-border">
                      <p className="font-semibold text-foreground text-xs">{testimonial.name}</p>
                      {testimonial.role && (
                        <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </ClickableSection>
      )}

      {/* FAQ - Matching Original */}
      {formData.faq_items?.length > 0 && (
        <ClickableSection section="content" onClick={onSectionClick}>
          <section className="py-4 px-3 bg-gradient-primary">
            <h2 className="text-base font-bold text-center mb-4 text-foreground">
              ❓ Perguntas Frequentes
            </h2>

            <Accordion type="single" collapsible className="space-y-2">
              {formData.faq_items.slice(0, 3).map((faq: any, index: number) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-lg px-3"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-primary text-xs py-2">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-xs pb-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </ClickableSection>
      )}

      {/* CTA Section - Matching Original */}
      <ClickableSection section="basic" onClick={onSectionClick}>
        <section className="py-4 px-3">
          <div className="text-center space-y-2">
            <h2 className="text-base font-bold text-foreground">
              Pronto para começar?
            </h2>
            <p className="text-xs text-muted-foreground">
              Entre em contato agora e garanta seu bônus exclusivo!
            </p>
            {formData.whatsapp_number && (
              <Button
                size="sm"
                className="w-full bg-success hover:bg-success/90 text-success-foreground font-bold rounded-full"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                {formData.cta_text || "Falar no WhatsApp"}
              </Button>
            )}
          </div>
        </section>
      </ClickableSection>
    </div>
  );
};
