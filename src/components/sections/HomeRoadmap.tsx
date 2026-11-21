import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const STAGE_IDS = ["now", "next", "later"] as const;

const EMPHASIS = {
  now: "active",
  next: "planned",
  later: "planned",
} as const;

export async function HomeRoadmap() {
  const t = await getTranslations("home");

  const stages = STAGE_IDS.map((id) => ({
    id,
    index: t(`roadmap.${id}.index`),
    label: t(`roadmap.${id}.label`),
    emphasis: EMPHASIS[id],
    items: t.raw(`roadmap.${id}.items`) as string[],
  }));

  return (
    <div>
      <div className="grid gap-0 border border-border md:grid-cols-3">
        {stages.map((stage, i) => (
          <div
            key={stage.id}
            className={cn(
              "relative p-5",
              i < stages.length - 1 && "border-b border-border md:border-b-0 md:border-r"
            )}
          >
            <div className="flex items-baseline gap-2">
              <span
                className={cn(
                  "font-mono text-[11px]",
                  stage.emphasis === "active" && "text-gold",
                  stage.emphasis === "planned" && "text-ink-muted"
                )}
              >
                {stage.index}
              </span>
              <p
                className={cn(
                  "text-[13px] font-semibold",
                  stage.emphasis === "active" && "text-gold",
                  stage.emphasis === "planned" && "text-ink-secondary"
                )}
              >
                {stage.label}
              </p>
            </div>
            <ul className="mt-4 space-y-1.5">
              {stage.items.map((item) => (
                <li key={item} className="text-[12px] leading-snug text-ink-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 text-[12px] text-ink-muted">{t("roadmap.disclaimer")}</p>

      <div className="mt-6">
        <Link
          href="/roadmap"
          className="inline-flex items-center gap-2 text-[13px] font-medium text-ink-secondary transition-colors hover:text-gold"
        >
          {t("roadmap.link")}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
