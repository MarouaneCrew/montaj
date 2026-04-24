"use client";

import { useTranslations } from "next-intl";
import type { ComponentType, SVGProps } from "react";
import {
  AllToolsIcon,
  GiftIcon,
  HomeIcon,
  ImageGeneratorIcon,
  LibraryIcon,
  PlusSquareIcon,
  TemplatesIcon,
  VideoGeneratorIcon,
} from "@/components/icons";
import { LogoMark, LogoWordmark } from "@/components/layout/logo-mark";
import { routes } from "@/config/routes";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type NavItem = {
  labelKey: "home" | "imageGenerator" | "videoGenerator" | "templates" | "library" | "allTools";
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  { labelKey: "home", href: routes.dashboard, icon: HomeIcon },
  { labelKey: "imageGenerator", href: routes.imageGenerator, icon: ImageGeneratorIcon },
  { labelKey: "videoGenerator", href: routes.videoGenerator, icon: VideoGeneratorIcon },
  { labelKey: "templates", href: routes.templates, icon: TemplatesIcon },
  { labelKey: "library", href: routes.library, icon: LibraryIcon },
  { labelKey: "allTools", href: routes.tools, icon: AllToolsIcon },
];

export function AppSidebar() {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const tSidebar = useTranslations("sidebar");

  return (
    <aside className="hidden h-full w-65 shrink-0 flex-col rounded-3xl bg-surface px-4 py-5 lg:flex">
      <div className="flex items-center gap-1.5 px-1 pb-4">
        <LogoMark className="h-7.5 w-7.5 rounded-[9.5px]" />
        <LogoWordmark className="h-4" />
      </div>

      <div className="border-t border-border" />

      <Link
        href={routes.imageGenerator}
        className="mt-5 flex h-10 items-center justify-between rounded-lg border border-border bg-inverse px-2.5 text-sm font-medium text-fg-inverse transition-opacity hover:opacity-90"
      >
        <span>{tSidebar("createImage")}</span>
        <PlusSquareIcon className="h-6 w-6 text-muted" />
      </Link>

      <nav className="mt-5 flex flex-col gap-1">
        {navItems.map(({ labelKey, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex h-10 items-center gap-2 rounded-lg px-2.5 text-sm font-medium transition-colors",
                isActive ? "bg-muted text-fg" : "text-fg hover:bg-muted",
              )}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{tNav(labelKey)}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-primary-500 p-2 pt-3">
        <div className="flex justify-center items-center gap-2 pb-[15px] text-sm font-medium text-fg-on-primary">
          <GiftIcon className="h-5 w-5" />
          <span>{tSidebar("inviteAndEarn")}</span>
        </div>
        <div className="rounded-xl bg-gray-11 px-5 py-7 text-center">
          <p className="text-sm text-white opacity-70">{tSidebar("trialEndsIn", { days: 5 })}</p>
          <p className="mt-2 text-center text-3xl font-bold leading-none text-primary-500">
            {tSidebar("credits", { count: 14 })}
          </p>
        </div>
      </div>
    </aside>
  );
}
