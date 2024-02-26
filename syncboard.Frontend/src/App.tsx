import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import type { OnDragEndResponder } from "react-beautiful-dnd";

import { useState } from "react";

const startColumns = [
  {
    id: 1,
    name: "To Do",
    cards: [
      {
        id: 1,
        content: "This is the first card",
      },
      {
        id: 2,
        content: "This is the second card",
      },
    ],
  },
  {
    id: 2,
    name: "In Progress",
    cards: [
      {
        id: 3,
        content: "This is the third card",
      },
    ],
  },
  {
    id: 3,
    name: "Done",
    cards: [
      {
        id: 4,
        content: "This is the fourth card",
      },
    ],
  },
];
export default function App() {
  const [columns, setColumns] = useState(startColumns);

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;
    if (!destination) return; // If dropped outside of a droppable area, do nothing

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; // If the card is dropped in the same position, do nothing
    }

    if (source.droppableId === destination.droppableId) {
      // If the card is dropped within the same column
    } else {
      // If the card is dropped between columns
    }
  };

  return (
    <>
      <h1 className="text-5xl font-semibold text-center mt-8 mb-14">
        SyncBoard
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-center items-start gap-10">
          {columns.map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}

function Column({
  column,
}: {
  column: {
    id: number;
    name: string;
    cards: { id: number; content: string }[];
  };
}) {
  const { id, name, cards } = column;

  return (
    <Droppable droppableId={`${id}`}>
      {(provided, snapshot) => (
        <div
          className="w-64 p-2 rounded-lg shadow-lg border-none"
          ref={provided.innerRef}
          style={{
            backgroundColor: snapshot.isDraggingOver
              ? "pink"
              : "cornflowerblue",
          }}
          {...provided.droppableProps}
        >
          <h2 className="text-2xl font-semibold mb-5">{name}</h2>
          <CardList cards={cards} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function CardList({ cards }: { cards: { id: number; content: string }[] }) {
  return cards.map((card, index) => (
    <Card key={card.id} card={card} index={index} />
  ));
}

function Card({
  card,
  index,
}: {
  card: { id: number; content: string };
  index: number;
}) {
  return (
    <Draggable draggableId={`${card.id}`} index={index}>
      {(provided) => (
        <div
          className="w-full border-none rounded-lg mb-2 break-words bg-slate-50 p-2"
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
