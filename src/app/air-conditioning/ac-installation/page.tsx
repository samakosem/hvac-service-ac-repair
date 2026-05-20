import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { IMG_AC_INSTALLATION } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("ac-installation");
}

export default function Page() {
  const service = resolveService("ac-installation");
  return <ServicePageTemplate service={service} image={IMG_AC_INSTALLATION} />;
}
