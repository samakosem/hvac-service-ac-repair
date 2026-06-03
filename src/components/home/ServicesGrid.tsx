import Link from "next/link";
import SectionWrapper from "@/components/ui/SectionWrapper";
import ServiceCard from "@/components/ui/ServiceCard";
import { FEATURED_SERVICES } from "@/lib/config/services";

export default function ServicesGrid() {
  return (
    <SectionWrapper className="bg-warm-gray">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="section-label section-label-blue mb-4">What We Do</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-4 mb-4">
          Complete HVAC Services for Your Area
        </h2>
        <p className="text-slate-600 leading-relaxed">
          From emergency AC repair to full system installations, ductwork, and commercial HVAC —
          one local team handles it all.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURED_SERVICES.map((service, i) => (
          <div
            key={service.slug}
            className={`animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
          >
            <ServiceCard service={service} variant="light" />
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-hvac-blue-600 text-hvac-blue-600 font-semibold hover:bg-hvac-blue-600 hover:text-white transition-all duration-200 text-sm"
        >
          View All 22 Services
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
        <p className="text-slate-500 text-sm">
          Not sure what you need?{" "}
          <Link href="/contact" className="text-hvac-blue-600 font-semibold hover:underline">
            Describe your issue
          </Link>{" "}
          and we&rsquo;ll diagnose it.
        </p>
      </div>
    </SectionWrapper>
  );
}
