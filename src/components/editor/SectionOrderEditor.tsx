import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export type SectionId = 
  | "pricing" 
  | "why_buy" 
  | "how_to" 
  | "benefits" 
  | "security" 
  | "about" 
  | "testimonials" 
  | "faq" 
  | "pix";

export interface SectionConfig {
  id: SectionId;
  label: string;
  enabled: boolean;
}

interface SectionOrderEditorProps {
  sections: SectionConfig[];
  onReorder: (sections: SectionConfig[]) => void;
  onToggle: (sectionId: SectionId, enabled: boolean) => void;
}

const sectionLabels: Record<SectionId, string> = {
  pricing: "💰 Tabela de Preços",
  why_buy: "⭐ Por Que Comprar de Mim?",
  how_to: "🌟 Como Solicitar",
  benefits: "🎯 O Que Você Recebe",
  security: "🔒 Segurança",
  about: "👤 Sobre Mim",
  testimonials: "💬 Depoimentos",
  faq: "❓ FAQ",
  pix: "💚 Doações PIX",
};

export const SectionOrderEditor = ({ sections, onReorder, onToggle }: SectionOrderEditorProps) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onReorder(items);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>📑 Ordem das Seções</CardTitle>
        <CardDescription>
          Arraste para reordenar as seções da sua landing page e use o switch para mostrar/ocultar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sections">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`space-y-2 ${snapshot.isDraggingOver ? "bg-muted/30 rounded-lg p-2 -mx-2" : ""}`}
              >
                {sections.map((section, index) => (
                  <Draggable key={section.id} draggableId={section.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`flex items-center gap-3 p-3 rounded-lg border bg-card transition-all ${
                          snapshot.isDragging ? "shadow-lg border-primary" : "border-border"
                        } ${!section.enabled ? "opacity-50" : ""}`}
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
                        >
                          <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        
                        <div className="flex-1 flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            {sectionLabels[section.id] || section.id}
                          </span>
                          {!section.enabled && (
                            <span className="text-xs text-muted-foreground">(oculto)</span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          {section.enabled ? (
                            <Eye className="h-4 w-4 text-success" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                          <Switch
                            checked={section.enabled}
                            onCheckedChange={(checked) => onToggle(section.id, checked)}
                            aria-label={`Mostrar/ocultar seção ${sectionLabels[section.id]}`}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <p className="text-xs text-muted-foreground mt-4">
          💡 Dica: A seção Hero sempre aparece primeiro e não pode ser reordenada.
        </p>
      </CardContent>
    </Card>
  );
};

export const getDefaultSectionOrder = (): SectionConfig[] => [
  { id: "pricing", label: "Tabela de Preços", enabled: true },
  { id: "why_buy", label: "Por Que Comprar de Mim?", enabled: true },
  { id: "how_to", label: "Como Solicitar", enabled: true },
  { id: "benefits", label: "O Que Você Recebe", enabled: true },
  { id: "security", label: "Segurança", enabled: true },
  { id: "about", label: "Sobre Mim", enabled: true },
  { id: "testimonials", label: "Depoimentos", enabled: true },
  { id: "faq", label: "FAQ", enabled: true },
  { id: "pix", label: "Doações PIX", enabled: true },
];

export const parseSectionOrder = (data: any): SectionConfig[] => {
  const defaultOrder = getDefaultSectionOrder();
  
  if (!data || !Array.isArray(data)) {
    return defaultOrder;
  }
  
  // Handle both old format (string array) and new format (object array)
  const parsed: SectionConfig[] = [];
  
  for (const item of data) {
    if (typeof item === "string") {
      const defaultSection = defaultOrder.find(s => s.id === item);
      if (defaultSection) {
        parsed.push({ ...defaultSection, enabled: true });
      }
    } else if (typeof item === "object" && item.id) {
      const defaultSection = defaultOrder.find(s => s.id === item.id);
      if (defaultSection) {
        parsed.push({ 
          ...defaultSection, 
          enabled: item.enabled !== false 
        });
      }
    }
  }
  
  // Add any missing sections at the end
  for (const section of defaultOrder) {
    if (!parsed.find(p => p.id === section.id)) {
      parsed.push({ ...section, enabled: true });
    }
  }
  
  return parsed;
};
