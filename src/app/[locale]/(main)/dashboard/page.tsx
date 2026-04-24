import Image from "next/image";
import { useTranslations } from "next-intl";
import { RecentWorkSection } from "@/features/library";
import { GetInspiredSection } from "@/features/templates";
import { CreateTodaySection } from "@/features/tools";

const whatsNew = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  label: "Tool update v.16.02.3",
  src: `/main/dashboard/whats_new/whats_new_${i + 1}.png`,
}));

export default function DashboardPage() {
  const t = useTranslations("dashboard.whatsNew");
  return (
    <div className="flex flex-col gap-10 px-4 py-6 lg:px-8 lg:py-8">
      <CreateTodaySection />
      <RecentWorkSection />
      <GetInspiredSection />

      <section className="flex flex-col gap-5">
        <h2 className="self-stretch text-lg font-semibold leading-5 text-fg">{t("title")}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whatsNew.map((item) => (
            <article key={item.id} className="flex flex-col gap-3">
              <div className="relative aspect-15/8 w-full overflow-hidden rounded-2xl">
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-sm font-medium text-fg">{item.label}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
