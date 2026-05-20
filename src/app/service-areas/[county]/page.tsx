import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SERVICE_AREA_COUNTIES, getCountyBySlug } from "@/lib/config/locations";
import { COUNTY_FAQS, COUNTY_META } from "@/lib/content/locations";
import CountyPageTemplate from "@/components/location/CountyPageTemplate";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_AREA_COUNTIES.map((c) => ({ county: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string }>;
}): Promise<Metadata> {
  const { county: countySlug } = await params;
  const meta = COUNTY_META[countySlug];
  if (!meta) return {};
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/service-areas/${countySlug}`,
  });
}

export default async function CountyPage({
  params,
}: {
  params: Promise<{ county: string }>;
}) {
  const { county: countySlug } = await params;
  const county = getCountyBySlug(countySlug);
  const faqs = COUNTY_FAQS[countySlug];
  if (!county || !faqs) notFound();

  return <CountyPageTemplate county={county} faqs={faqs} />;
}
