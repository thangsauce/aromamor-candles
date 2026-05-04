import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CATALOG } from "../store/catalog";

const base = import.meta.env.BASE_URL;

const JOURNAL_STOPS = [
  {
    id: "parisian-cafe",
    chapter: "Rainy cafe",
    copy: "Espresso, brown sugar, and warm vanilla for the table you never want to leave.",
    tone: "bg-[oklch(0.9_0.035_57)] text-[oklch(0.25_0.035_48)]",
  },
  {
    id: "santorini-breeze",
    chapter: "Coastal afternoon",
    copy: "Sea salt and white citrus, clean enough to open every window in the room.",
    tone: "bg-[oklch(0.9_0.05_205)] text-[oklch(0.25_0.045_220)]",
  },
  {
    id: "first-class-lounge",
    chapter: "Before departure",
    copy: "Amber, cashmere, and soft vanilla for a quiet reset before the next place.",
    tone: "bg-[oklch(0.86_0.035_85)] text-[oklch(0.24_0.025_62)]",
  },
] as const;

const HANDMADE_NOTES = [
  "Small-batch poured",
  "Gift-ready scents",
  "Travel-memory stories",
  "Clean soy blend",
];

export default function HomePage() {
  const journalProducts = JOURNAL_STOPS.map((stop) => ({
    ...stop,
    product: CATALOG[stop.id],
  }));

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-[oklch(0.22_0.034_48)] text-[oklch(0.96_0.014_82)]">
          <div className="absolute inset-0">
            <img
              src={`${base}hero.png`}
              alt="Lit amber candle in warm afternoon light beside a ceramic vase"
              className="h-full w-full object-cover object-[62%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.19_0.035_48/.78),oklch(0.2_0.03_48/.38)_44%,oklch(0.22_0.03_48/.04)_78%)]" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,oklch(0.22_0.03_48/0),oklch(0.955_0.018_80))]" />
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-[1320px] items-end px-6 pb-20 pt-32 md:pb-24">
            <div className="max-w-3xl reveal-up">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[oklch(0.82_0.098_72)]">
                The destination collection
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl leading-[0.94] md:text-7xl">
                Handmade candles
                <br />
                for rooms
                <br />
                with memory.
              </h1>
              <p className="mt-6 max-w-xl text-xl leading-relaxed text-[oklch(0.91_0.018_82/.88)]">
                Soy candles poured in small batches, composed around travel, warmth, and the quiet ritual of lighting something beautiful.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/shop"
                  className="border border-[oklch(0.82_0.098_72)] bg-[oklch(0.82_0.098_72)] px-6 py-3 text-sm font-semibold text-[oklch(0.2_0.03_48)] transition hover:bg-[oklch(0.88_0.08_76)]"
                >
                  View collection
                </Link>
                <Link
                  to="/about"
                  className="border border-[oklch(0.9_0.02_82/.46)] px-6 py-3 text-sm font-semibold text-[oklch(0.96_0.014_82)] transition hover:border-[oklch(0.96_0.014_82)]"
                >
                  Why handmade
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-brand-line bg-brand-card">
          <div className="mx-auto max-w-[1320px] px-6 py-16 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-muted">Our mission</p>
            <h2 className="mt-5 max-w-5xl text-4xl leading-[1.04] text-brand-text md:text-6xl">
              We make handmade candles with travel and tenderness at the center, turning scent into a small ritual for home, memory, and gifting.
            </h2>
          </div>
        </section>

        <section className="border-b border-brand-line bg-[oklch(0.985_0.008_80)]">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 border-x border-brand-line md:grid-cols-4">
            {HANDMADE_NOTES.map((note) => (
              <div key={note} className="border-b border-r border-brand-line px-5 py-5 last:border-r-0 md:border-b-0">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-text">{note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-brand-bg">
          <div className="mx-auto max-w-[1320px] px-6 py-16 md:py-20">
            <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-muted">Travel story</p>
                <h2 className="mt-5 max-w-xl text-5xl leading-[0.96] text-brand-text md:text-6xl">
                  Each candle starts with a place.
                </h2>
              </div>
              <p className="max-w-2xl text-xl leading-relaxed text-brand-muted">
                The collection should feel like opening a drawer of postcards: cafe mornings, coastal air, quiet lounges, and the familiar comfort of handmade wax cooling in glass.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {journalProducts.map(({ chapter, copy, tone, product }) => (
                <article key={product.id} className={`grid min-h-[470px] grid-rows-[1fr_auto] overflow-hidden border border-brand-line ${tone}`}>
                  <div className="relative flex items-center justify-center p-6">
                    <img src={product.image} alt={product.name} className="h-72 w-full object-contain drop-shadow-[0_28px_44px_oklch(0.22_0.03_48/.18)]" />
                    <span className="absolute left-5 top-5 border border-current/20 bg-[oklch(0.98_0.008_80/.6)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                      {chapter}
                    </span>
                  </div>
                  <div className="border-t border-current/14 p-6">
                    <h3 className="text-3xl leading-none">{product.name}</h3>
                    <p className="mt-3 text-base leading-relaxed opacity-[.82]">{copy}</p>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] opacity-72">{product.scents.join(" / ")}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
