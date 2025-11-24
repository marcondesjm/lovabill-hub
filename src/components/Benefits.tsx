import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { CreditCard, Shield, Zap, HeadphonesIcon } from "lucide-react";

const benefits = [
  {
    icon: CreditCard,
    title: "Créditos válidos diretamente na sua conta Lovable.dev",
  },
  {
    icon: Shield,
    title: "Processamento seguro dentro das normas da plataforma",
  },
  {
    icon: Zap,
    title: "Serviço 100% digital e instantâneo",
  },
  {
    icon: HeadphonesIcon,
    title: "Suporte humano para dúvidas, ajustes e orientações",
  },
];

export const Benefits = () => {
  return (
    <section className="py-12 px-4 bg-gradient-primary">
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
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
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
                    <Icon className="w-8 h-8 text-success flex-shrink-0" />
                    <p className="text-foreground">{benefit.title}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
