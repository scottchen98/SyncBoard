import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Card, Column } from "../types";
import useSignalR from "./useSignalR";

export default function useAddCard() {
  const { connection } = useSignalR("/r/kanban");
  const qc = useQueryClient();

  const {
    mutate,
    isPending: isAddingCard,
    error: addCardError,
  } = useMutation({
    mutationFn: async ({
      newCard,
    }: {
      newCard: Omit<Card, "id">;
      column: Column;
    }) => {
      const response = await fetch("/api/Cards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCard),
      });
      if (!response.ok) {
        throw new Error("Failed to add a new card");
      }
    },
    onMutate: async ({ column }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await qc.cancelQueries({ queryKey: ["columns"] });

      // Snapshot the previous value
      const previousColumns = qc.getQueryData(["columns"]);

      // Optimistically update the columns
      qc.setQueryData(["columns"], (oldColumns: Column[]) => {
        // get the largest card id from all columns
        const maxCardId = Math.max(
          ...oldColumns.flatMap((column) =>
            column.cards.map((card) => card.id),
          ),
        );

        const newColumns = [...oldColumns];
        newColumns.splice(column.id - 1, 1, {
          ...column,
          cards: [
            ...column.cards,
            {
              // temporary id until we invalidate the query and
              // refetch the data with the new id from the server
              id: maxCardId + 1,
              content: "",
              position: column.cards.length,
              columnId: column.id,
            },
          ],
        });
        return newColumns;
      });

      // Return a context object with the snapshotted value
      return { previousColumns };
    },
    onSuccess: () => {
      // Invalidate the columns query
      qc.invalidateQueries({ queryKey: ["columns"] });
      connection?.invoke("SendCard");
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      if (!context) return;
      qc.setQueryData(["columns"], context.previousColumns);
    },
  });

  return { addCard: mutate, isAddingCard, addCardError };
}
