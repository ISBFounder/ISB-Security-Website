export function ArchitectureDiagram() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border border-border bg-surface/40 p-6">
        <p className="label mb-4">Operational hierarchy</p>
        <div className="font-mono text-[13px] leading-8 text-ink-secondary">
          <p className="text-gold">ORGANIZATION</p>
          <p className="pl-3">↓ Customers</p>
          <p className="pl-6">↓ Objects</p>
          <p className="pl-9">↓ Buildings → Floors → Zones → Rooms</p>
          <p className="pl-9">↓ Posts · Checkpoints · Assets</p>
        </div>
      </div>
      <div className="border border-border bg-surface/40 p-6">
        <p className="label mb-4">Identity hierarchy</p>
        <div className="font-mono text-[13px] leading-8 text-ink-secondary">
          <p className="text-gold">USERS</p>
          <p className="pl-3">↓ Roles</p>
          <p className="pl-6">↓ Permissions</p>
          <p className="pl-3">↓ Teams</p>
          <p className="pl-3">↓ Qualifications → Assignments</p>
        </div>
      </div>
      <div className="border border-border bg-surface/40 p-6 lg:col-span-2">
        <p className="label mb-4">Platform engines</p>
        <div className="flex flex-wrap gap-2">
          {[
            "Reporting Engine",
            "Notification Engine",
            "Audit Layer",
            "Realtime Layer",
            "Offline Layer",
            "API Layer",
            "AI Assistance",
          ].map((e) => (
            <span
              key={e}
              className="border border-border bg-bg px-3 py-1.5 font-mono text-[11px] text-ink-secondary"
            >
              {e}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          Both hierarchies intersect through operational workflows — reports, patrols,
          escalations and assignments always carry organization, object and user context.
        </p>
      </div>
    </div>
  );
}
