import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store/StoreContext";
import { CATALOG } from "../store/catalog";
import { money } from "../store/hooks";

export default function SearchDrawer() {
  const navigate = useNavigate();
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");

  const products = useMemo(() => Object.values(CATALOG), []);
  const normalized = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalized) return products;

    return products.filter((product) => {
      const haystack = [
        product.name,
        product.destination,
        product.mood,
        product.tag,
        ...product.scents,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [normalized, products]);

  const closeDrawer = () => setSearchOpen(false);

  const viewCollection = () => {
    closeDrawer();
    navigate("/shop");
    window.setTimeout(() => {
      document
        .getElementById("collection")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <aside
      className={`fixed top-0 right-0 z-40 flex h-full w-[380px] max-w-full flex-col border-l border-brand-line bg-brand-card shadow-2xl transition-transform duration-300 dark:border-brand-line-dark dark:bg-brand-card-dark ${
        searchOpen ? "translate-x-0" : "translate-x-full"
      }`}
      role="dialog"
      aria-modal
      aria-label="Search"
    >
      <div className="flex items-center justify-between border-b border-brand-line px-5 py-4 dark:border-brand-line-dark">
        <h3 className="font-semibold text-brand-text dark:text-brand-text-dark">
          Search
        </h3>
        <button
          className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-line hover:text-brand-text dark:text-brand-muted-dark dark:hover:bg-brand-line-dark dark:hover:text-brand-text-dark"
          onClick={closeDrawer}
          type="button"
          aria-label="Close search"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>

      <div className="border-b border-brand-line px-5 py-4 dark:border-brand-line-dark">
        <input
          autoFocus={searchOpen}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search candles, moods, destinations..."
          className="w-full rounded-xl border border-brand-line bg-brand-bg px-3 py-2 text-sm text-brand-text outline-none transition placeholder:text-brand-muted focus:border-brand-accent dark:border-brand-line-dark dark:bg-brand-bg-dark dark:text-brand-text-dark dark:placeholder:text-brand-muted-dark dark:focus:border-brand-accent-dark"
        />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {results.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-brand-muted dark:text-brand-muted-dark">
              No candles found.
            </p>
            <p className="text-xs text-brand-muted dark:text-brand-muted-dark">
              Try a scent note, mood, or destination.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4" aria-label="Search results">
            {results.map((product) => (
              <li
                key={product.id}
                className="flex gap-3 border-b border-brand-line pb-4 last:border-0 dark:border-brand-line-dark"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-20 w-20 flex-shrink-0 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-medium text-brand-text dark:text-brand-text-dark">
                        {product.name}
                      </div>
                      <div className="text-xs text-brand-muted dark:text-brand-muted-dark">
                        {product.destination}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-brand-text dark:text-brand-text-dark">
                      {money(product.price)}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-brand-muted dark:text-brand-muted-dark">
                    {product.scents.join(" / ")}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span
                      className={`text-xs ${
                        product.inStock
                          ? "text-green-600 dark:text-green-400"
                          : "text-brand-muted dark:text-brand-muted-dark"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    <Link
                      to="/shop"
                      onClick={viewCollection}
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-accent transition hover:text-brand-text dark:text-brand-accent-dark dark:hover:text-brand-text-dark"
                    >
                      View in shop
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}
