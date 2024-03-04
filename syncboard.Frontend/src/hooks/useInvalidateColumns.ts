import { useQueryClient } from "@tanstack/react-query";
import useSignalR from "./useSignalR";
import { useEffect } from "react";

export default function useInvalidateColumns() {
  const { connection } = useSignalR("/r/kanban");
  const qc = useQueryClient();

  useEffect(() => {
    if (!connection) {
      return;
    }
    connection.on("InvalidateColumns", async () => {
      await qc.invalidateQueries({
        queryKey: ["columns"],
      });
    });
    return () => {
      connection.off("InvalidateColumns");
    };
  }, [connection, qc]);
}
