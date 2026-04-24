export const locales = ["en", "ar"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

export const rtlLocales: readonly Locale[] = ["ar"];

export function isRtl(locale: Locale) {
  return rtlLocales.includes(locale);
}

export const localeLabels: Record<Locale, { native: string; short: string }> = {
  en: { native: "English", short: "EN" },
  ar: { native: "العربية", short: "AR" },
};
