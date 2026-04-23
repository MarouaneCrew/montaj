import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

const chipVariants = cva(
  "inline-flex min-w-9 items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-center text-xs font-medium leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      selected: {
        true: "border-gray-8 bg-gray-10 text-fg-inverse",
        false: "border-gray-2 bg-gray-1 text-gray-11 hover:border-gray-3",
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
