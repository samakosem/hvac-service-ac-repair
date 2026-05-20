import Link from "next/link";
import type { Service } from "@/lib/config/services";
import { serviceHref } from "@/lib/config/routes";

const ICON_MAP: Record<string, React.ReactNode> = {
  wrench: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  ),
  install: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  ),
  checkmark: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  split: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
  ),
  building: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  duct: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
  ),
  default: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-5.197-5.197" />
    </svg>
  ),
};

const CATEGORY_COLORS: Record<string, string> = {
  cooling: "bg-hvac-blue-100 text-hvac-blue-600",
  heating: "bg-orange-50 text-orange-600",
  ductwork: "bg-slate-100 text-slate-600",
  commercial: "bg-purple-50 text-purple-600",
  specialty: "bg-emerald-50 text-emerald-600",
};

type ServiceCardProps = {
  service: Service;
  variant?: "dark" | "light";
};

export default function ServiceCard({ service, variant = "dark" }: ServiceCardProps) {
  const isDark = variant === "dark";
  const icon = ICON_MAP[service.icon] ?? ICON_MAP.default;
  const iconBg = isDark
    ? "bg-hvac-blue-600/15 text-hvac-blue-400 group-hover:bg-hvac-blue-600/28 group-hover:text-hvac-blue-300"
    : (CATEGORY_COLORS[service.category] ?? CATEGORY_COLORS.cooling) + " group-hover:scale-110";

  return (
    <Link
      href={serviceHref(service.slug)}
      className={`group relative service-card-accent flex flex-col gap-4 p-6 rounded-2xl overflow-hidden transition-all duration-250 ${
        isDark
          ? "card-navy hover:shadow-glow-blue"
          : "card-white"
      }`}
    >
      {/* Icon */}
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ${iconBg}`}>
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1">
        <h3 className={`font-bold text-base mb-1.5 ${isDark ? "text-white" : "text-slate-900"}`}>
          {service.shortTitle}
        </h3>
        <p className={`text-sm leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}>
          {service.tagline}
        </p>
      </div>

      {/* Arrow CTA */}
      <div className={`flex items-center gap-1.5 text-xs font-semibold mt-auto ${isDark ? "text-hvac-blue-400" : "text-hvac-blue-600"}`}>
        Learn more
        <svg
          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </div>
    </Link>
  );
}
