import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { priorityCityLinks } from "@/lib/config/city-service-links";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("emergency-ac-repair");
}

export default function Page() {
  const service = resolveService("emergency-ac-repair");
  return <ServicePageTemplate service={service} cityLinks={{ heading: "Emergency AC Repair by City", links: priorityCityLinks("emergency-ac-repair") }} />;
}
