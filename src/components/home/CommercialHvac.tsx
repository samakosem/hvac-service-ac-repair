import Link from "next/link";
import Image from "next/image";
import { IMG_COMMERCIAL_PRIMARY } from "@/lib/config/images";

const COMMERCIAL_SERVICES = [
  { label: "Rooftop Unit (RTU) service & repair", icon: "🏢" },
  { label: "Multi-zone split system installation", icon: "🔀" },
  { label: "Preventive maintenance contracts", icon: "📋" },
  { label: "Emergency commercial repair", icon: "⚡" },
  { label: "Restaurant & food service HVAC", icon: "🍽️" },
  { label: "Retail & office park service", icon: "🏬" },
];

export default function CommercialHvac() {
  return (
    <section className="py-16 lg:py-24 bg-section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: media */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ aspectRatio: "16/10" }}>
              <Image
                src={IMG_COMMERCIAL_PRIMARY.src}
                alt={IMG_COMMERCIAL_PRIMARY.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right: copy */}
          <div className="order-1 lg:order-2 flex flex-col gap-5">
            <span className="section-label section-label-white w-fit">Commercial HVAC</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Orange County Businesses Rely on Us for HVAC
            </h2>
            <p className="text-slate-400 leading-relaxed">
              From single-unit offices to multi-tenant retail centers, we provide commercial HVAC service
              built around your schedule and your tenants. Fast response, clear communication, and
              maintenance programs that reduce costly emergency calls.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              {COMMERCIAL_SERVICES.map((svc) => (
                <li
                  key={svc.label}
                  className="flex items-center gap-2.5 text-sm text-slate-300 px-4 py-3 rounded-xl bg-white/5 border border-white/8"
                >
                  <span aria-hidden="true">{svc.icon}</span>
                  {svc.label}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Link
                href="/commercial-hvac"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Commercial HVAC Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/8 text-white font-semibold text-sm border border-white/15 hover:bg-white/14 transition-colors"
              >
                Request a Commercial Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
