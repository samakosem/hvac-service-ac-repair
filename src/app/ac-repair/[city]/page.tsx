import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import PPCLandingTemplate from "@/components/ppc/PPCLandingTemplate";
import { ALL_PPC_CITIES } from "@/lib/config/ppc-cities";

export const dynamicParams = false;

export function generateStaticParams() {
  // Exclude hand-written cities that already have their own /{city}-ac-repair/ routes
  const handwritten = new Set([
    "pasadena",
    "los-angeles",
    "orange-county",
    "malibu",
    "santa-clarita",
    "laguna-niguel",
  ]);
  return ALL_PPC_CITIES.filter((c) => !handwritten.has(c.slug)).map((c) => ({
    city: c.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const data = ALL_PPC_CITIES.find((c) => c.slug === city);
  if (!data) return {};
  return buildMetadata({
    title: data.metaTitle,
    description: data.metaDescription,
    path: `/ac-repair/${city}/`,
    openGraphImage: data.heroImage.src,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const data = ALL_PPC_CITIES.find((c) => c.slug === city);
  if (!data) notFound();
  return <PPCLandingTemplate city={data} />;
}
