import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Thank You — Request Received",
  description: "We received your request and will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg
            className="w-10 h-10 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">Request Received!</h1>
          <p className="mt-3 text-slate-600 text-lg">
            Thank you for reaching out. Our team will contact you shortly to schedule your service.
          </p>
        </div>

        <div className="bg-slate-100 rounded-xl p-6 w-full text-left">
          <p className="font-semibold text-slate-800 mb-1">Need immediate help?</p>
          <p className="text-slate-600 text-sm mb-3">
            For same-day or emergency service, call us directly:
          </p>
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex items-center gap-2 bg-hvac-blue-600 hover:bg-hvac-blue-700 text-white font-bold px-5 py-3 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {SITE.phoneDisplay}
          </a>
        </div>

        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-slate-700 underline transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
