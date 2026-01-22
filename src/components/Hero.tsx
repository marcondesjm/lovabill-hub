import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import heroWizard from "@/assets/hero-wizard.png";
import { CustomerCounter } from "./CustomerCounter";

export const Hero = () => {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <CustomerCounter />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            CRÉDITOS LOVABLE COM BÔNUS EXCLUSIVO
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <img
            src={heroWizard}
            alt="Mestre do Lovable"
            className="mx-auto max-w-md w-full h-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-success">
            <CheckCircle2 className="w-6 h-6" />
            <span className="text-lg font-semibold">ENTREGA GARANTIDA</span>
          </div>
          <div className="text-3xl md:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            +50 CRÉDITOS BÔNUS EM TODOS OS PLANOS
          </div>
        </motion.div>
      </div>
    </section>
  );
};
