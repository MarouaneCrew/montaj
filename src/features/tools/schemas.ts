import { z } from "zod";

export const ToolSchema = z.object({
  id: z.string(),
  slug: z.string(),
  category: z.enum(["all", "products", "campaign", "lifestyle", "model", "promo", "enhance"]),
  frameUrl: z.string(),
  imageUrl: z.string(),
});

export const ToolListSchema = z.array(ToolSchema);

export type Tool = z.infer<typeof ToolSchema>;
export type ToolCategory = Tool["category"];
