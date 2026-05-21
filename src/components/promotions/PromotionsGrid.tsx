import type { Promotion, PromoCategory } from "@/lib/config/promotions";
import PromotionCard from "@/components/promotions/PromotionCard";

type Props = {
  promotions: Promotion[];
  activeFilter?: PromoCategory | "all";
};

export default function PromotionsGrid({ promotions, activeFilter = "all" }: Props) {
  const filtered =
    activeFilter === "all"
      ? promotions
      : promotions.filter((p) => p.category === activeFilter);

  if (filtered.length === 0) {
    return (
      <p className="text-center text-slate-500 text-sm py-12">
        No promotions in this category right now. Check back soon or call us.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filtered.map((promo) => (
        <PromotionCard key={promo.slug} promo={promo} />
      ))}
    </div>
  );
}
