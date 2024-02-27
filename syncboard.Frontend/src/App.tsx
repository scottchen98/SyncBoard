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

    const sourceColumnId = +source.droppableId;
    const destinationColumnId = +destination.droppableId;
    const cardPositionSource = source.index;
    const cardPositionDestination = destination.index;
    if (
      sourceColumnId === destinationColumnId &&
      cardPositionSource === cardPositionDestination
    )
      return; // If the card is dropped in the same position, do nothing

    // If the card is dropped within the same column
    if (sourceColumnId === destinationColumnId) {
      const column = columns.find((column) => column.id === sourceColumnId);
      if (!column) return;
      const newCards = [...column.cards];
      const [removed] = newCards.splice(cardPositionSource, 1);
      newCards.splice(cardPositionDestination, 0, removed);
      const newColumn = {
        ...column,
        cards: newCards,
      };
      const newColumns = [...columns];
      newColumns.splice(sourceColumnId - 1, 1, newColumn);
      setColumns(newColumns);
    } else {
      // If the card is dropped between columns
      const sourceColumn = columns.find(
        (column) => column.id === sourceColumnId,
      );
      const destinationColumn = columns.find(
        (column) => column.id === destinationColumnId,
      );
      if (!sourceColumn || !destinationColumn) return;

      const sourceCards = [...sourceColumn.cards];
      const destinationCards = [...destinationColumn.cards];
      const [removed] = sourceCards.splice(cardPositionSource, 1);
      destinationCards.splice(cardPositionDestination, 0, removed);

      const newSourceColumn = {
        ...sourceColumn,
        cards: sourceCards,
      };
      const newDestinationColumn = {
        ...destinationColumn,
        cards: destinationCards,
      };

      const newColumns = [...columns];
      newColumns.splice(sourceColumn.id - 1, 1, newSourceColumn);
      newColumns.splice(destinationColumn.id - 1, 1, newDestinationColumn);
      setColumns(newColumns);
    }
  };

  return (
    <>
      <h1 className="mb-14 mt-8 text-center text-5xl font-semibold">
        SyncBoard
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col items-center justify-center gap-10 px-3 md:flex-row md:items-start">
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
          className="w-80 rounded-lg border-none p-2 shadow-lg md:w-72"
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
