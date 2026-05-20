import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { SERVICE_AREA_COUNTIES, getCountyBySlug, getCityBySlug } from "@/lib/config/locations";
import { getCityMeta } from "@/lib/content/locations";
import CityPageTemplate from "@/components/location/CityPageTemplate";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_AREA_COUNTIES.flatMap((county) =>
    county.cities.map((city) => ({
      county: county.slug,
      city: city.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ county: string; city: string }>;
}): Promise<Metadata> {
  const { county: countySlug, city: citySlug } = await params;
  const county = getCountyBySlug(countySlug);
  const city = getCityBySlug(citySlug, countySlug);
  if (!county || !city) return {};
  const meta = getCityMeta(city.name, county.name);
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    path: `/service-areas/${countySlug}/${citySlug}`,
  });
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ county: string; city: string }>;
}) {
  const { county: countySlug, city: citySlug } = await params;
  const county = getCountyBySlug(countySlug);
  const city = getCityBySlug(citySlug, countySlug);
  if (!county || !city) notFound();

  return <CityPageTemplate city={city} county={county} />;
}
