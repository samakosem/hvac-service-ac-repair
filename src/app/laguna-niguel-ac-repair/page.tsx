import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import PPCLandingTemplate from "@/components/ppc/PPCLandingTemplate";
import { PPC_CITIES } from "@/lib/config/ppc-cities";

const city = PPC_CITIES.find((c) => c.slug === "laguna-niguel")!;

export const metadata: Metadata = buildMetadata({
  title: city.metaTitle,
  description: city.metaDescription,
  path: "/laguna-niguel-ac-repair",
  openGraphImage: city.heroImage.src,
});

export default function LagunaNiguelACRepairPage() {
  return <PPCLandingTemplate city={city} />;
}
