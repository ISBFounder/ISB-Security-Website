import Link from "next/link";

export function OsContinuity({
  steps,
}: {
  steps: { label: string; href?: string }[];
}) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
      {steps.map((s, i) => (
        <span key={s.label}>
          {i > 0 && (
            <span className="mx-2 text-ink-faint/60" aria-hidden>
              →
            </span>
          )}
          {s.href ? (
            <Link href={s.href} className="text-ink-muted hover:text-gold">
              {s.label}
            </Link>
          ) : (
            <span className="text-ink-muted">{s.label}</span>
          )}
        </span>
      ))}
    </p>
  );
}
