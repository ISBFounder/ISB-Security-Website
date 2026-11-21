import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";

const PRIMARY_IDS = ["hospitality", "event"] as const;
const RELATED_IDS = ["object", "reception", "municipal", "support"] as const;

export async function FreelanceSpecializations() {
  const t = await getTranslations("freelance");

  return (
    <section className="section divider bg-bg-secondary/40">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow={t("specializationsEyebrow")}
          title={t("specializationsTitle")}
          description={t("specializationsDescription")}
        />

        <div className="mt-10 grid gap-0 border border-border lg:grid-cols-2">
          {PRIMARY_IDS.map((id, i) => (
            <div
              key={id}
              className={`p-6 ${i === 0 ? "border-b border-border lg:border-b-0 lg:border-r" : ""}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-wider text-gold">
                {t("primaryFocus")}
              </p>
              <h3 className="mt-2 text-[16px] font-semibold text-ink">
                {t(`primary.${id}.title`)}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-secondary">
                {t(`primary.${id}.text`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-0 border border-border sm:grid-cols-2">
          {RELATED_IDS.map((id, i) => (
            <div
              key={id}
              className={`p-5 ${
                i < RELATED_IDS.length - 1 ? "border-b border-border" : ""
              } ${i % 2 === 0 ? "sm:border-r" : "sm:border-r-0"} ${
                i < 2 ? "sm:border-b" : "sm:border-b-0"
              }`}
            >
              <h3 className="text-[14px] font-semibold text-ink">
                {t(`related.${id}.title`)}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-secondary">
                {t(`related.${id}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
