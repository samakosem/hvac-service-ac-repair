import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { getLocalHvacPage, getAllLocalHvacParams } from "@/lib/config/city-service-pages";
import CityServicePageTemplate from "@/components/city-service/CityServicePageTemplate";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllLocalHvacParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const page = getLocalHvacPage(city);
  if (!page) return {};
  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/hvac-repair/${page.citySlug}/`,
  });
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const page = getLocalHvacPage(city);
  if (!page) notFound();
  return <CityServicePageTemplate page={page} />;
}
