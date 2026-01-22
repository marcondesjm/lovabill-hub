import { motion } from "framer-motion";
import { AlertTriangle, Shield, Info, CheckCircle2 } from "lucide-react";

export const ImportantNotices = () => {
  const notices = [
    "Cada link de convite pode ser utilizado até 10 indicações.",
    "Link que atingiu o limite não aceita novas adições.",
    "Se o limite foi atingido, será necessário usar o link de outra conta.",
    "Os créditos são adicionados diretamente na sua conta."
  ];

  const guarantees = [
    "Garantimos a entrega e funcionamento do produto no momento da liberação.",
    "Caso ocorra reset de créditos e a plataforma ainda permita novas adições, realizamos a reposição por até 15 dias após a recarga.",
    "O prazo de 15 dias refere-se à garantia de entrega e funcionamento inicial."
  ];

  return (
    <section className="py-16 px-4 bg-gradient-primary">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Avisos Importantes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card/50 backdrop-blur-sm border border-warning/30 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-warning/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-warning" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              ⚠️ Avisos Importantes
            </h2>
          </div>
          
          <ul className="space-y-4">
            {notices.map((notice, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <Info className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{notice}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Garantia */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/50 backdrop-blur-sm border border-success/30 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-success/20 rounded-lg">
              <Shield className="h-6 w-6 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              🛡️ Garantia
            </h2>
          </div>
          
          <ul className="space-y-4">
            {guarantees.map((guarantee, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{guarantee}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
