import { getTranslations } from "next-intl/server";

type Actor = "officer" | "ai" | "supervisor";

type Event = {
  time: string;
  actor: Actor;
  action: string;
  ctx: string;
};

export async function AuditTrailVisual() {
  const t = await getTranslations("security");
  const events = t.raw("audit.events") as Event[];

  return (
    <div className="border border-border">
      <div className="border-b border-border-subtle bg-surface/40 px-4 py-2">
        <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
          {t("audit.title")}
        </p>
      </div>
      <ol>
        {events.map((e, i) => (
          <li
            key={e.time}
            className={`grid grid-cols-[3.5rem_1fr] gap-3 px-4 py-2.5 text-[12px] ${
              i < events.length - 1 ? "border-b border-border-subtle" : ""
            }`}
          >
            <span className="font-mono text-ink-faint">{e.time}</span>
            <div>
              <p className="text-ink-secondary">
                <span className={e.actor === "supervisor" ? "text-gold" : "text-ink"}>
                  {t(`audit.actors.${e.actor}`)}
                </span>
                {" · "}
                {e.action}
              </p>
              <p className="font-mono text-[10px] text-ink-faint">{e.ctx}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="border-t border-border-subtle px-4 py-2 text-[11px] text-ink-faint">
        {t("audit.footer")}
      </p>
    </div>
  );
}
