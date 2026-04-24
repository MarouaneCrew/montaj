"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { HorizontalRail } from "@/components/layout/horizontal-rail";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { useTools } from "../hooks";
import type { ToolCategory } from "../schemas";

const filterValues: ToolCategory[] = [
  "all",
  "products",
  "campaign",
  "lifestyle",
  "model",
  "promo",
  "enhance",
];

const CARD_CLASSES = "h-75 w-64 shrink-0 rounded-2xl";
const skeletonKeys = ["a", "b", "c", "d", "e"];

export function CreateTodaySection() {
  const [category, setCategory] = useState<ToolCategory>("all");
  const { data: tools, isLoading } = useTools(category);
  const tSection = useTranslations("dashboard.createToday");
  const tFilters = useTranslations("filters.photos");
  const tTools = useTranslations("tools");

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
        skeletonKeys.map((k) => <Skeleton key={k} className={CARD_CLASSES} />)
      ) : !tools || tools.length === 0 ? (
        <div className="flex h-75 w-full items-center justify-center">
          <EmptyState
            icon={ImageIcon}
            title={tSection("empty.title")}
            description={tSection("empty.description")}
          />
        </div>
      ) : (
        tools.map((tool) => (
          <article
            key={tool.id}
            className={`${CARD_CLASSES} flex flex-col gap-3 border border-border bg-surface p-3`}
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-lg">
              <Image src={tool.frameUrl} alt="" fill sizes="32px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="line-clamp-1 text-sm font-semibold text-fg">
                {tTools(`${tool.slug}.title`)}
              </h3>
              <p className="line-clamp-2 text-xs text-fg-muted">
                {tTools(`${tool.slug}.subtitle`)}
              </p>
            </div>
            <div className="relative mt-auto aspect-4/3 w-full overflow-hidden rounded-xl">
              <Image src={tool.imageUrl} alt="" fill sizes="240px" className="object-cover" />
            </div>
          </article>
        ))
      )}
    </HorizontalRail>
  );
}
