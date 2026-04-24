import type { Metadata } from "next";
import { site } from "@/config/site";
import { LogInForm } from "@/features/auth";

export const metadata: Metadata = {
  title: `Log in · ${site.name}`,
};

export default function LogInPage() {
  return <LogInForm />;
}
