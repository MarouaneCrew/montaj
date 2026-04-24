import { useTranslations } from "next-intl";
import { BellIcon } from "@/components/icons";
import { LogoMark, LogoWordmark } from "@/components/layout/logo-mark";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { LocaleSwitcher } from "@/components/ui/locale-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function AppTopbar() {
  const t = useTranslations("topbar");

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 rounded-3xl bg-surface px-4 lg:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <LogoMark className="h-9 w-9 rounded-lg" />
        <LogoWordmark className="h-4" />
      </div>
      <div className="flex items-center gap-2 lg:ms-auto">
        <Button
          intent="brand"
          size="md"
          className="hidden h-auto rounded-lg px-5 py-2 font-semibold leading-5 sm:inline-flex"
        >
          {t("pricing")}
        </Button>
        <ThemeToggle />
        <LocaleSwitcher />
        <IconButton aria-label={t("notifications")}>
          <BellIcon className="h-5 w-5 text-fg" />
        </IconButton>
        <Avatar size="md">
          <AvatarImage src="" alt="Your avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
