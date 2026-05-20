import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/ui/CtaSection";
import { blogPosts, blogCategories } from "@/lib/content/blog";

export const metadata: Metadata = buildMetadata({
  title: "HVAC Tips, Guides & Advice | Orange County, CA",
  description:
    "Practical HVAC articles for Southern California homeowners. AC sizing, repair vs. replacement, energy savings, ductless systems, commercial maintenance, and more from local HVAC experts.",
  path: "/blog",
  openGraphType: "website",
});

const breadcrumbs = [{ name: "Blog", href: "/blog" }];

const categoryColors: Record<string, string> = {
  "AC Tips": "bg-hvac-blue-100 text-hvac-blue-700",
  Maintenance: "bg-green-100 text-green-700",
  Troubleshooting: "bg-red-100 text-red-700",
  "Buying Guide": "bg-purple-100 text-purple-700",
  Commercial: "bg-orange-100 text-orange-700",
  "Energy Savings": "bg-yellow-100 text-yellow-700",
};

export default function BlogIndexPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-mid pt-14 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="text-slate-400 mb-6" />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            HVAC Tips &amp; Guides
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Practical advice for Orange County homeowners. AC sizing, repair decisions,
            energy savings, ductless systems, and more — written by local HVAC technicians.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {blogCategories.map((cat) => (
              <span
                key={cat}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[cat] ?? "bg-slate-100 text-slate-600"}`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-12 bg-warm-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">Featured Article</p>
          <Link
            href={`/blog/${featured.slug}`}
            className="group block bg-white rounded-2xl border border-slate-200 hover:border-hvac-blue-300 hover:shadow-md transition-all overflow-hidden"
          >
            <div className="p-7 sm:p-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[featured.category] ?? "bg-slate-100 text-slate-600"}`}>
                  {featured.category}
                </span>
                <span className="text-xs text-slate-400">{featured.readingTime} min read</span>
                <span className="text-xs text-slate-400">
                  {new Date(featured.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-hvac-blue-700 transition-colors leading-tight">
                {featured.title}
              </h2>
              <p className="text-slate-600 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center gap-1.5 text-hvac-blue-600 font-semibold text-sm mt-1">
                Read Article
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Post grid */}
      <section className="py-14 bg-warm-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-slate-900 mb-7">All Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-hvac-blue-300 hover:shadow-md transition-all p-6 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${categoryColors[post.category] ?? "bg-slate-100 text-slate-600"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readingTime} min</span>
                </div>
                <h2 className="text-base font-bold text-slate-900 group-hover:text-hvac-blue-700 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-1 text-hvac-blue-600 font-semibold text-xs">
                  Read more
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools callout */}
      <section className="py-12 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-hvac-blue-50 border border-hvac-blue-100 p-7 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1">
              <h2 className="text-lg font-bold text-hvac-blue-900">Want numbers, not just advice?</h2>
              <p className="text-sm text-hvac-blue-800 mt-1 leading-relaxed">
                Use our free HVAC calculators to estimate AC size, compare SEER2 savings,
                and decide whether to repair or replace — built for Orange County homes.
              </p>
            </div>
            <Link
              href="/calculators"
              className="shrink-0 px-5 py-3 rounded-xl bg-hvac-blue-700 text-white font-bold text-sm hover:bg-hvac-blue-600 transition-colors"
            >
              Open Calculators →
            </Link>
          </div>
        </div>
      </section>

      <CtaSection
        heading="Questions? Talk to a Local HVAC Expert"
        subtext="Our technicians serve all of Orange County. Get honest advice and a free in-home estimate on any AC or heating service."
        primaryLabel="Request a Free Estimate"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
