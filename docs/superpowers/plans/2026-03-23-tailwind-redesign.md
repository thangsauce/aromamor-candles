# Tailwind Redesign + Dark/Light Mode Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate Aromamor from custom CSS to Tailwind CSS v4, add a persistent dark/light mode toggle, and redesign all pages to match the Figma templates — preserving all existing React logic.

**Architecture:** Install Tailwind v4 via `@tailwindcss/vite` (no PostCSS config needed), replace `globals.css` with Tailwind directives + brand color tokens, add a `ThemeContext` that toggles the `dark` class on `<html>`, then rewrite each component/page with Tailwind utility classes following the phased order below.

**Tech Stack:** React 19, TypeScript, Vite 6, Tailwind CSS v4, react-router-dom v7

---

## File Map

| File | Action |
|------|--------|
| `frontend/package.json` | Add `tailwindcss`, `@tailwindcss/vite` |
| `frontend/vite.config.ts` | Add `tailwindcss()` to plugins |
| `frontend/src/styles/globals.css` | Replace entire content |
| `frontend/src/index.css` | Delete |
| `frontend/src/App.css` | Delete |
| `frontend/src/store/ThemeContext.tsx` | Create new |
| `frontend/src/App.tsx` | Wrap with ThemeProvider |
| `frontend/src/components/Header.tsx` | Full rewrite |
| `frontend/src/components/Footer.tsx` | Full rewrite |
| `frontend/src/components/Overlay.tsx` | Restyle |
| `frontend/src/components/Toast.tsx` | Restyle |
| `frontend/src/components/CartDrawer.tsx` | Restyle |
| `frontend/src/components/WishlistDrawer.tsx` | Restyle |
| `frontend/src/components/StarRating.tsx` | Restyle |
| `frontend/src/types/index.ts` | Add `image?: string` to Product |
| `frontend/src/components/ProductCard.tsx` | Full rewrite |
| `frontend/src/pages/ShopPage.tsx` | Full rewrite |
| `frontend/src/pages/AboutPage.tsx` | Full rewrite |
| `frontend/src/pages/ReviewsPage.tsx` | Restyle |
| `frontend/src/pages/CheckoutPage.tsx` | Restyle |
| `frontend/src/pages/ConfirmationPage.tsx` | Restyle |
| `frontend/public/placeholder-hero.jpg` | Add placeholder image |
| `frontend/public/placeholder-candles.jpg` | Add placeholder image |
| `frontend/public/placeholder-oils.jpg` | Add placeholder image |
| `frontend/public/placeholder-gifts.jpg` | Add placeholder image |

---

## Task 1: Tailwind v4 Setup

**Files:**
- Modify: `frontend/vite.config.ts`
- Modify: `frontend/src/styles/globals.css`
- Delete: `frontend/src/index.css`, `frontend/src/App.css`

> ⚠️ After this task the app will look visually broken until Task 3 (Header/Footer) is done. That is expected.

- [ ] **Step 1: Install Tailwind v4**

Run inside `frontend/`:
```bash
cd frontend && npm install tailwindcss @tailwindcss/vite
```
Expected: `tailwindcss` and `@tailwindcss/vite` appear in `package.json` devDependencies.

- [ ] **Step 2: Update `vite.config.ts`**

Replace the entire file:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/aromamor-candles/",
})
```

- [ ] **Step 3: Replace `src/styles/globals.css`**

Replace the entire file content with:
```css
@import "tailwindcss";

/*
  Class-based dark mode for Tailwind v4.
  Overrides the built-in `dark` variant (which defaults to prefers-color-scheme)
  with a class selector. Add `dark` class to <html> to activate dark mode.
*/
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-brand-bg: #faf8f4;
  --color-brand-bg-dark: #0f0f12;
  --color-brand-card: #ffffff;
  --color-brand-card-dark: #17171d;
  --color-brand-text: #2c1810;
  --color-brand-text-dark: #f3f3f5;
  --color-brand-muted: #8b7355;
  --color-brand-muted-dark: #b8b8c2;
  --color-brand-accent: #c4956a;
  --color-brand-accent-dark: #ffd27d;
  --color-brand-line: #e8e0d4;
  --color-brand-line-dark: #2a2a35;
}

body {
  @apply bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark;
  @apply min-h-screen antialiased;
}
```

- [ ] **Step 4: Delete scaffold CSS files**

Run from the **repo root** (not inside `frontend/`):
```bash
rm frontend/src/index.css frontend/src/App.css
```
These files are confirmed not imported anywhere — they are leftover Vite scaffold files that would conflict with Tailwind's preflight.

- [ ] **Step 5: Verify dev server starts**

```bash
cd frontend && npm run dev
```
Expected: Server starts at `http://localhost:5173` with no console errors. The app will look unstyled — that is correct at this stage.

- [ ] **Step 6: Commit**

```bash
git add frontend/package.json frontend/vite.config.ts frontend/src/styles/globals.css
git rm frontend/src/index.css frontend/src/App.css
git commit -m "feat: install Tailwind v4, replace globals.css with theme tokens"
```

---

## Task 2: ThemeContext + App.tsx

**Files:**
- Create: `frontend/src/store/ThemeContext.tsx`
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: Create `src/store/ThemeContext.tsx`**

```tsx
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("aromamor-theme");
    return stored === "light" || stored === "dark" ? stored : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("aromamor-theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
```

- [ ] **Step 2: Update `src/App.tsx`**

Replace entire file:
```tsx
import { HashRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./store/StoreContext";
import { ThemeProvider } from "./store/ThemeContext";
import ShopPage from "./pages/ShopPage";
import CheckoutPage from "./pages/CheckoutPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import ReviewsPage from "./pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import Overlay from "./components/Overlay";
import Toast from "./components/Toast";
import "./styles/globals.css";

export default function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <StoreProvider>
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          <Overlay />
          <CartDrawer />
          <WishlistDrawer />
          <Toast />
        </StoreProvider>
      </HashRouter>
    </ThemeProvider>
  );
}
```

- [ ] **Step 3: Verify toggle works**

Open browser at `http://localhost:5173`. Open DevTools → Console. Run:
```js
document.documentElement.classList.toggle('dark')
```
Expected: `dark` class appears/disappears on `<html>`. Background color should shift between `#faf8f4` (light) and `#0f0f12` (dark).

