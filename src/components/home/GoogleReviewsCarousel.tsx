"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FIVE_STAR_REVIEWS,
  REVIEWS_ARE_REAL,
  GOOGLE_PROFILE_URL,
  type GoogleReview,
} from "@/lib/content/googleReviews";

const CHAR_LIMIT = 150;

function GoogleG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function VerifiedCheck() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-label="Verified">
      <path fill="#1a73e8" d="M12 1l2.4 1.8 3-.3 1.2 2.7 2.7 1.2-.3 3L23 12l-1.8 2.4.3 3-2.7 1.2-1.2 2.7-3-.3L12 23l-2.4-1.8-3 .3-1.2-2.7L2.7 17.4l.3-3L1 12l1.8-2.4-.3-3 2.7-1.2 1.2-2.7 3 .3z" />
      <path fill="#fff" d="M10.6 14.3l-2-2-1.1 1.1 3.1 3.1 5.5-5.5-1.1-1.1z" />
    </svg>
  );
}

function Avatar({ review }: { review: GoogleReview }) {
  const palette = ["bg-hvac-blue-600", "bg-copper-500", "bg-emerald-600", "bg-slate-600", "bg-purple-600", "bg-red-500"];
  const color = palette[review.reviewerName.charCodeAt(0) % palette.length];
  if (review.reviewerImage) {
    return (
      <Image
        src={review.reviewerImage}
        alt={review.reviewerName}
        width={44}
        height={44}
        className="w-11 h-11 rounded-full object-cover shrink-0"
      />
    );
  }
  return (
    <div className={`flex items-center justify-center w-11 h-11 rounded-full text-white font-semibold text-base shrink-0 ${color}`} aria-hidden="true">
      {review.initials}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.reviewText.length > CHAR_LIMIT;
  const shown = !expanded && isLong ? review.reviewText.slice(0, CHAR_LIMIT).trimEnd() + "…" : review.reviewText;
  const href = review.googleReviewUrl ?? GOOGLE_PROFILE_URL;

  return (
    <div className="snap-start shrink-0 w-[280px] sm:w-[300px]">
      {/* Speech-bubble card */}
      <div className="relative bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(10,15,30,0.12)] border border-slate-100 p-5 h-[210px] flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Stars />
            <VerifiedCheck />
          </div>
          <GoogleG />
        </div>
        <p className="text-slate-700 text-sm leading-relaxed flex-1 overflow-hidden">
          {shown}
        </p>
        {isLong && (
          expanded ? (
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium mt-2 self-start transition-colors"
            >
              Show less
            </button>
          ) : (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.preventDefault(); setExpanded(true); }}
              className="text-slate-400 hover:text-slate-600 text-sm font-medium mt-2 self-start transition-colors"
            >
              Read more
            </a>
          )
        )}
        {/* Bubble tail */}
        <div aria-hidden="true" className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b border-r border-slate-100 rotate-45" />
      </div>

      {/* Reviewer info below card */}
      <div className="flex items-center gap-3 mt-4 pl-1">
        <Avatar review={review} />
        <div className="min-w-0">
          <p className="text-slate-900 font-semibold text-sm truncate">{review.reviewerName}</p>
          <p className="text-slate-400 text-xs">{review.reviewDate}</p>
        </div>
      </div>
    </div>
  );
}

export default function GoogleReviewsCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  // Guard: never render placeholder reviews in production.
  if (!REVIEWS_ARE_REAL || FIVE_STAR_REVIEWS.length === 0) {
    return (
      <section className="py-14 lg:py-16 bg-slate-50 border-y border-slate-100" aria-labelledby="google-reviews-heading">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GoogleG className="w-6 h-6" />
            <span className="text-slate-700 font-semibold">Google Reviews</span>
          </div>
          <h2 id="google-reviews-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
            What Our Customers Say
          </h2>
          <p className="text-slate-500 text-sm">
            Verified Google reviews are being added. Read them on our{" "}
            <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-hvac-blue-600 font-semibold hover:underline">
              Google Business Profile
            </a>.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-14 lg:py-16 bg-slate-50 border-y border-slate-100 overflow-hidden" aria-labelledby="google-reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex items-center gap-2 mb-2">
            <GoogleG className="w-6 h-6" />
            <span className="text-slate-700 font-semibold">Google Reviews</span>
          </div>
          <h2 id="google-reviews-heading" className="text-2xl sm:text-3xl font-bold text-slate-900">
            What Our Customers Say
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canLeft}
            aria-label="Previous reviews"
            className="hidden sm:flex items-center justify-center absolute left-0 top-[120px] -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 disabled:opacity-0 disabled:pointer-events-none transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FIVE_STAR_REVIEWS.map((review, i) => (
              <div key={`${review.reviewerName}-${i}`} data-card>
                <ReviewCard review={review} />
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canRight}
            aria-label="Next reviews"
            className="hidden sm:flex items-center justify-center absolute right-0 top-[120px] translate-x-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300 disabled:opacity-0 disabled:pointer-events-none transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Footer note */}
        <p className="text-center text-slate-400 text-sm mt-4">Showing only 5 star reviews</p>
      </div>
    </section>
  );
}
