import { useStore } from "../store/StoreContext";

export default function Overlay() {
  const { cartOpen, wishlistOpen, setCartOpen, setWishlistOpen } = useStore();
  const isOpen = cartOpen || wishlistOpen;

  return (
    <div
      className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={() => {
        if (wishlistOpen) setWishlistOpen(false);
        else setCartOpen(false);
      }}
    />
  );
}
