import { useState } from "react";
import type { Product } from "../types";
import { useStore } from "../store/StoreContext";
import { money } from "../store/hooks";

const MOOD_GRADIENT: Record<string, string> = {
  Romantic:   "from-rose-200 to-pink-300 dark:from-rose-900/50 dark:to-pink-800/50",
  Adventure:  "from-amber-200 to-orange-300 dark:from-amber-900/50 dark:to-orange-800/50",
  Relaxing:   "from-sky-200 to-blue-300 dark:from-sky-900/50 dark:to-blue-800/50",
  Energizing: "from-yellow-200 to-lime-300 dark:from-yellow-900/50 dark:to-lime-800/50",
  Mysterious: "from-violet-200 to-purple-300 dark:from-violet-900/50 dark:to-purple-800/50",
  Tropical:   "from-emerald-200 to-teal-300 dark:from-emerald-900/50 dark:to-teal-800/50",
};

const DEFAULT_GRADIENT = "from-amber-100 to-stone-300 dark:from-amber-900/40 dark:to-stone-800";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product: p }: ProductCardProps) {
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useStore();
  const wishlisted = isWishlisted(p.id);
  const gradient = MOOD_GRADIENT[p.mood] ?? DEFAULT_GRADIENT;

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

  return (
    <article className={`flex flex-col rounded-2xl overflow-hidden bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm hover:shadow-md transition-shadow ${!p.inStock ? "opacity-70" : ""}`}>
      {/* Image / Gradient placeholder */}
      <div className={`relative h-48 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
        {p.image ? (
          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl select-none" aria-hidden>🕯️</span>
        )}
        {/* Wishlist button */}
        <button
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-lg transition bg-white/70 dark:bg-brand-bg-dark/70 backdrop-blur-sm hover:scale-110 ${wishlisted ? "text-red-500" : "text-brand-muted dark:text-brand-muted-dark"}`}
          onClick={() => toggleWishlist(p.id)}
          type="button"
          aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
        >
          {wishlisted ? "♥" : "♡"}
        </button>
        {/* Tag badge */}
        <div className="absolute top-3 left-3">
          {p.inStock ? (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-brand-accent/90 dark:bg-brand-accent-dark/90 text-white dark:text-brand-bg-dark">
              {p.tag || "Signature"}
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-brand-muted/80 text-white">
              Out of Stock
            </span>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h4 className="font-semibold text-brand-text dark:text-brand-text-dark">{p.name}</h4>
          <p className="text-xs text-brand-muted dark:text-brand-muted-dark">{p.mood} • {p.destination}</p>
        </div>

        <div className="flex flex-wrap gap-1">
          {p.scents.map((s) => (
            <span key={s} className="px-2 py-0.5 rounded-full text-[10px] bg-brand-bg dark:bg-brand-bg-dark text-brand-muted dark:text-brand-muted-dark border border-brand-line dark:border-brand-line-dark">
              {s}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <p className="font-semibold text-brand-text dark:text-brand-text-dark">{money(p.price)}</p>
            <p className="text-[10px] text-brand-muted dark:text-brand-muted-dark">8oz • Soy blend</p>
          </div>
          {p.inStock ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 border border-brand-line dark:border-brand-line-dark rounded-lg overflow-hidden">
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
                className="px-3 py-1.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-xs font-semibold hover:opacity-90 transition"
                onClick={handleAdd}
                type="button"
              >
                Add
              </button>
            </div>
          ) : (
            <button
              className="px-3 py-1.5 rounded-xl border border-brand-line dark:border-brand-line-dark text-xs text-brand-muted dark:text-brand-muted-dark cursor-not-allowed"
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
