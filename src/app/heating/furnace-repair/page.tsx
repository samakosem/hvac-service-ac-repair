import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { IMG_FURNACE } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("furnace-repair");
}

export default function Page() {
  const service = resolveService("furnace-repair");
  return <ServicePageTemplate service={service} image={IMG_FURNACE} />;
}
