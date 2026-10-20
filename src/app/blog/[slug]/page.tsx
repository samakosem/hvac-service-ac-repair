import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { schemaBlogPosting, schemaFaqPage } from "@/lib/seo/schema";
import JsonLd from "@/components/ui/JsonLd";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import CtaSection from "@/components/ui/CtaSection";
import { blogPosts, getBlogPost } from "@/lib/content/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    openGraphType: "article",
  });
}

const categoryColors: Record<string, string> = {
  "AC Tips": "bg-hvac-blue-100 text-hvac-blue-700",
  Maintenance: "bg-green-100 text-green-700",
  Troubleshooting: "bg-red-100 text-red-700",
  "Buying Guide": "bg-purple-100 text-purple-700",
  Commercial: "bg-orange-100 text-orange-700",
  "Energy Savings": "bg-yellow-100 text-yellow-700",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const breadcrumbs = [
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={schemaBlogPosting({
          title: post.title,
          excerpt: post.excerpt,
          slug: post.slug,
          date: post.date,
          author: post.author,
        })}
      />
      {post.faqs.length > 0 && <JsonLd data={schemaFaqPage(post.faqs)} />}

      {/* Hero */}
      <section className="bg-brand-mid pt-14 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} className="text-slate-400 mb-6" />
          <div className="flex items-center gap-3 flex-wrap mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[post.category] ?? "bg-slate-100 text-slate-600"}`}>
              {post.category}
            </span>
            <span className="text-xs text-slate-400">{post.readingTime} min read</span>
            <time className="text-xs text-slate-400" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
            {post.excerpt}
          </p>
          <p className="mt-3 text-xs text-slate-500">By {post.author}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article body */}
        <article className="flex flex-col gap-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 leading-snug">
                {section.heading}
              </h2>
              <div className="prose prose-slate prose-sm sm:prose max-w-none">
                {section.body.split("\n\n").map((para, i) => {
                  if (para.startsWith("•")) {
                    const items = para.split("\n").filter((l) => l.startsWith("•"));
                    return (
                      <ul key={i} className="list-none pl-0 flex flex-col gap-2 my-4">
                        {items.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-slate-700 text-sm sm:text-base leading-relaxed">
                            <span className="text-hvac-blue-500 mt-1 shrink-0">•</span>
                            <span dangerouslySetInnerHTML={{ __html: item.replace(/^•\s*/, "").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-slate-700 text-sm sm:text-base leading-relaxed mb-4"
                      dangerouslySetInnerHTML={{
                        __html: para.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
                      }}
                    />
                  );
                })}
              </div>
            </section>
          ))}
        </article>

        {/* Disclaimer */}
        <div className="mt-10 rounded-xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-800 leading-relaxed">
          <strong>Disclaimer:</strong> This article provides general information for educational
          purposes. It is not a substitute for an in-person inspection or professional assessment
          by a licensed HVAC technician. Conditions vary by home and system — always consult a
          qualified professional before making repair or replacement decisions.
        </div>

        {/* Related services */}
        {post.relatedServices.length > 0 && (
          <div className="mt-10">
            <h2 className="text-base font-bold text-slate-700 mb-4">Related Services</h2>
            <div className="flex flex-wrap gap-3">
              {post.relatedServices.map((svc) => (
                <Link
                  key={svc.href}
                  href={svc.href}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-hvac-blue-600 hover:border-hvac-blue-300 transition-colors font-medium"
                >
                  {svc.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Inline CTA */}
        <div className="mt-10 rounded-2xl bg-hvac-blue-700 p-8 text-center flex flex-col items-center gap-4">
          <h2 className="text-xl font-bold text-white leading-tight">
            Ready to schedule service in Orange County?
          </h2>
          <p className="text-white/80 text-sm leading-relaxed max-w-md">
            Get a free in-home estimate. Our technicians cover all of Orange County —
            same-day availability on most calls.
          </p>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white text-hvac-blue-700 font-bold text-sm hover:bg-slate-100 transition-colors"
          >
            Request a Free Estimate
          </Link>
        </div>

        {/* FAQ */}
        {post.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col divide-y divide-slate-100">
              {post.faqs.map((faq) => (
                <details key={faq.question} className="py-4 group">
                  <summary className="text-slate-900 font-semibold text-base cursor-pointer list-none flex items-center justify-between gap-3">
                    {faq.question}
                    <svg className="w-4 h-4 text-slate-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* More articles */}
      {otherPosts.length > 0 && (
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-slate-900 mb-6">More HVAC Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {otherPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-white rounded-xl border border-slate-200 hover:border-hvac-blue-300 transition-all p-5 flex flex-col gap-3"
                >
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold w-fit ${categoryColors[p.category] ?? "bg-slate-100 text-slate-600"}`}>
                    {p.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-hvac-blue-700 transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-hvac-blue-600 font-semibold mt-auto">
                    Read →
                  </p>
                </Link>
              ))}
            </div>
            <div className="mt-6">
              <Link href="/blog" className="text-sm text-hvac-blue-600 font-semibold hover:text-hvac-blue-500 transition-colors">
                ← View all articles
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaSection
        heading="Need Help from a Local HVAC Technician?"
        subtext="We serve all of Orange County. Free estimates on AC repair, installation, and replacement — call or request online."
        primaryLabel="Request a Free Estimate"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
