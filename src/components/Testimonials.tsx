import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Silva",
    role: "Desenvolvedor Freelancer",
    content: "Comprei os créditos e recebi na hora! O Wallas é super profissional e atencioso. Agora posso desenvolver meus projetos sem preocupação.",
    rating: 5,
  },
  {
    name: "Marina Costa",
    role: "Empreendedora Digital",
    content: "Melhor investimento que fiz! Os créditos chegaram rapidinho e o suporte do Wallas é excepcional. Super recomendo!",
    rating: 5,
  },
  {
    name: "Pedro Oliveira",
    role: "Designer de Produto",
    content: "Confiável e rápido! Já comprei 3 vezes e sempre tudo certinho. O preço está ótimo e o atendimento é impecável.",
    rating: 5,
  },
  {
    name: "Julia Santos",
    role: "Criadora de Conteúdo",
    content: "Estava com receio no início, mas foi tudo perfeito! Créditos entregues em minutos e o Wallas tirou todas as minhas dúvidas.",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 px-4 bg-background">
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
          {testimonials.map((testimonial, index) => (
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
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-foreground italic">"{testimonial.content}"</p>
                  <div className="mt-auto pt-4 border-t border-border">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
