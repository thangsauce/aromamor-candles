# Aromamor — Tailwind Redesign with Dark/Light Mode

**Date:** 2026-03-23
**Status:** Approved
**Figma:** https://www.figma.com/design/8ACCZECvYlrpVhJds0WiI6/Aromamor--Copy-?node-id=0-1

---

## Overview

Redesign the Aromamor candle shop to match the Figma design templates, adopting Tailwind CSS v4 as the styling system and adding a dark/light mode toggle. All existing content, data, catalog entries, and React logic are preserved. Only styles and layout patterns change.

---

## Goals

- Replace the custom `globals.css`-based styling with Tailwind CSS v4
- Implement dark and light modes using Tailwind v4's class-based dark variant
- Redesign all pages (Shop, About, Reviews, Checkout, Confirmation) to match Figma layouts
- Add placeholder images to product cards and hero sections
- Support parallel team development: all styles are co-located in JSX as Tailwind utility classes

---

## Architecture

### Tailwind v4 Setup

Use **Tailwind v4** with its native Vite plugin to avoid the `postcss.config.js` ESM/CJS conflict that exists in Tailwind v3 when `"type": "module"` is set in `package.json`.

**Install:**
```bash
npm install tailwindcss @tailwindcss/vite
```

**`vite.config.ts`** — add the Tailwind plugin:
```ts
import tailwindcss from '@tailwindcss/vite'
// add to plugins array: tailwindcss()
```

**`src/styles/globals.css`** — replace all content with:
```css
@import "tailwindcss";

/*
  Class-based dark mode for Tailwind v4.
  @custom-variant overrides the built-in `dark` variant (which defaults to
  prefers-color-scheme) with a class-based selector instead.
  Add the `dark` class to <html> to activate dark mode.
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

/* Page-level background */
body {
  @apply bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark;
  @apply min-h-screen antialiased;
}
```

**CSS cleanup:** Delete `src/index.css` and `src/App.css` — both are leftover Vite scaffold files (confirmed not imported anywhere). This eliminates conflicts with Tailwind's preflight.

No `tailwind.config.js` or `postcss.config.js` files are needed with this setup.

### Color Token Usage Pattern

The `.dark` sub-tokens are standalone Tailwind colors — they do **not** auto-activate on dark mode. Every element must explicitly pair a light and dark class:

```tsx
// Correct pattern — always pair light + dark:
className="bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark"

// Do NOT use brand-bg-dark as a default value — it is only for dark: variants
```

All engineers must follow this pairing convention consistently.

### Theme Context

New file: `src/store/ThemeContext.tsx`

```
ThemeProvider
  - manages `theme: 'dark' | 'light'` state
  - on mount: reads from localStorage key `'aromamor-theme'`, defaults to `'dark'`
  - toggle(): flips theme, writes to localStorage, adds/removes `dark` class on `document.documentElement`
  - exports: ThemeProvider, useTheme hook
```

**`App.tsx` wrapping order:**
`ThemeProvider` is added inside `App.tsx` as the outermost wrapper there. `QueryClientProvider` lives in `main.tsx` and does not move.

```
main.tsx:
  <StrictMode>
    <QueryClientProvider>      ← stays in main.tsx, no change
      <App />
    </QueryClientProvider>
  </StrictMode>

App.tsx:
  <ThemeProvider>              ← NEW — outermost in App.tsx
    <HashRouter>
      <StoreProvider>
        ...routes, drawers, toast
      </StoreProvider>
    </HashRouter>
  </ThemeProvider>
```

---

## Common UI Tokens

These Tailwind class strings are used consistently across all components. Engineers should copy these directly rather than invent variants.

### Buttons
```
Primary:   "px-5 py-2.5 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition"
Secondary: "px-5 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition"
Ghost:     "px-4 py-2 text-brand-text dark:text-brand-text-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
```

### Form Inputs / Selects / Textareas
```
"w-full px-4 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark text-brand-text dark:text-brand-text-dark placeholder-brand-muted dark:placeholder-brand-muted-dark focus:outline-none focus:ring-2 focus:ring-brand-accent dark:focus:ring-brand-accent-dark"
```

