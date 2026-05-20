import Image from "next/image";
import Link from "next/link";
import { GALLERY_IMAGES } from "@/lib/config/images";

export default function GalleryPreview() {
  const [featured, ...rest] = GALLERY_IMAGES;

  return (
    <section className="py-16 lg:py-24 bg-warm-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="section-label section-label-blue mb-3">Our Work</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3">
              Recent HVAC Jobs in Orange County
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-md">
              Real jobs completed by our team across Orange County, CA.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-hvac-blue-600 text-hvac-blue-600 font-semibold text-sm hover:bg-hvac-blue-600 hover:text-white transition-all duration-200 shrink-0"
          >
            Get a Quote for Your Project
          </Link>
        </div>

        {/* Gallery grid — featured slot spans 2 rows */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4" style={{ gridAutoRows: "200px" }}>
          <div className="col-span-2 lg:col-span-1 row-span-2 relative rounded-xl overflow-hidden">
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 33vw"
              className="object-cover object-center"
              loading="lazy"
            />
          </div>

          {rest.map((img) => (
            <div key={img.src} className="relative rounded-xl overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
                className="object-cover object-center"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 text-sm mt-6">
          Have a project you&rsquo;d like featured?{" "}
          <Link href="/contact" className="text-hvac-blue-600 font-medium hover:underline">
            Let us know
          </Link>.
        </p>
      </div>
    </section>
  );
}
