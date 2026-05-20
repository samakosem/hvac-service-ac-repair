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
};

export default function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems = [{ name: "Home", href: "/" }, ...items];

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
                <span className="text-slate-600 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-hvac-blue-600 hover:text-hvac-blue-500 transition-colors"
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
