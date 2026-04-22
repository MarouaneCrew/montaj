import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 h-8 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      selected: {
        true: "bg-inverse text-fg-inverse",
        false: "bg-transparent text-fg-muted hover:bg-muted hover:text-fg",
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
