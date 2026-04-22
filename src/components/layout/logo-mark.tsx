import { cn } from "@/lib/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Muntaj"
      className={cn(
        "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-2xl font-bold text-fg-on-primary",
        className,
      )}
    >
      <span aria-hidden="true">M</span>
    </div>
  );
}
