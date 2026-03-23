import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";

interface HeaderProps {
  subtitle?: string;
}

export default function Header({ subtitle = "Hand-poured • Travel-inspired scents" }: HeaderProps) {
  const { totalQty, wishlist, setCartOpen, setWishlistOpen, hideToast } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const openCart = () => { hideToast(); setCartOpen(true); setMobileOpen(false); };
  const openWishlist = () => { hideToast(); setWishlistOpen(true); setMobileOpen(false); };

  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur-md bg-brand-bg/80 dark:bg-brand-bg-dark/80 border-b border-brand-line dark:border-brand-line-dark">
      <div className="max-w-[1100px] mx-auto px-4 h-20 flex items-center justify-between gap-4">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 no-underline">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="Aromamor logo"
            className="w-12 h-12 rounded-2xl object-cover"
          />
          <div>
            <div className="text-base font-semibold tracking-wide text-brand-text dark:text-brand-text-dark">Aromamor</div>
            <div className="text-xs text-brand-muted dark:text-brand-muted-dark">{subtitle}</div>
          </div>
        </Link>

        {/* Center nav — desktop only */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/#collection" className="px-4 py-2 text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition rounded-lg">Shop</Link>
          <Link to="/about" className="px-4 py-2 text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition rounded-lg">About Us</Link>
          <Link to="/reviews" className="px-4 py-2 text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition rounded-lg">Reviews</Link>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1">
          {/* Wishlist — desktop */}
          <button
            className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
            onClick={openWishlist}
            type="button"
            aria-label="Wishlist"
          >
            ❤️
            {wishlist.length > 0 && (
              <span className="min-w-[18px] h-[18px] rounded-full bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-[10px] font-bold flex items-center justify-center px-1">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition"
            onClick={openCart}
            type="button"
            aria-label="Cart"
          >
            <i className="bi bi-cart" />
            {totalQty > 0 && (
              <span className="min-w-[18px] h-[18px] rounded-full bg-white/30 text-white text-[10px] font-bold flex items-center justify-center px-1">
                {totalQty}
              </span>
            )}
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
          <Link className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition" to="/#collection" onClick={() => setMobileOpen(false)}>✈️ Shop Collection</Link>
          <Link className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition" to="/reviews" onClick={() => setMobileOpen(false)}>⭐ Reviews</Link>
          <Link className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition" to="/about" onClick={() => setMobileOpen(false)}>🕯️ About</Link>
          <Link className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition" to="/checkout" onClick={() => setMobileOpen(false)}>🛍️ Checkout</Link>
          <button className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-left flex items-center justify-between" onClick={openWishlist} type="button">
            ❤️ Wishlist
            {wishlist.length > 0 && <span className="text-xs bg-brand-accent dark:bg-brand-accent-dark text-white px-1.5 py-0.5 rounded-full">{wishlist.length}</span>}
          </button>
        </div>
      )}
    </header>
  );
}
