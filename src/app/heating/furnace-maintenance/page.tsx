import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { IMG_AIR_HANDLER } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("furnace-maintenance");
}

export default function Page() {
  const service = resolveService("furnace-maintenance");
  return <ServicePageTemplate service={service} image={IMG_AIR_HANDLER} />;
}
