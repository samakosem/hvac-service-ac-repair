import type { Metadata } from "next";
import { buildServiceMetadata, resolveService } from "@/lib/seo/buildServicePage";
import ServicePageTemplate from "@/components/service/ServicePageTemplate";

export async function generateMetadata(): Promise<Metadata> {
  return buildServiceMetadata("residential-maintenance-plan");
}

export default function Page() {
  const service = resolveService("residential-maintenance-plan");
  return <ServicePageTemplate service={service} />;
}
