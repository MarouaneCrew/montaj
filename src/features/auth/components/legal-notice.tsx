"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function LegalNotice() {
  const t = useTranslations("auth");

  return (
    <p className="text-center text-sm text-fg-muted">
      {t.rich("legal", {
        privacy: (chunks) => (
          <Link href="#" className="underline">
            {chunks}
          </Link>
        ),
        terms: (chunks) => (
          <Link href="#" className="underline">
            {chunks}
          </Link>
        ),
      })}
    </p>
  );
}
