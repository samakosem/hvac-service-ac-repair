import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("ac-services");
}

export default function Page() {
  const service = resolveService("ac-services");
  return <ServicePageTemplate service={service} />;
}
