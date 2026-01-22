import { useState } from "react";
import { Heart, Copy, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const PIX_KEY = "48996029392";
const PIX_NAME = "MARCONDES JORGE MACHADO";

export const DeveloperDonation = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  // Generate QR Code URL using a public API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(PIX_KEY)}`;

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
          <Heart className="mr-2 h-4 w-4 fill-destructive" />
          Apoiar Desenvolvedor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-center justify-center">
            <Heart className="h-6 w-6 text-destructive fill-destructive" />
            Apoie o Desenvolvedor
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center gap-6 py-4">
          <p className="text-muted-foreground text-center text-sm">
            Se este projeto te ajudou, considere fazer uma doação via PIX 💚
          </p>

          {/* QR Code */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={qrCodeUrl} 
              alt="QR Code PIX" 
              className="w-48 h-48"
            />
          </div>

          {/* PIX Info */}
          <div className="w-full bg-secondary/50 rounded-lg p-4 border border-border text-center">
            <p className="text-xs text-muted-foreground mb-1">Chave PIX (Telefone)</p>
            <p className="text-lg font-mono font-bold text-foreground mb-2">
              {PIX_KEY}
            </p>
            <p className="text-xs text-muted-foreground">
              Nome: <span className="font-semibold text-foreground">{PIX_NAME}</span>
            </p>
          </div>

          {/* Copy Button */}
          <Button
            onClick={handleCopyPix}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copiar Chave PIX
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Qualquer valor é bem-vindo e ajuda a manter o projeto 🙏
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
