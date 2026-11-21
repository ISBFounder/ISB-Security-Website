"use client";

import { usePathname } from "next/navigation";

const COPY = {
  en: {
    eyebrow: "Error",
    title: "Something went wrong.",
    body: "The application could not recover from this error. You can try again or return home.",
    retry: "Try again",
    home: "Return Home",
    reference: "Reference",
  },
  nl: {
    eyebrow: "Fout",
    title: "Er ging iets mis.",
    body: "De applicatie kon deze fout niet herstellen. U kunt het opnieuw proberen of naar home gaan.",
    retry: "Opnieuw proberen",
    home: "Naar home",
    reference: "Referentie",
  },
} as const;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const lang = pathname?.startsWith("/nl") ? "nl" : "en";
  const copy = COPY[lang];

  return (
    <html lang={lang} className="dark">
      <body
        style={{
          margin: 0,
          background: "#070809",
          color: "#F5F6F4",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <p
            style={{
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#686F78",
              margin: 0,
            }}
          >
            {copy.eyebrow}
          </p>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              margin: "12px 0 0",
              letterSpacing: "-0.02em",
            }}
          >
            {copy.title}
          </h1>
          <p style={{ color: "#A1A7AF", lineHeight: 1.6, marginTop: 16 }}>
            {copy.body}
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                background: "#C6A15B",
                color: "#070809",
                border: "none",
                padding: "10px 18px",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {copy.retry}
            </button>
            <a
              href={lang === "nl" ? "/nl" : "/"}
              style={{
                border: "1px solid #2A3037",
                color: "#F5F6F4",
                padding: "10px 18px",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              {copy.home}
            </a>
          </div>
          {error?.digest ? (
            <p
              style={{
                marginTop: 24,
                fontSize: 11,
                color: "#686F78",
                fontFamily: "ui-monospace, monospace",
              }}
            >
              {copy.reference}: {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
