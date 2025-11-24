import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "Como funcionam os créditos Lovable?",
    answer:
      "Os créditos Lovable são utilizados para criar e editar seus projetos na plataforma. Cada ação consome uma quantidade específica de créditos.",
  },
  {
    question: "Quanto tempo leva para receber os créditos?",
    answer:
      "Após a confirmação do pagamento, os créditos são processados e creditados em sua conta entre 45 a 120 minutos.",
  },
  {
    question: "Os créditos têm prazo de validade?",
    answer:
      "Os créditos adicionados à sua conta seguem as políticas de validade da plataforma Lovable. Consulte os termos de uso para mais detalhes.",
  },
  {
    question: "É seguro fornecer meu Invite Link?",
    answer:
      "Sim! O Invite Link é usado apenas para identificar sua conta e processar a recarga. Nenhum dado sensível é solicitado ou compartilhado.",
  },
  {
    question: "Posso escolher qualquer pacote?",
    answer:
      "Sim! Você pode escolher o pacote que melhor se adequa às suas necessidades. Todos os pacotes incluem +50 créditos bônus.",
  },
];

export const FAQ = () => {
  return (
    <section className="py-12 px-4 bg-gradient-primary">
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
            {faqs.map((faq, index) => (
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
  );
};
