import { Draggable } from "react-beautiful-dnd";
import { Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import type { Card, Column } from "./types";
import useDeleteCard from "./hooks/useDeleteCard";

export default function CardItem({
  card,
  index,
}: {
  card: Card;
  index: number;
}) {
  const { id: cardId, columnId, content } = card;
  const { deleteCard } = useDeleteCard();
  const qc = useQueryClient();

  const handleDeleteCard = (cardId: Card["id"], columnId: Column["id"]) => {
    const columns = qc.getQueryData<Column[]>(["columns"]);
    if (!columns) return;

    // find the column that the card belongs to based on the columnId
    const column = columns.find((column) => column.id === columnId);
    if (!column) return columns;

    // Remove the card from the column and update the position of the remaining cards
    const updatedCards = column.cards
      .filter((card) => card.id !== cardId)
      .map((card, index) => ({ ...card, position: index }));

    const newColumns = [...columns];
    // Replace the old column with the new updated column
    newColumns.splice(columnId - 1, 1, {
      ...column,
      cards: updatedCards,
    });
    deleteCard({ cardId, newColumns });
  };

  return (
    <Draggable draggableId={`${cardId}`} index={index}>
      {(provided) => (
        <div
          className="mb-2 min-h-10 w-full break-words rounded-lg border-none bg-slate-50 p-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <button
            className="float-right"
            aria-label="Delete card"
            onClick={() => handleDeleteCard(cardId, columnId)}
          >
            <Trash2 className="text-red-500" size={24} />
          </button>
          {content}
        </div>
      )}
    </Draggable>
  );
}
