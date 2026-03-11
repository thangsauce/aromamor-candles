import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";

interface HeaderProps {
  subtitle?: string;
}

export default function Header({ subtitle = "Hand-poured • Travel-inspired scents" }: HeaderProps) {
  const { totalQty, wishlist, setCartOpen, setWishlistOpen, hideToast } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openCart = () => {
    hideToast();
    setCartOpen(true);
    setMobileOpen(false);
  };

  const openWishlist = () => {
    hideToast();
    setWishlistOpen(true);
    setMobileOpen(false);
  };

  return (
    <header className="site-header">
      <div className="wrap nav">
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link className="brand" to="/">
              <img src="./logo.png" alt="Aromamor logo" style={{ width: 80, height: 80, borderRadius: 16, objectFit: "cover" }} />            
            <div>
              <h1>Aromamor</h1>
              <p className="subtitle">{subtitle}</p>
            </div>
          </Link>
          <Link className="btn" to="/about">
            About
          </Link>
        </div>

        <div className="header-actions">
          <Link className="btn desktop-only" to="/#collection">
            Shop
          </Link>
          <Link className="btn desktop-only" to="/reviews">
            ⭐ Reviews
          </Link>

          <button className="btn desktop-only" onClick={openWishlist} type="button">
            ❤️ Wishlist <span className="badge">{wishlist.length}</span>
          </button>

          <button className="btn primary cart-btn" onClick={openCart} type="button">
            Cart <span className="badge">{totalQty}</span>
          </button>

          <button
            className={`btn hamburger-btn${mobileOpen ? " open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span className="ham-icon">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>

        {mobileOpen && (
          <div className="mobile-menu open">
            <Link
              className="mobile-link"
              to="/#collection"
              onClick={() => setMobileOpen(false)}
            >
              ✈️ Shop Collection
            </Link>
            <Link
              className="mobile-link"
              to="/reviews"
              onClick={() => setMobileOpen(false)}
            >
              ⭐ Reviews
            </Link>
            <Link
              className="mobile-link"
              to="/about"
              onClick={() => setMobileOpen(false)}
            >
              🕯️ About
            </Link>
            <Link
              className="mobile-link"
              to="/checkout"
              onClick={() => setMobileOpen(false)}
            >
              🛍️ Checkout
            </Link>
            <button className="mobile-link" onClick={openWishlist} type="button">
              ❤️ Wishlist <span className="badge">{wishlist.length}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
