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
  AlertCircle,
  Youtube
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  };
};

export const LandingPagePreview = ({ formData }: PreviewProps) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    "users": <Users className="w-6 h-6" />,
    "book": <Award className="w-6 h-6" />,
    "clock": <Clock className="w-6 h-6" />,
    "message": <MessageCircle className="w-6 h-6" />,
    "⚡": <Zap className="w-6 h-6" />,
    "🛡️": <Shield className="w-6 h-6" />,
    "💳": <CreditCard className="w-6 h-6" />,
    "🎧": <HeadphonesIcon className="w-6 h-6" />,
    "⭐": <Star className="w-6 h-6" />,
    "✅": <BadgeCheck className="w-6 h-6" />,
    "🔒": <Lock className="w-6 h-6" />,
    "📈": <TrendingUp className="w-6 h-6" />,
    "👥": <Users className="w-6 h-6" />,
    "❤️": <Heart className="w-6 h-6" />,
    "💬": <MessageCircle className="w-6 h-6" />,
    "⏰": <Clock className="w-6 h-6" />,
  };

  return (
    <div className="bg-background min-h-full overflow-auto">
      {/* Offer Banner */}
      {formData.offer_text && (
        <div className="w-full bg-primary text-primary-foreground py-2 px-3 text-center font-bold text-xs">
          <div className="flex items-center justify-center gap-1">
            <AlertCircle className="w-3 h-3" />
            <span>{formData.offer_text}</span>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
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
              <div className="flex items-center gap-1 text-green-500 text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span className="font-semibold uppercase">{formData.delivery_time}</span>
              </div>
            )}
            {formData.bonus_text && (
              <div className="text-lg font-bold bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                {formData.bonus_text}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      {formData.pricing_plans?.length > 0 && (
        <section className="py-4 px-3">
          <h2 className="text-lg font-bold text-center mb-4 text-foreground">
            ESCOLHA SEU PACOTE
          </h2>
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 px-3 text-left text-muted-foreground font-semibold">Créditos</th>
                  <th className="py-2 px-3 text-center text-muted-foreground font-semibold">Valor</th>
                  <th className="py-2 px-3 text-right text-muted-foreground font-semibold">Bônus</th>
                </tr>
              </thead>
              <tbody>
                {formData.pricing_plans.slice(0, 5).map((plan: any, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                  >
                    <td className="py-2 px-3 font-bold text-foreground">{plan.credits} créditos</td>
                    <td className="py-2 px-3 text-center font-bold text-primary">R$ {plan.price}</td>
                    <td className="py-2 px-3 text-right">
                      {plan.bonus && (
                        <span className="inline-block px-2 py-0.5 bg-green-500/20 text-green-500 rounded-full text-xs font-bold">
                          +{plan.bonus}
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
        </section>
      )}

      {/* Why Buy From Me */}
      {formData.why_buy_items?.length > 0 && (
        <section className="py-4 px-3 bg-muted/30">
          <h2 className="text-lg font-bold text-center mb-4 text-foreground">
            POR QUE COMPRAR COMIGO?
          </h2>
          <div className="grid gap-2 grid-cols-2">
            {formData.why_buy_items.map((item: any, index: number) => {
              const IconComponent = iconMap[item.icon] || <Sparkles className="w-6 h-6" />;
              return (
                <Card key={index} className="p-3 text-center">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {IconComponent}
                  </div>
                  <h3 className="font-bold text-foreground text-xs">{item.title}</h3>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {/* How It Works */}
      {formData.how_to_steps?.length > 0 && (
        <section className="py-4 px-3">
          <h2 className="text-lg font-bold text-center mb-4 text-foreground">
            COMO FUNCIONA?
          </h2>
          <div className="space-y-2">
            {formData.how_to_steps.map((step: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-2 bg-card rounded-lg border border-border">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.step}
                </div>
                <p className="text-xs font-medium text-foreground">{step.title}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Benefits */}
      {formData.benefits_receive?.length > 0 && (
        <section className="py-4 px-3 bg-muted/30">
          <h2 className="text-lg font-bold text-center mb-4 text-foreground">
            O QUE VOCÊ VAI RECEBER
          </h2>
          <div className="space-y-2">
            {formData.benefits_receive.map((benefit: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-card rounded-lg border border-border"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-foreground text-xs">{benefit}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Security */}
      {formData.security_items?.length > 0 && (
        <section className="py-4 px-3">
          <h2 className="text-lg font-bold text-center mb-4 flex items-center justify-center gap-2 text-foreground">
            <Lock className="w-5 h-5 text-primary" />
            SEGURANÇA
          </h2>
          <div className="space-y-2">
            {formData.security_items.map((item: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 bg-card rounded-lg border border-border"
              >
                <Shield className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-foreground text-xs">{item}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* About Me */}
      {formData.about_name && (
        <section className="py-4 px-3 bg-muted/30">
          <h2 className="text-lg font-bold text-center mb-4 text-foreground">
            👨‍💻 QUEM SOU EU
          </h2>
          <Card className="p-4">
            <div className="flex items-start gap-3">
              {formData.about_image_url && (
                <img
                  src={formData.about_image_url}
                  alt={formData.about_name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div>
                <h3 className="font-bold text-foreground">{formData.about_name}</h3>
                <p className="text-xs text-primary font-medium">{formData.about_title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{formData.about_description}</p>
              </div>
            </div>
            {formData.about_highlights?.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {formData.about_highlights.map((highlight: any, index: number) => (
                  <div key={index} className="flex items-start gap-1">
                    <BadgeCheck className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-foreground">{highlight.title}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </section>
      )}

      {/* Testimonials */}
      {formData.testimonials?.length > 0 && (
        <section className="py-4 px-3">
          <h2 className="text-lg font-bold text-center mb-4 text-foreground">
            ⭐ DEPOIMENTOS
          </h2>
          <div className="space-y-2">
            {formData.testimonials.slice(0, 3).map((testimonial: any, index: number) => (
              <Card key={index} className="p-3">
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">"{testimonial.content}"</p>
                <div className="text-xs">
                  <span className="font-bold text-foreground">{testimonial.name}</span>
                  <span className="text-muted-foreground"> - {testimonial.role}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {formData.faq_items?.length > 0 && (
        <section className="py-4 px-3 bg-muted/30">
          <h2 className="text-lg font-bold text-center mb-4 text-foreground">
            ❓ PERGUNTAS FREQUENTES
          </h2>
          <Accordion type="single" collapsible className="space-y-2">
            {formData.faq_items.slice(0, 3).map((faq: any, index: number) => (
              <AccordionItem key={index} value={`faq-${index}`} className="bg-card rounded-lg border border-border px-3">
                <AccordionTrigger className="text-xs text-left py-2">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground pb-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {/* CTA Button */}
      {formData.whatsapp_number && (
        <section className="py-6 px-3">
          <div className="text-center">
            <button className="w-full py-3 px-6 bg-green-500 text-white rounded-lg font-bold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {formData.cta_text || "Falar no WhatsApp"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};
