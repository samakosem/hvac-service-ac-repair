import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Legacy URLs that 308-redirect are deliberately NOT disallowed: Googlebot
        // must be able to fetch them to see the redirect and consolidate signals.
        // /_next/ is not disallowed either: it holds the JS/CSS Google needs to render.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
  };
}
