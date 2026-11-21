import { getTranslations } from "next-intl/server";

export async function AIBeforeAfter() {
  const t = await getTranslations("ai");

  return (
    <div className="grid gap-px border border-border bg-border-subtle sm:grid-cols-2">
      <div className="bg-bg p-5">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          {t("beforeAfter.before")}
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-secondary">
          {t("beforeAfter.note")}
        </p>
      </div>
      <div className="bg-surface/30 p-5">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          {t("beforeAfter.after")}
        </p>
        <dl className="mt-3 space-y-1.5 text-[13px] text-ink-secondary">
          <div className="flex gap-2">
            <dt className="w-24 font-mono text-[10px] text-ink-faint">{t("beforeAfter.time")}</dt>
            <dd>{t("beforeAfter.timeValue")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 font-mono text-[10px] text-ink-faint">{t("beforeAfter.location")}</dt>
            <dd>{t("beforeAfter.locationValue")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 font-mono text-[10px] text-ink-faint">{t("beforeAfter.action")}</dt>
            <dd>{t("beforeAfter.actionValue")}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 font-mono text-[10px] text-ink-faint">{t("beforeAfter.state")}</dt>
            <dd>{t("beforeAfter.stateValue")}</dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] text-ink-faint">{t("beforeAfter.footer")}</p>
      </div>
    </div>
  );
}
