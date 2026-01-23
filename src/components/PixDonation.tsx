import { motion } from "framer-motion";
import { Heart, Copy, Check } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface PixDonationProps {
  pixKey: string;
  pixName: string;
  title?: string;
  color?: string;
}

const colorStyles: Record<string, { button: string; heart: string }> = {
  red: {
    button: "bg-red-500 hover:bg-red-600",
    heart: "text-red-500 fill-red-500"
  },
  green: {
    button: "bg-green-500 hover:bg-green-600",
    heart: "text-green-500 fill-green-500"
  },
  blue: {
    button: "bg-blue-500 hover:bg-blue-600",
    heart: "text-blue-500 fill-blue-500"
  },
  purple: {
    button: "bg-purple-500 hover:bg-purple-600",
    heart: "text-purple-500 fill-purple-500"
  },
  orange: {
    button: "bg-orange-500 hover:bg-orange-600",
    heart: "text-orange-500 fill-orange-500"
  },
  pink: {
    button: "bg-pink-500 hover:bg-pink-600",
    heart: "text-pink-500 fill-pink-500"
  },
  teal: {
    button: "bg-teal-500 hover:bg-teal-600",
    heart: "text-teal-500 fill-teal-500"
  },
  yellow: {
    button: "bg-yellow-500 hover:bg-yellow-600",
    heart: "text-yellow-500 fill-yellow-500"
  }
};

export const PixDonation = ({ pixKey, pixName, title = "Apoie meu trabalho", color = "green" }: PixDonationProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const styles = colorStyles[color] || colorStyles.green;

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
              <Heart className={cn("w-8 h-8", styles.heart)} />
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
              className={cn(
                "text-white font-bold rounded-full px-8 gap-2",
                styles.button
              )}
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
