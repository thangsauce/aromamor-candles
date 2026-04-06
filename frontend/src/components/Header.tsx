import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";

export default function Header() {
  const { totalQty, wishlist, setCartOpen, setWishlistOpen, hideToast } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const openCart = () => { hideToast(); setCartOpen(true); setMobileOpen(false); };
  const openWishlist = () => { hideToast(); setWishlistOpen(true); setMobileOpen(false); };
  const goToCollection = () => {
    const scrollToCollection = () => {
      document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (location.pathname !== "/shop") {
      navigate("/shop");
      setTimeout(scrollToCollection, 50);
    } else {
      scrollToCollection();
    }

    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-20 w-full bg-brand-bg/95 dark:bg-brand-bg-dark/95 backdrop-blur-md border-b border-brand-line dark:border-brand-line-dark">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-6">

        {/* Brand */}
        <Link to="/shop" className="flex items-center gap-2.5 flex-shrink-0 no-underline">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Aromamor logo"
            className="w-9 h-9 rounded-xl object-cover"
          />
          <span
            className="text-lg text-brand-text dark:text-brand-text-dark tracking-wide"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            Aromamor
          </span>
        </Link>

        {/* Center nav — desktop */}
        <nav className="hidden md:flex items-center text-sm text-brand-muted dark:text-brand-muted-dark">
          <button
            type="button"
            onClick={goToCollection}
            className="px-3 py-1.5 text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
          >
            Shop
          </button>
          <span className="text-brand-line dark:text-brand-line-dark select-none">|</span>
          <Link
            to="/about"
            className="px-3 py-1.5 text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
          >
            About Us
          </Link>
          <span className="text-brand-line dark:text-brand-line-dark select-none">|</span>
          <Link
            to="/reviews"
            className="px-3 py-1.5 text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
          >
            Reviews
          </Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Wishlist pill — desktop */}
          <button
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-brand-line dark:border-brand-line-dark text-sm text-brand-text dark:text-brand-text-dark hover:border-brand-accent dark:hover:border-brand-accent-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
            onClick={openWishlist}
            type="button"
            aria-label="Wishlist"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            Wishlist
            {wishlist.length > 0 && (
              <span className="min-w-[18px] h-[18px] rounded-full bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-[10px] font-bold flex items-center justify-center px-1">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart pill */}
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-brand-line dark:border-brand-line-dark text-sm text-brand-text dark:text-brand-text-dark hover:border-brand-accent dark:hover:border-brand-accent-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
            onClick={openCart}
            type="button"
            aria-label="Cart"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalQty > 0 ? totalQty : "0"}
          </button>

          {/* Hamburger — mobile */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2 rounded-lg text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition"
            onClick={() => setMobileOpen((v) => !v)}
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <span className="block w-5 h-0.5 bg-current transition-transform" style={{ transform: mobileOpen ? "rotate(45deg) translate(0, 5px)" : "" }} />
            <span className="block w-5 h-0.5 bg-current transition-opacity" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span className="block w-5 h-0.5 bg-current transition-transform" style={{ transform: mobileOpen ? "rotate(-45deg) translate(0, -5px)" : "" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-brand-card dark:bg-brand-card-dark border-b border-brand-line dark:border-brand-line-dark shadow-lg flex flex-col py-2 md:hidden">
          <button className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-left" onClick={goToCollection} type="button">Shop</button>
          <Link className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition" to="/about" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition" to="/reviews" onClick={() => setMobileOpen(false)}>Reviews</Link>
          <Link className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition" to="/checkout" onClick={() => setMobileOpen(false)}>Checkout</Link>
          <button className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-left flex items-center justify-between" onClick={openWishlist} type="button">
            Wishlist
            {wishlist.length > 0 && <span className="text-xs bg-brand-accent dark:bg-brand-accent-dark text-white px-1.5 py-0.5 rounded-full">{wishlist.length}</span>}
          </button>
        </div>
      )}
    </header>
  );
}
