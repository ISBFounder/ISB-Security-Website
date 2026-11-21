import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";

const QUALIFICATION_IDS = ["svpb", "bhv", "vca"] as const;

export async function Qualifications() {
  const t = await getTranslations("freelance");

  return (
    <section className="section divider bg-bg-secondary/40">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow={t("qualificationsEyebrow")}
          title={t("qualificationsTitle")}
          description={t("qualificationsDescription")}
        />
        <div className="mt-8 max-w-xl space-y-0 border-t border-border">
          {QUALIFICATION_IDS.map((id) => (
            <div
              key={id}
              className="grid grid-cols-[5rem_1fr] gap-4 border-b border-border-subtle py-4 text-[13px]"
            >
              <p className="font-mono text-[12px] font-medium text-gold">
                {t(`qualifications.${id}.code`)}
              </p>
              <div>
                <p className="font-medium text-ink">{t(`qualifications.${id}.name`)}</p>
                <p className="mt-0.5 text-ink-muted">{t(`qualifications.${id}.note`)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-xl text-[12px] text-ink-faint">
          {t("qualificationsNote")}
        </p>
      </div>
    </section>
  );
}
