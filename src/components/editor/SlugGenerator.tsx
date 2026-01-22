import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, RefreshCw, Trash2, Wand2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface SlugGeneratorProps {
  slug: string;
  heroTitle: string;
  currentPageId?: string;
  onSlugChange: (slug: string) => void;
  slugAvailable: boolean | null;
  checkingSlug: boolean;
}

const APP_VERSION = "1.0.0";

export const SlugGenerator = ({
  slug,
  heroTitle,
  currentPageId,
  onSlugChange,
  slugAvailable,
  checkingSlug,
}: SlugGeneratorProps) => {
  const { toast } = useToast();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [generating, setGenerating] = useState(false);

  const generateBaseSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 50);
  };

  const generateAlternativeSlugs = (baseSlug: string): string[] => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const random = Math.random().toString(36).substring(2, 6);
    
    return [
      `${baseSlug}-${year}`,
      `${baseSlug}-${month}${year}`,
      `${baseSlug}-${random}`,
    ];
  };

  const handleGenerateSlug = async () => {
    if (!heroTitle.trim()) {
      toast({
        title: "Título vazio",
        description: "Preencha o título principal antes de gerar a URL.",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    const baseSlug = generateBaseSlug(heroTitle);

    try {
      // Verificar se o slug base já existe
      const { data: existingPages } = await supabase
        .from("landing_pages")
        .select("id, slug")
        .ilike("slug", `${baseSlug}%`);

      // Filtrar para não incluir a página atual (se editando)
      const conflictingPages = existingPages?.filter(
        (page) => page.id !== currentPageId
      );

      if (!conflictingPages || conflictingPages.length === 0) {
        // Slug disponível, usar diretamente
        onSlugChange(baseSlug);
        toast({
          title: "URL gerada!",
          description: "A URL foi gerada automaticamente e está disponível.",
        });
      } else {
        // Slug já existe, gerar alternativas
        const alternatives = generateAlternativeSlugs(baseSlug);
        
        // Verificar quais alternativas estão disponíveis
        const availableAlternatives: string[] = [];
        for (const alt of alternatives) {
          const exists = conflictingPages.some((page) => page.slug === alt);
          if (!exists) {
            availableAlternatives.push(alt);
          }
        }

        // Se não tiver alternativas suficientes, adicionar com timestamp
        while (availableAlternatives.length < 3) {
          const timestamp = Date.now().toString(36);
          const newAlt = `${baseSlug}-${timestamp}`;
          if (!availableAlternatives.includes(newAlt)) {
            availableAlternatives.push(newAlt);
          }
        }

        setSuggestions(availableAlternatives.slice(0, 3));
        setSelectedSuggestion(availableAlternatives[0]);
        setShowSuggestions(true);
      }
    } catch (error) {
      console.error("Erro ao verificar slug:", error);
      // Em caso de erro, usar slug com timestamp
      const fallbackSlug = `${baseSlug}-${Date.now().toString(36)}`;
      onSlugChange(fallbackSlug);
    } finally {
      setGenerating(false);
    }
  };

  const handleSelectSuggestion = () => {
    if (selectedSuggestion) {
      onSlugChange(selectedSuggestion);
      setShowSuggestions(false);
      toast({
        title: "URL selecionada!",
        description: `A URL "${selectedSuggestion}" foi aplicada.`,
      });
    }
  };

  const handleClearCache = () => {
    // Limpar cache do localStorage
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.includes("landing") || key.includes("slug"))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));

    // Limpar cache de sessão
    sessionStorage.clear();

    // Forçar reload dos dados
    if ("caches" in window) {
      caches.keys().then((names) => {
        names.forEach((name) => {
          caches.delete(name);
        });
      });
    }

    toast({
      title: "Cache limpo!",
      description: "O cache da aplicação foi limpo com sucesso.",
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="slug">URL Amigável da Página</Label>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
            v{APP_VERSION}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearCache}
            title="Limpar cache"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleGenerateSlug}
            disabled={generating}
          >
            {generating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4 mr-2" />
            )}
            Gerar do Título
          </Button>
        </div>
      </div>

      <div className="relative">
        <Input
          id="slug"
          value={slug}
          onChange={(e) => {
            const cleanSlug = e.target.value
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .replace(/[^a-z0-9-]/g, "");
            onSlugChange(cleanSlug);
          }}
          placeholder="minha-pagina-de-vendas"
          className={
            slugAvailable === false
              ? "border-destructive"
              : slugAvailable === true
              ? "border-green-500"
              : ""
          }
        />
        {checkingSlug && (
          <Loader2 className="absolute right-3 top-3 h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">
          Sua página ficará disponível em:{" "}
          <span className="font-mono text-primary">
            {window.location.origin}/{slug || "sua-url"}
          </span>
        </p>
        {slugAvailable === false && (
          <p className="text-sm text-destructive font-medium">
            ⚠️ Esta URL já está em uso. Escolha outra.
          </p>
        )}
        {slugAvailable === true && slug && (
          <p className="text-sm text-green-600 font-medium">
            ✓ URL disponível!
          </p>
        )}
        <p className="text-xs text-muted-foreground">
          Use apenas letras minúsculas, números e hífens (ex: creditos-lovable-2024)
        </p>
      </div>

      {/* Dialog para sugestões de slug */}
      <Dialog open={showSuggestions} onOpenChange={setShowSuggestions}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>URL já em uso</DialogTitle>
            <DialogDescription>
              A URL gerada já está sendo utilizada. Escolha uma das alternativas abaixo:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <RadioGroup
              value={selectedSuggestion}
              onValueChange={setSelectedSuggestion}
              className="space-y-3"
            >
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion}
                  className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedSuggestion(suggestion)}
                >
                  <RadioGroupItem value={suggestion} id={`slug-${index}`} />
                  <Label
                    htmlFor={`slug-${index}`}
                    className="flex-1 cursor-pointer"
                  >
                    <span className="font-mono text-sm">{suggestion}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                onClick={() => setShowSuggestions(false)}
              >
                Cancelar
              </Button>
              <Button onClick={handleSelectSuggestion}>
                Usar esta URL
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
