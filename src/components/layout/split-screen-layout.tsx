import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type SplitScreenLayoutProps = {
  children: ReactNode;
  aside: ReactNode;
  className?: string;
};

export function SplitScreenLayout({ children, aside, className }: SplitScreenLayoutProps) {
  return (
    <div className={cn("min-h-svh grid lg:grid-cols-2", className)}>
      <main className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <aside className="relative hidden lg:block overflow-hidden bg-muted">{aside}</aside>
    </div>
  );
}
