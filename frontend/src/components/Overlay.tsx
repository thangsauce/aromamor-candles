import { useStore } from "../store/StoreContext";

export default function Overlay() {
  const {
    cartOpen,
    wishlistOpen,
    searchOpen,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
  } = useStore();
  const isOpen = cartOpen || wishlistOpen || searchOpen;

  return (
    <div
      className={`fixed inset-0 z-30 bg-[oklch(0.14_0.015_40/.24)] backdrop-blur-sm transition-[opacity,backdrop-filter] duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none backdrop-blur-0"}`}
      onClick={() => {
        if (searchOpen) setSearchOpen(false);
        else if (wishlistOpen) setWishlistOpen(false);
        else setCartOpen(false);
      }}
    />
  );
}
