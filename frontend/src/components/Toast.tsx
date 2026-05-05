import { Link } from "react-router-dom";
import { useStore } from "../store/StoreContext";

export default function Toast() {
  const { toast, hideToast, setCartOpen } = useStore();

  if (!toast.visible) return null;

  return (
    <div
      className="fixed bottom-5 left-1/2 z-50 flex w-[280px] max-w-[calc(100vw-1.5rem)] -translate-x-1/2 flex-col gap-2 rounded-xl border border-brand-line bg-brand-card p-3 shadow-xl dark:border-brand-line-dark dark:bg-brand-card-dark sm:bottom-6 sm:w-[340px] sm:max-w-[calc(100vw-2rem)] sm:gap-3 sm:rounded-2xl sm:p-4"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start justify-between gap-2">
        <b className="text-xs text-brand-text dark:text-brand-text-dark sm:text-sm">{toast.title}</b>
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
      <div className="text-[11px] text-brand-muted dark:text-brand-muted-dark sm:text-xs">{toast.body}</div>
      <div className="flex gap-2">
        <button
          className="flex-1 rounded-lg border border-brand-line px-2.5 py-1.5 text-xs text-brand-text transition hover:bg-brand-line dark:border-brand-line-dark dark:text-brand-text-dark dark:hover:bg-brand-line-dark sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm"
          onClick={() => { hideToast(); setCartOpen(true); }}
          type="button"
        >
          View Cart
        </button>
        <Link
          className="flex-1 rounded-lg bg-brand-accent px-2.5 py-1.5 text-center text-xs font-semibold text-white transition hover:opacity-90 dark:bg-brand-accent-dark dark:text-brand-bg-dark sm:rounded-xl sm:px-3 sm:py-2 sm:text-sm"
          to="/checkout"
          onClick={hideToast}
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
