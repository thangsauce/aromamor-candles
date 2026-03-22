import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATALOG } from "../store/catalog";
import { money, SHIPPING_FLAT } from "../store/hooks";
import type { Order } from "../types";
import Header from "../components/Header";

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
    <>
      <Header subtitle="Order Confirmed" />
      <main className="confirm-wrap">
        <div className="confirm-hero">
          <span className="confirm-icon">✈️</span>
          <h2>Your order is on its way!</h2>
          <p className="muted">
            Thanks for shopping at Aromamor. You'll receive a confirmation email shortly.
          </p>
        </div>

        {/* Order summary */}
        <div className="confirm-card">
          <div className="confirm-card-header">
            <span>Order Summary</span>
            <span className="order-number">#WW-{order.orderNum}</span>
          </div>
          <ul className="confirm-items">
            {order.items.map(({ id, qty }) => {
              const p = CATALOG[id];
              if (!p) return null;
              return (
                <li key={id} className="confirm-item">
                  <div>
                    <p className="confirm-item-name">{p.name}</p>
                    <p className="confirm-item-sub">
                      {p.mood} • {money(p.price)} × {qty}
                    </p>
                  </div>
                  <div className="confirm-item-price">{money(p.price * qty)}</div>
                </li>
              );
            })}
          </ul>
          <div className="confirm-totals">
            <div className="confirm-row">
              <span className="muted">Subtotal</span>
              <span>{money(order.subtotal)}</span>
            </div>
            <div className="confirm-row">
              <span className="muted">Shipping</span>
              <span>{money(shipping)}</span>
            </div>
            <div className="confirm-row total">
              <span>Total</span>
              <span>{money(order.subtotal + shipping)}</span>
            </div>
          </div>
        </div>

        {/* Customer info */}
        <div className="confirm-card">
          <div className="confirm-card-header">Your Details</div>
          <div className="confirm-meta">
            <div className="meta-grid">
              <div className="meta-item">
                <label>Name</label>
                <span>{order.name}</span>
              </div>
              <div className="meta-item">
                <label>Email</label>
                <span>{order.email}</span>
              </div>
              <div className="meta-item">
                <label>Fulfillment</label>
                <span>{order.fulfillment === "shipping" ? "📦 Shipping" : "🏪 Pickup"}</span>
              </div>
              {order.address && (
                <div className="meta-item">
                  <label>Address</label>
                  <span>{order.address}</span>
                </div>
              )}
              {order.notes && (
                <div className="meta-item">
                  <label>Notes</label>
                  <span>{order.notes}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="confirm-actions">
          <Link className="btn" to="/">← Back to Shop</Link>
          <button className="btn primary" onClick={() => window.print()} type="button">
            🖨️ Print Receipt
          </button>
        </div>

        <div className="stripe-note">
          🔧 Demo mode — connect Stripe or PayPal to process real payments.
        </div>
      </main>
    </>
  );
}
