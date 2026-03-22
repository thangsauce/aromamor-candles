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
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="wrap hero-card">
            <p className="kicker">✈️ Destinations in a candle</p>
            <h2>SLOGAN FOR STORE</h2>
            <p className="muted">
              Each candle captures a destination, a mood, and a signature blend of notes.
            </p>

            <button
              className={`btn filter-toggle-btn${filtersOpen ? " active" : ""}`}
              onClick={() => setFiltersOpen((v) => !v)}
              type="button"
            >
              {filtersOpen ? "✕ Close Filters" : "⚙️ Filters & Sort"}
            </button>

            <div className={`hero-controls${filtersOpen ? " filters-open" : ""}`}>
              <div className="control">
                <label htmlFor="moodFilter">Filter by Mood</label>
                <select
                  id="moodFilter"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                >
                  <option value="all">All moods</option>
                  {moods.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div className="control">
                <label htmlFor="sortSelect">Sort</label>
                <select
                  id="sortSelect"
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                >
                  <option value="name-asc">Name (A → Z)</option>
                  <option value="name-desc">Name (Z → A)</option>
                  <option value="mood-asc">Mood (A → Z)</option>
                  <option value="mood-desc">Mood (Z → A)</option>
                  <option value="price-asc">Price (Low → High)</option>
                  <option value="price-desc">Price (High → Low)</option>
                </select>
              </div>

              <div className="control toggle">
                <label>Availability</label>
                <label className="toggle-row">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>Only show in stock</span>
                </label>
              </div>

              <div className="control">
                <label htmlFor="searchInput">Search</label>
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Search by name, destination, scent..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="wrap" id="collection">
          <div className="section-title">
            <h3>Signature Collection</h3>
            <p className="muted">Destination • Mood • Notes</p>
          </div>

          <div className="grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
