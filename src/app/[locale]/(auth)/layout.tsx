import type { ReactNode } from "react";
import { SplitScreenLayout } from "@/components/layout/split-screen-layout";
import { AuthSidePanel } from "@/features/auth";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <SplitScreenLayout aside={<AuthSidePanel />}>{children}</SplitScreenLayout>;
}
