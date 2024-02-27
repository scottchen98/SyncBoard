import { Draggable } from "react-beautiful-dnd";

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
          {card.content}
        </div>
      )}
    </Draggable>
  );
}
