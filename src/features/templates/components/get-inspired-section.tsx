"use client";

import { ChevronRight, SparklesIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { SortIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { SearchInput } from "@/components/ui/search-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useTemplates } from "../hooks";
import type { TemplateKind } from "../schemas";

const filterValues: Exclude<TemplateKind, "all">[] = ["template", "style", "tutorial"];
const skeletonKeys = ["a", "b", "c", "d", "e", "f", "g", "h"];

export function GetInspiredSection() {
  const [kind, setKind] = useState<TemplateKind>("template");
  const { data: templates, isLoading } = useTemplates(kind);
  const tSection = useTranslations("dashboard.getInspired");
  const tFilters = useTranslations("filters.inspiration");

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <h2 className="self-stretch text-lg font-semibold leading-5 text-fg">
          {tSection("title")}
        </h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {filterValues.map((value) => (
              <Chip key={value} selected={value === kind} onClick={() => setKind(value)}>
                {tFilters(value)}
              </Chip>
            ))}
          </div>
          <div className="flex w-full items-center gap-2 sm:w-auto">
            <SearchInput
              placeholder={tSection("searchPlaceholder")}
              className="flex-1 sm:flex-none"
            />
            <IconButton aria-label="Sort" intent="ghost" size="sm">
              <SortIcon className="h-5 w-5 text-fg" />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          skeletonKeys.map((k) => <Skeleton key={k} className="aspect-4/5 w-full rounded-2xl" />)
        ) : !templates || templates.length === 0 ? (
          <div className="col-span-full flex aspect-4/5 max-h-80 items-center justify-center">
            <EmptyState
              icon={SparklesIcon}
              title={tSection("empty.title")}
              description={tSection("empty.description")}
            />
          </div>
        ) : (
          templates.map((template) => (
            <div
              key={template.id}
              className="relative aspect-4/5 w-full overflow-hidden rounded-2xl"
            >
              <Image
                src={template.imageUrl}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center pt-2">
        <Button intent="secondary" className="rounded-full">
          {tSection("exploreAll")}
          <ChevronRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
