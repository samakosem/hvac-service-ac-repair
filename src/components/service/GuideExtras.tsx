import Link from "next/link";
import RichText from "@/components/ui/RichText";
import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";
import type { GuideSection } from "@/lib/content/services";

/** Symptom cards, lists and an optional call-to-action for a guide section. */
export function GuideExtras({ section }: { section: GuideSection }) {
  return (
    <>
      {section.symptoms && section.symptoms.length > 0 && (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 list-none p-0">
          {section.symptoms.map((s) => (
            <li key={s.symptom} className="rounded-xl border border-slate-200 bg-warm-white p-5">
              <h3 className="font-bold text-slate-900 mb-2">{s.symptom}</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold text-slate-900">Common causes: </span>
                {s.causes}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed mt-2">
                <span className="font-semibold text-slate-900">What you can check: </span>
                {s.check}
              </p>
            </li>
          ))}
        </ul>
      )}

      {section.lists?.map((list) => (
        <div
          key={list.title}
          className={`rounded-xl border p-5 mt-6 ${list.tone === "alert" ? "border-red-200 bg-red-50" : "border-slate-200 bg-warm-white"}`}
        >
          <h3 className={`font-bold mb-3 ${list.tone === "alert" ? "text-red-800" : "text-slate-900"}`}>{list.title}</h3>
          <ul className="flex flex-col gap-2 list-disc pl-5 marker:text-slate-400">
            {list.items.map((item, i) => (
              <li key={i} className="text-sm text-slate-700 leading-relaxed">
                <RichText text={item} />
              </li>
            ))}
          </ul>
        </div>
      ))}

      {section.cta && (
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <PhoneLink
            className="inline-flex items-center justify-center gap-2.5 min-h-12 px-6 py-3 bg-red-500 text-white font-bold rounded-xl shadow-md hover:bg-red-600 active:scale-[0.98] transition-all text-base"
            showIcon
            label={`Call ${SITE.phoneDisplay}`}
          />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-12 px-6 py-3 rounded-xl border border-slate-300 text-slate-800 font-semibold hover:bg-slate-50 transition-colors text-base"
          >
            Request Service Online
          </Link>
        </div>
      )}
    </>
  );
}

/** Full guide: heading, paragraphs, then extras. Used by the pages that render service.guideSections. */
export function GuideSections({ sections, label }: { sections: GuideSection[]; label: string }) {
  return (
    <section className="py-14 lg:py-20 bg-white" aria-label={label}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-4">{section.heading}</h2>
            <div className="flex flex-col gap-4">
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-slate-700 leading-relaxed">
                  <RichText text={paragraph} />
                </p>
              ))}
            </div>
            <GuideExtras section={section} />
          </div>
        ))}
      </div>
    </section>
  );
}
