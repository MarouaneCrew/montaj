import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { isRtl, type Locale } from "@/i18n/config";
import { routing } from "@/i18n/routing";
import { THEME_STORAGE_KEY } from "@/lib/theme/theme";
import { ThemeScript } from "@/lib/theme/theme-script";
import { Providers } from "../providers";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Muntaj",
  description: "Create product imagery with AI.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const themeInitScript = `try {
  var saved = localStorage.getItem("${THEME_STORAGE_KEY}");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  var theme = saved === "light" || saved === "dark" ? saved : (systemDark ? "dark" : "light");
  if (theme === "dark") document.documentElement.classList.add("dark");
} catch {}`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const dir = isRtl(locale as Locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={`${dmSans.variable} ${geistMono.variable} ${notoSansArabic.variable} h-full antialiased`}
    >
      <head>
        <ThemeScript script={themeInitScript} />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
