import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [mood, setMood] = useState("all");
  const [sort, setSort] = useState<SortKey>("name-asc");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab")?.toLowerCase();

    if (tab === "gifts") {
      setMood("all");
      setInStockOnly(true);
      return;
    }

    if (tab === "signatures") {
      setMood("Sophisticated & Calm");
      setInStockOnly(false);
      return;
    }

    if (tab === "new-pours" || tab === "new") {
      setMood("all");
      setInStockOnly(false);
    }
  }, [location.search]);

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
        <section className="relative overflow-hidden bg-brand-card text-[oklch(0.96_0.014_82)]">
          <div className="absolute inset-0">
            <img
              src={`${import.meta.env.BASE_URL}shop_hero.png`}
              alt="Lit candle at a shoreline during sunset"
              className="h-full w-full object-cover object-[56%_center]"
            />
            <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,oklch(0.17_0.02_72/.3),oklch(0.17_0.02_72/.1)_58%,transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.19_0.035_48/.72),oklch(0.2_0.03_48/.34)_42%,oklch(0.22_0.03_48/.08)_78%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,oklch(0.985_0.008_80/0),oklch(0.985_0.008_80))]" />
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-[1320px] items-end px-6 pb-20 pt-32 md:pb-24">
            <div className="grid w-full gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[oklch(0.82_0.098_72)]">
                  Shop
                </p>
                <h1 className="mt-5 max-w-4xl text-5xl leading-[0.94] md:text-7xl">
                  <em style={{ fontStyle: "italic", fontWeight: 300 }}>Candles</em> for the{" "}
                  <em style={{ fontStyle: "italic", fontWeight: 300 }}>places</em>
                  <br />
                  <span className="ml-[3.2rem] inline-block md:ml-[4.8rem]">
                    you keep
                    <br />
                    <em style={{ fontStyle: "italic", fontWeight: 300 }}>returning to.</em>
                  </span>
                </h1>
              </div>
              <p className="max-w-2xl text-right text-xl leading-relaxed text-[oklch(0.91_0.018_82/.88)] lg:justify-self-end">
                Browse destination-inspired candles, poured by hand in small batches and made for rooms, gifts, and scent memories.
              </p>
            </div>
          </div>
        </section>

        <section id="collection" className="bg-[oklch(0.985_0.008_80)]">
          <div className="mx-auto max-w-[1320px] px-6 py-16 md:py-20">
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
              <div className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 [-webkit-overflow-scrolling:touch] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-5 sm:gap-y-10 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
                {filtered.map((product) => (
                  <div key={product.id} className="min-w-[78vw] snap-start sm:min-w-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="h-20 bg-[linear-gradient(180deg,oklch(0.985_0.008_80),oklch(0.955_0.018_80))]" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
