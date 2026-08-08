export default function Loading() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
        ISB Security Solutions
      </p>
      <div
        className="h-px w-32 overflow-hidden bg-border"
        aria-hidden
      >
        <div className="h-full w-1/2 animate-pulse bg-gold/60" />
      </div>
      <p className="text-[13px] text-ink-muted">Loading</p>
    </div>
  );
}
