import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { CATALOG } from "../store/catalog";
import { money, SHIPPING_FLAT } from "../store/hooks";
import type { Order } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inputClass = "w-full px-3 py-2 rounded-lg border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark text-sm placeholder:text-brand-muted dark:placeholder:text-brand-muted-dark focus:outline-none focus:border-brand-accent dark:focus:border-brand-accent-dark transition";

export default function CheckoutPage() {
  const { cart, setQty, clearCart, subtotal } = useStore();
  const navigate = useNavigate();

  const [fulfillment, setFulfillment] = useState<"pickup" | "shipping">("pickup");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const shipping = fulfillment === "shipping" ? SHIPPING_FLAT : 0;
  const total = subtotal + shipping;

  const entries = Object.entries(cart)
    .filter(([id, item]) => CATALOG[id] && item.qty > 0)
    .sort(([a], [b]) => (CATALOG[a]?.name ?? "").localeCompare(CATALOG[b]?.name ?? ""));

  const hasItems = entries.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasItems) { alert("Your cart is empty."); return; }
    if (fulfillment === "shipping" && address.trim().length < 8) {
      alert("Please enter a shipping address.");
      return;
    }

    const orderNum = String(Math.floor(100000 + Math.random() * 900000));
    const order: Order = {
      orderNum,
      items: entries.map(([id, item]) => ({ id, qty: item.qty })),
      subtotal,
      fulfillment,
      address: address.trim(),
      notes: notes.trim(),
      name: fullName.trim(),
      email: email.trim(),
    };

    try { sessionStorage.setItem("aromamor_order", JSON.stringify(order)); } catch {}
    clearCart();
    navigate("/confirmation");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 max-w-[1100px] mx-auto px-4 py-10 w-full">
        <div className="mb-8">
          <h1 className="text-4xl text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>Checkout</h1>
          <p className="text-sm text-brand-muted dark:text-brand-muted-dark mt-1">Review your order and enter your details</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Order Summary */}
          <section className="w-full lg:w-[420px] flex-shrink-0 bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-brand-text dark:text-brand-text-dark">Order Summary</h2>
              <button
                className="px-3 py-1.5 rounded-lg border border-brand-line dark:border-brand-line-dark text-xs text-brand-muted dark:text-brand-muted-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition disabled:opacity-40"
                onClick={clearCart}
                type="button"
                disabled={!hasItems}
              >
                Clear Cart
              </button>
            </div>

            {!hasItems ? (
              <div className="flex flex-col items-center text-center py-8 gap-3">
                <p className="text-brand-muted dark:text-brand-muted-dark">Your cart is empty.</p>
                <p className="text-xs text-brand-muted dark:text-brand-muted-dark">Go back and add a candle first.</p>
                <Link className="mt-2 px-5 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold text-sm hover:opacity-90 transition" to="/shop">
                  Shop Candles
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex flex-col gap-4 mb-4">
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
                            <div className="text-xs text-brand-muted dark:text-brand-muted-dark">{money(p.price)} each</div>
                            <button className="text-xs text-brand-muted dark:text-brand-muted-dark hover:text-red-500 transition mt-1" onClick={() => setQty(id, 0)} type="button">
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 border border-brand-line dark:border-brand-line-dark rounded-lg overflow-hidden">
                            <button className="w-7 h-7 flex items-center justify-center text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm" onClick={() => setQty(id, item.qty - 1)} type="button">−</button>
                            <span className="text-sm text-brand-text dark:text-brand-text-dark w-5 text-center">{item.qty}</span>
                            <button className="w-7 h-7 flex items-center justify-center text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm" onClick={() => setQty(id, item.qty + 1)} type="button">+</button>
                          </div>
                          <div className="text-xs text-brand-muted dark:text-brand-muted-dark">
                            Line: <b className="text-brand-text dark:text-brand-text-dark">{money(p.price * item.qty)}</b>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div className="flex flex-col gap-2 pt-4 border-t border-brand-line dark:border-brand-line-dark">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted dark:text-brand-muted-dark">Subtotal</span>
                    <span className="text-brand-text dark:text-brand-text-dark">{money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted dark:text-brand-muted-dark">Shipping</span>
                    <span className="text-brand-text dark:text-brand-text-dark">{money(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-semibold pt-2 border-t border-brand-line dark:border-brand-line-dark">
                    <span className="text-brand-text dark:text-brand-text-dark">Total</span>
                    <span className="text-brand-text dark:text-brand-text-dark">{money(total)}</span>
                  </div>
                </div>
              </>
            )}

          </section>

          {/* Customer Details Form */}
          <section className="flex-1 bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark p-6">
            <h2 className="font-semibold text-brand-text dark:text-brand-text-dark mb-5">Your Details</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label htmlFor="fullName" className="text-xs text-brand-muted dark:text-brand-muted-dark">Full Name</label>
                <input id="fullName" required placeholder="Your name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-xs text-brand-muted dark:text-brand-muted-dark">Email</label>
                <input id="email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="fulfillment" className="text-xs text-brand-muted dark:text-brand-muted-dark">Fulfillment</label>
                <select id="fulfillment" value={fulfillment} onChange={(e) => setFulfillment(e.target.value as "pickup" | "shipping")} className={inputClass}>
                  <option value="pickup">Pickup</option>
                  <option value="shipping">Shipping (+{money(SHIPPING_FLAT)})</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="address" className="text-xs text-brand-muted dark:text-brand-muted-dark">Address {fulfillment === "shipping" ? "(required)" : "(if shipping)"}</label>
                <textarea id="address" placeholder="Street, City, State, ZIP" value={address} onChange={(e) => setAddress(e.target.value)} className={`${inputClass} min-h-[70px] resize-y`} />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="notes" className="text-xs text-brand-muted dark:text-brand-muted-dark">Order Notes</label>
                <textarea id="notes" placeholder="Gift note, preferences, etc." value={notes} onChange={(e) => setNotes(e.target.value)} className={`${inputClass} min-h-[70px] resize-y`} />
              </div>

              <div className="flex gap-3 pt-2">
                <Link className="flex-1 px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark text-sm text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-center" to="/shop">
                  Back
                </Link>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold text-sm hover:opacity-90 transition" type="submit">
                  Place Order
                </button>
              </div>

            </form>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
