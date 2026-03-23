import { useState } from "react";
import type { Product } from "../types";
import { useStore } from "../store/StoreContext";
import { money } from "../store/hooks";
import { useReviews } from "../store/reviews";
import StarRating from "./StarRating";

const MOOD_GRADIENT: Record<string, string> = {
  "Tropical Warmth":     "from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-800/30",
  "Cozy & Romantic":     "from-rose-100 to-amber-100 dark:from-rose-900/40 dark:to-amber-800/30",
  "Coastal Escape":      "from-sky-100 to-stone-100 dark:from-sky-900/30 dark:to-stone-800/40",
  "Sophisticated & Calm":"from-stone-200 to-amber-100 dark:from-stone-800/60 dark:to-amber-900/30",
  "Peaceful & Reflective":"from-slate-100 to-stone-100 dark:from-slate-800/40 dark:to-stone-800/40",
  "Charmingly Vibrant":  "from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-800/30",
};

const DEFAULT_GRADIENT = "from-amber-100 to-stone-200 dark:from-amber-900/30 dark:to-stone-800/50";

interface ProductCardProps {
  product: Product;
  variant?: "vertical" | "horizontal";
}

export default function ProductCard({ product: p, variant = "vertical" }: ProductCardProps) {
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useStore();
  const { avgRating, totalReviews } = useReviews();
  const wishlisted = isWishlisted(p.id);
  const gradient = MOOD_GRADIENT[p.mood] ?? DEFAULT_GRADIENT;
  const rating = avgRating(p.id);
  const reviewCount = totalReviews(p.id);

  const handleAdd = () => {
    addToCart(p.id, qty);
    showToast(
      `Added to cart${qty > 1 ? ` ×${qty}` : ""}`,
      qty > 1
        ? `${p.name} • ${money(p.price)} each — ${money(p.price * qty)} total`
        : `${p.name} • ${money(p.price)}`
    );
    setQty(1);
  };

  if (variant === "horizontal") {
    return (
      <article className={`flex items-center gap-4 bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark rounded-xl px-4 py-3 hover:shadow-sm transition-shadow ${!p.inStock ? "opacity-60" : ""}`}>
        {/* Thumbnail */}
        <div className={`flex-shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br ${gradient} overflow-hidden`}>
          {p.image ? (
            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-brand-muted/50 dark:text-brand-muted-dark/50">
                <rect x="8" y="10" width="8" height="11" rx="1.5" fill="currentColor"/>
                <rect x="10" y="8" width="4" height="3" rx="0.5" fill="currentColor"/>
                <ellipse cx="12" cy="7" rx="1.5" ry="2.5" fill="currentColor" opacity="0.6"/>
              </svg>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm text-brand-text dark:text-brand-text-dark truncate">{p.name}</h4>
            {p.tag && (
              <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide border border-brand-accent/40 dark:border-brand-accent-dark/40 text-brand-accent dark:text-brand-accent-dark">
                {p.tag}
              </span>
            )}
          </div>
          <p className="text-[11px] text-brand-muted dark:text-brand-muted-dark">{p.mood}</p>
          <p className="text-[11px] text-brand-muted/70 dark:text-brand-muted-dark/70 truncate">{p.scents.join(", ")}</p>
        </div>

        {/* Price + actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">{money(p.price)}</span>
            {reviewCount > 0 ? (
              <StarRating rating={rating} size={11} />
            ) : (
              <StarRating rating={5} size={11} />
            )}
          </div>

          {p.inStock ? (
            <>
              <div className="flex items-center gap-0 border border-brand-line dark:border-brand-line-dark rounded-full overflow-hidden">
                <button
                  className="w-7 h-7 flex items-center justify-center text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm"
                  onClick={() => setQty((q) => Math.max(q - 1, 1))}
                  type="button"
                >
                  −
                </button>
                <span className="text-sm text-brand-text dark:text-brand-text-dark w-5 text-center">{qty}</span>
                <button
                  className="w-7 h-7 flex items-center justify-center text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm"
                  onClick={() => setQty((q) => Math.min(q + 1, 10))}
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                className="px-4 py-1.5 rounded-full bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-xs font-medium hover:opacity-90 transition"
                onClick={handleAdd}
                type="button"
              >
                Add to Cart
              </button>
            </>
          ) : (
            <span className="px-3 py-1.5 rounded-full border border-brand-line dark:border-brand-line-dark text-xs text-brand-muted dark:text-brand-muted-dark">
              Out of Stock
            </span>
          )}

          <button
            className={`w-7 h-7 flex items-center justify-center rounded-full border transition ${wishlisted ? "border-brand-accent dark:border-brand-accent-dark text-brand-accent dark:text-brand-accent-dark" : "border-brand-line dark:border-brand-line-dark text-brand-muted dark:text-brand-muted-dark hover:border-brand-accent dark:hover:border-brand-accent-dark"}`}
            onClick={() => toggleWishlist(p.id)}
            type="button"
            aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </button>
        </div>
      </article>
    );
  }

  // Vertical card (default)
  return (
    <article className={`flex flex-col rounded-2xl overflow-hidden bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark hover:shadow-md transition-shadow ${!p.inStock ? "opacity-70" : ""}`}>
      {/* Image */}
      <div className={`relative h-52 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {p.image ? (
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <svg width="52" height="52" viewBox="0 0 24 24" fill="none" className="text-brand-muted/30 dark:text-brand-muted-dark/30">
            <rect x="8" y="10" width="8" height="11" rx="1.5" fill="currentColor"/>
            <rect x="10" y="8" width="4" height="3" rx="0.5" fill="currentColor"/>
            <ellipse cx="12" cy="7" rx="1.5" ry="2.5" fill="currentColor" opacity="0.7"/>
            <line x1="12" y1="4.5" x2="12" y2="2.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          </svg>
        )}
        {/* Wishlist */}
        <button
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition bg-white/80 dark:bg-brand-bg-dark/80 backdrop-blur-sm hover:scale-110 ${wishlisted ? "text-brand-accent dark:text-brand-accent-dark" : "text-brand-muted dark:text-brand-muted-dark"}`}
          onClick={() => toggleWishlist(p.id)}
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </button>
        {/* Tag */}
        <div className="absolute top-3 left-3">
          {p.inStock ? (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-white/80 dark:bg-brand-bg-dark/80 backdrop-blur-sm text-brand-text dark:text-brand-text-dark border border-brand-line/50 dark:border-brand-line-dark/50">
              {p.tag || "Signature"}
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-brand-muted/80 text-white">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <div>
          <h4
            className="text-base text-brand-text dark:text-brand-text-dark leading-snug"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {p.name}
          </h4>
          <p className="text-xs text-brand-muted dark:text-brand-muted-dark mt-0.5">{p.mood} · {p.destination}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {p.scents.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-full text-[10px] bg-brand-bg dark:bg-brand-bg-dark text-brand-muted dark:text-brand-muted-dark border border-brand-line dark:border-brand-line-dark"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className="font-semibold text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem" }}>
              {money(p.price)}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <StarRating rating={reviewCount > 0 ? rating : 5} size={11} />
              {reviewCount > 0 && (
                <span className="text-[10px] text-brand-muted dark:text-brand-muted-dark">({reviewCount})</span>
              )}
            </div>
          </div>
          {p.inStock ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0 border border-brand-line dark:border-brand-line-dark rounded-full overflow-hidden">
                <button
                  className="w-7 h-7 flex items-center justify-center text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm"
                  onClick={() => setQty((q) => Math.max(q - 1, 1))}
                  type="button"
                >
                  −
                </button>
                <span className="text-sm text-brand-text dark:text-brand-text-dark w-5 text-center">{qty}</span>
                <button
                  className="w-7 h-7 flex items-center justify-center text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm"
                  onClick={() => setQty((q) => Math.min(q + 1, 10))}
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                className="px-4 py-1.5 rounded-full bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-xs font-medium hover:opacity-90 transition"
                onClick={handleAdd}
                type="button"
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <button
              className="px-3 py-1.5 rounded-full border border-brand-line dark:border-brand-line-dark text-xs text-brand-muted dark:text-brand-muted-dark cursor-not-allowed"
              type="button"
              disabled
            >
              Notify Me
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
