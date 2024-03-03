import { Droppable } from "react-beautiful-dnd";
import { Loader2, Plus } from "lucide-react";

import { useState } from "react";
import CardList from "./card-list";
import type { Column } from "./types";
import useAddCard from "./hooks/useAddCard";

export default function ColumnPanel({ column }: { column: Column }) {
  const { id, name, cards } = column;
  const { addCard, isAddingCard } = useAddCard();
  const [cardContent, setCardContent] = useState("");

  const handleAddCard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cardContent) return;

    const newCardPosition = cards.length;
    addCard({
      newCard: {
        content: cardContent,
        position: newCardPosition,
        columnId: id,
      },
      column,
    });

    setCardContent("");
  };

  return (
    <Droppable droppableId={`${id}`}>
      {(provided, snapshot) => (
        <div
          className="w-[80%] rounded-lg border-none p-2 shadow-lg"
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver
              ? "pink"
              : "cornflowerblue",
          }}
          {...provided.droppableProps}
        >
          <h2 className="mb-5 text-2xl font-semibold">{name}</h2>
          <CardList cards={cards} />
          {provided.placeholder}
          <form
            className="flex items-center gap-2 pr-2"
            onSubmit={handleAddCard}
          >
            <input
              type="text"
              className={`flex w-full gap-1 rounded-lg ${snapshot.isDraggingOver ? "bg-[#ffc0cb]" : "bg-[#6495ed]"} p-1 placeholder:text-gray-600 hover:bg-gray-300 focus:outline-none`}
              placeholder="New"
              value={cardContent}
              onChange={(e) => setCardContent(e.target.value)}
              required
            />
            <button
              disabled={isAddingCard}
              className={`${isAddingCard && "cursor-not-allowed"}`}
            >
              {isAddingCard ? <Loader2 size={24} /> : <Plus size={24} />}
            </button>
          </form>
        </div>
      )}
    </Droppable>
  );
}
