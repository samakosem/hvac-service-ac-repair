import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("heat-pump-repair");
}

export default function Page() {
  const service = resolveService("heat-pump-repair");
  return <ServicePageTemplate service={service} />;
}
