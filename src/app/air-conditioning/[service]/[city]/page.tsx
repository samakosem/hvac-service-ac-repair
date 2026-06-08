import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCityServicePage, getAllCityServiceParams } from "@/lib/config/city-service-pages";
import CityServicePageTemplate from "@/components/city-service/CityServicePageTemplate";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCityServiceParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}): Promise<Metadata> {
  const { service, city } = await params;
  const page = getCityServicePage(service, city);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `${page.urlBase}/${page.citySlug}/`,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ service: string; city: string }>;
}) {
  const { service, city } = await params;
  const page = getCityServicePage(service, city);
  if (!page) notFound();
  const isEmergency = service === "emergency-ac-repair";
  return <CityServicePageTemplate page={page} isEmergency={isEmergency} />;
}
