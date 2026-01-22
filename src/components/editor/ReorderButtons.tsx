import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface ReorderButtonsProps {
  index: number;
  totalItems: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export const ReorderButtons = ({ index, totalItems, onMoveUp, onMoveDown }: ReorderButtonsProps) => {
  return (
    <div className="flex gap-1">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onMoveUp}
        disabled={index === 0}
        title="Mover para cima"
      >
        <ChevronUp className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onMoveDown}
        disabled={index === totalItems - 1}
        title="Mover para baixo"
      >
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
};
