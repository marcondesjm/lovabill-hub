import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { BookOpen, Youtube, Users, Award } from "lucide-react";

const highlights = [
  {
    icon: BookOpen,
    title: "Criador da Bíblia do Lovable",
    description: "O guia definitivo com todas as melhores práticas e técnicas avançadas da plataforma",
  },
  {
    icon: Youtube,
    title: "Canal Mestre do Lovable",
    description: "Tutoriais, hacks e estratégias exclusivas para dominar o vibe coding",
  },
  {
    icon: Users,
    title: "Comunidade com +900 Membros Ativos",
    description: "Líder da maior comunidade brasileira de Lovable no WhatsApp, onde compartilho diariamente conteúdos exclusivos e suporte",
  },
  {
    icon: Award,
    title: "Serviço Confiável e Profissional",
    description: "Centenas de clientes satisfeitos que já receberam seus créditos com total segurança e transparência",
  },
];

export const AboutMe = () => {
  return (
    <section className="py-12 px-4 bg-gradient-primary">
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
              Wallas
            </h3>
            <p className="text-xl text-accent font-semibold">
              Especialista em Lovable
            </p>
          </div>
          <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
            Com anos de experiência em desenvolvimento no-code e IA, me tornei
            referência na comunidade brasileira de Lovable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
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
                      <Icon className="w-8 h-8 text-accent" />
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
              <footer className="text-accent font-semibold">— Wallas</footer>
            </blockquote>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
