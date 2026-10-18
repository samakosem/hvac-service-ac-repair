/**
 * Homepage carousel adapter. Review data lives in ./reviews.ts, the single
 * source of truth for customer reviews. Add, edit or remove reviews there.
 */
import { REVIEWS, GOOGLE_PROFILE_URL } from "./reviews";

export { GOOGLE_PROFILE_URL };

export type GoogleReview = {
  reviewerName: string;
  initials: string;
  reviewerImage?: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  googleReviewUrl?: string;
};

/**
 * While `false`, the carousel renders a "reviews coming soon" state instead of
 * any review content.
 */
export const REVIEWS_ARE_REAL = true;

export const GOOGLE_REVIEWS: GoogleReview[] = REVIEWS.filter((r) => r.source === "google").map((r) => ({
  reviewerName: r.reviewerName,
  initials: r.initials,
  reviewerImage: r.reviewerImage,
  rating: r.rating,
  reviewText: r.reviewText,
  reviewDate: r.relativeDate,
  googleReviewUrl: r.googleReviewUrl,
}));

/** Only 5-star reviews are shown in the carousel. */
export const FIVE_STAR_REVIEWS = GOOGLE_REVIEWS.filter((r) => r.rating === 5);
