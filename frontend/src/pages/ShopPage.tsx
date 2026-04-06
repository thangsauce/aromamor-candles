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
        <section className="relative overflow-hidden border-b border-brand-line dark:border-brand-line-dark">
          {/* Warm photographic background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#ede8df] via-[#e8dfd4] to-[#ddd4c8] dark:from-brand-bg-dark dark:via-stone-900 dark:to-brand-bg-dark" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-100/50 dark:bg-amber-900/10 blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-stone-200/40 dark:bg-stone-800/20 blur-3xl translate-y-1/3 pointer-events-none" />

          <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1 flex flex-col items-start gap-5">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">
                Destinations in a candle
              </p>
              <h1
                className="text-5xl md:text-6xl text-brand-text dark:text-brand-text-dark leading-[1.1]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Transform Your Space,<br />
                <em style={{ fontStyle: "italic", fontWeight: 300 }}>Elevate Your Mood</em>
              </h1>
              <p className="text-brand-muted dark:text-brand-muted-dark max-w-sm leading-relaxed">
                Handcrafted candles and pure essential oils, each scent a passport to somewhere beautiful.
              </p>
              <div className="flex gap-3 mt-2">
                <a
                  href="#collection"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("collection")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="px-7 py-2.5 rounded-lg border border-brand-text dark:border-brand-text-dark text-brand-text dark:text-brand-text-dark text-sm font-medium hover:bg-brand-text hover:text-brand-bg dark:hover:bg-brand-text-dark dark:hover:text-brand-bg-dark transition"
                >
                  Shop the Collection
                </a>
              </div>
            </div>

            {/* Candle + diffuser illustration */}
            <div className="hidden md:flex items-end justify-center gap-8 flex-shrink-0 w-[320px] h-[260px] relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-50/60 to-stone-100/40 dark:from-amber-900/10 dark:to-transparent" />

              {/* Dark amber glass jar candle */}
              <div className="relative flex flex-col items-center mb-8 z-10">
                {/* Flame glow */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-amber-300/30 dark:bg-amber-400/20 blur-2xl pointer-events-none" />
                {/* Flame */}
                <div className="flex flex-col items-center">
                  <div className="w-2 h-5 bg-gradient-to-t from-amber-500 via-amber-300 to-transparent rounded-full opacity-90 blur-[1px]" />
                  <div className="w-0.5 h-3 bg-amber-900/50 -mt-1" />
                </div>
                {/* Jar */}
                <div className="w-24 h-24 rounded-lg bg-gradient-to-b from-amber-700 via-amber-800 to-amber-950 dark:from-amber-600 dark:via-amber-700 dark:to-amber-900 shadow-2xl relative overflow-hidden border border-amber-600/10">
                  <div className="absolute left-2 top-2 w-2 h-14 bg-white/15 rounded-full rotate-6" />
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-amber-500/8 to-amber-200/15" />
                </div>
              </div>

              {/* White ceramic diffuser */}
              <div className="relative flex flex-col items-center z-10">
                {/* Mist wisps */}
                <div className="flex gap-2 mb-1 opacity-30 dark:opacity-20">
                  <div className="w-0.5 h-5 bg-stone-500 rounded-full" />
                  <div className="w-0.5 h-4 bg-stone-500 rounded-full mt-1.5" />
                  <div className="w-0.5 h-5 bg-stone-500 rounded-full" />
                </div>
                {/* Nozzle */}
                <div className="w-7 h-4 bg-gradient-to-b from-stone-100 to-stone-200 dark:from-stone-300 dark:to-stone-400 rounded-t-full shadow-sm" />
                {/* Round body */}
                <div className="w-24 h-24 bg-gradient-to-b from-[#f5f3f0] via-stone-100 to-stone-200 dark:from-stone-300 dark:via-stone-400 dark:to-stone-500 rounded-[50%_50%_40%_40%/55%_55%_45%_45%] shadow-xl border border-stone-200/60 dark:border-stone-400/30" />
              </div>
            </div>
          </div>
        </section>

        {/* Mood strip */}
        <section className="border-y border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark">
          <div className="max-w-[1200px] mx-auto px-6 py-3 flex gap-2 overflow-x-auto">
            <button
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs tracking-wide transition ${mood === "all" ? "bg-brand-text dark:bg-brand-text-dark text-brand-bg dark:text-brand-bg-dark font-medium" : "border border-brand-line dark:border-brand-line-dark text-brand-muted dark:text-brand-muted-dark hover:border-brand-muted dark:hover:border-brand-muted-dark"}`}
              onClick={() => setMood("all")}
              type="button"
            >
              All
            </button>
            {moods.map((m) => (
              <button
                key={m}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs tracking-wide transition ${mood === m ? "bg-brand-text dark:bg-brand-text-dark text-brand-bg dark:text-brand-bg-dark font-medium" : "border border-brand-line dark:border-brand-line-dark text-brand-muted dark:text-brand-muted-dark hover:border-brand-muted dark:hover:border-brand-muted-dark"}`}
                onClick={() => setMood(m)}
                type="button"
              >
                {m}
              </button>
            ))}
          </div>
        </section>

        {/* Filters panel */}
        <section className="border-b border-brand-line/80 dark:border-brand-line-dark/80 bg-brand-bg dark:bg-brand-bg-dark">
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <div className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card/90 dark:bg-brand-card-dark/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between gap-4 px-4 pt-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-muted dark:text-brand-muted-dark">
                    Refine the Collection
                  </p>
                  <p className="text-sm text-brand-text dark:text-brand-text-dark mt-1">
                    Filter by mood, search scent notes, and sort the lineup.
                  </p>
                </div>
                <button
                  className="text-xs text-brand-muted dark:text-brand-muted-dark underline underline-offset-4 hover:text-brand-text dark:hover:text-brand-text-dark transition"
                  onClick={() => {
                    setMood("all");
                    setSort("name-asc");
                    setSearch("");
                    setInStockOnly(false);
                  }}
                  type="button"
                >
                  Reset all
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 p-4 pt-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="moodFilter" className="text-xs font-medium uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Mood</label>
                  <select
                    id="moodFilter"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark text-sm"
                  >
                    <option value="all">All moods</option>
                    {moods.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="sortSelect" className="text-xs font-medium uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Sort</label>
                  <select
                    id="sortSelect"
                    value={sort}
                    onChange={(e) => setSort(e.target.value as SortKey)}
                    className="px-3 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark text-sm"
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
                  <label htmlFor="searchInput" className="text-xs font-medium uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Search</label>
                  <input
                    id="searchInput"
                    type="text"
                    placeholder="Name, destination, scent..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark text-sm placeholder:text-brand-muted dark:placeholder:text-brand-muted-dark"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase tracking-widest text-brand-muted dark:text-brand-muted-dark">Availability</label>
                  <label className="flex min-h-[46px] items-center gap-3 rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark px-3 cursor-pointer">
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
            </div>
          </div>
        </section>

        {/* Collection grid */}
        <section className="max-w-[1200px] mx-auto px-6 pt-8 pb-12 scroll-mt-44" id="collection">
          <div className="flex items-baseline justify-between gap-4 mb-7">
            <div>
              <h2
                className="text-3xl text-brand-text dark:text-brand-text-dark"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Signature Collection
              </h2>
              <p className="text-sm text-brand-muted dark:text-brand-muted-dark mt-1">Destination · Mood · Notes</p>
            </div>
            <span className="text-sm text-brand-muted dark:text-brand-muted-dark flex-shrink-0">
              {filtered.length} candle{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-brand-muted dark:text-brand-muted-dark">
              <p className="text-lg">No candles match your filters.</p>
              <button
                className="mt-3 text-sm text-brand-accent dark:text-brand-accent-dark underline"
                onClick={() => { setMood("all"); setSearch(""); setInStockOnly(false); }}
                type="button"
              >
                Clear filters
              </button>
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
