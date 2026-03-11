import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { CATALOG } from "../store/catalog";
import { money } from "../store/hooks";

export default function CartDrawer() {
  const { cart, setQty, clearCart, subtotal, totalQty, cartOpen, setCartOpen } = useStore();

  const entries = Object.entries(cart).filter(([id]) => CATALOG[id]);

  return (
    <aside className={`cart${cartOpen ? " open" : ""}`} role="dialog" aria-modal aria-label="Shopping cart">
      <div className="cart-header">
        <h3>Your Cart</h3>
        <button className="icon-btn" onClick={() => setCartOpen(false)} type="button" aria-label="Close cart">
          ✕
        </button>
      </div>

      <div className="cart-body">
        {entries.length === 0 ? (
          <div className="cart-empty">
            <p className="muted">Your cart is empty.</p>
            <p className="muted tiny">Add a candle to start your journey ✈️</p>
          </div>
        ) : (
          <ul className="cart-list" aria-label="Cart items">
            {entries.map(([id, item]) => {
              const p = CATALOG[id];
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
                      <button className="remove" onClick={() => setQty(id, 0)} type="button">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="qty-row">
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => setQty(id, item.qty - 1)} type="button">
                        −
                      </button>
                      <div className="qty">{item.qty}</div>
                      <button className="qty-btn" onClick={() => setQty(id, item.qty + 1)} type="button">
                        +
                      </button>
                    </div>
                    <div className="sub">
                      Price: <b>{money(p.price * item.qty)}</b>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="cart-footer">
        <div className="totals">
          <div className="muted">Total</div>
          <div className="total">{money(subtotal)}</div>
        </div>
        <div className="cart-actions">
          <button
            className="btn"
            onClick={clearCart}
            type="button"
            disabled={totalQty === 0}
          >
            Clear
          </button>
          <Link className="btn primary" to="/checkout" onClick={() => setCartOpen(false)}>
            Checkout
          </Link>
        </div>
        <p className="muted tiny">(Demo cart) Hook this to a payment system later.</p>
      </div>
    </aside>
  );
}
