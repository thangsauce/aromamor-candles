import Header from "../components/Header";
import Footer from "../components/Footer";

const CARE_TIPS = [
  {
    title: "First Burn",
    desc: "Always burn until the wax pool reaches the edge of the jar on the first use. This prevents tunneling and maximizes your burn time.",
  },
  {
    title: "Trim Your Wick",
    desc: "Trim the wick to 1/4 inch before every burn. This keeps the flame clean and your scent true.",
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

export default function CandleCarePage() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg">
      <Header />
      <main className="flex-1">
        <section className="relative h-screen min-h-[100svh] overflow-hidden text-[oklch(0.96_0.014_82)]">
          <div className="absolute inset-0">
            <img
              src={`${import.meta.env.BASE_URL}candle_care.png`}
              alt="Candle care setup with tools and ingredients"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,oklch(0.17_0.02_72/.24),oklch(0.17_0.02_72/.08)_58%,transparent)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.19_0.035_48/.72),oklch(0.2_0.03_48/.34)_42%,oklch(0.22_0.03_48/.08)_78%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,oklch(0.985_0.008_80/0),oklch(0.985_0.008_80))]" />
          </div>
          <div className="relative mx-auto flex h-full max-w-[1200px] flex-col items-start justify-start px-6 pb-12 pt-56 md:pt-72 md:pb-14">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[oklch(0.82_0.098_72)]">Care guide</p>
            <h1
              className="text-5xl text-[oklch(0.98_0.01_80)] md:text-6xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              Candle <em style={{ fontStyle: "italic", fontWeight: 300 }}>Care</em>
              <br />
              Tips
            </h1>
            <p className="mt-5 max-w-2xl leading-relaxed text-[oklch(0.91_0.018_82/.88)]">
              Keep every burn clean, even, and long-lasting with these simple care rituals.
            </p>
          </div>
        </section>

        <section className="bg-[oklch(0.985_0.008_80)]">
          <div className="mx-auto grid max-w-[1200px] gap-4 px-6 py-12 sm:grid-cols-2 md:py-16">
            {CARE_TIPS.map((tip) => (
              <article
                key={tip.title}
                className="flex gap-4 rounded-2xl border border-brand-line bg-brand-card p-6"
              >
                <div className="mt-1 h-8 w-8 flex-shrink-0 rounded-full bg-brand-accent/10 flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-brand-accent" />
                </div>
                <div>
                  <h2
                    className="mb-1 text-xl text-brand-text"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    {tip.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-brand-muted">{tip.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
