import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function PlatformConnection() {
  const t = await getTranslations("freelance");

  return (
    <section className="section divider">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow={t("platformEyebrow")}
          title={t("platformTitle")}
        />
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-[15px] leading-relaxed text-ink-secondary">
            <p>
              {t.rich("platformInsight", {
                platform: (chunks) => (
                  <Link href="/platform" className="text-gold hover:text-gold-light">
                    {chunks}
                  </Link>
                ),
              })}
            </p>
            <p>{t("platformSeparation")}</p>
            <p>{t("platformDistinct")}</p>
          </div>
          <div className="border border-border bg-surface/30 p-5 font-mono text-[12px] leading-7 text-ink-secondary">
            <p className="text-gold">{t("diagramTitle")}</p>
            <p className="mt-2">{t("diagramCompany")}</p>
            <p className="pl-3">{t("diagramProduct")}</p>
            <p className="mt-2">{t("diagramFreelance")}</p>
            <p className="pl-3">{t("diagramAssignments")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
