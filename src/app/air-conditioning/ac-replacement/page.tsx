import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";
import { IMG_AC_INSTALLATION_2 } from "@/lib/config/images";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("ac-replacement");
}

export default function Page() {
  const service = resolveService("ac-replacement");
  return <ServicePageTemplate service={service} image={IMG_AC_INSTALLATION_2} />;
}
