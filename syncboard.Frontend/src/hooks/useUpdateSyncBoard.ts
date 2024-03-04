import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Card, Column } from "../types";
import useSignalR from "./useSignalR";

export default function useUpdateSyncBoard() {
  const { connection } = useSignalR("/r/kanban");
  const qc = useQueryClient();

  const {
    mutate,
    isPending: isUpdatingSyncBoard,
    error: updateSyncBoardError,
  } = useMutation({
    mutationFn: async ({
      newCards,
    }: {
      newCards: Card[];
      newColumns: Column[];
    }) => {
      const response = await fetch("/api/Cards", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCards),
      });
      if (!response.ok) {
        throw new Error("Failed to update cards");
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
      connection?.invoke("SendCard");
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (_, __, context) => {
      if (!context) return;
      qc.setQueryData(["columns"], context.previousColumns);
    },
  });

  return { updateSyncBoard: mutate, isUpdatingSyncBoard, updateSyncBoardError };
}
