import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function ProfessionalProfile() {
  const t = await getTranslations("freelance");

  return (
    <section className="section divider">
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeader
              align="left"
              eyebrow={t("profileEyebrow")}
              title={t("profileTitle")}
            />
          </div>
          <div className="space-y-4 text-[15px] leading-relaxed text-ink-secondary">
            <p>{t("profileP1")}</p>
            <p>{t("profileP2")}</p>
            <p>{t("profileP3")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
