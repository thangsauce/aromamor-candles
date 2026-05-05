import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CATALOG } from "../store/catalog";
import { useStore } from "../store/StoreContext";
import { money } from "../store/hooks";

const base = import.meta.env.BASE_URL;

const FEATURED_IDS = [
  "parisian-cafe",
  "santorini-breeze",
  "amalfi-morning",
  "first-class-lounge",
] as const;

const STORY_IDS = [
  "puerto-rico-paradise",
  "graceful-journey",
] as const;

const CATEGORY_LINES = [
  "Coastal Escapes",
  "Cafe Mornings",
  "Quiet Rituals",
] as const;

const featuredProducts = FEATURED_IDS.map((id) => CATALOG[id]);
const storyProducts = STORY_IDS.map((id) => CATALOG[id]);

export default function HomePage() {
  const { addToCart, showToast, toggleWishlist, isWishlisted } = useStore();

  const handleFeaturedAdd = (productId: string) => {
    const product = CATALOG[productId];
    addToCart(productId, 1);
    showToast("Added to cart", `${product.name} · ${money(product.price)}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg">
      <Header />
      <main className="flex-1 bg-[oklch(0.985_0.008_80)]">
        <section className="relative min-h-[100svh] overflow-hidden bg-brand-card text-[oklch(0.96_0.014_82)]">
          <div className="absolute inset-0">
            <img
              src={`${base}hero.png`}
              alt="Lit amber candle in warm afternoon light beside a ceramic vase"
              className="h-full w-full object-cover object-[62%_center]"
            />
            <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,oklch(0.17_0.02_72/.28),oklch(0.17_0.02_72/.08)_58%,transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.2_0.03_48/.52),oklch(0.2_0.03_48/.24)_42%,oklch(0.22_0.03_48/.08)_80%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,oklch(0.985_0.008_80/0),oklch(0.985_0.008_80))]" />
          </div>

          <div className="relative mx-auto flex min-h-[100svh] max-w-[1320px] items-end px-6 pb-20 pt-36 md:px-10 md:pb-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[oklch(0.82_0.098_72)]">
                Destination candles now pouring
              </p>
              <h1
                className="mt-5 max-w-3xl text-5xl leading-[0.96] md:text-7xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Candles for rooms
                <br />
                with <em style={{ fontStyle: "italic", fontWeight: 300 }}>memory</em>.
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-[oklch(0.92_0.012_82)] md:text-lg">
                Small-batch candles inspired by destinations, rituals, and the quiet emotional weight a scent can carry through a home.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="rounded-full bg-[oklch(0.83_0.088_74)] px-6 py-3 text-sm font-semibold text-[oklch(0.22_0.02_64)] transition hover:bg-[oklch(0.88_0.07_76)]"
                >
                  View collection
                </Link>
                <Link
                  to="/about"
                  className="rounded-full border border-[oklch(0.94_0.01_82/.38)] px-6 py-3 text-sm font-semibold text-[oklch(0.97_0.008_82)] transition hover:border-[oklch(0.97_0.008_82)]"
                >
                  Why handmade
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[oklch(0.988_0.008_82)]">
          <div className="mx-auto grid max-w-[1320px] gap-6 px-6 py-12 md:grid-cols-[220px_minmax(0,1fr)] md:items-start md:gap-8 md:px-10 md:py-20">
            <p className="pt-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
              Our mission
            </p>
            <div className="grid gap-3 md:gap-5">
              <h2
                className="max-w-4xl text-xl leading-[1.16] text-brand-text md:text-[2.2rem]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                We make handmade candles with travel and tenderness at the center, turning scent into something meaningful for home, memory, and thoughtful gifting.
              </h2>
              <p className="hidden max-w-2xl text-sm leading-relaxed text-brand-muted md:block md:text-base">
                Aromamor is built around thoughtful design: candles poured with care, named like postcards, and crafted to feel just as meaningful to keep as they are to give.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[oklch(0.985_0.008_80)]">
          <div className="mx-auto max-w-[1320px] px-6 py-8 md:px-10 md:py-16">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
                  New pours
                </p>
                <h2
                  className="mt-3 text-3xl text-brand-text md:text-4xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  A quieter way to discover the collection
                </h2>
              </div>
              <Link
                to="/shop"
                className="hidden text-xs font-semibold uppercase tracking-[0.2em] text-brand-muted transition hover:text-brand-text md:block"
              >
                See all
              </Link>
            </div>

            <div className="-mx-6 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-3 [-webkit-overflow-scrolling:touch] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                (() => {
                  const wishlisted = isWishlisted(product.id);
                  return (
                <article
                  key={product.id}
                  className="group min-w-[78vw] snap-start transition hover:-translate-y-1 hover:shadow-[0_22px_44px_oklch(0.2_0.02_72/.08)] sm:min-w-0"
                >
                  <div className="relative overflow-hidden bg-[oklch(0.975_0.01_82)] p-6">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-72 w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                    />
                    {product.inStock ? (
                      <button
                        type="button"
                        onClick={() => handleFeaturedAdd(product.id)}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-3 rounded-full bg-[oklch(0.992_0.004_82/.94)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-text opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-brand-text hover:text-brand-bg"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[oklch(0.992_0.004_82/.94)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted opacity-0 transition duration-300 group-hover:opacity-100">
                        Sold Out
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
                      className={`group absolute right-4 top-4 flex h-10 w-10 items-center justify-center transition ${
                        wishlisted
                          ? "text-brand-accent"
                          : "text-brand-muted hover:text-brand-accent"
                      }`}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 8.3v2.2" />
                        <path d="M8 10.5h8v7.2A2.3 2.3 0 0 1 13.7 20h-3.4A2.3 2.3 0 0 1 8 17.7z" fill={wishlisted ? "currentColor" : "none"} />
                        <path d="M8 10.5c1.2-.9 2.6-1.3 4-1.3s2.8.4 4 1.3" />
                        <path d="M7 20h10" />
                        <path d="M12 1.8c1 1.1 1.3 2.4.5 3.5-.2.3-.4.5-.5.8-.2-.2-.4-.5-.6-.8-.8-1.1-.5-2.4.6-3.5Z" className={`${wishlisted ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-200`} fill="currentColor" stroke="currentColor" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid gap-3 bg-transparent p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
                      {product.destination}
                    </p>
                    <h3
                      className="text-2xl leading-none text-brand-text"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold text-brand-text">${product.price.toFixed(2)}</p>
                    <p className="text-sm leading-relaxed text-brand-muted">
                      {product.scents.join(", ")}
                    </p>
                  </div>
                </article>
                  );
                })()
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[oklch(0.992_0.004_82)]">
          <div className="mx-auto max-w-[1320px] px-6 py-16 text-center md:px-10 md:py-20">
            <p
              className="text-4xl leading-[1.05] text-brand-text md:text-[4.6rem]"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              {CATEGORY_LINES.map((line, index) => (
                <span key={line}>
                  {line}
                  {index < CATEGORY_LINES.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          </div>
        </section>

        <section className="bg-[oklch(0.985_0.008_80)]">
          <div className="mx-auto grid max-w-[1320px] gap-0 px-6 py-0 md:px-10">
            <div className="overflow-hidden">
              <img
                src={`${base}shop_hero.png`}
                alt="Candle by the shoreline at sunset"
                className="h-[430px] w-full object-cover md:h-[640px]"
              />
            </div>
            <div className="grid gap-8 py-10 md:grid-cols-[1.05fr_0.95fr] md:items-start md:py-12">
              <div>
                <h2
                  className="max-w-xl text-3xl leading-[1.08] text-brand-text md:text-5xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  Every scent begins as a place, then settles into the feeling you want a room to hold onto.
                </h2>
              </div>
              <div className="grid gap-4 text-sm leading-relaxed text-brand-muted md:text-base">
                <p>
                  Aromamor is less about filling space with fragrance and more about shaping atmosphere. A morning can feel brighter, a table more familiar, and a gift more intimate when scent is tied to memory.
                </p>
                <Link
                  to="/about"
                  className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-text transition hover:text-brand-accent"
                >
                  Read our story
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[oklch(0.988_0.008_82)]">
          <div className="mx-auto grid max-w-[1320px] gap-10 px-6 py-16 md:grid-cols-[0.95fr_1.05fr] md:px-10 md:py-20">
            <div className="grid gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
                Stories in scent
              </p>
              <h2
                className="max-w-lg text-3xl leading-[1.1] text-brand-text md:text-5xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                A curated collection, poured with intention.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-brand-muted md:text-base">
                We feature a select set of destination scents so each candle has space to shine. It is designed to feel thoughtful, memorable, and simple to explore.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {storyProducts.map((product, index) => (
                <article
                  key={product.id}
                  className={`group transition hover:-translate-y-1 hover:shadow-[0_22px_44px_oklch(0.2_0.02_72/.08)] ${index === 1 ? "md:mt-16" : ""}`}
                >
                  <div className="relative overflow-hidden bg-[oklch(0.975_0.01_82)] p-5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-60 w-full object-contain transition duration-500 group-hover:scale-[1.03]"
                    />
                    {product.inStock ? (
                      <button
                        type="button"
                        onClick={() => handleFeaturedAdd(product.id)}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-3 rounded-full bg-[oklch(0.992_0.004_82/.94)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-text opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-brand-text hover:text-brand-bg"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-[oklch(0.992_0.004_82/.94)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-muted opacity-0 transition duration-300 group-hover:opacity-100">
                        Sold Out
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => toggleWishlist(product.id)}
                      aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Save to wishlist"}
                      className={`group absolute right-4 top-4 flex h-10 w-10 items-center justify-center transition ${
                        isWishlisted(product.id)
                          ? "text-brand-accent"
                          : "text-brand-muted hover:text-brand-accent"
                      }`}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 8.3v2.2" />
                        <path d="M8 10.5h8v7.2A2.3 2.3 0 0 1 13.7 20h-3.4A2.3 2.3 0 0 1 8 17.7z" fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                        <path d="M8 10.5c1.2-.9 2.6-1.3 4-1.3s2.8.4 4 1.3" />
                        <path d="M7 20h10" />
                        <path d="M12 1.8c1 1.1 1.3 2.4.5 3.5-.2.3-.4.5-.5.8-.2-.2-.4-.5-.6-.8-.8-1.1-.5-2.4.6-3.5Z" className={`${isWishlisted(product.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity duration-200`} fill="currentColor" stroke="currentColor" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid gap-3 bg-transparent p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted">
                      {product.mood}
                    </p>
                    <h3
                      className="text-2xl leading-none text-brand-text"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm font-semibold text-brand-text">${product.price.toFixed(2)}</p>
                    <p className="text-sm leading-relaxed text-brand-muted">
                      {product.destination}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[oklch(0.955_0.018_80)]">
          <div className="mx-auto grid max-w-[1320px] gap-8 px-6 py-16 md:grid-cols-[220px_minmax(0,1fr)_auto] md:items-end md:px-10 md:py-20">
            <p className="pt-2 text-xs font-semibold uppercase tracking-[0.22em] text-brand-muted">
              Kind words
            </p>
            <div className="grid gap-4">
              <h2
                className="max-w-4xl text-3xl leading-[1.12] text-brand-text md:text-[3.1rem]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                Real rooms, real gifts, real rituals. The candles people come back for are the ones that keep feeling personal.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-brand-muted md:text-base">
                Explore reviews, discover which destinations people light most often, and find the scent that feels closest to your own story.
              </p>
            </div>
            <Link
              to="/reviews"
              className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-text transition hover:text-brand-accent"
            >
              Read reviews
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
