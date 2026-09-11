export function AIBeforeAfter() {
  return (
    <div className="grid gap-px border border-border bg-border-subtle sm:grid-cols-2">
      <div className="bg-bg p-5">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          Unstructured field input
        </p>
        <p className="mt-3 text-[14px] leading-relaxed text-ink-secondary">
          “22:14 north patrol. gate 3 open. secured gate. camera 4 partly blocked
          by vegetation. supervisor informed.”
        </p>
      </div>
      <div className="bg-surface/30 p-5">
        <p className="font-mono text-[9px] uppercase tracking-wide text-ink-faint">
          Structured, reviewable record
        </p>
        <dl className="mt-3 space-y-1.5 text-[13px] text-ink-secondary">
          <div className="flex gap-2">
            <dt className="w-24 font-mono text-[10px] text-ink-faint">Time</dt>
            <dd>22:14</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 font-mono text-[10px] text-ink-faint">Location</dt>
            <dd>NL-OBJ-042 · Gate 3</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 font-mono text-[10px] text-ink-faint">Action</dt>
            <dd>Gate secured · supervisor informed</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-24 font-mono text-[10px] text-ink-faint">State</dt>
            <dd>Awaiting human review</dd>
          </div>
        </dl>
        <p className="mt-3 text-[11px] text-ink-faint">
          AI reduces administrative friction. It does not independently validate facts.
        </p>
      </div>
    </div>
  );
}
