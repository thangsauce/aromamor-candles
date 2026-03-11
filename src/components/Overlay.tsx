import { useStore } from "../store/StoreContext";

export default function Overlay() {
  const { cartOpen, wishlistOpen, setCartOpen, setWishlistOpen } = useStore();
  const isOpen = cartOpen || wishlistOpen;

  return (
    <div
      className={`overlay${isOpen ? " open" : ""}`}
      onClick={() => {
        if (wishlistOpen) setWishlistOpen(false);
        else setCartOpen(false);
      }}
    />
  );
}
