import { useState, useMemo } from "react";
import { CATALOG } from "../store/catalog";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

type SortKey = "name-asc" | "name-desc" | "mood-asc" | "mood-desc" | "price-asc" | "price-desc";

export default function ShopPage() {
  const [mood, setMood] = useState("all");
  const [sort, setSort] = useState<SortKey>("name-asc");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const allProducts = useMemo(() => Object.values(CATALOG), []);

  const moods = useMemo(
    () => [...new Set(allProducts.map((p) => p.mood))].sort(),
    [allProducts]
  );

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
          case "name-asc": return a.name.localeCompare(b.name);
          case "name-desc": return b.name.localeCompare(a.name);
          case "mood-asc": return a.mood.localeCompare(b.mood) || a.name.localeCompare(b.name);
          case "mood-desc": return b.mood.localeCompare(a.mood) || a.name.localeCompare(b.name);
          case "price-asc": return a.price - b.price;
          case "price-desc": return b.price - a.price;
          default: return 0;
        }
      });
  }, [allProducts, mood, sort, inStockOnly, search]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative bg-gradient-to-br from-amber-50 to-stone-100 dark:from-brand-bg-dark dark:to-stone-900 border-b border-brand-line dark:border-brand-line-dark overflow-hidden">
          <div className="max-w-[1100px] mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center gap-5">
            <span className="text-sm tracking-widest uppercase text-brand-muted dark:text-brand-muted-dark">✈️ Destinations in a candle</span>
            <h1 className="text-4xl md:text-5xl font-semibold text-brand-text dark:text-brand-text-dark leading-tight max-w-xl">
              Hand-poured scents from around the world
            </h1>
            <p className="text-brand-muted dark:text-brand-muted-dark max-w-md">
              Each candle captures a destination, a mood, and a signature blend of notes.
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="#collection"
                className="px-6 py-3 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition"
              >
                Shop Collection
              </a>
              <button
                className={`px-6 py-3 rounded-xl border transition font-semibold ${filtersOpen ? "border-brand-accent dark:border-brand-accent-dark text-brand-accent dark:text-brand-accent-dark bg-brand-accent/10 dark:bg-brand-accent-dark/10" : "border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"}`}
                onClick={() => setFiltersOpen((v) => !v)}
                type="button"
              >
                {filtersOpen ? "✕ Close Filters" : "⚙️ Filters"}
              </button>
            </div>
          </div>
        </section>

        {/* Mood strip */}
        <section className="border-b border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark">
          <div className="max-w-[1100px] mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
            <button
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition ${mood === "all" ? "bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold" : "border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"}`}
              onClick={() => setMood("all")}
              type="button"
            >
              All
            </button>
            {moods.map((m) => (
              <button
                key={m}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm transition ${mood === m ? "bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold" : "border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"}`}
                onClick={() => setMood(m)}
                type="button"
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        {/* Filters panel */}
        {filtersOpen && (
          <section className="border-b border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark">
            <div className="max-w-[1100px] mx-auto px-4 py-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="moodFilter" className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Mood</label>
                <select
                  id="moodFilter"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark text-brand-text dark:text-brand-text-dark text-sm"
                >
                  <option value="all">All moods</option>
                  {moods.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="sortSelect" className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Sort</label>
                <select
                  id="sortSelect"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="px-3 py-2 rounded-lg border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark text-brand-text dark:text-brand-text-dark text-sm"
                >
                  <option value="name-asc">Name (A → Z)</option>
                  <option value="name-desc">Name (Z → A)</option>
                  <option value="mood-asc">Mood (A → Z)</option>
                  <option value="mood-desc">Mood (Z → A)</option>
                  <option value="price-asc">Price (Low → High)</option>
                  <option value="price-desc">Price (High → Low)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="searchInput" className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Search</label>
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Name, destination, scent..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="px-3 py-2 rounded-lg border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark text-brand-text dark:text-brand-text-dark text-sm placeholder:text-brand-muted dark:placeholder:text-brand-muted-dark"
                />
              </div>

              <div className="flex flex-col gap-1 justify-center">
                <label className="text-xs font-semibold uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Availability</label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="accent-brand-accent dark:accent-brand-accent-dark w-4 h-4"
                  />
                  <span className="text-sm text-brand-text dark:text-brand-text-dark">In stock only</span>
                </label>
              </div>
            </div>
          </section>
        )}

        {/* Collection grid */}
        <section className="max-w-[1100px] mx-auto px-4 py-10" id="collection">
          <div className="flex items-baseline justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-brand-text dark:text-brand-text-dark">Signature Collection</h2>
              <p className="text-sm text-brand-muted dark:text-brand-muted-dark">Destination • Mood • Notes</p>
            </div>
            <span className="text-sm text-brand-muted dark:text-brand-muted-dark flex-shrink-0">{filtered.length} candle{filtered.length !== 1 ? "s" : ""}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-brand-muted dark:text-brand-muted-dark">
              <p className="text-lg">No candles match your filters.</p>
              <button className="mt-3 text-sm text-brand-accent dark:text-brand-accent-dark underline" onClick={() => { setMood("all"); setSearch(""); setInStockOnly(false); }} type="button">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
