import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { CATALOG } from "../store/catalog";
import { money } from "../store/hooks";

export default function CartDrawer() {
  const { cart, setQty, clearCart, subtotal, totalQty, cartOpen, setCartOpen } = useStore();

  const entries = Object.entries(cart).filter(([id]) => CATALOG[id]);

  return (
    <aside
      className={`fixed top-0 right-0 h-full w-[380px] max-w-full z-40 flex flex-col bg-brand-card dark:bg-brand-card-dark border-l border-brand-line dark:border-brand-line-dark shadow-2xl transition-transform duration-300 ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
      role="dialog"
      aria-modal
      aria-label="Shopping cart"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-brand-line dark:border-brand-line-dark">
        <h3 className="font-semibold text-brand-text dark:text-brand-text-dark">Your Cart</h3>
        <button
          className="p-2 rounded-lg text-brand-muted dark:text-brand-muted-dark hover:text-brand-text dark:hover:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition"
          onClick={() => setCartOpen(false)}
          type="button"
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-center">
            <p className="text-brand-muted dark:text-brand-muted-dark">Your cart is empty.</p>
            <p className="text-xs text-brand-muted dark:text-brand-muted-dark">Add a candle to start your journey ✈️</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4" aria-label="Cart items">
            {entries.map(([id, item]) => {
              const p = CATALOG[id];
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
                        onClick={() => setQty(id, 0)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        className="w-7 h-7 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm"
                        onClick={() => setQty(id, item.qty - 1)}
                        type="button"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium text-brand-text dark:text-brand-text-dark w-5 text-center">{item.qty}</span>
                      <button
                        className="w-7 h-7 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm"
                        onClick={() => setQty(id, item.qty + 1)}
                        type="button"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-xs text-brand-muted dark:text-brand-muted-dark">
                      Total: <b className="text-brand-text dark:text-brand-text-dark">{money(p.price * item.qty)}</b>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-brand-line dark:border-brand-line-dark flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-brand-muted dark:text-brand-muted-dark">Total</span>
          <span className="font-semibold text-brand-text dark:text-brand-text-dark">{money(subtotal)}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="flex-1 px-4 py-2 rounded-xl border border-brand-line dark:border-brand-line-dark text-sm text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition disabled:opacity-40"
            onClick={clearCart}
            type="button"
            disabled={totalQty === 0}
          >
            Clear
          </button>
          <Link
            className="flex-1 px-4 py-2 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-sm font-semibold text-center hover:opacity-90 transition"
            to="/checkout"
            onClick={() => setCartOpen(false)}
          >
            Checkout
          </Link>
        </div>
        <p className="text-[10px] text-brand-muted dark:text-brand-muted-dark text-center">(Demo cart) Hook this to a payment system later.</p>
      </div>
    </aside>
  );
}
