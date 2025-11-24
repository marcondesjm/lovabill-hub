import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export const CTAButton = () => {
  const handleWhatsAppClick = () => {
    // Replace with actual WhatsApp number
    window.open("https://wa.me/5500000000000", "_blank");
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Pronto para começar?
          </h2>
          <p className="text-xl text-muted-foreground">
            Entre em contato agora e garanta seu bônus exclusivo!
          </p>
          <Button
            onClick={handleWhatsAppClick}
            size="lg"
            className="bg-success hover:bg-success/90 text-success-foreground font-bold text-lg px-8 py-6 rounded-full"
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            Falar no WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
