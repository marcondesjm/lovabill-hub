import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export const OfferBanner = () => {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="w-full bg-primary text-primary-foreground py-3 px-4 text-center font-bold text-sm md:text-base"
    >
      <div className="flex items-center justify-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <span>OFERTA ESPECIAL: GANHE +50 CRÉDITOS BÔNUS EM TODOS OS PACOTES</span>
      </div>
    </motion.div>
  );
};