### Badges / Pills
```
Tag pill:      "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-accent/20 dark:bg-brand-accent-dark/20 text-brand-accent dark:text-brand-accent-dark"
Out of stock:  "px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
Cart badge:    "min-w-[18px] h-[18px] rounded-full bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-[10px] font-bold flex items-center justify-center"
```

### Cards
```
"rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark shadow-sm"
```

### Drawers (CartDrawer, WishlistDrawer)
```
Panel:    "fixed inset-y-0 right-0 w-full max-w-sm bg-brand-card dark:bg-brand-card-dark border-l border-brand-line dark:border-brand-line-dark shadow-2xl z-40 flex flex-col"
Overlay:  "fixed inset-0 bg-black/40 dark:bg-black/60 z-30"
```

### Toast
```
"fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark text-sm"
```

---

## Component Changes

### Header (`Header.tsx`)

**Keeps:** Logo image, "Aromamor" brand name, subtitle, all existing nav links, cart button + badge, wishlist button + badge, mobile hamburger menu and all its links
**Changes:**
- "About Us" link moves from the brand `div` to the center nav group (aligns with Figma)
- Sun/moon toggle button added to the right actions area (calls `useTheme().toggle`)
- Layout: logo+brand left · `[Shop · About Us · Reviews]` center (desktop, hidden mobile) · `[Wishlist · Cart · Toggle · Hamburger]` right

**Desktop:**
```
Outer:    "sticky top-0 z-20 w-full backdrop-blur-md bg-brand-bg/80 dark:bg-brand-bg-dark/80 border-b border-brand-line dark:border-brand-line-dark"
Inner:    "max-w-[1100px] mx-auto px-4 h-20 flex items-center justify-between gap-4"
Brand:    "flex items-center gap-2.5 no-underline"
Nav:      "hidden md:flex items-center gap-6"
Nav link: Ghost button style (see Common UI Tokens)
Actions:  "flex items-center gap-2"
Toggle:   Ghost button, renders ☀️ in dark mode, 🌙 in light mode
```

**Mobile menu (hamburger panel):**
- Triggered by hamburger button (existing logic kept)
- Panel: `"absolute top-full left-0 w-full bg-brand-card dark:bg-brand-card-dark border-b border-brand-line dark:border-brand-line-dark shadow-lg flex flex-col py-2 md:hidden"`
- Links: Shop Collection · Reviews · About · Checkout · Wishlist (all existing links kept)
- Theme toggle row also appears in mobile menu
- Each row: `"px-6 py-3 text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition text-left"`

### Footer (`Footer.tsx`)

**Keeps:** Brand logo, tagline, all 3 link columns (Shop, Info, Contact), email, copyright, Privacy/Terms links
**Layout:** 4-column grid on desktop (brand block occupies column 1, the 3 link columns occupy columns 2–4), stacked on mobile.

```
Outer:        "bg-brand-card dark:bg-brand-card-dark border-t border-brand-line dark:border-brand-line-dark"
Inner:        "max-w-[1100px] mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8"
              ↑ col 1 = brand block, cols 2-4 = Shop / Info / Contact link columns
Bottom:       "border-t border-brand-line dark:border-brand-line-dark px-4 py-4 flex flex-wrap justify-between gap-2 text-xs text-brand-muted dark:text-brand-muted-dark max-w-[1100px] mx-auto"
```

### ProductCard (`ProductCard.tsx`)

**Keeps:** All existing data and logic (name, mood, destination, scents, price, qty controls, Add to Cart, wishlist toggle, stock badge)
**Adds:** Placeholder image at top of card

**Image strategy:**
- Add `image?: string` to the `Product` type in `src/types/index.ts`
- If `image` is provided: render `<img>` with `object-cover aspect-square`
- If absent: render a mood-based gradient placeholder div

**Mood → gradient mapping:**
```
"Tropical Warmth"       → "from-amber-300 to-orange-400"
"Cozy & Romantic"       → "from-rose-300 to-amber-400"
"Coastal Escape"        → "from-sky-300 to-teal-400"
"Sophisticated & Calm"  → "from-stone-400 to-amber-600"
"Peaceful & Reflective" → "from-purple-300 to-indigo-400"
"Charmingly Vibrant"    → "from-yellow-300 to-lime-400"
```
Default fallback: `"from-amber-200 to-stone-300"`

