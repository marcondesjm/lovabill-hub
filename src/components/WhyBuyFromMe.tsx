import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Users, BookOpen, Clock, MessageCircle, Youtube } from "lucide-react";

const trustPoints = [
  {
    icon: Users,
    text: "900+ membros satisfeitos",
  },
  {
    icon: BookOpen,
    text: "Criador da Bíblia do Lovable",
  },
  {
    icon: Clock,
    text: "Entrega rápida (45-120 min)",
  },
  {
    icon: MessageCircle,
    text: "Suporte direto via WhatsApp",
  },
];

export const WhyBuyFromMe = () => {
  const handleYouTubeClick = () => {
    // Replace with actual YouTube channel URL
    window.open("https://youtube.com/@mestrelovable", "_blank");
  };

  return (
    <section className="py-12 px-4 bg-background">
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
          {trustPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 h-full bg-card border-border hover:border-success/50 transition-all hover-scale text-center">
                  <Icon className="w-8 h-8 text-success mx-auto mb-2" />
                  <p className="text-foreground text-sm font-semibold">
                    {point.text}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

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
                    Mestre do Lovable
                  </h3>
                  <p className="text-primary-foreground/90 text-sm">
                    Confira meu canal no YouTube com tutoriais, dicas e tudo sobre
                    Lovable!
                  </p>
                </div>
              </div>
              <Button
                onClick={handleYouTubeClick}
                size="lg"
                variant="secondary"
                className="bg-background hover:bg-background/90 text-foreground font-bold px-8 whitespace-nowrap"
              >
                VISITAR CANAL
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
