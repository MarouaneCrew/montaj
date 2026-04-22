import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils/cn";

const iconButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        ghost: "text-fg-muted hover:bg-muted hover:text-fg",
        outline: "border border-border bg-surface text-fg hover:bg-muted",
        solid: "bg-inverse text-fg-inverse hover:bg-gray-9",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
      },
    },
    defaultVariants: {
      intent: "ghost",
      size: "md",
    },
  },
);

type IconButtonProps = Omit<ComponentProps<"button">, "aria-label"> &
  VariantProps<typeof iconButtonVariants> & {
    "aria-label": string;
    asChild?: boolean;
  };

export function IconButton({
  className,
  intent,
  size,
  asChild = false,
  ...props
}: IconButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(iconButtonVariants({ intent, size }), className)} {...props} />;
}
