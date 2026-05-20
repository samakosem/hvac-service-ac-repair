import Link from "next/link";
import { SERVICE_AREA_COUNTIES } from "@/lib/config/locations";

const OC_CITIES = SERVICE_AREA_COUNTIES[0].cities.slice(0, 12);

export default function ServiceAreaSection() {
  return (
    <section className="py-16 lg:py-24 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: copy */}
          <div className="flex flex-col gap-5">
            <span className="section-label section-label-blue w-fit">Service Area</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
              Based in Yorba Linda —<br />
              Serving All of Orange County
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Our shop is on Yorba Linda Blvd, which puts us within fast drive of virtually every
              Orange County city. We also serve parts of LA, Riverside, and San Bernardino counties
              in our immediate surrounding area.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Most Orange County jobs get a same-day or next-morning appointment. For emergency calls,
              we dispatch immediately regardless of where you are in the county.
            </p>

            {/* Counties covered */}
            <div className="flex flex-wrap gap-2 mt-2">
              {["Orange County", "Los Angeles County (east)", "Riverside County (west)", "San Bernardino County (west)"].map((c) => (
                <span key={c} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-hvac-blue-100 text-hvac-blue-700 border border-hvac-blue-200">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {c}
                </span>
              ))}
            </div>

            <Link
              href="/service-areas"
              className="inline-flex items-center gap-2 text-hvac-blue-600 font-semibold text-sm hover:underline mt-1"
            >
              View all service locations
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Right: city grid */}
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
              Orange County Cities We Serve
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {OC_CITIES.map((city) => (
                <Link
                  key={city.slug}
                  href={`/service-areas/orange-county/${city.slug}`}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 font-medium hover:border-hvac-blue-400 hover:text-hvac-blue-700 transition-colors shadow-sm group"
                >
                  <svg className="w-3 h-3 text-slate-400 group-hover:text-hvac-blue-500 transition-colors shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {city.name}
                </Link>
              ))}
            </div>
            <Link
              href="/service-areas/orange-county"
              className="text-xs text-slate-500 hover:text-hvac-blue-600 transition-colors font-medium"
            >
              + 8 more Orange County cities →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
