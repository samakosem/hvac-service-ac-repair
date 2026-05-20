type ReviewCardProps = {
  author: string;
  location: string;
  rating: number;
  text: string;
  service?: string;
  date?: string;
  source?: "google" | "yelp";
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-copper-400" : "text-slate-300"}`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
        </svg>
      ))}
    </div>
  );
}

const SOURCE_ICONS: Record<string, React.ReactNode> = {
  google: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  ),
  yelp: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.16 12.594l-4.995 1.433c-.96.276-1.74-.8-1.176-1.63l2.905-4.308a1.072 1.072 0 0 1 1.596-.206 9.24 9.24 0 0 1 3.032 4.285c.188.593-.172 1.22-.776 1.352l-.586.074z" />
    </svg>
  ),
};

export default function ReviewCard({
  author,
  location,
  rating,
  text,
  service,
  date,
  source = "google",
}: ReviewCardProps) {
  return (
    <article className="glass rounded-2xl p-6 flex flex-col gap-4 border border-white/8 hover:border-white/15 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <StarRating rating={rating} />
          {service && (
            <span className="text-xs text-hvac-blue-400 font-medium">{service}</span>
          )}
        </div>
        <span className="text-slate-400">{SOURCE_ICONS[source]}</span>
      </div>

      <blockquote className="text-sm text-slate-200 leading-relaxed flex-1">
        &ldquo;{text}&rdquo;
      </blockquote>

      <footer className="flex items-center justify-between gap-2 pt-3 border-t border-white/8">
        <div>
          <cite className="not-italic text-sm font-semibold text-white block">
            {author}
          </cite>
          <span className="text-xs text-slate-400">{location}</span>
        </div>
        {date && (
          <time className="text-xs text-slate-500">{date}</time>
        )}
      </footer>
    </article>
  );
}
