import type { ReactNode } from "react";
import { AppBottomNav } from "@/components/layout/app-bottom-nav";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell-bg flex h-svh gap-3 p-3">
      <AppSidebar />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <AppTopbar />
        <main className="relative min-h-0 flex-1 overflow-hidden rounded-3xl bg-surface">
          <div className="h-full overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {children}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-6 bg-surface"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-surface"
          />
        </main>
        <AppBottomNav />
      </div>
    </div>
  );
}
