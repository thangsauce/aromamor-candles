import { useState, useCallback } from "react";
import type { Cart, Wishlist } from "../types";
import { CATALOG } from "./catalog";

const CART_KEY = "aromamor_cart_v1";
const WISHLIST_KEY = "aromamor_wishlist_v1";
export const SHIPPING_FLAT = 5.99;

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function money(n: number): string {
  return `$${Number(n).toFixed(2)}`;
}

export function useCart() {
  const [cart, setCartState] = useState<Cart>(() => readStorage<Cart>(CART_KEY, {}));

  const persist = useCallback((next: Cart) => {
    setCartState(next);
    localStorage.setItem(CART_KEY, JSON.stringify(next));
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      const p = CATALOG[id];
      if (!p || !p.inStock) return;
      const next = { ...cart };
      next[id] = { qty: (next[id]?.qty ?? 0) + qty };
      if (next[id].qty <= 0) delete next[id];
      persist(next);
    },
    [cart, persist]
  );

  const setQty = useCallback(
    (id: string, qty: number) => {
      const next = { ...cart };
      if (qty <= 0) delete next[id];
      else next[id] = { qty };
      persist(next);
    },
    [cart, persist]
  );

  const clearCart = useCallback(() => persist({}), [persist]);

  const totalQty = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const subtotal = Object.entries(cart).reduce((s, [id, item]) => {
    return s + (CATALOG[id]?.price ?? 0) * item.qty;
  }, 0);

  return { cart, addToCart, setQty, clearCart, totalQty, subtotal };
}

export function useWishlist() {
  const [wishlist, setWishlistState] = useState<Wishlist>(() =>
    readStorage<Wishlist>(WISHLIST_KEY, [])
  );

  const persist = useCallback((next: Wishlist) => {
    setWishlistState(next);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(next));
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist(
        wishlist.includes(id) ? wishlist.filter((w) => w !== id) : [...wishlist, id]
      );
    },
    [wishlist, persist]
  );

  const clear = useCallback(() => persist([]), [persist]);
  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  return { wishlist, toggle, clear, isWishlisted };
}
