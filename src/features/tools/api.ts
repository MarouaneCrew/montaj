import { request } from "@/lib/api/client";
import { type Tool, type ToolCategory, ToolListSchema } from "./schemas";

export function getTools(category?: ToolCategory): Promise<Tool[]> {
  const query = category && category !== "all" ? `?category=${category}` : "";
  return request(`/tools${query}`, {
    schema: ToolListSchema,
  });
}