**Layout (top to bottom):**
1. Image / gradient placeholder (aspect-square, rounded-t-2xl)
2. Card body (p-4): name (font-semibold) + mood tag (pill) + destination (muted small) + scent chips + price + qty + Add to Cart

### StarRating (`StarRating.tsx`)

Restyle only — no logic changes. Replace all custom CSS classes with Tailwind equivalents. Stars use `text-brand-accent dark:text-brand-accent-dark` for filled, `text-brand-line dark:text-brand-line-dark` for empty.

---

## Page Designs

### Shop Page (`ShopPage.tsx`)

**Hero section:**
- Full-width, 2-column on desktop (split 50/50), stacked on mobile
- Left: `<h1>` "Transform Your Space, Elevate Your Mood" (large serif) + subtitle + primary CTA "Shop the Collection" (scrolls to `#collection`)
- Right: placeholder candle image (`/public/placeholder-hero.jpg` — use any warm candle photo from public domain, or a CSS gradient fallback)
- Background: `bg-brand-card dark:bg-brand-card-dark`

**Category strip (new section):**
- 3 equal cards in a row (1 col mobile, 3 col desktop)
- Each card: square image placeholder + label + short subtitle
- Labels: "Scented Candles", "Essential Oils", "Gift Sets"
- These are UI-only placeholders; clicking any card scrolls to `#collection`
- Card uses the Card token style above

**Product grid (`#collection`):**
- Section heading: "Signature Collection" + "Destination · Mood · Notes" subtitle
- Filter/sort bar (existing logic, restyled with input/select tokens above)
- 3-col desktop, 2-col tablet, 1-col mobile grid
- Each cell: redesigned `ProductCard`

### About Page (`AboutPage.tsx`)

**Hero:** Same 2-column split as Shop hero — left has placeholder candle image, right has "Made with intention, poured with love." + subtitle
**All existing sections kept:** Founder card, values grid (4 cards), candle care tips (4 cards), CTA section
**Restyle only** — no structural changes beyond the new hero split and Tailwind classes

### Reviews Page (`ReviewsPage.tsx`)

**Restyle + minor layout fix** — the existing two-column layout (sidebar left, review list right) already matches the Figma. Changes:
- Apply Tailwind classes to all elements using the common tokens above
- Sidebar filter: uses radio-style list with pill styling per product tag
- Write a Review form: uses the form input token for all fields
- Review cards: use the Card token, show product name/mood/destination/tag

No structural rebuild needed — this is a restyle of the existing layout.

### Checkout Page (`CheckoutPage.tsx`)

Restyle only. Apply Tailwind classes to all form fields (input token), buttons (button tokens), and layout containers. No structural changes.

### Confirmation Page (`ConfirmationPage.tsx`)

Restyle only. Apply Tailwind classes. No structural changes.

---

## Placeholder Images

Until real product photography is available:
- **Hero image:** `public/placeholder-hero.jpg` — any royalty-free candle photo; falls back to: `bg-gradient-to-br from-amber-100 to-stone-300 dark:from-amber-900/40 dark:to-stone-800`
- **Category cards:** `public/placeholder-candles.jpg`, `public/placeholder-oils.jpg`, `public/placeholder-gifts.jpg`; fall back to the same gradient: `bg-gradient-to-br from-amber-100 to-stone-300 dark:from-amber-900/40 dark:to-stone-800`
- **ProductCard images:** mood-based gradients (see ProductCard section above) — no external image files required

**Vite base URL handling:** The project uses `base: "/aromamor-candles/"` in `vite.config.ts`. Files placed in `public/` must be referenced using `import.meta.env.BASE_URL` to work correctly in both dev and production:

```tsx
// Use this helper anywhere a public asset path is needed:
const asset = (filename: string) => `${import.meta.env.BASE_URL}${filename}`

// Usage:
<img src={asset('placeholder-hero.jpg')} alt="..." />
```

