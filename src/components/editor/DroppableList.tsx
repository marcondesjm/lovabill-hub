import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { ReactNode } from "react";

interface DroppableListProps {
  droppableId: string;
  children: ReactNode;
  onReorder: (result: DropResult) => void;
}

export const DroppableList = ({ droppableId, children, onReorder }: DroppableListProps) => {
  return (
    <DragDropContext onDragEnd={onReorder}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`space-y-4 ${snapshot.isDraggingOver ? "bg-muted/30 rounded-lg p-2 -mx-2" : ""}`}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
