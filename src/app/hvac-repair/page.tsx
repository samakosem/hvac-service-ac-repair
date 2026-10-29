import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { countyCityLinks } from "@/lib/config/city-service-links";
import { IMG_AC_REPAIR } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("hvac-repair");
}

export default function Page() {
  const service = resolveService("hvac-repair");
  return <ServicePageTemplate service={service} cityLinks={{ heading: "HVAC Repair in Orange County Cities", links: countyCityLinks("hvac-repair", "orange-county") }} image={IMG_AC_REPAIR} />;
}
