import { BellIcon, GlobeIcon, SunIcon } from "@/components/icons";
import { LogoMark, LogoWordmark } from "@/components/layout/logo-mark";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";

export function AppTopbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 rounded-3xl bg-surface px-4 lg:px-6">
      <div className="flex items-center gap-2 lg:hidden">
        <LogoMark className="h-9 w-9 rounded-lg" />
        <LogoWordmark className="h-4" />
      </div>
      <div className="flex items-center gap-2 lg:ml-auto">
        <Button
          intent="brand"
          size="md"
          className="hidden h-auto rounded-lg px-5 py-2 text-justify font-semibold leading-5 sm:inline-flex"
        >
          Pricing
        </Button>
        <IconButton aria-label="Toggle theme">
          <SunIcon className="h-5 w-5 text-fg" />
        </IconButton>
        <IconButton aria-label="Change language" className="hidden sm:inline-flex">
          <GlobeIcon className="h-5 w-5 text-fg" />
        </IconButton>
        <IconButton aria-label="Notifications">
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
