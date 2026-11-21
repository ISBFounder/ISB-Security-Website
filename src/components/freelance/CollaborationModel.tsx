import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";

const COLLAB_IDS = ["project", "scope", "integration", "communication"] as const;

export async function CollaborationModel() {
  const t = await getTranslations("freelance");

  return (
    <section className="section divider bg-bg-secondary/40">
      <div className="container-site">
        <SectionHeader
          align="left"
          eyebrow={t("collaborationEyebrow")}
          title={t("collaborationTitle")}
        />
        <div className="mt-8 max-w-2xl space-y-4 text-[15px] leading-relaxed text-ink-secondary">
          <p>{t("collaborationBody")}</p>
          <ul className="space-y-2 border-t border-border pt-4">
            {COLLAB_IDS.map((id) => (
              <li key={id} className="flex gap-2 text-[13px]">
                <span className="mt-2 h-1 w-1 shrink-0 bg-gold/70" aria-hidden />
                {t(`collaborationItems.${id}`)}
              </li>
            ))}
          </ul>
          <p className="text-[13px] text-ink-muted">{t("collaborationNote")}</p>
        </div>
      </div>
    </section>
  );
}
