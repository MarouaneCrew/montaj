import { type Asset, type AssetCategory, AssetListSchema } from "@/features/library/schemas";
import { request } from "@/lib/api/client";

export function getRecentAssets(category?: AssetCategory): Promise<Asset[]> {
  const query = category && category !== "all" ? `?category=${category}` : "";
  return request(`/library/recent${query}`, {
    schema: AssetListSchema,
  });
}
