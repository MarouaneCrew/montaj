"use client";

import { Moon, Sun } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { useTheme } from "@/lib/theme/theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const Icon = theme === "dark" ? Sun : Moon;
  const label = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  return (
    <IconButton aria-label={label} onClick={toggle}>
      <Icon className="h-5 w-5 text-fg" />
    </IconButton>
  );
}
