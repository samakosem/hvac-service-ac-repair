import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Old flat /services/[slug] paths — canonical silo pages exist
          "/services/air-conditioning",
          "/services/ac-services",
          "/services/ac-repair",
          "/services/emergency-ac-repair",
          "/services/ac-installation",
          "/services/ac-replacement",
          "/services/ac-maintenance",
          "/services/ac-tune-up",
          "/services/ductless-mini-split",
          "/services/mini-split-installation",
          "/services/heat-pump-services",
          "/services/heat-pump-repair",
          "/services/heat-pump-installation",
          "/services/heating-services",
          "/services/furnace-repair",
          "/services/furnace-installation",
          "/services/furnace-maintenance",
          "/services/commercial-hvac",
          "/services/commercial-maintenance-plan",
          "/services/air-duct-services",
          "/services/air-duct-cleaning",
          "/services/residential-maintenance-plan",
          // Legacy WordPress marketing URLs
          "/hvac-installation/",
          "/hvac-repair/",
          "/hvac-cleaning/",
          // Internal / non-public paths
          "/api/",
          "/_next/",
        ],
      },
    ],
    sitemap: `${SITE.domain}/sitemap.xml`,
  };
}
