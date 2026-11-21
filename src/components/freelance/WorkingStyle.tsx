import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";

const STYLE_IDS = [
  "professionalism",
  "reliability",
  "communication",
  "reporting",
  "awareness",
  "development",
  "technology",
] as const;

export async function WorkingStyle() {
  const t = await getTranslations("freelance");

  return (
    <section className="section divider">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow={t("styleEyebrow")}
          title={t("styleTitle")}
        />
        <div className="mt-10 space-y-0 border-t border-border">
          {STYLE_IDS.map((id, i) => (
            <div
              key={id}
              className="grid gap-2 border-b border-border-subtle py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">
                <span className="text-gold">{String(i + 1).padStart(2, "0")}</span>{" "}
                {t(`style.${id}.title`)}
              </p>
              <p className="text-[13px] leading-relaxed text-ink-secondary">
                {t(`style.${id}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
