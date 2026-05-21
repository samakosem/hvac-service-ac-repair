import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config/site";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyMobileCta from "@/components/ui/StickyMobileCta";
import FloatingCallButton from "@/components/ui/FloatingCallButton";
import JsonLd from "@/components/ui/JsonLd";
import { schemaWebSite } from "@/lib/seo/schema";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: `AC Repair & HVAC Service in Orange County, CA | ${SITE.name}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Professional AC repair, installation, and HVAC maintenance across Orange County, CA. Same-day service. Call (714) 410-2784.",
  metadataBase: new URL(SITE.domain),
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
  },
  other: {
    "geo.region": "US-CA",
    "geo.placename": "Yorba Linda",
    "geo.position": `${SITE.geo.lat};${SITE.geo.lng}`,
    "ICBM": `${SITE.geo.lat}, ${SITE.geo.lng}`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <JsonLd data={schemaWebSite()} />
        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCta />
        <FloatingCallButton />
      </body>
    </html>
  );
}
