import { useStore } from "../store/StoreContext";
import { CATALOG } from "../store/catalog";
import { money } from "../store/hooks";

export default function WishlistDrawer() {
  const {
    wishlist,
    toggleWishlist,
    clearWishlist,
    wishlistOpen,
    setWishlistOpen,
    addToCart,
    setCartOpen,
    showToast,
  } = useStore();

  const addAll = () => {
    const inStock = wishlist.filter((id) => CATALOG[id]?.inStock);
    inStock.forEach((id) => addToCart(id, 1));
    if (inStock.length > 0) {
      setWishlistOpen(false);
      setCartOpen(false);
      showToast(
        `${inStock.length} item${inStock.length > 1 ? "s" : ""} added to cart`,
        "From your wishlist"
      );
    }
  };

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-[380px] max-w-full z-40 flex flex-col bg-brand-card dark:bg-brand-card-dark border-l border-brand-line dark:border-brand-line-dark shadow-2xl transition-transform duration-300 ${wishlistOpen ? "translate-x-0" : "translate-x-full"}`}
      role="dialog"
      aria-modal
      aria-label="Wishlist"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-brand-line dark:border-brand-line-dark">
        <h3 className="font-semibold text-brand-text dark:text-brand-text-dark">❤️ Wishlist</h3>
        <button
          className="p-2 rounded-lg text-brand-muted dark:text-brand-muted-dark hover:text-brand-text dark:hover:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition"
          onClick={() => setWishlistOpen(false)}
          type="button"
          aria-label="Close wishlist"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
            <p className="text-brand-muted dark:text-brand-muted-dark">No saved items yet.</p>
            <p className="text-xs text-brand-muted dark:text-brand-muted-dark">Tap the ♡ on any candle to save it ✈️</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4" aria-label="Wishlist items">
            {wishlist.map((id) => {
              const p = CATALOG[id];
              if (!p) return null;
              return (
                <li key={id} className="flex flex-col gap-2 pb-4 border-b border-brand-line dark:border-brand-line-dark last:border-0">
                  <div className="flex justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-brand-text dark:text-brand-text-dark">{p.name}</div>
                      <div className="text-xs text-brand-muted dark:text-brand-muted-dark">{p.mood} • {p.destination}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-brand-muted dark:text-brand-muted-dark">{money(p.price)}</div>
                      <button
                        className="text-xs text-brand-muted dark:text-brand-muted-dark hover:text-red-500 transition mt-1"
                        onClick={() => toggleWishlist(id)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${p.inStock ? "text-green-600 dark:text-green-400" : "text-brand-muted dark:text-brand-muted-dark"}`}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    {p.inStock && (
                      <button
                        className="px-3 py-1 rounded-lg border border-brand-line dark:border-brand-line-dark text-xs text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition"
                        onClick={() => addToCart(id, 1)}
                        type="button"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-brand-line dark:border-brand-line-dark flex gap-2">
        <button
          className="flex-1 px-4 py-2 rounded-xl border border-brand-line dark:border-brand-line-dark text-sm text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition"
          onClick={clearWishlist}
          type="button"
        >
          Clear All
        </button>
        <button
          className="flex-1 px-4 py-2 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-sm font-semibold hover:opacity-90 transition"
          onClick={addAll}
          type="button"
        >
          Add All to Cart
        </button>
      </div>
    </aside>
  );
}
