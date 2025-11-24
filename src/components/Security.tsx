import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { CheckCircle2 } from "lucide-react";

const securityPoints = [
  "Nenhum dado sensível da sua conta é solicitado",
  "Seu Invite Link é usado somente para liberação dos créditos",
  "Processamento 100% seguro e dentro das políticas da plataforma",
];

export const Security = () => {
  return (
    <section className="py-12 px-4">
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
          {securityPoints.map((point, index) => (
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
                  <p className="text-foreground">{point}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
