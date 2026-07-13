import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config/site";
import { COUNTIES } from "@/lib/config/locations";
import { blogPosts } from "@/lib/content/blog";
import { CITY_SERVICE_MAP } from "@/lib/config/city-service-pages";
import { ALL_PPC_CITIES, PPC_CITIES } from "@/lib/config/ppc-cities";

const base = SITE.domain; // https://www.hvacserviceacrepair.com

type SitemapEntry = MetadataRoute.Sitemap[number];

function url(
  path: string,
  priority: number,
  changeFrequency: SitemapEntry["changeFrequency"] = "monthly",
): SitemapEntry {
  return {
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ── 1. Core pages ────────────────────────────────────────────────────────────
  const corePages: SitemapEntry[] = [
    url("/",                   1.0, "weekly"),
    url("/contact",            0.9, "monthly"),
    url("/about-us",           0.7, "monthly"),
    url("/reviews",            0.7, "monthly"),
    url("/financing",          0.7, "monthly"),
    url("/promotions",         0.7, "monthly"),
    url("/maintenance-plans",  0.8, "monthly"),
    url("/careers",            0.5, "monthly"),
    // Excluded: /thank-you (noindex conversion page), /terms, /privacy-policy (legal, low SEO value)
  ];

  // ── 2. Service silo root pages ────────────────────────────────────────────────
  const serviceRootPages: SitemapEntry[] = [
    url("/services",           0.9, "monthly"),
    url("/air-conditioning",   0.9, "monthly"),
    url("/ductless",           0.8, "monthly"),
    url("/heat-pumps",         0.8, "monthly"),
    url("/heating",            0.8, "monthly"),
    url("/commercial-hvac",    0.8, "monthly"),
    url("/air-duct-services",  0.8, "monthly"),
  ];

  // ── 3. Service sub-pages ──────────────────────────────────────────────────────
  const serviceSubPages: SitemapEntry[] = [
    // Air Conditioning
    url("/air-conditioning/ac-repair",          0.9, "monthly"),
    url("/air-conditioning/ac-installation",    0.9, "monthly"),
    url("/air-conditioning/ac-replacement",     0.8, "monthly"),
    url("/air-conditioning/ac-maintenance",     0.8, "monthly"),
    url("/air-conditioning/ac-tune-up",         0.8, "monthly"),
    url("/air-conditioning/ac-services",        0.7, "monthly"),
    url("/air-conditioning/emergency-ac-repair", 0.9, "monthly"),
    // Ductless
    url("/ductless/ductless-mini-split",        0.9, "monthly"),
    url("/ductless/mini-split-installation",    0.8, "monthly"),
    // Heat Pumps
    url("/heat-pumps/heat-pump-repair",         0.8, "monthly"),
    url("/heat-pumps/heat-pump-installation",   0.8, "monthly"),
    // Heating
    url("/heating/furnace-repair",              0.8, "monthly"),
    url("/heating/furnace-installation",        0.8, "monthly"),
    url("/heating/furnace-maintenance",         0.8, "monthly"),
    // Commercial HVAC
    url("/commercial-hvac/commercial-maintenance-plan", 0.7, "monthly"),
    // Air Duct
    url("/air-duct-services/air-duct-cleaning", 0.8, "monthly"),
    // Maintenance
    url("/maintenance/residential-maintenance-plan", 0.7, "monthly"),
    // Standalone service pages
    url("/ac-not-cooling",         0.8, "monthly"),
    url("/emergency-hvac-service", 0.9, "monthly"),
  ];

  // ── 4. Calculators ───────────────────────────────────────────────────────────
  const calculatorPages: SitemapEntry[] = [
    url("/calculators",                              0.7, "monthly"),
    url("/calculators/ac-size-calculator",           0.7, "monthly"),
    url("/calculators/seer2-savings-calculator",     0.7, "monthly"),
    url("/calculators/repair-vs-replace-calculator", 0.7, "monthly"),
    url("/calculators/maintenance-plan-calculator",  0.7, "monthly"),
  ];

  // ── 5. Service area pages ─────────────────────────────────────────────────────
  const serviceAreaRoot = url("/service-areas", 0.9, "monthly");

  const countyPages: SitemapEntry[] = COUNTIES.map((county) =>
    url(`/service-areas/${county.slug}`, 0.8, "monthly"),
  );

  const cityAreaPages: SitemapEntry[] = COUNTIES.flatMap((county) =>
    county.cities.map((city) =>
      url(`/service-areas/${county.slug}/${city.slug}`, 0.7, "monthly"),
    ),
  );

  // ── 6. City × Service pages ───────────────────────────────────────────────────
  // /air-conditioning/[service]/[city]/ — ac-repair, emergency-ac-repair, ac-tune-up
  const acRepairCityPages: SitemapEntry[] = CITY_SERVICE_MAP["ac-repair"].map((p) =>
    url(`/air-conditioning/ac-repair/${p.citySlug}`, 0.8, "monthly"),
  );

  const emergencyAcCityPages: SitemapEntry[] = CITY_SERVICE_MAP["emergency-ac-repair"].map((p) =>
    url(`/air-conditioning/emergency-ac-repair/${p.citySlug}`, 0.8, "monthly"),
  );

  const acTuneUpCityPages: SitemapEntry[] = CITY_SERVICE_MAP["ac-tune-up"].map((p) =>
    url(`/air-conditioning/ac-tune-up/${p.citySlug}`, 0.7, "monthly"),
  );

  // /heating/heating-repair/[city]/
  const heatingRepairCityPages: SitemapEntry[] = CITY_SERVICE_MAP["heating-repair"].map((p) =>
    url(`/heating/heating-repair/${p.citySlug}`, 0.8, "monthly"),
  );

  // /hvac-repair/[city]/
  const hvacRepairCityPages: SitemapEntry[] = CITY_SERVICE_MAP["hvac-repair"].map((p) =>
    url(`/hvac-repair/${p.citySlug}`, 0.8, "monthly"),
  );

  // ── 7. PPC landing pages ──────────────────────────────────────────────────────
  // Hand-written: /{city}-ac-repair/
  const handwrittenPpcSlugs = new Set(PPC_CITIES.map((c) => c.slug));
  const handwrittenPpcPages: SitemapEntry[] = PPC_CITIES.map((c) =>
    url(`/${c.slug}-ac-repair`, 0.8, "monthly"),
  );

  // Generated: /ac-repair/[city]/  (excludes the 6 hand-written cities)
  const generatedPpcPages: SitemapEntry[] = ALL_PPC_CITIES.filter(
    (c) => !handwrittenPpcSlugs.has(c.slug),
  ).map((c) => url(`/ac-repair/${c.slug}`, 0.8, "monthly"));

  // ── 8. Blog ───────────────────────────────────────────────────────────────────
  const blogIndex = url("/blog", 0.8, "weekly");
  const blogPostPages: SitemapEntry[] = blogPosts.map((post) =>
    url(`/blog/${post.slug}`, 0.7, "monthly"),
  );

  // ── Assemble — deduplicate by URL ─────────────────────────────────────────────
  const all: SitemapEntry[] = [
    ...corePages,
    ...serviceRootPages,
    ...serviceSubPages,
    ...calculatorPages,
    serviceAreaRoot,
    ...countyPages,
    ...cityAreaPages,
    ...acRepairCityPages,
    ...emergencyAcCityPages,
    ...acTuneUpCityPages,
    ...heatingRepairCityPages,
    ...hvacRepairCityPages,
    ...handwrittenPpcPages,
    ...generatedPpcPages,
    blogIndex,
    ...blogPostPages,
  ];

  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
