"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HorizontalRail } from "@/components/layout/horizontal-rail";
import { Chip, EmptyState, Skeleton } from "@/components/ui";
import { useRecentAssets } from "@/features/library/hooks";
import type { AssetCategory } from "@/features/library/schemas";

const filterValues: AssetCategory[] = [
  "all",
  "products",
  "campaign",
  "lifestyle",
  "model",
  "promo",
  "enhance",
];

const skeletonKeys = ["a", "b", "c", "d", "e"];

export function RecentWorkSection() {
  const [category, setCategory] = useState<AssetCategory>("all");
  const { data: assets, isLoading } = useRecentAssets(category);
  const tSection = useTranslations("dashboard.recentWork");
  const tFilters = useTranslations("filters.photos");

  return (
    <HorizontalRail
      title={tSection("title")}
      toolbar={filterValues.map((value) => (
        <Chip key={value} selected={value === category} onClick={() => setCategory(value)}>
          {tFilters(value)}
        </Chip>
      ))}
    >
      {isLoading ? (
        skeletonKeys.map((k) => <Skeleton key={k} className="h-62.75 w-57 shrink-0 rounded-2xl" />)
      ) : !assets || assets.length === 0 ? (
        <div className="flex h-62.75 w-full items-center justify-center">
          <EmptyState
            icon={ImageIcon}
            title={tSection("empty.title")}
            description={tSection("empty.description")}
          />
        </div>
      ) : (
        assets.map((asset) => (
          <div
            key={asset.id}
            className="relative h-62.75 w-57 shrink-0 overflow-hidden rounded-2xl"
          >
            <Image src={asset.imageUrl} alt="" fill sizes="228px" className="object-cover" />
          </div>
        ))
      )}
    </HorizontalRail>
  );
}
