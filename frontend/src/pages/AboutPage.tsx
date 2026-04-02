import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const VALUES = [
  {
    title: "Clean Ingredients",
    desc: "100% soy wax blend, phthalate-free fragrance oils, and cotton wicks. Nothing that shouldn't be in your home.",
  },
  {
    title: "Hand-Poured",
    desc: "Every candle is poured in small batches by hand. No factories, no shortcuts — just care in every pour.",
  },
  {
    title: "Travel-Inspired",
    desc: "Our scents are rooted in real places and real memories. Each one tells a story.",
  },
  {
    title: "Community First",
    desc: "We're a small business and every order means the world to us. Your support keeps us going.",
  },
];

const CARE_TIPS = [
  {
    title: "First Burn",
    desc: "Always burn until the wax pool reaches the edge of the jar on the first use. This prevents tunneling and maximizes your burn time.",
  },
  {
    title: "Trim Your Wick",
    desc: "Trim the wick to ¼ inch before every burn. This keeps the flame clean and your scent true.",
  },
  {
    title: "Burn Time",
    desc: "Never burn for more than 4 hours at a time. Let the candle cool for 2 hours before relighting.",
  },
  {
    title: "Safety First",
    desc: "Keep away from drafts, children, and pets. Never leave a burning candle unattended.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-brand-line dark:border-brand-line-dark">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 dark:from-brand-bg-dark dark:via-stone-900 dark:to-brand-bg-dark" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-amber-100/50 dark:bg-amber-900/10 blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-28 flex flex-col items-center text-center gap-5">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">Our Story</p>
            <h1
              className="text-5xl md:text-6xl text-brand-text dark:text-brand-text-dark leading-[1.1] max-w-2xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Crafted with Care,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Inspired by Travel</em>
            </h1>
            <p className="text-brand-muted dark:text-brand-muted-dark max-w-md leading-relaxed">
              Aromamor was born from a love of travel and the belief that a single scent can transport you anywhere in the world.
            </p>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 py-14 flex flex-col gap-16">

          {/* Rooted in Ritual */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-64 md:h-80 rounded-2xl bg-gradient-to-br from-amber-100 to-stone-200 dark:from-amber-900/30 dark:to-stone-800 flex items-center justify-center border border-brand-line dark:border-brand-line-dark">
          <img
            src={`${import.meta.env.BASE_URL}The Founder.JPG`}
            alt="The Founder"
            height={64}
            width={80}
          />
            </div>
            <div className="flex flex-col gap-4">
              <h2
                className="text-3xl text-brand-text dark:text-brand-text-dark"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Rooted in Ritual &amp; Nature
              </h2>
              <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">
                Every candle in our collection is inspired by a place I've dreamed of — or been lucky enough to visit. I started Aromamor because I wanted a way to hold onto those memories, to bring a little piece of the world into my home.
              </p>
              <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">
                Each scent is carefully crafted to capture not just a location, but a feeling — the warmth of a Parisian café on a rainy afternoon, the salt air of the Amalfi Coast at sunrise, the calm of a first-class lounge before a big trip.
              </p>
              <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">
                I hand-pour every candle in small batches using a clean soy blend, and I obsess over every note in every fragrance until it feels just right. This is more than a candle brand — it's a passport for your senses.
              </p>
              <p className="text-sm font-medium text-brand-accent dark:text-brand-accent-dark" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>— Margarita Linares</p>
            </div>
          </section>

          {/* Our Promise */}
          <section>
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark mb-2">What we stand for</p>
              <h2
                className="text-3xl text-brand-text dark:text-brand-text-dark"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Our Promise
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {VALUES.map((v) => (
                <div key={v.title} className="flex flex-col gap-3 p-6 rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark">
                  <div className="w-8 h-0.5 bg-brand-accent dark:bg-brand-accent-dark rounded-full" />
                  <h3
                    className="text-base text-brand-text dark:text-brand-text-dark"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-xs text-brand-muted dark:text-brand-muted-dark leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Candle Care */}
          <section>
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark mb-2">Care guide</p>
              <h2
                className="text-3xl text-brand-text dark:text-brand-text-dark"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Candle Care Tips
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CARE_TIPS.map((tip) => (
                <div key={tip.title} className="flex gap-4 p-6 rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark">
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-brand-accent/10 dark:bg-brand-accent-dark/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-brand-accent dark:bg-brand-accent-dark" />
                  </div>
                  <div>
                    <h3
                      className="text-base text-brand-text dark:text-brand-text-dark mb-1"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                    >
                      {tip.title}
                    </h3>
                    <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-amber-900/10 dark:to-stone-800/30 border border-brand-line dark:border-brand-line-dark p-12 flex flex-col items-center text-center gap-5">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">Ready to explore?</p>
            <h2
              className="text-3xl text-brand-text dark:text-brand-text-dark"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Find your destination
            </h2>
            <p className="text-brand-muted dark:text-brand-muted-dark max-w-sm text-sm">
              Browse our full collection and find the scent that takes you there.
            </p>
            <div className="flex gap-3 flex-wrap justify-center mt-1">
              <Link
                className="px-7 py-2.5 rounded-full bg-brand-text dark:bg-brand-text-dark text-brand-bg dark:text-brand-bg-dark text-sm font-medium hover:opacity-90 transition"
                to="/"
              >
                Shop All Candles
              </Link>
              <Link
                className="px-7 py-2.5 rounded-full border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark text-sm hover:border-brand-accent dark:hover:border-brand-accent-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
                to="/reviews"
              >
                Read Reviews
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
