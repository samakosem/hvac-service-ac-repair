import type { Metadata } from "next";
import { SITE } from "@/lib/config/site";

// Real photo available — Lennox condenser install, Orange County residential job.
// Swap for a purpose-built 1200×630 branded graphic when one is ready.
const OG_DEFAULT = "/uploads/ac-unit-installation (4).jpeg";
const HAS_OG_IMAGE = true;

type BuildMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  openGraphType?: "website" | "article";
  openGraphImage?: string;
};

export function buildMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  openGraphType = "website",
  openGraphImage,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE.domain}${path}`;
  const fullTitle = `${title} | ${SITE.name}`;

  // Use explicitly passed image, or fall back to default only if the file exists
  const resolvedImage = openGraphImage ?? (HAS_OG_IMAGE ? OG_DEFAULT : undefined);

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(SITE.domain),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: openGraphType,
      url,
      title: fullTitle,
      description,
      siteName: SITE.name,
      ...(resolvedImage && {
        images: [{ url: resolvedImage, width: 1200, height: 630, alt: title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(resolvedImage && { images: [resolvedImage] }),
    },
  };
}

export function buildPageTitle(segments: string[]): string {
  return [...segments, SITE.name].join(" | ");
}
