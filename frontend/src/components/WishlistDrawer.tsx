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
      className={`cart wishlist-drawer${wishlistOpen ? " open" : ""}`}
      role="dialog"
      aria-modal
      aria-label="Wishlist"
    >
      <div className="cart-header">
        <h3>❤️ Wishlist</h3>
        <button
          className="icon-btn"
          onClick={() => setWishlistOpen(false)}
          type="button"
          aria-label="Close wishlist"
        >
          ✕
        </button>
      </div>

      <div className="cart-body">
        {wishlist.length === 0 ? (
          <div className="cart-empty">
            <p className="muted">No saved items yet.</p>
            <p className="muted tiny">Tap the ♡ on any candle to save it ✈️</p>
          </div>
        ) : (
          <ul className="cart-list" aria-label="Wishlist items">
            {wishlist.map((id) => {
              const p = CATALOG[id];
              if (!p) return null;
              return (
                <li key={id} className="cart-item">
                  <div className="cart-item-top">
                    <div>
                      <h4>{p.name}</h4>
                      <p className="sub">
                        {p.mood} • {p.destination}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="sub">{money(p.price)}</div>
                      <button
                        className="remove"
                        onClick={() => toggleWishlist(id)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="qty-row">
                    <span className="sub">{p.inStock ? "In Stock" : "Out of Stock"}</span>
                    {p.inStock && (
                      <button
                        className="btn"
                        style={{ fontSize: 12, padding: "6px 10px" }}
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

      <div className="cart-footer">
        <div className="cart-actions">
          <button className="btn" onClick={clearWishlist} type="button">
            Clear All
          </button>
          <button className="btn primary" onClick={addAll} type="button">
            Add All to Cart
          </button>
        </div>
      </div>
    </aside>
  );
}
