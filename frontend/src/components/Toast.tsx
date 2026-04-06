import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";

export default function Toast() {
  const { toast, hideToast, setCartOpen } = useStore();

  if (!toast.visible) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[340px] max-w-[calc(100vw-2rem)] bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark rounded-2xl shadow-xl p-4 flex flex-col gap-3"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start justify-between gap-2">
        <b className="text-sm text-brand-text dark:text-brand-text-dark">{toast.title}</b>
        <button
          className="text-brand-muted dark:text-brand-muted-dark hover:text-brand-text dark:hover:text-brand-text-dark transition text-base leading-none"
          onClick={hideToast}
          type="button"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>
      <div className="text-xs text-brand-muted dark:text-brand-muted-dark">{toast.body}</div>
      <div className="flex gap-2">
        <button
          className="flex-1 px-3 py-2 rounded-xl border border-brand-line dark:border-brand-line-dark text-sm text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition"
          onClick={() => { hideToast(); setCartOpen(true); }}
          type="button"
        >
          View Cart
        </button>
        <Link
          className="flex-1 px-3 py-2 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-sm font-semibold text-center hover:opacity-90 transition"
          to="/checkout"
          onClick={hideToast}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
