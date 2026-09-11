export function AuditTrailVisual() {
  const events = [
    { t: "22:14", actor: "Officer", action: "Field note captured", ctx: "NL-OBJ-042" },
    { t: "22:16", actor: "AI", action: "Draft suggested", ctx: "Suggestion only" },
    { t: "22:19", actor: "Officer", action: "Draft reviewed", ctx: "Authorized" },
    { t: "22:24", actor: "Supervisor", action: "Record approved", ctx: "Locked" },
  ];

  return (
    <div className="border border-border">
      <div className="border-b border-border-subtle bg-surface/40 px-4 py-2">
        <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
          Conceptual audit trail · illustrative
        </p>
      </div>
      <ol>
        {events.map((e, i) => (
          <li
            key={e.t}
            className={`grid grid-cols-[3.5rem_1fr] gap-3 px-4 py-2.5 text-[12px] ${
              i < events.length - 1 ? "border-b border-border-subtle" : ""
            }`}
          >
            <span className="font-mono text-ink-faint">{e.t}</span>
            <div>
              <p className="text-ink-secondary">
                <span className="text-ink">{e.actor}</span>
                {" · "}
                {e.action}
              </p>
              <p className="font-mono text-[10px] text-ink-faint">{e.ctx}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="border-t border-border-subtle px-4 py-2 text-[11px] text-ink-faint">
        Operational actions leave traceable records. Not a claim of legal immutability.
      </p>
    </div>
  );
}