Also verify localStorage: open DevTools → Application → Local Storage → `http://localhost:5173`. After toggle, key `aromamor-theme` should appear.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/store/ThemeContext.tsx frontend/src/App.tsx
git commit -m "feat: add ThemeContext with dark/light toggle + localStorage persistence"
```

---

## Task 3: Header

**Files:**
- Modify: `frontend/src/components/Header.tsx`

- [ ] **Step 1: Replace entire `Header.tsx`**

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { useTheme } from "../store/ThemeContext";

interface HeaderProps {
  subtitle?: string;
}

export default function Header({ subtitle = "Hand-poured • Travel-inspired scents" }: HeaderProps) {
  const { totalQty, wishlist, setCartOpen, setWishlistOpen, hideToast } = useStore();
  const { theme, toggle } = useTheme();
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

          {/* Theme toggle */}
          <button
            className="px-3 py-2 rounded-lg text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
            onClick={toggle}
            type="button"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
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
          <button className="px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-left" onClick={toggle} type="button">
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify**

In the browser: desktop nav shows Shop / About Us / Reviews in center. Theme toggle button (sun/moon) appears. Click toggle — background switches between cream and dark. Open hamburger on mobile — menu slides in with all links + theme toggle row.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/Header.tsx
git commit -m "feat: redesign Header with Tailwind, add theme toggle, move About Us to center nav"
```

---

## Task 4: Footer

**Files:**
- Modify: `frontend/src/components/Footer.tsx`

- [ ] **Step 1: Replace entire `Footer.tsx`**

```tsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-brand-card dark:bg-brand-card-dark border-t border-brand-line dark:border-brand-line-dark mt-auto">
      <div className="max-w-[1100px] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Col 1: Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Aromamor logo" className="w-10 h-10 rounded-xl object-cover" />
            <span className="font-semibold text-brand-text dark:text-brand-text-dark">Aromamor</span>
          </div>
          <p className="text-xs text-brand-muted dark:text-brand-muted-dark">Hand-poured • Travel-inspired scents</p>
        </div>

        {/* Col 2: Shop */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Shop</div>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/#collection">All Candles</Link>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/#collection">New Arrivals</Link>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/#collection">Bestsellers</Link>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/reviews">⭐ Reviews</Link>
        </div>

        {/* Col 3: Info */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Info</div>
          <Link className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" to="/about">About Us</Link>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Shipping &amp; Returns</a>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Candle Care</a>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">FAQ</a>
        </div>

        {/* Col 4: Contact */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Contact</div>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="mailto:ImAmunch@ucf.edu">ImAmunch@ucf.edu</a>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Instagram</a>
          <a className="text-sm text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">TikTok</a>
        </div>
      </div>

      <div className="border-t border-brand-line dark:border-brand-line-dark">
        <div className="max-w-[1100px] mx-auto px-4 py-4 flex flex-wrap justify-between gap-2">
          <p className="text-xs text-brand-muted dark:text-brand-muted-dark">© 2026 Aromamor. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="text-xs text-brand-muted dark:text-brand-muted-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Privacy Policy</a>
            <a className="text-xs text-brand-muted dark:text-brand-muted-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify**

Visit any page. Footer shows 4 columns on desktop (brand · Shop · Info · Contact), stacks vertically on mobile. Both themes look correct.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/Footer.tsx
git commit -m "feat: redesign Footer with Tailwind, 4-column grid"
```

---

## Task 5: Overlay + Toast

**Files:**
- Modify: `frontend/src/components/Overlay.tsx`
- Modify: `frontend/src/components/Toast.tsx`

- [ ] **Step 1: Replace `Overlay.tsx`**

```tsx
import { useStore } from "../store/StoreContext";

export default function Overlay() {
  const { cartOpen, wishlistOpen, setCartOpen, setWishlistOpen } = useStore();
  const isOpen = cartOpen || wishlistOpen;

  return (
    <div
      className={`fixed inset-0 bg-black/40 dark:bg-black/60 z-30 transition-opacity duration-200 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => {
        if (wishlistOpen) setWishlistOpen(false);
        else setCartOpen(false);
      }}
    />
  );
}
```

- [ ] **Step 2: Replace `Toast.tsx`**

```tsx
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";

