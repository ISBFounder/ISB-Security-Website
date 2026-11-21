import { getLocale } from "next-intl/server";
import localFont from "next/font/local";
import "./globals.css";

const fontDisplay = localFont({
  src: "../fonts/plus-jakarta-sans-latin.woff2",
  weight: "500 700",
  display: "swap",
  variable: "--font-display",
});

const fontSans = localFont({
  src: "../fonts/ibm-plex-sans-latin.woff2",
  weight: "400 600",
  display: "swap",
  variable: "--font-sans",
});

const fontMono = localFont({
  src: [
    {
      path: "../fonts/ibm-plex-mono-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ibm-plex-mono-500.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-mono",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className="dark">
      <body className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
