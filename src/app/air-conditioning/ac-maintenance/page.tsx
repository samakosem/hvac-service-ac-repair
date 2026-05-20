import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { IMG_MAINTENANCE } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("ac-maintenance");
}

export default function Page() {
  const service = resolveService("ac-maintenance");
  return <ServicePageTemplate service={service} image={IMG_MAINTENANCE} />;
}
