import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { priorityCityLinks } from "@/lib/config/city-service-links";
import { IMG_AC_REPAIR } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("hvac-repair");
}

export default function Page() {
  const service = resolveService("hvac-repair");
  return <ServicePageTemplate service={service} cityLinks={{ heading: "HVAC Repair by City", links: priorityCityLinks("hvac-repair") }} image={IMG_AC_REPAIR} />;
}
