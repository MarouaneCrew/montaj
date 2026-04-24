"use client";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useTransition } from "react";
import { GlobeIcon } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { type Locale, localeLabels, locales } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const t = useTranslations("topbar");
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale() as Locale;
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    document.documentElement.dataset.localeSwapping = pending ? "true" : "false";
  }, [pending]);

  const swap = (next: Locale) => {
    if (next === current) return;
    startTransition(() => {
      router.replace(pathname, { locale: next, scroll: false });
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton
          aria-label={t("changeLanguage")}
          disabled={pending}
          className="hidden sm:inline-flex"
        >
          <GlobeIcon className="h-5 w-5 text-fg" />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onSelect={() => swap(locale)}
            disabled={locale === current}
          >
            <span className="me-auto">{localeLabels[locale].native}</span>
            <span className="text-xs text-fg-muted">{localeLabels[locale].short}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
