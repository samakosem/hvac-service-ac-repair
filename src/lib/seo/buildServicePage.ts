import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceContent } from "@/lib/content/services";
import { serviceHref } from "@/lib/config/routes";

/** Shared generateMetadata factory for all service silo routes. */
export async function buildServiceMetadata(slug: string): Promise<Metadata> {
  const service = getServiceContent(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: serviceHref(slug),
  });
}

/** Shared page render — returns service content or calls notFound(). */
export function resolveService(slug: string) {
  const service = getServiceContent(slug);
  if (!service) notFound();
  return service;
}
