import type { ComponentProps } from "react";
import { SearchIcon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";

export function SearchInput({ className, ...props }: Omit<ComponentProps<"input">, "type">) {
  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-6" />
      <input
        type="search"
        className={cn(
          "flex h-[34px] w-[220px] items-center gap-2 rounded-lg border border-gray-3 bg-gray-0 pl-9 pr-2.5 py-2 text-sm text-fg placeholder:text-gray-6",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  );
}
