import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { priorityCityLinks } from "@/lib/config/city-service-links";
import { IMG_FURNACE } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("heating-services");
}

export default function Page() {
  const service = resolveService("heating-services");
  return <ServicePageTemplate service={service} cityLinks={{ heading: "Heating Repair by City", links: priorityCityLinks("heating-repair") }} image={IMG_FURNACE} />;
}