Do **not** hardcode `/placeholder-hero.jpg` — it will 404 in production on GitHub Pages.

---

## File Structure Changes

```
frontend/
  src/
    store/
      ThemeContext.tsx          ← NEW
      StoreContext.tsx          (unchanged)
      catalog.ts                (add optional image field to relevant entries)
    types/index.ts              (add image?: string to Product)
    components/
      Header.tsx                (redesign + theme toggle + move About Us to center nav)
      Footer.tsx                (restyle)
      ProductCard.tsx           (add image/gradient, full restyle)
      StarRating.tsx            (restyle only)
      CartDrawer.tsx            (restyle)
      WishlistDrawer.tsx        (restyle)
      Toast.tsx                 (restyle)
      Overlay.tsx               (restyle)
    pages/
      ShopPage.tsx              (redesign: hero, category strip, grid)
      AboutPage.tsx             (redesign: split hero, restyle sections)
      ReviewsPage.tsx           (restyle only)
      CheckoutPage.tsx          (restyle only)
      ConfirmationPage.tsx      (restyle only)
    styles/
      globals.css               (replace with Tailwind v4 directives + theme tokens)
    index.css                   ← DELETE (Vite scaffold leftover, not imported)
    App.css                     ← DELETE (Vite scaffold leftover, not imported)
  vite.config.ts                (add @tailwindcss/vite plugin)
  package.json                  (add tailwindcss, @tailwindcss/vite)
  public/
    placeholder-hero.jpg        ← ADD (any candle photo)
    placeholder-candles.jpg     ← ADD
    placeholder-oils.jpg        ← ADD
    placeholder-gifts.jpg       ← ADD
```

---

## Migration Order (Phased)

To avoid a fully broken app mid-migration, implement in this order. Each phase should be a working, committable state:

1. **Phase 1 — Setup:** Install Tailwind v4, update `vite.config.ts`, replace `globals.css` with Tailwind directives + theme tokens. App will look broken until Phase 2 completes.
2. **Phase 2 — ThemeContext:** Add `ThemeContext.tsx`, wrap `App.tsx`. Verify `dark` class toggles on `<html>`.
3. **Phase 3 — Shared components:** Restyle Header, Footer, Overlay, Toast, CartDrawer, WishlistDrawer, StarRating. App should now be visually coherent.
4. **Phase 4 — ProductCard:** Redesign card with image/gradient placeholder.
5. **Phase 5 — Shop Page:** Hero, category strip, grid.
6. **Phase 6 — About Page:** Split hero + restyle sections.
7. **Phase 7 — Reviews Page:** Restyle.
8. **Phase 8 — Checkout & Confirmation:** Restyle.

Team members can parallelize Phases 5–8 after Phase 4 is merged.

---

## Out of Scope

- Backend changes
- New routes or pages
- Real product photography
- "Book Appointment", "Wholesale", "Hours of Operation" from Figma (not part of existing business logic)
- Essential Oils / Gift Sets as actual shoppable product categories

---

## Success Criteria

- [ ] App runs with `npm run dev` after Tailwind v4 installation (no PostCSS errors)
- [ ] Dark/light toggle in Header works; `dark` class toggles on `<html>`
- [ ] Theme preference persists across page reloads via `localStorage`
- [ ] All pages render correctly in both light and dark mode with correct brand colors
- [ ] All existing functionality works: add to cart, wishlist, filters, reviews submission, checkout flow, confirmation
- [ ] Responsive on mobile (375px), tablet (768px), and desktop (1280px)
- [ ] Shop page matches Figma frame `21:38` (dark) / `18:11` (light) in layout structure
- [ ] About page has split hero layout matching the Figma pattern
- [ ] Reviews page sidebar + card layout matches Figma frame `18:16`
- [ ] Header and Footer match across all pages and both themes
- [ ] No TypeScript errors (`npm run build` passes)
- [ ] `globals.css` contains only `@import "tailwindcss"`, `@custom-variant dark`, `@theme` tokens, and the `body` base rule — no custom class definitions
- [ ] `src/index.css` and `src/App.css` are deleted
- [ ] Placeholder images load correctly on GitHub Pages (using `import.meta.env.BASE_URL`)
