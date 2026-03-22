import { useState } from "react";
import type { Product } from "../types";
import { useStore } from "../store/StoreContext";
import { money } from "../store/hooks";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product: p }: ProductCardProps) {
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useStore();
  const wishlisted = isWishlisted(p.id);

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
    <article className={`product${!p.inStock ? " oos" : ""}`}>
      <div className="label">
        <div className="label-top">
          <div>
            <h4>{p.name}</h4>
            <p className="mood">{p.mood}</p>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 6, flexShrink: 0 }}>
            <button
              className={`wishlist-btn${wishlisted ? " wishlisted" : ""}`}
              onClick={() => toggleWishlist(p.id)}
              type="button"
              aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            >
              {wishlisted ? "♥" : "♡"}
            </button>
            {p.inStock ? (
              <span className="pill">{p.tag || "SIGNATURE"}</span>
            ) : (
              <span className="oos-badge">OUT OF STOCK</span>
            )}
          </div>
        </div>

        <p className="meta">
          <span>Destination:</span> {p.destination}
        </p>

        <div className="chips">
          {p.scents.map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>

        <div className="buy-row">
          <div>
            <p className="price">{money(p.price)}</p>
            <p className="muted tiny">8oz • Soy blend</p>
          </div>
          {p.inStock ? (
            <div className="card-add-row">
              <div className="card-qty-controls">
                <button
                  className="card-qty-btn"
                  onClick={() => setQty((q) => Math.max(q - 1, 1))}
                  type="button"
                >
                  −
                </button>
                <span className="card-qty-display">{qty}</span>
                <button
                  className="card-qty-btn"
                  onClick={() => setQty((q) => Math.min(q + 1, 10))}
                  type="button"
                >
                  +
                </button>
              </div>
              <button className="btn add" onClick={handleAdd} type="button">
                Add to Cart
              </button>
            </div>
          ) : (
            <button className="btn add notify-btn" type="button" disabled>
              Notify Me
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
