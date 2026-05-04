import { createContext, useContext, useState, type ReactNode } from "react";
import { useCart, useWishlist } from "./hooks";

interface StoreContextType {
  // Cart
  cart: ReturnType<typeof useCart>["cart"];
  addToCart: ReturnType<typeof useCart>["addToCart"];
  setQty: ReturnType<typeof useCart>["setQty"];
  clearCart: ReturnType<typeof useCart>["clearCart"];
  totalQty: number;
  subtotal: number;
  // Wishlist
  wishlist: ReturnType<typeof useWishlist>["wishlist"];
  toggleWishlist: ReturnType<typeof useWishlist>["toggle"];
  clearWishlist: ReturnType<typeof useWishlist>["clear"];
  isWishlisted: ReturnType<typeof useWishlist>["isWishlisted"];
  // UI state
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  wishlistOpen: boolean;
  setWishlistOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  toast: { visible: boolean; title: string; body: string };
  showToast: (title: string, body: string) => void;
  hideToast: () => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

let toastTimer: ReturnType<typeof setTimeout> | null = null;

export function StoreProvider({ children }: { children: ReactNode }) {
  const cartHook = useCart();
  const wishlistHook = useWishlist();
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, title: "", body: "" });

  const showToast = (title: string, body: string) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ visible: true, title, body });
    toastTimer = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3500);
  };

  const hideToast = () => {
    if (toastTimer) clearTimeout(toastTimer);
    setToast((t) => ({ ...t, visible: false }));
  };

  return (
    <StoreContext.Provider
      value={{
        ...cartHook,
        toggleWishlist: wishlistHook.toggle,
        clearWishlist: wishlistHook.clear,
        isWishlisted: wishlistHook.isWishlisted,
        wishlist: wishlistHook.wishlist,
        cartOpen,
        setCartOpen,
        wishlistOpen,
        setWishlistOpen,
        searchOpen,
        setSearchOpen,
        toast,
        showToast,
        hideToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be inside StoreProvider");
  return ctx;
}
