import { useQuery } from "@tanstack/react-query";
import { getTools } from "./api";
import type { ToolCategory } from "./schemas";

export function useTools(category: ToolCategory = "all") {
  return useQuery({
    queryKey: ["tools", { category }],
    queryFn: () => getTools(category),
  });
}