export default function Toast() {
  const { toast, hideToast, setCartOpen } = useStore();

  if (!toast.visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 min-w-[260px] max-w-xs px-5 py-4 rounded-2xl shadow-xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark text-sm"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start justify-between gap-4 mb-1">
        <b className="text-brand-text dark:text-brand-text-dark">{toast.title}</b>
        <button
          className="text-brand-muted dark:text-brand-muted-dark hover:text-brand-text dark:hover:text-brand-text-dark transition flex-shrink-0"
          onClick={hideToast}
          type="button"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="text-brand-muted dark:text-brand-muted-dark text-xs mb-3">{toast.body}</div>
      <div className="flex gap-2">
        <button
          className="flex-1 px-3 py-2 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm"
          onClick={() => { hideToast(); setCartOpen(true); }}
          type="button"
        >
          View Cart
        </button>
        <Link
          className="flex-1 px-3 py-2 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition text-sm text-center"
          to="/checkout"
          onClick={hideToast}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

Add a product to cart. Toast should appear at bottom-center with correct colors in both themes. Overlay should dim the page when cart/wishlist drawer is open.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/Overlay.tsx frontend/src/components/Toast.tsx
git commit -m "feat: restyle Overlay and Toast with Tailwind"
```

---

## Task 6: CartDrawer + WishlistDrawer

**Files:**
- Modify: `frontend/src/components/CartDrawer.tsx`
- Modify: `frontend/src/components/WishlistDrawer.tsx`

- [ ] **Step 1: Replace `CartDrawer.tsx`**

```tsx
import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { CATALOG } from "../store/catalog";
import { money } from "../store/hooks";

export default function CartDrawer() {
  const { cart, setQty, clearCart, subtotal, totalQty, cartOpen, setCartOpen } = useStore();
  const entries = Object.entries(cart).filter(([id]) => CATALOG[id]);

  return (
    <aside
      className={`fixed inset-y-0 right-0 w-full max-w-sm bg-brand-card dark:bg-brand-card-dark border-l border-brand-line dark:border-brand-line-dark shadow-2xl z-40 flex flex-col transition-transform duration-300 ${
        cartOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal
      aria-label="Shopping cart"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-brand-line dark:border-brand-line-dark flex-shrink-0">
        <h3 className="font-semibold text-brand-text dark:text-brand-text-dark">Your Cart</h3>
        <button
          className="text-brand-muted dark:text-brand-muted-dark hover:text-brand-text dark:hover:text-brand-text-dark transition"
          onClick={() => setCartOpen(false)}
          type="button"
          aria-label="Close cart"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {entries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-muted dark:text-brand-muted-dark">Your cart is empty.</p>
            <p className="text-brand-muted dark:text-brand-muted-dark text-xs mt-1">Add a candle to start your journey ✈️</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4" aria-label="Cart items">
            {entries.map(([id, item]) => {
              const p = CATALOG[id];
              return (
                <li key={id} className="flex flex-col gap-2 pb-4 border-b border-brand-line dark:border-brand-line-dark last:border-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">{p.name}</h4>
                      <p className="text-xs text-brand-muted dark:text-brand-muted-dark">{p.mood} • {p.destination}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-brand-muted dark:text-brand-muted-dark">{money(p.price)}</div>
                      <button className="text-xs text-red-500 hover:text-red-600 transition mt-1" onClick={() => setQty(id, 0)} type="button">Remove</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm flex items-center justify-center" onClick={() => setQty(id, item.qty - 1)} type="button">−</button>
                      <span className="w-5 text-center text-sm text-brand-text dark:text-brand-text-dark">{item.qty}</span>
                      <button className="w-7 h-7 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm flex items-center justify-center" onClick={() => setQty(id, item.qty + 1)} type="button">+</button>
                    </div>
                    <span className="text-xs text-brand-muted dark:text-brand-muted-dark">Total: <b className="text-brand-text dark:text-brand-text-dark">{money(p.price * item.qty)}</b></span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="px-5 py-4 border-t border-brand-line dark:border-brand-line-dark flex flex-col gap-3 flex-shrink-0">
        <div className="flex justify-between items-center">
          <span className="text-brand-muted dark:text-brand-muted-dark text-sm">Total</span>
          <span className="font-semibold text-brand-text dark:text-brand-text-dark">{money(subtotal)}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="flex-1 px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm disabled:opacity-40"
            onClick={clearCart}
            type="button"
            disabled={totalQty === 0}
          >
            Clear
          </button>
          <Link
            className="flex-1 px-4 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition text-sm text-center"
            to="/checkout"
            onClick={() => setCartOpen(false)}
          >
            Checkout
          </Link>
        </div>
        <p className="text-xs text-brand-muted dark:text-brand-muted-dark text-center">(Demo cart) Hook this to a payment system later.</p>
      </div>
    </aside>
  );
}
```

- [ ] **Step 2: Replace `WishlistDrawer.tsx`**

```tsx
import { useStore } from "../store/StoreContext";
import { CATALOG } from "../store/catalog";
import { money } from "../store/hooks";

export default function WishlistDrawer() {
  const { wishlist, toggleWishlist, clearWishlist, wishlistOpen, setWishlistOpen, addToCart, setCartOpen, showToast } = useStore();

  const addAll = () => {
    const inStock = wishlist.filter((id) => CATALOG[id]?.inStock);
    inStock.forEach((id) => addToCart(id, 1));
    if (inStock.length > 0) {
      setWishlistOpen(false);
      setCartOpen(false);
      showToast(
        `${inStock.length} item${inStock.length > 1 ? "s" : ""} added to cart`,
        "From your wishlist"
      );
    }
  };

  return (
    <aside
      className={`fixed inset-y-0 right-0 w-full max-w-sm bg-brand-card dark:bg-brand-card-dark border-l border-brand-line dark:border-brand-line-dark shadow-2xl z-40 flex flex-col transition-transform duration-300 ${
        wishlistOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal
      aria-label="Wishlist"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-brand-line dark:border-brand-line-dark flex-shrink-0">
        <h3 className="font-semibold text-brand-text dark:text-brand-text-dark">❤️ Wishlist</h3>
        <button
          className="text-brand-muted dark:text-brand-muted-dark hover:text-brand-text dark:hover:text-brand-text-dark transition"
          onClick={() => setWishlistOpen(false)}
          type="button"
          aria-label="Close wishlist"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-muted dark:text-brand-muted-dark">No saved items yet.</p>
            <p className="text-brand-muted dark:text-brand-muted-dark text-xs mt-1">Tap the ♡ on any candle to save it ✈️</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4" aria-label="Wishlist items">
            {wishlist.map((id) => {
              const p = CATALOG[id];
              if (!p) return null;
              return (
                <li key={id} className="flex flex-col gap-2 pb-4 border-b border-brand-line dark:border-brand-line-dark last:border-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">{p.name}</h4>
                      <p className="text-xs text-brand-muted dark:text-brand-muted-dark">{p.mood} • {p.destination}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-xs text-brand-muted dark:text-brand-muted-dark">{money(p.price)}</div>
                      <button className="text-xs text-red-500 hover:text-red-600 transition mt-1" onClick={() => toggleWishlist(id)} type="button">Remove</button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium ${p.inStock ? "text-green-600 dark:text-green-400" : "text-brand-muted dark:text-brand-muted-dark"}`}>
                      {p.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    {p.inStock && (
                      <button
                        className="px-3 py-1.5 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-xs"
                        onClick={() => addToCart(id, 1)}
                        type="button"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="px-5 py-4 border-t border-brand-line dark:border-brand-line-dark flex gap-2 flex-shrink-0">
        <button
          className="flex-1 px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm"
          onClick={clearWishlist}
          type="button"
        >
          Clear All
        </button>
        <button
          className="flex-1 px-4 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition text-sm"
          onClick={addAll}
          type="button"
        >
          Add All to Cart
        </button>
      </div>
    </aside>
  );
}
```

- [ ] **Step 3: Verify**

Open cart drawer and wishlist drawer. Verify: slide-in animation works, items display correctly, qty controls work, both drawers look correct in light and dark mode.

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/CartDrawer.tsx frontend/src/components/WishlistDrawer.tsx
git commit -m "feat: restyle CartDrawer and WishlistDrawer with Tailwind"
```

---

## Task 7: StarRating + types + ProductCard

**Files:**
- Modify: `frontend/src/components/StarRating.tsx`
- Modify: `frontend/src/types/index.ts`
- Modify: `frontend/src/components/ProductCard.tsx`

- [ ] **Step 1: Update `StarRating.tsx`**

```tsx
interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export default function StarRating({
  rating,
  max = 5,
  size = 16,
  interactive = false,
  onChange,
}: StarRatingProps) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <span className="inline-flex gap-0.5 items-center">
      {stars.map((star) => {
        const filled = star <= Math.round(rating);
        return (
          <span
            key={star}
            onClick={() => interactive && onChange?.(star)}
            style={{ fontSize: size, lineHeight: 1 }}
            className={`transition-colors duration-100 ${
              filled
                ? "text-brand-accent dark:text-brand-accent-dark"
                : "text-brand-line dark:text-brand-line-dark"
            } ${interactive ? "cursor-pointer" : "cursor-default"}`}
            title={interactive ? `${star} star${star !== 1 ? "s" : ""}` : undefined}
          >
            ★
          </span>
        );
      })}
    </span>
  );
}
```

- [ ] **Step 2: Add `image?` to `src/types/index.ts`**

Add `image?: string;` to the `Product` interface:
```ts
export interface Product {
  id: string;
  name: string;
  destination: string;
  mood: string;
  scents: string[];
  price: number;
  inStock: boolean;
  tag: string;
  image?: string;   // ← add this line
}
```

- [ ] **Step 3: Replace `ProductCard.tsx`**

```tsx
import { useState } from "react";
import type { Product } from "../types";
import { useStore } from "../store/StoreContext";
import { money } from "../store/hooks";

const MOOD_GRADIENTS: Record<string, string> = {
  "Tropical Warmth": "from-amber-300 to-orange-400",
  "Cozy & Romantic": "from-rose-300 to-amber-400",
  "Coastal Escape": "from-sky-300 to-teal-400",
  "Sophisticated & Calm": "from-stone-400 to-amber-600",
  "Peaceful & Reflective": "from-purple-300 to-indigo-400",
  "Charmingly Vibrant": "from-yellow-300 to-lime-400",
};

const asset = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product: p }: ProductCardProps) {
  const [qty, setQty] = useState(1);
  const { addToCart, toggleWishlist, isWishlisted, showToast } = useStore();
  const wishlisted = isWishlisted(p.id);
  const gradient = MOOD_GRADIENTS[p.mood] ?? "from-amber-200 to-stone-300";

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
    <article className={`rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm overflow-hidden flex flex-col ${!p.inStock ? "opacity-75" : ""}`}>
      {/* Image / gradient placeholder */}
      {p.image ? (
        <img src={asset(p.image)} alt={p.name} className="w-full aspect-square object-cover" />
      ) : (
        <div className={`w-full aspect-square bg-gradient-to-br ${gradient}`} />
      )}

      {/* Card body */}
      <div className="flex flex-col gap-3 p-4 flex-1">
        {/* Name + wishlist + tag */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="font-semibold text-brand-text dark:text-brand-text-dark">{p.name}</h4>
            <p className="text-xs text-brand-muted dark:text-brand-muted-dark mt-0.5">{p.mood}</p>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0 mt-0.5">
            <button
              className={`text-xl leading-none transition ${
                wishlisted
                  ? "text-red-500"
                  : "text-brand-muted dark:text-brand-muted-dark hover:text-red-400"
              }`}
              onClick={() => toggleWishlist(p.id)}
              type="button"
              aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            >
              {wishlisted ? "♥" : "♡"}
            </button>
            {p.inStock ? (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-accent/20 dark:bg-brand-accent-dark/20 text-brand-accent dark:text-brand-accent-dark">
                {p.tag || "SIGNATURE"}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                OUT OF STOCK
              </span>
            )}
          </div>
        </div>

        {/* Destination */}
        <p className="text-xs text-brand-muted dark:text-brand-muted-dark">
          <span className="font-medium text-brand-text dark:text-brand-text-dark">Destination:</span> {p.destination}
        </p>

        {/* Scent chips */}
        <div className="flex flex-wrap gap-1.5">
          {p.scents.map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-full text-xs border border-brand-line dark:border-brand-line-dark text-brand-muted dark:text-brand-muted-dark"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Price + add to cart */}
        <div className="mt-auto pt-2 flex items-end justify-between gap-2">
          <div>
            <p className="text-lg font-bold text-brand-text dark:text-brand-text-dark">{money(p.price)}</p>
            <p className="text-xs text-brand-muted dark:text-brand-muted-dark">8oz • Soy blend</p>
          </div>
          {p.inStock ? (
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  className="w-7 h-7 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm flex items-center justify-center"
                  onClick={() => setQty((q) => Math.max(q - 1, 1))}
                  type="button"
                >
                  −
                </button>
                <span className="w-5 text-center text-sm text-brand-text dark:text-brand-text-dark">{qty}</span>
                <button
                  className="w-7 h-7 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm flex items-center justify-center"
                  onClick={() => setQty((q) => Math.min(q + 1, 10))}
                  type="button"
                >
                  +
                </button>
              </div>
              <button
                className="px-4 py-2 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition text-sm"
                onClick={handleAdd}
                type="button"
              >
                Add to Cart
              </button>
            </div>
          ) : (
            <button
              className="px-4 py-2 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-muted dark:text-brand-muted-dark text-sm cursor-not-allowed"
              type="button"
              disabled
            >
              Notify Me
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: Verify**

Visit the shop page. Product cards show gradient placeholders (no image files needed yet). Mood gradients match the mapping. Wishlist toggle, qty controls, Add to Cart all work. Both themes look correct.

- [ ] **Step 5: Commit**

```bash
git add frontend/src/types/index.ts frontend/src/components/StarRating.tsx frontend/src/components/ProductCard.tsx
git commit -m "feat: add image field to Product, redesign ProductCard with mood gradients"
```

---

## Task 8: Shop Page

**Files:**
- Modify: `frontend/src/pages/ShopPage.tsx`

> Team note: Tasks 8–12 are independent and can be done in parallel by different team members after Task 7 is merged.

- [ ] **Step 1: Replace entire `ShopPage.tsx`**

```tsx
import { useState, useMemo } from "react";
import { CATALOG } from "../store/catalog";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

type SortKey = "name-asc" | "name-desc" | "mood-asc" | "mood-desc" | "price-asc" | "price-desc";

const asset = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;
const HERO_GRADIENT = "bg-gradient-to-br from-amber-100 to-stone-300 dark:from-amber-900/40 dark:to-stone-800";

const CATEGORY_CARDS = [
  { label: "Scented Candles", subtitle: "Warm. Hand poured. Irresistible.", image: "placeholder-candles.jpg" },
  { label: "Essential Oils", subtitle: "Nature's essence in a bottle.", image: "placeholder-oils.jpg" },
  { label: "Gift Sets", subtitle: "Perfectly paired for any occasion.", image: "placeholder-gifts.jpg" },
];

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark text-brand-text dark:text-brand-text-dark placeholder-brand-muted dark:placeholder-brand-muted-dark focus:outline-none focus:ring-2 focus:ring-brand-accent dark:focus:ring-brand-accent-dark text-sm";

export default function ShopPage() {
  const [mood, setMood] = useState("all");
  const [sort, setSort] = useState<SortKey>("name-asc");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allProducts = useMemo(() => Object.values(CATALOG), []);
  const moods = useMemo(() => [...new Set(allProducts.map((p) => p.mood))].sort(), [allProducts]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return allProducts
      .filter((p) => {
        const moodOk = mood === "all" || p.mood === mood;
        const stockOk = !inStockOnly || p.inStock;
        const haystack = [p.name, p.destination, p.mood, ...p.scents].join(" ").toLowerCase();
        const searchOk = !q || haystack.includes(q);
        return moodOk && stockOk && searchOk;
      })
      .sort((a, b) => {
        switch (sort) {
          case "name-asc": return a.name.localeCompare(b.name);
          case "name-desc": return b.name.localeCompare(a.name);
          case "mood-asc": return a.mood.localeCompare(b.mood) || a.name.localeCompare(b.name);
          case "mood-desc": return b.mood.localeCompare(a.mood) || a.name.localeCompare(b.name);
          case "price-asc": return a.price - b.price;
          case "price-desc": return b.price - a.price;
          default: return 0;
        }
      });
  }, [allProducts, mood, sort, inStockOnly, search]);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-brand-card dark:bg-brand-card-dark border-b border-brand-line dark:border-brand-line-dark">
          <div className="max-w-[1100px] mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-brand-accent dark:text-brand-accent-dark text-sm font-semibold uppercase tracking-widest mb-3">
                ✈️ Destinations in a candle
              </p>
              <h1 className="text-4xl md:text-5xl font-bold text-brand-text dark:text-brand-text-dark leading-tight mb-4">
                Transform Your Space,<br />Elevate Your Mood
              </h1>
              <p className="text-brand-muted dark:text-brand-muted-dark mb-8 max-w-md">
                Each candle captures a destination, a mood, and a signature blend of notes.
              </p>
              <a
                href="#collection"
                className="inline-block px-6 py-3 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition"
              >
                Shop the Collection
              </a>
            </div>
            <div className={`rounded-2xl overflow-hidden aspect-[4/3] ${HERO_GRADIENT}`}>
              <img
                src={asset("placeholder-hero.jpg")}
                alt="Aromamor candles"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          </div>
        </section>

        {/* Category strip */}
        <section className="max-w-[1100px] mx-auto px-4 py-12">
          <h2 className="text-center text-2xl font-bold text-brand-text dark:text-brand-text-dark mb-8">Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORY_CARDS.map((cat) => (
              <a
                key={cat.label}
                href="#collection"
                className="group rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className={`aspect-square overflow-hidden ${HERO_GRADIENT}`}>
                  <img
                    src={asset(cat.image)}
                    alt={cat.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-brand-text dark:text-brand-text-dark">{cat.label}</h3>
                  <p className="text-xs text-brand-muted dark:text-brand-muted-dark mt-0.5">{cat.subtitle}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Product grid */}
        <section className="max-w-[1100px] mx-auto px-4 pb-16" id="collection">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-text dark:text-brand-text-dark">Signature Collection</h2>
            <p className="text-brand-muted dark:text-brand-muted-dark mt-1">Destination · Mood · Notes</p>
          </div>

          {/* Filters toggle */}
          <div className="mb-4">
            <button
              className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition ${
                filtersOpen
                  ? "bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark border-transparent"
                  : "border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"
              }`}
              onClick={() => setFiltersOpen((v) => !v)}
              type="button"
            >
              {filtersOpen ? "✕ Close Filters" : "⚙️ Filters & Sort"}
            </button>
          </div>

          {/* Filters panel */}
          {filtersOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-4 rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium" htmlFor="moodFilter">Mood</label>
                <select id="moodFilter" className={inputClass} value={mood} onChange={(e) => setMood(e.target.value)}>
                  <option value="all">All moods</option>
                  {moods.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium" htmlFor="sortSelect">Sort</label>
                <select id="sortSelect" className={inputClass} value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
                  <option value="name-asc">Name (A → Z)</option>
                  <option value="name-desc">Name (Z → A)</option>
                  <option value="mood-asc">Mood (A → Z)</option>
                  <option value="mood-desc">Mood (Z → A)</option>
                  <option value="price-asc">Price (Low → High)</option>
                  <option value="price-desc">Price (High → Low)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium" htmlFor="searchInput">Search</label>
                <input
                  id="searchInput"
                  type="text"
                  className={inputClass}
                  placeholder="Search by name, destination, scent..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5 justify-end">
                <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium">Availability</label>
                <label className="flex items-center gap-2 cursor-pointer py-2">
                  <input
                    type="checkbox"
                    className="accent-brand-accent"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span className="text-sm text-brand-text dark:text-brand-text-dark">In stock only</span>
                </label>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Hero section shows 2-column layout on desktop. Category strip shows 3 cards. Product grid filters work. Both themes render correctly.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/ShopPage.tsx
git commit -m "feat: redesign ShopPage with hero, category strip, and Tailwind grid"
```

---

## Task 9: About Page

**Files:**
- Modify: `frontend/src/pages/AboutPage.tsx`

- [ ] **Step 1: Replace entire `AboutPage.tsx`**

```tsx
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const asset = (filename: string) => `${import.meta.env.BASE_URL}${filename}`;
const HERO_GRADIENT = "from-amber-100 to-stone-300 dark:from-amber-900/40 dark:to-stone-800";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-brand-card dark:bg-brand-card-dark border-b border-brand-line dark:border-brand-line-dark">
          <div className="max-w-[1100px] mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br ${HERO_GRADIENT}`}>
              <img
                src={asset("placeholder-hero.jpg")}
                alt="Aromamor candles"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
            <div>
              <p className="text-brand-accent dark:text-brand-accent-dark text-sm font-semibold uppercase tracking-widest mb-3">🕯️ Our Story</p>
              <h1 className="text-4xl font-bold text-brand-text dark:text-brand-text-dark leading-tight mb-4">
                Made with intention,<br />poured with love.
              </h1>
              <p className="text-brand-muted dark:text-brand-muted-dark">
                Aromamor was born from a love of travel and the belief that a single scent can transport you anywhere in the world.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-[1100px] mx-auto px-4 py-16 flex flex-col gap-16">
          {/* Founder */}
          <section className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center text-3xl flex-shrink-0">
              ✈️
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold text-brand-text dark:text-brand-text-dark">Hi, I'm the founder of Aromamor</h2>
              <p className="text-brand-muted dark:text-brand-muted-dark text-sm">Every candle in our collection is inspired by a place I've dreamed of — or been lucky enough to visit. I started Aromamor because I wanted a way to hold onto those memories, to bring a little piece of the world into my home.</p>
              <p className="text-brand-muted dark:text-brand-muted-dark text-sm">Each scent is carefully crafted to capture not just a location, but a feeling — the warmth of a Parisian café on a rainy afternoon, the salt air of the Amalfi Coast at sunrise, the calm of a first-class lounge before a big trip.</p>
              <p className="text-brand-muted dark:text-brand-muted-dark text-sm">I hand-pour every candle in small batches using a clean soy blend, and I obsess over every note in every fragrance until it feels just right. This is more than a candle brand — it's a passport for your senses.</p>
              <div className="font-semibold text-brand-accent dark:text-brand-accent-dark">— The Founder</div>
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-2xl font-bold text-brand-text dark:text-brand-text-dark mb-8">What we stand for</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: "🌿", title: "Clean Ingredients", desc: "100% soy wax blend, phthalate-free fragrance oils, and cotton wicks. Nothing that shouldn't be in your home." },
                { icon: "🤲", title: "Hand-Poured", desc: "Every candle is poured in small batches by hand. No factories, no shortcuts — just care in every pour." },
                { icon: "✈️", title: "Travel-Inspired", desc: "Our scents are rooted in real places and real memories. Each one tells a story." },
                { icon: "💛", title: "Community First", desc: "We're a small business and every order means the world to us. Your support keeps us going." },
              ].map((v) => (
                <div key={v.title} className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm p-6 flex flex-col gap-3">
                  <div className="text-3xl">{v.icon}</div>
                  <h3 className="font-semibold text-brand-text dark:text-brand-text-dark">{v.title}</h3>
                  <p className="text-brand-muted dark:text-brand-muted-dark text-sm">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Candle care */}
          <section>
            <h2 className="text-2xl font-bold text-brand-text dark:text-brand-text-dark mb-8">Candle Care Tips</h2>
            <div className="flex flex-col gap-4">
              {[
                { icon: "🕯️", title: "First Burn", desc: "Always burn until the wax pool reaches the edge of the jar on the first use. This prevents tunneling and maximizes your burn time." },
                { icon: "✂️", title: "Trim Your Wick", desc: "Trim the wick to ¼ inch before every burn. This keeps the flame clean and your scent true." },
                { icon: "⏱️", title: "Burn Time", desc: "Never burn for more than 4 hours at a time. Let the candle cool for 2 hours before relighting." },
                { icon: "🚫", title: "Safety First", desc: "Keep away from drafts, children, and pets. Never leave a burning candle unattended." },
              ].map((tip) => (
                <div key={tip.title} className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm p-5 flex gap-5 items-start">
                  <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                  <div>
                    <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-1">{tip.title}</h3>
                    <p className="text-brand-muted dark:text-brand-muted-dark text-sm">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-brand-accent/10 dark:bg-brand-accent-dark/10 border border-brand-accent/20 dark:border-brand-accent-dark/20 p-10 text-center">
            <h2 className="text-2xl font-bold text-brand-text dark:text-brand-text-dark mb-3">Ready to find your destination?</h2>
            <p className="text-brand-muted dark:text-brand-muted-dark mb-6">Browse our full collection and find the scent that takes you there.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link className="px-6 py-3 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition" to="/">✈️ Shop All Candles</Link>
              <Link className="px-6 py-3 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition" to="/reviews">⭐ Read Reviews</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to `/about`. Hero shows 2-column layout (image left, text right on desktop). All 4 sections render. Both themes look correct. CTA buttons work.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/AboutPage.tsx
git commit -m "feat: redesign AboutPage with split hero and Tailwind sections"
```

---

## Task 10: Reviews Page

**Files:**
- Modify: `frontend/src/pages/ReviewsPage.tsx`

- [ ] **Step 1: Replace entire `ReviewsPage.tsx`**

Replace all custom CSS classNames with Tailwind equivalents. All existing logic stays identical — only class names change.

```tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { CATALOG } from "../store/catalog";
import { useReviews } from "../store/reviews";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StarRating from "../components/StarRating";

const ALL = "all";

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark text-brand-text dark:text-brand-text-dark placeholder-brand-muted dark:placeholder-brand-muted-dark focus:outline-none focus:ring-2 focus:ring-brand-accent dark:focus:ring-brand-accent-dark text-sm";

export default function ReviewsPage() {
  const { getReviews, addReview, deleteReview, avgRating, totalReviews } = useReviews();
  const [selected, setSelected] = useState<string>(ALL);
  const products = Object.values(CATALOG);

  const [formProduct, setFormProduct] = useState<string>(products[0]?.id ?? "");
  const [formAuthor, setFormAuthor] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formTitle.trim() || !formBody.trim()) return;
    addReview({ productId: formProduct, author: formAuthor.trim(), rating: formRating, title: formTitle.trim(), body: formBody.trim() });
    setFormAuthor(""); setFormRating(5); setFormTitle(""); setFormBody("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const displayProducts = selected === ALL ? products : products.filter((p) => p.id === selected);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-brand-card dark:bg-brand-card-dark border-b border-brand-line dark:border-brand-line-dark">
          <div className="max-w-[1100px] mx-auto px-4 py-12 text-center">
            <p className="text-brand-accent dark:text-brand-accent-dark text-sm font-semibold uppercase tracking-widest mb-3">⭐ Customer Reviews</p>
            <h1 className="text-3xl font-bold text-brand-text dark:text-brand-text-dark mb-3">What travelers are saying</h1>
            <p className="text-brand-muted dark:text-brand-muted-dark max-w-md mx-auto">Real reviews from real customers. Share your experience with Aromamor.</p>
          </div>
        </section>

        <div className="max-w-[1100px] mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

            {/* Sidebar */}
            <aside className="flex flex-col gap-4">
              {/* Filter */}
              <div className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm p-5">
                <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-4">Filter by Candle</h3>
                <div className="flex flex-col gap-1">
                  <button
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition ${selected === ALL ? "bg-brand-accent/20 dark:bg-brand-accent-dark/20 text-brand-accent dark:text-brand-accent-dark font-semibold" : "text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"}`}
                    onClick={() => setSelected(ALL)}
                    type="button"
                  >
                    <span>All Candles</span>
                    <span className="text-xs px-1.5 py-0.5 rounded-full bg-brand-line dark:bg-brand-line-dark text-brand-muted dark:text-brand-muted-dark">{products.reduce((s, p) => s + totalReviews(p.id), 0)}</span>
                  </button>
                  {products.map((p) => (
                    <button
                      key={p.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition text-left ${selected === p.id ? "bg-brand-accent/20 dark:bg-brand-accent-dark/20 text-brand-accent dark:text-brand-accent-dark font-semibold" : "text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"}`}
                      onClick={() => setSelected(p.id)}
                      type="button"
                    >
                      <div>
                        <div className="font-semibold text-[13px]">{p.name}</div>
                        {totalReviews(p.id) > 0 && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <StarRating rating={avgRating(p.id)} size={11} />
                            <span className="text-[11px] text-brand-muted dark:text-brand-muted-dark">{avgRating(p.id).toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-brand-line dark:bg-brand-line-dark text-brand-muted dark:text-brand-muted-dark flex-shrink-0">{totalReviews(p.id)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Write a Review */}
              <div className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm p-5">
                <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-4">Write a Review</h3>
                {submitted && (
                  <div className="mb-3 px-3 py-2 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm">
                    ✅ Review submitted! Thanks for your feedback.
                  </div>
                )}
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium">Candle</label>
                    <select className={inputClass} value={formProduct} onChange={(e) => setFormProduct(e.target.value)}>
                      {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium">Your Name</label>
                    <input required className={inputClass} placeholder="Jane D." value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium">Rating</label>
                    <div className="flex items-center gap-2">
                      <StarRating rating={formRating} size={28} interactive onChange={setFormRating} />
                      <span className="text-xs text-brand-muted dark:text-brand-muted-dark">{formRating} / 5</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium">Review Title</label>
                    <input required className={inputClass} placeholder="Absolutely love this scent!" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium">Your Review</label>
                    <textarea required className={`${inputClass} min-h-[80px] resize-y`} placeholder="Tell us about your experience..." value={formBody} onChange={(e) => setFormBody(e.target.value)} />
                  </div>
                  <button className="w-full px-5 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition" type="submit">
                    Submit Review
                  </button>
                </form>
              </div>
            </aside>

            {/* Review list */}
            <div className="flex flex-col gap-6">
              {displayProducts.map((p) => {
                const reviews = getReviews(p.id);
                const avg = avgRating(p.id);
                return (
                  <section key={p.id} className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm overflow-hidden">
                    <div className="flex items-start justify-between gap-4 p-5 border-b border-brand-line dark:border-brand-line-dark">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-brand-text dark:text-brand-text-dark">{p.name}</h3>
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-accent/20 dark:bg-brand-accent-dark/20 text-brand-accent dark:text-brand-accent-dark">{p.tag}</span>
                        </div>
                        <p className="text-xs text-brand-muted dark:text-brand-muted-dark mt-1">{p.mood} • {p.destination}</p>
                        {reviews.length > 0 ? (
                          <div className="flex items-center gap-2 mt-2">
                            <StarRating rating={avg} size={16} />
                            <span className="font-bold text-sm text-brand-text dark:text-brand-text-dark">{avg.toFixed(1)}</span>
                            <span className="text-xs text-brand-muted dark:text-brand-muted-dark">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
                          </div>
                        ) : (
                          <p className="text-xs text-brand-muted dark:text-brand-muted-dark mt-2">No reviews yet — be the first!</p>
                        )}
                      </div>
                      <Link className="flex-shrink-0 px-4 py-2 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm whitespace-nowrap" to="/">Shop This Candle</Link>
                    </div>
                    <div className="p-5">
                      {reviews.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {reviews.map((r) => (
                            <div key={r.id} className="rounded-xl border border-brand-line dark:border-brand-line-dark p-4">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                  <StarRating rating={r.rating} size={14} />
                                  <h4 className="font-semibold text-sm text-brand-text dark:text-brand-text-dark mt-1">{r.title}</h4>
                                </div>
                                <button className="text-brand-muted dark:text-brand-muted-dark hover:text-red-500 transition text-sm flex-shrink-0" onClick={() => deleteReview(p.id, r.id)} type="button" title="Delete review">✕</button>
                              </div>
                              <p className="text-sm text-brand-muted dark:text-brand-muted-dark mb-2">{r.body}</p>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-medium text-brand-text dark:text-brand-text-dark">— {r.author}</span>
                                <span className="text-xs text-brand-muted dark:text-brand-muted-dark">{new Date(r.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-brand-muted dark:text-brand-muted-dark text-sm mb-3">No reviews for this candle yet.</p>
                          <button className="px-4 py-2 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm" type="button" onClick={() => { setFormProduct(p.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>✍️ Write the first review</button>
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to `/reviews`. Sidebar filter works. Write a Review form submits correctly. Reviews show in right column. Both themes look correct.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/ReviewsPage.tsx
git commit -m "feat: restyle ReviewsPage with Tailwind"
```

---

## Task 11: Checkout Page

**Files:**
- Modify: `frontend/src/pages/CheckoutPage.tsx`

- [ ] **Step 1: Replace `CheckoutPage.tsx`**

Replace every `className="..."` reference, replacing custom CSS classes with Tailwind. All logic is unchanged.

```tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { CATALOG } from "../store/catalog";
import { money, SHIPPING_FLAT } from "../store/hooks";
import type { Order } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inputClass = "w-full px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark text-brand-text dark:text-brand-text-dark placeholder-brand-muted dark:placeholder-brand-muted-dark focus:outline-none focus:ring-2 focus:ring-brand-accent dark:focus:ring-brand-accent-dark text-sm";

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
    if (fulfillment === "shipping" && address.trim().length < 8) { alert("Please enter a shipping address."); return; }
    const orderNum = String(Math.floor(100000 + Math.random() * 900000));
    const order: Order = { orderNum, items: entries.map(([id, item]) => ({ id, qty: item.qty })), subtotal, fulfillment, address: address.trim(), notes: notes.trim(), name: fullName.trim(), email: email.trim() };
    try { sessionStorage.setItem("aromamor_order", JSON.stringify(order)); } catch {}
    clearCart();
    navigate("/confirmation");
  };

  return (
    <>
      <Header subtitle="Checkout" />
      <main className="max-w-[1100px] mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-text dark:text-brand-text-dark">Checkout</h2>
          <p className="text-brand-muted dark:text-brand-muted-dark mt-1">Review your order and enter your details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <section className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm p-6">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h3 className="font-semibold text-brand-text dark:text-brand-text-dark">Order Summary</h3>
              <button className="px-3 py-1.5 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm disabled:opacity-40" onClick={clearCart} type="button" disabled={!hasItems}>Clear Cart</button>
            </div>

            {!hasItems ? (
              <div className="text-center py-8">
                <p className="text-brand-muted dark:text-brand-muted-dark text-sm">Your cart is empty.</p>
                <p className="text-brand-muted dark:text-brand-muted-dark text-xs mt-1">Go back and add a candle first.</p>
                <Link className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition text-sm" to="/">Shop Candles</Link>
              </div>
            ) : (
              <>
                <ul className="flex flex-col gap-4 mb-4">
                  {entries.map(([id, item]) => {
                    const p = CATALOG[id];
                    return (
                      <li key={id} className="flex flex-col gap-2 pb-4 border-b border-brand-line dark:border-brand-line-dark last:border-0">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">{p.name}</h4>
                            <p className="text-xs text-brand-muted dark:text-brand-muted-dark">{p.mood} • {p.destination}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-xs text-brand-muted dark:text-brand-muted-dark">{money(p.price)} each</div>
                            <button className="text-xs text-red-500 hover:text-red-600 transition mt-1" onClick={() => setQty(id, 0)} type="button">Remove</button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button className="w-7 h-7 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm flex items-center justify-center" onClick={() => setQty(id, item.qty - 1)} type="button">−</button>
                            <span className="w-5 text-center text-sm text-brand-text dark:text-brand-text-dark">{item.qty}</span>
                            <button className="w-7 h-7 rounded-lg border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm flex items-center justify-center" onClick={() => setQty(id, item.qty + 1)} type="button">+</button>
                          </div>
                          <span className="text-xs text-brand-muted dark:text-brand-muted-dark">Line: <b className="text-brand-text dark:text-brand-text-dark">{money(p.price * item.qty)}</b></span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="flex flex-col gap-2 pt-4 border-t border-brand-line dark:border-brand-line-dark">
                  <div className="flex justify-between text-sm"><span className="text-brand-muted dark:text-brand-muted-dark">Subtotal</span><span className="text-brand-text dark:text-brand-text-dark">{money(subtotal)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-brand-muted dark:text-brand-muted-dark">Shipping</span><span className="text-brand-text dark:text-brand-text-dark">{money(shipping)}</span></div>
                  <div className="flex justify-between pt-2 border-t border-brand-line dark:border-brand-line-dark"><span className="font-semibold text-brand-text dark:text-brand-text-dark">Total</span><span className="font-bold text-brand-text dark:text-brand-text-dark">{money(total)}</span></div>
                </div>
              </>
            )}
            <p className="text-xs text-brand-muted dark:text-brand-muted-dark mt-4">Tip: You can edit quantities here before placing your order.</p>
          </section>

          {/* Customer Form */}
          <section className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm p-6">
            <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-4">Your Details</h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium" htmlFor="fullName">Full Name</label>
                <input id="fullName" required className={inputClass} placeholder="Your name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium" htmlFor="email">Email</label>
                <input id="email" type="email" required className={inputClass} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium" htmlFor="fulfillment">Fulfillment</label>
                <select id="fulfillment" className={inputClass} value={fulfillment} onChange={(e) => setFulfillment(e.target.value as "pickup" | "shipping")}>
                  <option value="pickup">Pickup</option>
                  <option value="shipping">Shipping</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium" htmlFor="address">Address (if shipping)</label>
                <textarea id="address" className={`${inputClass} min-h-[72px] resize-y`} placeholder="Street, City, State, ZIP" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium" htmlFor="notes">Order Notes</label>
                <textarea id="notes" className={`${inputClass} min-h-[72px] resize-y`} placeholder="Gift note, preferences, etc." value={notes} onChange={(e) => setNotes(e.target.value)} />
              </div>
              <div className="flex gap-2 pt-2">
                <Link className="flex-1 px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm text-center" to="/">Back</Link>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition text-sm" type="submit">Place Order (Demo)</button>
              </div>
              <p className="text-xs text-brand-muted dark:text-brand-muted-dark">Demo checkout. Connect Stripe/PayPal later.</p>
            </form>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to `/checkout`. Add items to cart first. Order summary shows items with qty controls. Form fields accept input. Submitting navigates to confirmation. Both themes look correct.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/CheckoutPage.tsx
git commit -m "feat: restyle CheckoutPage with Tailwind"
```

---

## Task 12: Confirmation Page

**Files:**
- Modify: `frontend/src/pages/ConfirmationPage.tsx`

- [ ] **Step 1: Replace `ConfirmationPage.tsx`**

```tsx
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
      <main className="max-w-[640px] mx-auto px-4 py-12 flex flex-col gap-6">
        {/* Hero */}
        <div className="text-center py-8">
          <div className="text-5xl mb-4">✈️</div>
          <h2 className="text-2xl font-bold text-brand-text dark:text-brand-text-dark mb-2">Your order is on its way!</h2>
          <p className="text-brand-muted dark:text-brand-muted-dark">Thanks for shopping at Aromamor. You'll receive a confirmation email shortly.</p>
        </div>

        {/* Order summary */}
        <div className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-brand-line dark:border-brand-line-dark bg-brand-line/50 dark:bg-brand-line-dark/50">
            <span className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">Order Summary</span>
            <span className="text-sm font-mono text-brand-accent dark:text-brand-accent-dark">#WW-{order.orderNum}</span>
          </div>
          <ul className="flex flex-col divide-y divide-brand-line dark:divide-brand-line-dark">
            {order.items.map(({ id, qty }) => {
              const p = CATALOG[id];
              if (!p) return null;
              return (
                <li key={id} className="flex items-center justify-between px-5 py-3">
                  <div>
                    <p className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">{p.name}</p>
                    <p className="text-xs text-brand-muted dark:text-brand-muted-dark">{p.mood} • {money(p.price)} × {qty}</p>
                  </div>
                  <div className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">{money(p.price * qty)}</div>
                </li>
              );
            })}
          </ul>
          <div className="px-5 py-3 border-t border-brand-line dark:border-brand-line-dark flex flex-col gap-2">
            <div className="flex justify-between text-sm"><span className="text-brand-muted dark:text-brand-muted-dark">Subtotal</span><span className="text-brand-text dark:text-brand-text-dark">{money(order.subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span className="text-brand-muted dark:text-brand-muted-dark">Shipping</span><span className="text-brand-text dark:text-brand-text-dark">{money(shipping)}</span></div>
            <div className="flex justify-between pt-2 border-t border-brand-line dark:border-brand-line-dark"><span className="font-semibold text-brand-text dark:text-brand-text-dark">Total</span><span className="font-bold text-brand-text dark:text-brand-text-dark">{money(order.subtotal + shipping)}</span></div>
          </div>
        </div>

        {/* Customer info */}
        <div className="rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm overflow-hidden">
          <div className="px-5 py-3 border-b border-brand-line dark:border-brand-line-dark bg-brand-line/50 dark:bg-brand-line-dark/50">
            <span className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">Your Details</span>
          </div>
          <div className="px-5 py-4 grid grid-cols-2 gap-4">
            {[
              { label: "Name", value: order.name },
              { label: "Email", value: order.email },
              { label: "Fulfillment", value: order.fulfillment === "shipping" ? "📦 Shipping" : "🏪 Pickup" },
              ...(order.address ? [{ label: "Address", value: order.address }] : []),
              ...(order.notes ? [{ label: "Notes", value: order.notes }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-brand-muted dark:text-brand-muted-dark font-medium uppercase tracking-wide">{label}</span>
                <span className="text-sm text-brand-text dark:text-brand-text-dark">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link className="flex-1 px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-sm text-center" to="/">← Back to Shop</Link>
          <button className="flex-1 px-4 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition text-sm" onClick={() => window.print()} type="button">🖨️ Print Receipt</button>
        </div>

        <p className="text-xs text-brand-muted dark:text-brand-muted-dark text-center">🔧 Demo mode — connect Stripe or PayPal to process real payments.</p>
      </main>
    </>
  );
}
```

- [ ] **Step 2: Verify**

Complete a full checkout flow from cart → checkout → confirmation. Order summary and customer details render. Both themes correct.

- [ ] **Step 3: Commit**

```bash
git add frontend/src/pages/ConfirmationPage.tsx
git commit -m "feat: restyle ConfirmationPage with Tailwind"
```

---

## Task 13: Final Build Verification

- [ ] **Step 1: Add placeholder images**

Download any 4 royalty-free candle photos and place them in `frontend/public/`:
- `placeholder-hero.jpg`
- `placeholder-candles.jpg`
- `placeholder-oils.jpg`
- `placeholder-gifts.jpg`

If no images are available, the CSS gradient fallbacks will display instead — the app still works without them.

- [ ] **Step 2: Run full TypeScript build**

```bash
cd frontend && npm run build
```
Expected: `✓ built in Xs` — zero TypeScript errors. If errors appear, fix them before proceeding.

- [ ] **Step 3: Verify theme toggle persistence**

1. Open `http://localhost:5173` in browser
2. Toggle to light mode
3. Reload page
4. Expected: light mode is still active (persisted in localStorage)

- [ ] **Step 4: Verify mobile responsiveness**

In Chrome DevTools, set viewport to 375px. Check:
- Header: hamburger visible, logo visible
- Shop hero: stacks to single column
- Product grid: single column
- Cart/wishlist drawers: full width

- [ ] **Step 5: Verify all routes work**

Navigate to: `/` → `/about` → `/reviews` → `/checkout`. Each page should render correctly in both themes.

- [ ] **Step 6: Commit placeholder images (if added)**

```bash
git add frontend/public/placeholder-*.jpg
git commit -m "feat: add placeholder candle images for hero and category cards"
```

- [ ] **Step 7: Final commit**

Only needed if any files were modified after Task 12 that haven't been committed yet. Verify with `git status` first and stage only changed files explicitly.
