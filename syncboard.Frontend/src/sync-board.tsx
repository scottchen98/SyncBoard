import { DragDropContext } from "react-beautiful-dnd";
import type { OnDragEndResponder } from "react-beautiful-dnd";
import { Loader2 } from "lucide-react";

import ColumnPanel from "./column-panel";
import useFetchColumns from "./hooks/useFetchColumns";
import useUpdateSyncBoard from "./hooks/useUpdateSyncBoard";
import useInvalidateColumns from "./hooks/useInvalidateColumns";

export default function SyncBoard() {
  const { columns, isLoading, error } = useFetchColumns();
  const { updateSyncBoard } = useUpdateSyncBoard();
  useInvalidateColumns();

  const onDragEnd: OnDragEndResponder = (result) => {
    if (!columns) return;

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
      // Remove the card from the source position and add it to the destination position
      const [removed] = newCards.splice(cardPositionSource, 1);
      newCards.splice(cardPositionDestination, 0, removed);

      // add columnId to reordered cards
      newCards.forEach((card, index) => {
        card.position = index;
        card.columnId = sourceColumnId;
      });

      // Update the column with the reordered cards
      const newColumn = {
        ...column,
        cards: newCards,
      };

      const newColumns = [...columns];
      // Replace the old column with the new column
      newColumns.splice(sourceColumnId - 1, 1, newColumn);
      updateSyncBoard({ newCards, newColumns });
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

      // Remove the card from the source column and add it to the destination column
      const [removed] = sourceCards.splice(cardPositionSource, 1);
      destinationCards.splice(cardPositionDestination, 0, removed);

      //add columnId to updated sourceCards and destinationCards
      sourceCards.forEach((card, index) => {
        card.position = index;
        card.columnId = sourceColumnId;
      });
      destinationCards.forEach((card, index) => {
        card.position = index;
        card.columnId = destinationColumnId;
      });

      // Update the source and destination columns
      const newSourceColumn = {
        ...sourceColumn,
        cards: sourceCards,
      };
      const newDestinationColumn = {
        ...destinationColumn,
        cards: destinationCards,
      };

      // Update the columns with the new source and destination columns
      const newColumns = [...columns];
      newColumns.splice(sourceColumn.id - 1, 1, newSourceColumn);
      newColumns.splice(destinationColumn.id - 1, 1, newDestinationColumn);
      updateSyncBoard({
        newCards: [...sourceCards, ...destinationCards],
        newColumns,
      });
    }
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        {isLoading ? (
          <Loader2 className="mx-auto h-12 w-12 animate-spin" />
        ) : !error ? (
          <div className="flex flex-col items-center justify-center gap-10 px-5 md:flex-row md:items-start">
            {columns &&
              columns.map((column) => (
                <ColumnPanel key={column.id} column={column} />
              ))}
          </div>
        ) : (
          <p className="text-center font-medium text-red-500">
            Some error has occurred.
          </p>
        )}
      </DragDropContext>
    </>
  );
}
