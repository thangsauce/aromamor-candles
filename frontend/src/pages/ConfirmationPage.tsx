import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATALOG } from "../store/catalog";
import { money, SHIPPING_FLAT } from "../store/hooks";
import type { Order } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("aromamor_order");
      const parsed: Order | null = raw ? JSON.parse(raw) : null;
      if (!parsed) { navigate("/"); return; }
      setOrder(parsed);
      sessionStorage.removeItem("aromamor_order");
    } catch {
      navigate("/");
    }
  }, [navigate]);

  if (!order) return null;

  const shipping = order.fulfillment === "shipping" ? SHIPPING_FLAT : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-[640px] mx-auto px-4 py-12 w-full flex flex-col gap-6">

        {/* Hero */}
        <div className="flex flex-col items-center text-center gap-3 pb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-100 to-stone-200 dark:from-amber-900/40 dark:to-stone-800 flex items-center justify-center border border-brand-line dark:border-brand-line-dark">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-accent dark:text-brand-accent-dark">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <h1 className="text-3xl text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>Your order is on its way!</h1>
          <p className="text-brand-muted dark:text-brand-muted-dark">
            Thanks for shopping at Aromamor. You'll receive a confirmation email shortly.
          </p>
        </div>

        {/* Order summary */}
        <div className="bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark">
            <span className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">Order Summary</span>
            <span className="text-xs text-brand-muted dark:text-brand-muted-dark font-mono">#WW-{order.orderNum}</span>
          </div>
          <ul className="flex flex-col divide-y divide-brand-line dark:divide-brand-line-dark">
            {order.items.map(({ id, qty }) => {
              const p = CATALOG[id];
              if (!p) return null;
              return (
                <li key={id} className="flex items-center justify-between px-5 py-3 gap-3">
                  <div>
                    <div className="text-sm font-medium text-brand-text dark:text-brand-text-dark">{p.name}</div>
                    <div className="text-xs text-brand-muted dark:text-brand-muted-dark">{p.mood} • {money(p.price)} × {qty}</div>
                  </div>
                  <div className="text-sm font-semibold text-brand-text dark:text-brand-text-dark flex-shrink-0">{money(p.price * qty)}</div>
                </li>
              );
            })}
          </ul>
          <div className="flex flex-col gap-2 px-5 py-4 border-t border-brand-line dark:border-brand-line-dark">
            <div className="flex justify-between text-sm">
              <span className="text-brand-muted dark:text-brand-muted-dark">Subtotal</span>
              <span className="text-brand-text dark:text-brand-text-dark">{money(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-muted dark:text-brand-muted-dark">Shipping</span>
              <span className="text-brand-text dark:text-brand-text-dark">{money(shipping)}</span>
            </div>
            <div className="flex justify-between text-sm font-semibold pt-2 border-t border-brand-line dark:border-brand-line-dark">
              <span className="text-brand-text dark:text-brand-text-dark">Total</span>
              <span className="text-brand-text dark:text-brand-text-dark">{money(order.subtotal + shipping)}</span>
            </div>
          </div>
        </div>

        {/* Customer info */}
        <div className="bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark overflow-hidden">
          <div className="px-5 py-3 border-b border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark">
            <span className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">Your Details</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 py-4">
            <div>
              <div className="text-xs text-brand-muted dark:text-brand-muted-dark mb-0.5">Name</div>
              <div className="text-sm text-brand-text dark:text-brand-text-dark">{order.name}</div>
            </div>
            <div>
              <div className="text-xs text-brand-muted dark:text-brand-muted-dark mb-0.5">Email</div>
              <div className="text-sm text-brand-text dark:text-brand-text-dark">{order.email}</div>
            </div>
            <div>
              <div className="text-xs text-brand-muted dark:text-brand-muted-dark mb-0.5">Fulfillment</div>
              <div className="text-sm text-brand-text dark:text-brand-text-dark">{order.fulfillment === "shipping" ? "📦 Shipping" : "🏪 Pickup"}</div>
            </div>
            {order.address && (
              <div>
                <div className="text-xs text-brand-muted dark:text-brand-muted-dark mb-0.5">Address</div>
                <div className="text-sm text-brand-text dark:text-brand-text-dark">{order.address}</div>
              </div>
            )}
            {order.notes && (
              <div className="sm:col-span-2">
                <div className="text-xs text-brand-muted dark:text-brand-muted-dark mb-0.5">Notes</div>
                <div className="text-sm text-brand-text dark:text-brand-text-dark">{order.notes}</div>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            className="flex-1 px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark text-sm text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-center"
            to="/"
          >
            ← Back to Shop
          </Link>
          <button
            className="flex-1 px-4 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold text-sm hover:opacity-90 transition"
            onClick={() => window.print()}
            type="button"
          >
            🖨️ Print Receipt
          </button>
        </div>

        <p className="text-center text-[10px] text-brand-muted dark:text-brand-muted-dark">
          🔧 Demo mode — connect Stripe or PayPal to process real payments.
        </p>
      </main>
      <Footer />
    </div>
  );
}
