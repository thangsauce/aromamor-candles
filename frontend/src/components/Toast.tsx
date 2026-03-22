import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";

export default function Toast() {
  const { toast, hideToast, setCartOpen } = useStore();

  if (!toast.visible) return null;

  return (
    <div className="toast" aria-live="polite" aria-atomic="true">
      <div className="toast-top">
        <b>{toast.title}</b>
        <button className="toast-close" onClick={hideToast} type="button" aria-label="Close">
          ✕
        </button>
      </div>
      <div className="toast-body">{toast.body}</div>
      <div className="toast-actions">
        <button
          className="btn"
          onClick={() => {
            hideToast();
            setCartOpen(true);
          }}
          type="button"
        >
          View Cart
        </button>
        <Link className="btn primary" to="/checkout" onClick={hideToast}>
          Checkout
        </Link>
      </div>
    </div>
  );
}
