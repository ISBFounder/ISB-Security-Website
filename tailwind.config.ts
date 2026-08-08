import type { Config } from "tailwindcss";

/**
 * ISB Security Solutions — Enterprise design tokens
 * Institutional · Architectural · Restrained gold accent
 */
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#070809",
          secondary: "#0D0F12",
          tertiary: "#111418",
        },
        surface: {
          DEFAULT: "#14171B",
          elevated: "#1B1F24",
          gunmetal: "#22272D",
        },
        border: {
          DEFAULT: "#2A3037",
          subtle: "#1E2329",
          strong: "#3A424C",
        },
        ink: {
          DEFAULT: "#F5F6F4",
          secondary: "#A1A7AF",
          muted: "#686F78",
          faint: "#4E555E",
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#E1C17A",
          dark: "#80672F",
          muted: "rgba(198, 161, 91, 0.12)",
        },
        status: {
          success: "#63D58A",
          warning: "#E4B45F",
          critical: "#D96C6C",
        },
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "var(--font-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        /* Technical / caption */
        caption: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
        /* Technical label (mono uppercase) */
        label: ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.12em" }],
        /* Small body */
        sm: ["0.8125rem", { lineHeight: "1.55" }],
        /* Body */
        base: ["0.9375rem", { lineHeight: "1.65" }],
        /* Body large */
        lg: ["1.0625rem", { lineHeight: "1.65" }],
        /* H4 */
        h4: ["1.125rem", { lineHeight: "1.4", letterSpacing: "-0.015em" }],
        /* H3 */
        h3: ["1.375rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        /* H2 */
        h2: ["1.75rem", { lineHeight: "1.2", letterSpacing: "-0.025em" }],
        /* H1 */
        h1: ["2.25rem", { lineHeight: "1.12", letterSpacing: "-0.03em" }],
        /* Display L */
        "display-l": ["2.75rem", { lineHeight: "1.08", letterSpacing: "-0.035em" }],
        /* Display XL */
        "display-xl": ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.025em",
        wide: "0.08em",
        wider: "0.12em",
      },
      spacing: {
        /* Design rhythm extras */
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        content: "1120px",
        wide: "1280px",
        narrow: "680px",
        prose: "65ch",
        text: "40rem",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
        lg: "6px",
        /* Intentionally no xl/2xl in default usage */
      },
      boxShadow: {
        panel: "0 1px 0 rgba(255,255,255,0.03) inset, 0 1px 2px rgba(0,0,0,0.35)",
        elevated: "0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 16px rgba(0,0,0,0.4)",
        none: "none",
      },
      gap: {
        section: "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
