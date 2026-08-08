import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt =
  "ISB Security Solutions — Enterprise Security Operations Software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  let logoSrc: string | null = null;
  try {
    const buf = await readFile(
      join(process.cwd(), "public", "logo.jpg")
    );
    logoSrc = `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    logoSrc = null;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070809",
          backgroundImage:
            "linear-gradient(135deg, #070809 0%, #0D0F12 50%, #14171B 100%)",
          padding: "56px 64px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoSrc}
              width={72}
              height={72}
              style={{ objectFit: "contain" }}
              alt=""
            />
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div
              style={{
                color: "#F5F6F4",
                fontSize: 28,
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              ISB Security Solutions
            </div>
            <div
              style={{
                color: "#A1A7AF",
                fontSize: 16,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Tilburg · The Netherlands
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              color: "#F5F6F4",
              fontSize: 48,
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Enterprise Security Operations Software
          </div>
          <div
            style={{
              color: "#A1A7AF",
              fontSize: 22,
              lineHeight: 1.4,
              maxWidth: 820,
            }}
          >
            Modular platform for reporting, objects, personnel, operational
            workflows and AI-assisted reporting under human control.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              color: "#C6A15B",
              fontSize: 14,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Platform development active
          </div>
          <div style={{ color: "#686F78", fontSize: 16 }}>
            isbsecuritysolutions.nl
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
