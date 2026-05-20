import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { IMG_DUCTLESS } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("mini-split-installation");
}

export default function Page() {
  const service = resolveService("mini-split-installation");
  return <ServicePageTemplate service={service} image={IMG_DUCTLESS} />;
}
