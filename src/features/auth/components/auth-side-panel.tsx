import Image from "next/image";
import { useTranslations } from "next-intl";

export function AuthSidePanel() {
  const t = useTranslations("auth.sidePanel");
  return (
    <div className="relative h-full w-full bg-linear-to-br from-primary-200 via-primary-400 to-primary-600">
      <div className="image">
        <Image
          src={"/auth-page/montaj-login.png"}
          alt="montaj login banner"
          fill
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-8 inset-e-8 text-sm font-medium text-fg-on-primary/80">
        {t("caption")}
      </div>
    </div>
  );
}
