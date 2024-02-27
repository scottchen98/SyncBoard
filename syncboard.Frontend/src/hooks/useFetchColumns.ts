import { useQuery } from "@tanstack/react-query";

import type { Column } from "../types";

export default function useFetchColumns() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["columns"],
    queryFn: async () => {
      const response = await fetch("http://localhost:5173/api/Columns");
      const columns: Column[] = await response.json();
      if (!columns || !columns.length) return [];
      return columns;
    },
  });

  return { columns: data, isLoading, error };
}
