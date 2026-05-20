import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { IMG_DUCTLESS } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("ductless-mini-split");
}

export default function Page() {
  const service = resolveService("ductless-mini-split");
  return <ServicePageTemplate service={service} image={IMG_DUCTLESS} />;
}
