import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

const chipVariants = cva(
  "inline-flex min-w-9 items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-center text-xs font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      selected: {
        true: "border-transparent bg-inverse text-fg-inverse",
        false: "border-border bg-muted text-fg hover:border-border-strong",
      },
    },
    defaultVariants: {
      selected: false,
    },
  },
);

type ChipProps = ComponentProps<"button"> & VariantProps<typeof chipVariants>;

export function Chip({ className, selected, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected ?? false}
      className={cn(chipVariants({ selected }), className)}
      {...props}
    />
  );
}
