import { useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { CATALOG } from "../store/catalog";

type SortKey = "name-asc" | "name-desc" | "mood-asc" | "mood-desc" | "price-asc" | "price-desc";

const COLLECTION_TABS = [
  "New pours",
  "Signatures",
  "Gifts",
];

export default function ShopPage() {
  const [mood, setMood] = useState("all");
  const [sort, setSort] = useState<SortKey>("name-asc");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState("");

  const allProducts = useMemo(() => Object.values(CATALOG), []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();

    return allProducts
      .filter((p) => {
        const moodOk = mood === "all" || p.mood === mood;
        const stockOk = !inStockOnly || p.inStock;
        const haystack = [p.name, p.destination, p.mood, ...p.scents].join(" ").toLowerCase();
        const searchOk = !q || haystack.includes(q);
        return moodOk && stockOk && searchOk;
      })
      .sort((a, b) => {
        switch (sort) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "mood-asc":
            return a.mood.localeCompare(b.mood) || a.name.localeCompare(b.name);
          case "mood-desc":
            return b.mood.localeCompare(a.mood) || a.name.localeCompare(b.name);
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          default:
            return 0;
        }
      });
  }, [allProducts, inStockOnly, mood, search, sort]);

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg">
      <Header />
      <main className="flex-1">
        <section id="collection" className="bg-[oklch(0.94_0.02_82)]">
          <div className="mx-auto max-w-[1320px] px-6 py-16 md:py-20">
            <div className="grid gap-8 border-b border-brand-line pb-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">Shop</p>
                <h1 className="mt-5 max-w-xl text-5xl leading-[0.96] text-brand-text md:text-7xl">
                  Candles for the places you keep returning to.
                </h1>
              </div>
              <p className="max-w-2xl text-xl leading-relaxed text-brand-muted">
                Browse destination-inspired candles, poured by hand in small batches and made for rooms, gifts, and scent memories.
              </p>
            </div>

            <div className="mt-8 flex gap-8 overflow-x-auto border-b border-brand-line pb-4">
              {COLLECTION_TABS.map((tab, index) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    if (index === 0) {
                      setMood("all");
                      setInStockOnly(false);
                    }
                    if (index === 1) {
                      setMood("Sophisticated & Calm");
                      setInStockOnly(false);
                    }
                    if (index === 2) {
                      setMood("all");
                      setInStockOnly(true);
                    }
                  }}
                  className={`shrink-0 text-sm font-semibold uppercase tracking-[0.18em] transition ${
                    index === 0 ? "text-brand-text" : "text-brand-muted hover:text-brand-text"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 border-b border-brand-line pb-8 md:grid-cols-[1fr_auto] md:items-end">
              <label className="flex max-w-md flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">Search</span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Paris, citrus, calm"
                  className="h-12 border border-brand-line bg-brand-card px-4 text-sm text-brand-text outline-none placeholder:text-brand-muted focus:border-brand-accent"
                />
              </label>
              <button
                type="button"
                onClick={() => {
                  setMood("all");
                  setSort("name-asc");
                  setSearch("");
                  setInStockOnly(false);
                }}
                className="text-sm font-semibold text-brand-muted underline underline-offset-4 transition hover:text-brand-text"
              >
                Reset filters
              </button>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-muted">
                {filtered.length} candle{filtered.length === 1 ? "" : "s"}
              </p>
            </div>

            {filtered.length === 0 ? (
              <div className="py-24 text-center text-brand-muted">
                <p className="text-2xl text-brand-text">No destination matches those filters.</p>
                <p className="mt-3 text-sm">Try another scent note or destination search.</p>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
