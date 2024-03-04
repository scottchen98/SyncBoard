import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Card, Column } from "../types";

export default function useDeleteCard() {
  const qc = useQueryClient();

  const {
    mutate,
    isPending: isDeletingCard,
    error: deleteCardError,
  } = useMutation({
    mutationFn: async ({
      cardId,
    }: {
      cardId: Card["id"];
      newColumns: Column[];
    }) => {
      const response = await fetch(`/api/Cards/${cardId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the card");
      }
    },
    onMutate: async ({ newColumns }) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await qc.cancelQueries({ queryKey: ["columns"] });

      // Snapshot the previous value
      const previousColumns = qc.getQueryData(["columns"]);

      // Optimistically update the columns
      qc.setQueryData(["columns"], () => [...newColumns]);

      // Return a context object with the snapshotted value
      return { previousColumns };
    },
    onSuccess: () => {
      // Invalidate the columns query
      qc.invalidateQueries({ queryKey: ["columns"] });

      // --> *instead of invoking the signalR connection here, we broadcast the event from the server*
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      if (!context) return;
      qc.setQueryData(["columns"], context.previousColumns);
    },
  });

  return { deleteCard: mutate, isDeletingCard, deleteCardError };
}
