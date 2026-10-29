import Link from "next/link";
import { schemaBreadcrumb } from "@/lib/seo/schema";
import JsonLd from "@/components/ui/JsonLd";

type BreadcrumbItem = {
  name: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
  /** "dark" for dark hero backgrounds (higher-contrast link and current-page colors). */
  tone?: "light" | "dark";
};

const TONES = {
  light: {
    link: "text-hvac-blue-600 hover:text-hvac-blue-500 transition-colors",
    current: "text-slate-600 font-medium",
  },
  dark: {
    link: "text-slate-200 hover:text-white underline underline-offset-2 decoration-white/30 transition-colors",
    current: "text-white font-medium",
  },
} as const;

export default function Breadcrumbs({ items, className = "", tone = "light" }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", href: "/" }, ...items];
  const colors = TONES[tone];

  return (
    <>
      <JsonLd data={schemaBreadcrumb(allItems)} />
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center gap-1.5 text-sm flex-wrap ${className}`}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <span key={item.href} className="flex items-center gap-1.5">
              {index > 0 && (
                <svg
                  className="w-3.5 h-3.5 text-slate-400 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              )}
              {isLast ? (
                <span className={colors.current} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={colors.link}
                >
                  {item.name}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
