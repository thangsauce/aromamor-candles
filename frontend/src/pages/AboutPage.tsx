import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative h-screen min-h-[100svh] overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}our_story.png`}
            alt="Aromamor interior scene with candles"
            className="absolute inset-0 h-full w-full object-cover object-[0%_0%] md:object-[0%_8%]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.19_0.035_48/.78),oklch(0.2_0.03_48/.38)_44%,oklch(0.22_0.03_48/.04)_78%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,oklch(0.955_0.018_80/0),oklch(0.955_0.018_80))]" />
          <div className="relative mx-auto flex h-full max-w-[1200px] flex-col items-start justify-start gap-5 px-6 pt-36 pb-12 text-left md:pl-40 md:pt-44 md:pb-14">
            <p className="text-xs tracking-[0.2em] uppercase text-[oklch(0.93_0.02_80)]">Our Story</p>
            <h1
              className="text-5xl md:text-6xl text-[oklch(0.98_0.01_80)] leading-[1.1] max-w-2xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Crafted with{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Care</em>,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Inspired</em> by{" "}
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Travel</em>
            </h1>
            <p className="text-[oklch(0.92_0.01_80)] max-w-md leading-relaxed">
              Aromamor was born from a love of travel and the belief that a single scent can transport you anywhere in the world.
            </p>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 py-14 flex flex-col gap-16">

          {/* Rooted in Ritual */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="rounded-2xl bg-gradient-to-br from-amber-100 to-stone-200 dark:from-amber-900/30 dark:to-stone-800 flex items-center justify-center border border-brand-line dark:border-brand-line-dark overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}founder.png`}
                alt="Margarita Linares, Founder"
                className="h-auto w-full object-contain object-center"
              />
            </div>
            <div className="flex flex-col gap-4 md:sticky md:top-28 md:self-start">
              <p className="text-sm tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">The Founder</p>
              <h2
                className="text-4xl text-brand-text dark:text-brand-text-dark md:text-[2.7rem]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Rooted in Ritual &amp; Nature
              </h2>
              <p className="text-base leading-relaxed text-brand-muted dark:text-brand-muted-dark md:text-lg">
                Every candle in our collection is inspired by a place I've dreamed of — or been lucky enough to visit. I started Aromamor because I wanted a way to hold onto those memories, to bring a little piece of the world into my home.
              </p>
              <p className="text-base leading-relaxed text-brand-muted dark:text-brand-muted-dark md:text-lg">
                Each scent is carefully crafted to capture not just a location, but a feeling — the warmth of a Parisian café on a rainy afternoon, the salt air of the Amalfi Coast at sunrise, the calm of a first-class lounge before a big trip.
              </p>
              <p className="text-base leading-relaxed text-brand-muted dark:text-brand-muted-dark md:text-lg">
                I hand-pour every candle in small batches using a clean soy blend, and I obsess over every note in every fragrance until it feels just right. This is more than a candle brand — it's a passport for your senses.
              </p>
              <p className="text-base font-medium text-brand-accent dark:text-brand-accent-dark md:text-lg" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>— Margarita Linares</p>
            </div>
          </section>

          {/* Our Promise */}
          <section className="grid grid-cols-1 gap-8 md:grid-cols-[0.98fr_1.02fr] md:items-start">
            <div className="flex flex-col gap-4 md:sticky md:top-28 md:self-start">
                <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">
                  Our Promise
                </p>
                <h2
                  className="text-3xl text-brand-text dark:text-brand-text-dark md:text-4xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  What we stand for
                </h2>
                <p className="max-w-lg text-sm leading-relaxed text-brand-muted dark:text-brand-muted-dark md:text-base">
                  Travel, community, and craftsmanship shape every candle we pour. From first light to final burn, each scent is designed to feel personal, comforting, and made with real care.
                </p>
                <Link
                  to="/candle-care"
                  className="w-fit text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent transition hover:text-brand-accent-dark dark:text-brand-accent-dark dark:hover:text-brand-accent"
                >
                See candle care
                </Link>
              </div>
            <div className="group rounded-[28px] border border-brand-line dark:border-brand-line-dark overflow-hidden bg-brand-card dark:bg-brand-card-dark shadow-[0_24px_54px_oklch(0.2_0.02_72/.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_72px_oklch(0.2_0.02_72/.14)]">
              <div className="overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}our_story1.png`}
                  alt="Aromamor promise image"
                  className="h-[360px] w-full object-cover object-center transition duration-700 group-hover:scale-[1.03] md:h-[460px]"
                />
              </div>
            </div>
          </section>

          {/* Travel Inspired */}
          <section className="grid grid-cols-1 gap-8 md:grid-cols-[1.02fr_0.98fr] md:items-center">
            <div className="group rounded-[28px] border border-brand-line dark:border-brand-line-dark overflow-hidden bg-brand-card dark:bg-brand-card-dark shadow-[0_24px_54px_oklch(0.2_0.02_72/.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_72px_oklch(0.2_0.02_72/.14)]">
              <div className="overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}out_story2.png`}
                  alt="Travel-inspired candle moment on calm water"
                  className="h-[360px] w-full object-cover object-center transition duration-700 group-hover:scale-[1.03] md:h-[460px]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 md:sticky md:top-28 md:self-start md:pl-4">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">
                Scent &amp; Memory
              </p>
              <h2
                className="text-3xl text-brand-text dark:text-brand-text-dark md:text-4xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Travel-Inspired
              </h2>
              <p className="max-w-lg text-sm leading-relaxed text-brand-muted dark:text-brand-muted-dark md:text-base">
                Our scents are rooted in real places and real memories. Each one tells a story. Some are inspired by quiet mornings in coastal towns, others by warm evenings in city cafes and moments between departures. We build each fragrance to capture a feeling you can return to, not just a note you can name.
              </p>
              <Link
                to="/shop"
                className="w-fit text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent transition hover:text-brand-accent-dark dark:text-brand-accent-dark dark:hover:text-brand-accent"
              >
                See our collections
              </Link>
            </div>
          </section>

          {/* Community First */}
          <section className="grid grid-cols-1 gap-8 md:grid-cols-[0.98fr_1.02fr] md:items-start">
            <div className="flex flex-col gap-4 md:sticky md:top-28 md:self-start">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">
                Our Community
              </p>
              <h2
                className="text-3xl text-brand-text dark:text-brand-text-dark md:text-4xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Community First
              </h2>
              <div className="max-w-lg space-y-3 text-sm leading-relaxed text-brand-muted dark:text-brand-muted-dark md:text-base">
                <p>
                  Choosing Aromamor means more than just a candle. You&apos;re supporting a lifelong passion, a personal journey, and a maker who pours their heart into every single piece.
                </p>
                <p>
                  We&apos;re a small business and every order means the world to us. Your support keeps us going.
                </p>
              </div>
              <Link
                to="/reviews"
                className="w-fit text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent transition hover:text-brand-accent-dark dark:text-brand-accent-dark dark:hover:text-brand-accent"
              >
                See customer reviews
              </Link>
            </div>
            <div className="group rounded-[28px] border border-brand-line dark:border-brand-line-dark overflow-hidden bg-brand-card dark:bg-brand-card-dark shadow-[0_24px_54px_oklch(0.2_0.02_72/.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_72px_oklch(0.2_0.02_72/.14)]">
              <div className="overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}our_story3.png`}
                  alt="Community candle exchange moment"
                  className="h-[360px] w-full object-cover object-center transition duration-700 group-hover:scale-[1.03] md:h-[460px]"
                />
              </div>
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
                to="/shop"
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
