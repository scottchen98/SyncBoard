import { Droppable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";

import CardList from "./card-list";
import type { Column } from "./types";

export default function ColumnPanel({ column }: { column: Column }) {
  const { id, name, cards } = column;

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
          <button className="flex w-full gap-1 rounded-lg p-1 hover:bg-gray-300">
            <Plus size={24} />
            <span>New</span>
          </button>
        </div>
      )}
    </Droppable>
  );
}
