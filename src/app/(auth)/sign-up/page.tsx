import type { Metadata } from "next";
import { site } from "@/config/site";
import { SignUpForm } from "@/features/auth";

export const metadata: Metadata = {
  title: `Sign up · ${site.name}`,
};

export default function SignUpPage() {
  return <SignUpForm />;
}
