"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
import { cn } from "@/lib/utils/cn";

type NavItem = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const navItems: NavItem[] = [
  { label: "Home", href: routes.dashboard, icon: HomeIcon },
  { label: "Image Generator", href: routes.imageGenerator, icon: ImageGeneratorIcon },
  { label: "Video Generator", href: routes.videoGenerator, icon: VideoGeneratorIcon },
  { label: "Templates", href: routes.templates, icon: TemplatesIcon },
  { label: "Library", href: routes.library, icon: LibraryIcon },
  { label: "All tools", href: routes.tools, icon: AllToolsIcon },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-full w-65 shrink-0 flex-col rounded-3xl bg-surface px-4 py-5 lg:flex">
      <div className="flex items-center gap-1.5 px-1 pb-4">
        <LogoMark className="h-7.5 w-7.5 rounded-[9.5px]" />
        <LogoWordmark className="h-4" />
      </div>

      <div className="border-t border-border" />

      <Link
        href={routes.imageGenerator}
        className="mt-5 flex h-10 items-center justify-between rounded-lg border border-gray-3 bg-inverse px-2.5 text-sm font-medium text-fg-inverse transition-colors hover:bg-gray-9"
      >
        <span>Create an image</span>
        <PlusSquareIcon className="h-6 w-6 text-muted" />
      </Link>

      <nav className="mt-5 flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
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
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-2xl bg-primary-500 p-2 pt-3">
        <div className="flex justify-center items-center gap-2 pb-[15px] text-sm font-medium text-fg-on-primary">
          <GiftIcon className="h-5 w-5" />
          <span>Invite and Earn</span>
        </div>
        <div className="rounded-xl bg-inverse px-5 py-7 text-center">
          <p className="text-sm text-gray-3">Trial ends in 5 days</p>
          <p className="mt-2 text-center text-3xl font-bold leading-none text-primary-500">
            14 Credits
          </p>
        </div>
      </div>
    </aside>
  );
}
