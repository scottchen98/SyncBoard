import { Draggable } from "react-beautiful-dnd";
import { Trash2 } from "lucide-react";

import type { Card } from "./types";

export default function CardItem({
  card,
  index,
}: {
  card: Card;
  index: number;
}) {
  return (
    <Draggable draggableId={`${card.id}`} index={index}>
      {(provided) => (
        <div
          className="mb-2 w-full break-words rounded-lg border-none bg-slate-50 p-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <button className="float-right" aria-label="Delete card">
            <Trash2 className="text-red-500" size={24} />
          </button>
          {card.content}
        </div>
      )}
    </Draggable>
  );
}
