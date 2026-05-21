import { FEATURED_PROMOTIONS } from "@/lib/config/promotions";
import SeasonalPromoStrip from "@/components/promotions/SeasonalPromoStrip";

export default function PromoSection() {
  return (
    <SeasonalPromoStrip
      promotions={FEATURED_PROMOTIONS}
      label="Current Promotions"
    />
  );
}
