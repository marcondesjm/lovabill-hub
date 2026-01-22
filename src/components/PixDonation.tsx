import { motion } from "framer-motion";
import { Heart, Copy, Check } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PixDonationProps {
  pixKey: string;
  pixName: string;
  title?: string;
}

export const PixDonation = ({ pixKey, pixName, title = "Apoie meu trabalho" }: PixDonationProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      toast({
        title: "Chave PIX copiada!",
        description: "Cole no seu app de pagamento para fazer a doação.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Erro ao copiar",
        description: "Por favor, copie manualmente a chave PIX.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-12 px-4 bg-gradient-accent">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 bg-card border-primary/20 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-8 h-8 text-destructive fill-destructive" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                {title}
              </h2>
            </div>
            
            <p className="text-muted-foreground mb-6">
              Se meu conteúdo te ajudou, considere fazer uma doação via PIX 💚
            </p>

            <div className="bg-secondary/50 rounded-lg p-6 mb-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Chave PIX (Telefone)</p>
              <p className="text-xl md:text-2xl font-mono font-bold text-foreground mb-4 break-all">
                {pixKey}
              </p>
              <p className="text-sm text-muted-foreground">
                Nome: <span className="font-semibold text-foreground">{pixName}</span>
              </p>
            </div>

            <Button
              onClick={handleCopyPix}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-8 gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copiar Chave PIX
                </>
              )}
            </Button>

            <p className="text-xs text-muted-foreground mt-4">
              Qualquer valor é bem-vindo e me ajuda a continuar criando conteúdo 🙏
            </p>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
