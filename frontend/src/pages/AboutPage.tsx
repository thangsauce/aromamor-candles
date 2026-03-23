import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const VALUES = [
  { icon: "🌿", title: "Clean Ingredients", desc: "100% soy wax blend, phthalate-free fragrance oils, and cotton wicks. Nothing that shouldn't be in your home." },
  { icon: "🤲", title: "Hand-Poured", desc: "Every candle is poured in small batches by hand. No factories, no shortcuts — just care in every pour." },
  { icon: "✈️", title: "Travel-Inspired", desc: "Our scents are rooted in real places and real memories. Each one tells a story." },
  { icon: "💛", title: "Community First", desc: "We're a small business and every order means the world to us. Your support keeps us going." },
];

const CARE_TIPS = [
  { icon: "🕯️", title: "First Burn", desc: "Always burn until the wax pool reaches the edge of the jar on the first use. This prevents tunneling and maximizes your burn time." },
  { icon: "✂️", title: "Trim Your Wick", desc: "Trim the wick to ¼ inch before every burn. This keeps the flame clean and your scent true." },
  { icon: "⏱️", title: "Burn Time", desc: "Never burn for more than 4 hours at a time. Let the candle cool for 2 hours before relighting." },
  { icon: "🚫", title: "Safety First", desc: "Keep away from drafts, children, and pets. Never leave a burning candle unattended." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-50 to-stone-100 dark:from-brand-bg-dark dark:to-stone-900 border-b border-brand-line dark:border-brand-line-dark">
          <div className="max-w-[1100px] mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center gap-4">
            <span className="text-sm tracking-widest uppercase text-brand-muted dark:text-brand-muted-dark">🕯️ Our Story</span>
            <h1 className="text-4xl md:text-5xl font-semibold text-brand-text dark:text-brand-text-dark leading-tight">
              Made with intention,<br />poured with love.
            </h1>
            <p className="text-brand-muted dark:text-brand-muted-dark max-w-md">
              Aromamor was born from a love of travel and the belief that a single scent can transport you anywhere in the world.
            </p>
          </div>
        </section>

        <div className="max-w-[1100px] mx-auto px-4 py-12 flex flex-col gap-16">

          {/* Founder */}
          <section className="flex flex-col md:flex-row gap-8 items-start bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark p-8">
            <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-stone-200 dark:from-amber-900/40 dark:to-stone-800 flex items-center justify-center text-4xl">
              ✈️
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-semibold text-brand-text dark:text-brand-text-dark">Hi, I'm the founder of Aromamor</h2>
              <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">
                Every candle in our collection is inspired by a place I've dreamed of — or been lucky enough to visit. I started Aromamor because I wanted a way to hold onto those memories, to bring a little piece of the world into my home.
              </p>
              <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">
                Each scent is carefully crafted to capture not just a location, but a feeling — the warmth of a Parisian café on a rainy afternoon, the salt air of the Amalfi Coast at sunrise, the calm of a first-class lounge before a big trip.
              </p>
              <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">
                I hand-pour every candle in small batches using a clean soy blend, and I obsess over every note in every fragrance until it feels just right. This is more than a candle brand — it's a passport for your senses.
              </p>
              <p className="text-sm font-semibold text-brand-accent dark:text-brand-accent-dark">— The Founder</p>
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-text dark:text-brand-text-dark mb-6">What we stand for</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div key={v.title} className="flex gap-4 p-5 rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark">
                  <div className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center">{v.icon}</div>
                  <div>
                    <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-1">{v.title}</h3>
                    <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Candle Care */}
          <section>
            <h2 className="text-2xl font-semibold text-brand-text dark:text-brand-text-dark mb-6">Candle Care Tips</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CARE_TIPS.map((tip) => (
                <div key={tip.title} className="flex gap-4 p-5 rounded-2xl bg-brand-card dark:bg-brand-card-dark border border-brand-line dark:border-brand-line-dark">
                  <span className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center">{tip.icon}</span>
                  <div>
                    <h3 className="font-semibold text-brand-text dark:text-brand-text-dark mb-1">{tip.title}</h3>
                    <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-gradient-to-br from-brand-accent/10 to-amber-100/50 dark:from-brand-accent-dark/10 dark:to-amber-900/20 border border-brand-line dark:border-brand-line-dark p-10 flex flex-col items-center text-center gap-4">
            <h2 className="text-2xl font-semibold text-brand-text dark:text-brand-text-dark">Ready to find your destination?</h2>
            <p className="text-brand-muted dark:text-brand-muted-dark max-w-sm">
              Browse our full collection and find the scent that takes you there.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <Link
                className="px-6 py-3 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold hover:opacity-90 transition"
                to="/"
              >
                ✈️ Shop All Candles
              </Link>
              <Link
                className="px-6 py-3 rounded-xl border border-brand-line dark:border-brand-line-dark text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition"
                to="/reviews"
              >
                ⭐ Read Reviews
              </Link>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
