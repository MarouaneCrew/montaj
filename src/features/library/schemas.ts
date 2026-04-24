import z from "zod";

export const AssetSchema = z.object({
  id: z.string(),
  slug: z.string(),
  category: z.enum(["all", "products", "campaign", "lifestyle", "model", "promo", "enhance"]),
  imageUrl: z.string(),
});

export const AssetListSchema = z.array(AssetSchema);

export type Asset = z.infer<typeof AssetSchema>;
export type AssetCategory = Asset["category"];
