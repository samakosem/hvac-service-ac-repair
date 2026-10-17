import type { Metadata } from "next";
import { SITE } from "@/lib/config/site";

// Real photo available — Lennox condenser install, Orange County residential job.
// Swap for a purpose-built 1200×630 branded graphic when one is ready.
const OG_DEFAULT = "/uploads/ac-unit-installation (4).jpeg";
const HAS_OG_IMAGE = true;

/**
 * Strips a trailing slash so canonicals match the URLs Next.js actually serves
 * (trailingSlash is off: "/foo/" 308-redirects to "/foo"). Root stays "".
 */
export function canonicalPath(path: string): string {
  return path.length > 1 ? path.replace(/\/+$/, "") : "";
}

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
  const url = `${SITE.domain}${canonicalPath(path)}`;
  const fullTitle = `${title} | ${SITE.name}`;

  // Use explicitly passed image, or fall back to default only if the file exists
  const resolvedImage = openGraphImage ?? (HAS_OG_IMAGE ? OG_DEFAULT : undefined);

  return {
    // absolute: the root layout's title.template would otherwise append SITE.name a second time
    title: { absolute: fullTitle },
    description,
    metadataBase: new URL(SITE.domain),
    alternates: {
      canonical: url,
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      type: openGraphType,
      url,
      title: fullTitle,
      description,
      siteName: SITE.name,
      ...(resolvedImage && {
        images: [{ url: resolvedImage, alt: title }],
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
