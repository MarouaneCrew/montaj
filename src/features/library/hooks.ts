import { useQuery } from "@tanstack/react-query";
import { getRecentAssets } from "@/features/library/api";
import type { AssetCategory } from "@/features/library/schemas";

export function useRecentAssets(category: AssetCategory = "all") {
  return useQuery({
    queryKey: ["recent-assets", { category }],
    queryFn: () => getRecentAssets(category),
  });
}
