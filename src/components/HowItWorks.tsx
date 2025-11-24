import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { LogIn, Link2, CreditCard, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: LogIn,
    title: "Entre na sua conta Lovable.dev",
  },
  {
    number: "2",
    icon: Link2,
    title: "Acesse o menu e copie seu Invite Link 🔗",
  },
  {
    number: "3",
    icon: CreditCard,
    title: "Escolha o pacote de créditos desejado",
  },
  {
    number: "4",
    icon: Send,
    title: "Envie seu link no privado do adm pelo WhatsApp",
  },
  {
    number: "5",
    icon: CheckCircle,
    title: "Aguarde a confirmação da recarga",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-12 px-4">
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
          {steps.map((step, index) => {
            const Icon = step.icon;
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
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <Icon className="w-8 h-8 text-accent mb-2" />
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
  );
};
