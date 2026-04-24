"use client";

import { useTranslations } from "next-intl";
import { type ComponentType, type SVGProps, useEffect, useState } from "react";
import {
  AllToolsIcon,
  HomeIcon,
  ImageGeneratorIcon,
  LibraryIcon,
  PlusSquareIcon,
  TemplatesIcon,
  VideoGeneratorIcon,
} from "@/components/icons";
import { routes } from "@/config/routes";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

type NavLabelKey =
  | "home"
  | "templates"
  | "allTools"
  | "library"
  | "imageGenerator"
  | "videoGenerator";

type NavItem = {
  labelKey: NavLabelKey;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const leftItems: NavItem[] = [
  { labelKey: "home", href: routes.dashboard, icon: HomeIcon },
  { labelKey: "templates", href: routes.templates, icon: TemplatesIcon },
];

const rightItems: NavItem[] = [
  { labelKey: "allTools", href: routes.tools, icon: AllToolsIcon },
  { labelKey: "library", href: routes.library, icon: LibraryIcon },
];

const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

export function AppBottomNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const tNav = useTranslations("nav");

  // biome-ignore lint/correctness/useExhaustiveDependencies: close the menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close create menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/20 lg:hidden"
        />
      )}
      <nav
        aria-label="Primary"
        className="relative z-40 flex shrink-0 items-stretch rounded-3xl bg-surface p-2 lg:hidden"
      >
        {leftItems.map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}

        <div className="relative flex flex-1 flex-col items-center justify-end">
          <div className="absolute -top-6 left-1/2 h-14 w-14 -translate-x-1/2">
            <ArcItem
              label={tNav("imageGenerator")}
              href={routes.imageGenerator}
              icon={ImageGeneratorIcon}
              open={open}
              offsetX={-72}
              offsetY={-72}
              delay={0}
            />
            <ArcItem
              label={tNav("videoGenerator")}
              href={routes.videoGenerator}
              icon={VideoGeneratorIcon}
              open={open}
              offsetX={72}
              offsetY={-72}
              delay={40}
            />
            <button
              type="button"
              aria-label="Create"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "relative flex h-14 w-14 items-center justify-center rounded-full bg-primary-500 text-fg-on-primary shadow-lg ring-4 ring-surface transition-transform duration-200 ease-out",
                open && "rotate-45",
              )}
              style={{ transformOrigin: "50% 50%" }}
            >
              <PlusSquareIcon className="h-7 w-7" />
            </button>
          </div>
          <span className="pt-10 pb-1 text-[10px] font-medium text-fg-muted">
            {tNav("imageGenerator")}
          </span>
        </div>

        {rightItems.map((item) => (
          <NavLink key={item.href} item={item} active={pathname === item.href} />
        ))}
      </nav>
    </>
  );
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  const tNav = useTranslations("nav");
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1 rounded-xl py-2 text-[10px] font-medium transition-colors",
        active ? "bg-muted text-fg" : "text-fg-muted hover:text-fg",
      )}
    >
      <Icon className="h-5 w-5" />
      <span>{tNav(item.labelKey)}</span>
    </Link>
  );
}

type ArcItemProps = {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  open: boolean;
  offsetX: number;
  offsetY: number;
  delay: number;
};

function ArcItem({ label, href, icon: Icon, open, offsetX, offsetY, delay }: ArcItemProps) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "absolute left-1/2 top-1/2 h-12 w-12",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      style={{
        transform: open
          ? `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1)`
          : "translate(-50%, -50%) scale(0)",
        opacity: open ? 1 : 0,
        transformOrigin: "50% 50%",
        transition: `transform 360ms ${SPRING} ${delay}ms, opacity 200ms ease ${delay}ms`,
      }}
    >
      <Link
        href={href}
        tabIndex={open ? 0 : -1}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-inverse text-fg-inverse shadow-lg"
      >
        <Icon className="h-6 w-6" />
      </Link>
      <span className="absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap text-[11px] font-medium text-fg">
        {label}
      </span>
    </div>
  );
}
