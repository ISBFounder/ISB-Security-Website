import type { Metadata } from "next";
import { Plus_Jakarta_Sans, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/constants";
import { StructuredData } from "@/components/seo/StructuredData";
import {
  organizationJsonLd,
  websiteJsonLd,
  softwareApplicationJsonLd,
} from "@/lib/seo";

/** Display — major headings, hero, editorial statements */
const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

/** Body / UI — navigation, forms, tables, interface */
const fontSans = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

/** Mono — technical labels, status, IDs, architecture metadata */
const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Enterprise Security Operations Software`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "ISB Security Solutions develops ISB Security Platform, a modular security operations platform for reporting, objects, personnel, operational workflows, compliance and AI-assisted reporting.",
  keywords: [
    "Security Operations Platform",
    "Security Management Software",
    "Incident Reporting Software",
    "Security Company Software",
    "AI-Assisted Security Reporting",
    "European Security Software",
    "Operational Security Platform",
    "Enterprise Security Operations Software",
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | Enterprise Security Operations Software`,
    description:
      "ISB Security Solutions develops ISB Security Platform for professional security operations — reporting, objects, personnel, compliance and AI-assisted workflows under human control.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Enterprise Security Operations Software`,
    description:
      "Modular security operations platform under active development for professional security organizations.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE.url },
};

export const viewport = {
  themeColor: "#070809",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <StructuredData
          data={[
            organizationJsonLd(),
            websiteJsonLd(),
            softwareApplicationJsonLd(),
          ]}
        />
        <Header />
        <main id="main-content" className="min-h-screen pt-14 lg:pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
