import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
  // favicon.ico, icon.png and apple-icon.png in src/app/ are auto-detected by
  // Next.js App Router. Only the extra PWA sizes below need declaring.
  icons: {
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
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
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TRVN8GDR');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TRVN8GDR"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
