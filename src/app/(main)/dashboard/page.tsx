import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { SortIcon } from "@/components/icons";
import { HorizontalRail } from "@/components/layout/horizontal-rail";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { IconButton } from "@/components/ui/icon-button";
import { SearchInput } from "@/components/ui/search-input";

const photoFilters = [
  "All",
  "Products Photos",
  "Campaign Photos",
  "Lifestyle Photos",
  "Model Photos",
  "Promo Photos",
  "Enhance Photos",
] as const;

const createToday = [
  {
    title: "Main Product Image",
    subtitle:
      "Turn your product photos into professional shots perfect for any e-commerce platform.",
    frame: "/main/dashboard/create_today/create_today_1-frame.png",
    image: "/main/dashboard/create_today/create_today_1.png",
  },
  {
    title: "Multiple Angles",
    subtitle: "Show your product from multiple angles for complete visuals ideal.",
    frame: "/main/dashboard/create_today/create_today_2-frame.png",
    image: "/main/dashboard/create_today/create_today_2.png",
  },
  {
    title: "Close-up Detail",
    subtitle:
      "Highlight your product's quality with close-ups that capture fine details and textures.",
    frame: "/main/dashboard/create_today/create_today_3-frame.png",
    image: "/main/dashboard/create_today/create_today_3.png",
  },
  {
    title: "Flat Lay Setup",
    subtitle: "Create styled flat lay images that showcase your product attractively.",
    frame: "/main/dashboard/create_today/create_today_4-frame.png",
    image: "/main/dashboard/create_today/create_today_4.png",
  },
  {
    title: "360° Product View",
    subtitle: "Produce dynamic 360° photos to customers a full view.",
    frame: "/main/dashboard/create_today/create_today_5-frame.png",
    image: "/main/dashboard/create_today/create_today_5.png",
  },
];

const recentWork = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  src: `/main/dashboard/recent_work/recent_work_${i + 1}.png`,
}));

const inspireFilters = ["Templates", "Styles", "Tutorials"] as const;

const templates = Array.from({ length: 16 }, (_, i) => ({
  id: i + 1,
  src: `/main/dashboard/get_inspired/get_inspired_${i + 1}.png`,
}));

const whatsNew = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  label: "Tool update v.16.02.3",
  src: `/main/dashboard/whats_new/whats_new_${i + 1}.png`,
}));

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-10 px-4 py-6 lg:px-8 lg:py-8">
      <HorizontalRail
        title="What would you like to create today?"
        filters={photoFilters}
        selectedIndex={1}
      >
        {createToday.map((item) => (
          <article
            key={item.title}
            className="flex w-64 shrink-0 flex-col gap-3 rounded-2xl border border-border p-3 bg-gray-0"
          >
            <div className="relative h-8 w-8 overflow-hidden rounded-lg">
              <Image src={item.frame} alt="" fill sizes="32px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-semibold text-fg">{item.title}</h3>
              <p className="text-xs text-fg-muted">{item.subtitle}</p>
            </div>
            <div className="relative mt-auto aspect-4/3 w-full overflow-hidden rounded-xl">
              <Image src={item.image} alt="" fill sizes="240px" className="object-cover" />
            </div>
          </article>
        ))}
      </HorizontalRail>

      <HorizontalRail title="Recent work" filters={photoFilters} selectedIndex={0}>
        {recentWork.map((item) => (
          <div
            key={item.id}
            className="relative h-[251px] w-[228px] shrink-0 overflow-hidden rounded-2xl"
          >
            <Image src={item.src} alt="" fill sizes="228px" className="object-cover" />
          </div>
        ))}
      </HorizontalRail>

      <section className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <h2 className="self-stretch text-lg font-semibold leading-5 text-gray-9">Get inspired</h2>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {inspireFilters.map((label, index) => (
                <Chip key={label} selected={index === 0}>
                  {label}
                </Chip>
              ))}
            </div>
            <div className="flex w-full items-center gap-2 sm:w-auto">
              <SearchInput placeholder="Search templates" className="flex-1 sm:flex-none" />
              <IconButton aria-label="Sort" intent="ghost" size="sm">
                <SortIcon className="h-5 w-5 text-fg" />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((item) => (
            <div key={item.id} className="relative aspect-4/5 w-full overflow-hidden rounded-2xl">
              <Image
                src={item.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <Button intent="secondary" className="rounded-full">
            Explore all templates
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <h2 className="self-stretch text-lg font-semibold leading-5 text-gray-9">What's new</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whatsNew.map((item) => (
            <article key={item.id} className="flex flex-col gap-3">
              <div className="relative aspect-15/8 w-full overflow-hidden rounded-2xl">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium text-fg">{item.label}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
