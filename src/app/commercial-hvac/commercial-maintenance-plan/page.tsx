import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { IMG_COMMERCIAL_SECONDARY } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("commercial-maintenance-plan");
}

export default function Page() {
  const service = resolveService("commercial-maintenance-plan");
  return <ServicePageTemplate service={service} image={IMG_COMMERCIAL_SECONDARY} />;
}
