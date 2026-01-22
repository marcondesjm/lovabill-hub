import { Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import { ReactNode } from "react";

interface DraggableItemProps {
  id: string;
  index: number;
  children: ReactNode;
}

export const DraggableItem = ({ id, index, children }: DraggableItemProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`relative ${snapshot.isDragging ? "opacity-90 shadow-lg" : ""}`}
        >
          <div className="flex items-start gap-2">
            <div
              {...provided.dragHandleProps}
              className="flex-shrink-0 p-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
              title="Arrastar para reordenar"
            >
              <GripVertical className="h-5 w-5" />
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
