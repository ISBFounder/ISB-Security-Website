import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/constants";

const THEME_IDS = ["origin", "problem", "direction"] as const;

export async function HomeAbout() {
  const t = await getTranslations("home");
  const principles = t.raw("about.principles") as string[];

  return (
    <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="label">{t("about.eyebrow")}</p>
        <h2 className="heading-lg mt-3">{t("about.title")}</h2>
        <p className="body-lg mt-5 max-w-prose">{t("about.p1")}</p>
        <p className="body mt-4 max-w-prose">{t("about.p2")}</p>

        <div className="mt-8 space-y-0 border-t border-border">
          {THEME_IDS.map((id) => (
            <div
              key={id}
              className="grid gap-2 border-b border-border-subtle py-4 sm:grid-cols-[120px_1fr]"
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-gold">
                {t(`about.themes.${id}.label`)}
              </p>
              <p className="text-[14px] text-ink-secondary">{t(`about.themes.${id}.text`)}</p>
            </div>
          ))}
        </div>

        <Link
          href="/about"
          className="mt-8 inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
        >
          {t("about.link")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>

      <div className="space-y-6">
        <div className="border border-border bg-surface/30 p-5">
          <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            {t("about.missionLabel")}
          </p>
          <p className="mt-2 text-[14px] text-ink-secondary">{t("about.mission")}</p>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            {t("about.visionLabel")}
          </p>
          <p className="mt-2 text-[14px] text-ink-secondary">{t("about.vision")}</p>
        </div>

        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
            {t("about.principlesLabel")}
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {principles.map((p) => (
              <span
                key={p}
                className="border border-border-subtle bg-bg/40 px-2.5 py-1.5 text-[12px] text-ink-secondary"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-border-subtle pt-5 font-mono text-[11px] leading-relaxed text-ink-muted">
          <p>{t("about.developed")}</p>
          <p>{t("about.focus")}</p>
          <p>{t("about.designed")}</p>
          <p className="text-ink-faint">{t("about.ambition")}</p>
          <p className="mt-4 text-ink-faint">
            {SITE.name} · {t("about.location")} · KVK {SITE.kvk}
          </p>
          <p className="text-ink-faint">{t("about.tagline")}</p>
        </div>
      </div>
    </div>
  );
}
