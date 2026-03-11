import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { CATALOG } from "../store/catalog";
import { money, SHIPPING_FLAT } from "../store/hooks";
import type { Order } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <>
      <Header subtitle="Checkout" />
      <main className="wrap">
        <div className="section-title">
          <h3>Checkout</h3>
          <p className="muted">Review your order and enter your details</p>
        </div>

        <div className="checkout-layout">
          {/* Order Summary */}
          <section className="panel">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <h3 style={{ margin: 0 }}>Order Summary</h3>
              <button
                className="btn"
                onClick={clearCart}
                type="button"
                disabled={!hasItems}
              >
                Clear Cart
              </button>
            </div>

            {!hasItems ? (
              <div className="cart-empty" style={{ marginTop: 12 }}>
                <p className="muted">Your cart is empty.</p>
                <p className="muted tiny">Go back and add a candle first.</p>
                <div style={{ marginTop: 10 }}>
                  <Link className="btn primary" to="/">
                    Shop Candles
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <ul className="cart-list" style={{ marginTop: 12 }}>
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
                            <div className="sub">{money(p.price)} each</div>
                            <button
                              className="remove"
                              onClick={() => setQty(id, 0)}
                              type="button"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="qty-row">
                          <div className="qty-controls">
                            <button
                              className="qty-btn"
                              onClick={() => setQty(id, item.qty - 1)}
                              type="button"
                            >
                              −
                            </button>
                            <div className="qty">{item.qty}</div>
                            <button
                              className="qty-btn"
                              onClick={() => setQty(id, item.qty + 1)}
                              type="button"
                            >
                              +
                            </button>
                          </div>
                          <div className="sub">
                            Line: <b>{money(p.price * item.qty)}</b>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <div style={{ display: "grid", gap: 8, paddingTop: 10, borderTop: "1px solid rgba(42,42,53,.75)", marginTop: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div className="muted">Subtotal</div>
                    <div>{money(subtotal)}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                    <div className="muted">Shipping</div>
                    <div>{money(shipping)}</div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, paddingTop: 10, borderTop: "1px solid rgba(42,42,53,.75)" }}>
                    <div className="muted">Total</div>
                    <div className="total">{money(total)}</div>
                  </div>
                </div>
              </>
            )}

            <p className="muted tiny" style={{ margin: "10px 0 0" }}>
              Tip: You can edit quantities here before placing your order.
            </p>
          </section>

          {/* Customer Form */}
          <section className="panel">
            <h3>Your Details</h3>
            <form className="form" onSubmit={handleSubmit}>
              <div className="row">
                <label className="muted tiny" htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  required
                  placeholder="Your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="row">
                <label className="muted tiny" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="row">
                <label className="muted tiny" htmlFor="fulfillment">Fulfillment</label>
                <select
                  id="fulfillment"
                  value={fulfillment}
                  onChange={(e) => setFulfillment(e.target.value as "pickup" | "shipping")}
                >
                  <option value="pickup">Pickup</option>
                  <option value="shipping">Shipping</option>
                </select>
              </div>
              <div className="row">
                <label className="muted tiny" htmlFor="address">Address (if shipping)</label>
                <textarea
                  id="address"
                  placeholder="Street, City, State, ZIP"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="row">
                <label className="muted tiny" htmlFor="notes">Order Notes</label>
                <textarea
                  id="notes"
                  placeholder="Gift note, preferences, etc."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="cart-actions">
                <Link className="btn" to="/">Back</Link>
                <button className="btn primary" type="submit">
                  Place Order (Demo)
                </button>
              </div>
              <p className="muted tiny" style={{ margin: 0 }}>
                Demo checkout. Connect Stripe/PayPal later.
              </p>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
