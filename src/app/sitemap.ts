import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config/site";
import { SERVICE_ROUTES } from "@/lib/config/routes";
import { SERVICE_AREA_COUNTIES } from "@/lib/config/locations";
import { blogPosts } from "@/lib/content/blog";

const base = SITE.domain;

type SitemapEntry = MetadataRoute.Sitemap[number];

function url(
  path: string,
  priority: number,
  changeFrequency: SitemapEntry["changeFrequency"] = "monthly"
): SitemapEntry {
  return {
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── Static core pages ────────────────────────────────────────────────────
  const corePages: SitemapEntry[] = [
    url("/",               1.0, "weekly"),
    url("/contact",        0.9, "monthly"),
    url("/about-us",       0.7, "monthly"),
    url("/reviews",        0.7, "monthly"),
    url("/financing",      0.7, "monthly"),
    url("/promotions",     0.7, "monthly"),
    url("/maintenance-plans", 0.8, "monthly"),
    url("/careers",        0.5, "monthly"),
  ];

  // ── Service silo pages ───────────────────────────────────────────────────
  // Use SERVICE_ROUTES as source-of-truth; deduplicate by path value.
  const servicePaths = [...new Set(Object.values(SERVICE_ROUTES))];
  const servicePages: SitemapEntry[] = servicePaths.map((path) => {
    // Silo roots get higher priority
    const isRoot = path.split("/").length === 2; // e.g. /air-conditioning
    return url(path, isRoot ? 0.9 : 0.8, "monthly");
  });

  // ── Service area pages ───────────────────────────────────────────────────
  const serviceAreaRoot = url("/service-areas", 0.8, "monthly");

  const countyPages: SitemapEntry[] = SERVICE_AREA_COUNTIES.map((county) =>
    url(`/service-areas/${county.slug}`, 0.7, "monthly")
  );

  const cityPages: SitemapEntry[] = SERVICE_AREA_COUNTIES.flatMap((county) =>
    county.cities.map((city) =>
      url(`/service-areas/${county.slug}/${city.slug}`, 0.6, "monthly")
    )
  );

  // ── Calculator pages ─────────────────────────────────────────────────────
  const calculatorPages: SitemapEntry[] = [
    url("/calculators",                               0.8, "monthly"),
    url("/calculators/ac-size-calculator",            0.7, "monthly"),
    url("/calculators/seer2-savings-calculator",      0.7, "monthly"),
    url("/calculators/repair-vs-replace-calculator",  0.7, "monthly"),
    url("/calculators/maintenance-plan-calculator",   0.7, "monthly"),
  ];

  // ── Blog pages ───────────────────────────────────────────────────────────
  const blogIndex = url("/blog", 0.8, "weekly");
  const blogPostPages: SitemapEntry[] = blogPosts.map((post) =>
    url(`/blog/${post.slug}`, 0.7, "monthly")
  );

  return [
    ...corePages,
    ...servicePages,
    serviceAreaRoot,
    ...countyPages,
    ...cityPages,
    ...calculatorPages,
    blogIndex,
    ...blogPostPages,
  ];
}
