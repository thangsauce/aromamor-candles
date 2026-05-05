import Header from "../components/Header";
import Footer from "../components/Footer";

const PROCESS_STEPS = [
  {
    title: "Wax Preparation",
    text: "We begin with a clean soy blend measured by weight, then warm slowly for a stable pour and even surface finish.",
  },
  {
    title: "Fragrance Blending",
    text: "Each scent is composed in small runs and tested hot and cold so the candle smells balanced from first light to final burn.",
  },
  {
    title: "Wicking and Cure",
    text: "Every vessel is wicked by hand and cured with time, not rushed, for a cleaner flame and stronger throw in real rooms.",
  },
];

const MATERIAL_NOTES = [
  {
    label: "Soy Wax",
    image: "our_story1.png",
  },
  {
    label: "Glass Vessels",
    image: "hero.png",
  },
  {
    label: "Hand Finish",
    image: "founder.png",
  },
];

export default function CraftsmanshipPage() {
  const base = import.meta.env.BASE_URL;

  return (
    <div className="flex min-h-screen flex-col bg-brand-bg">
      <Header />
      <main className="flex-1">
        <section className="relative h-screen min-h-[100svh] overflow-hidden">
          <img
            src={`${base}craftmanship.png`}
            alt="Candle craftsmanship hero"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,oklch(0.17_0.02_72/.34),oklch(0.17_0.02_72/.12)_56%,transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.19_0.03_48/.78),oklch(0.19_0.03_48/.34)_46%,oklch(0.19_0.03_48/.08)_80%)]" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,oklch(0.955_0.018_80/0),oklch(0.955_0.018_80))]" />
          <div className="relative mx-auto flex h-full max-w-[1200px] items-start px-6 pt-40 md:pt-48">
            <div className="max-w-2xl text-[oklch(0.96_0.014_82)]">
              <p className="text-xs uppercase tracking-[0.2em] text-[oklch(0.84_0.08_76)]">
                Craftsmanship
              </p>
              <h1
                className="mt-4 text-5xl leading-[0.96] md:text-7xl"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                Built by <em style={{ fontStyle: "italic", fontWeight: 300 }}>hand</em>,
                <br />
                <em style={{ fontStyle: "italic", fontWeight: 300 }}>poured</em> with{" "}
                <em style={{ fontStyle: "italic", fontWeight: 300 }}>purpose</em>.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[oklch(0.92_0.012_82)] md:text-lg">
                Candle making at Aromamor is a slow, intentional process where every detail,
                <br />
                from wax temperature to wick trim, is handled with care.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-brand-line bg-[oklch(0.985_0.008_80)]">
          <div className="mx-auto max-w-[1200px] px-6 py-16 text-center md:py-20">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">
              Rooted in craft
            </p>
            <p
              className="mx-auto mt-6 max-w-4xl text-3xl leading-[1.18] text-brand-text md:text-5xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              From wax and fragrance to final cure, each candle is shaped through living candlecraft traditions adapted for modern homes.
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-brand-muted md:text-base">
              We preserve the discipline of small-batch making because that is where quality lives: careful timing, close observation, and a finish that feels personal.
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[oklch(0.93_0.02_78)] px-8 py-12 md:px-14 md:py-16">
            <h2
              className="text-5xl leading-[0.94] text-brand-text"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              A Tradition
              <br />
              Alive
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-muted md:text-base">
              Our work keeps traditional candle-making skill active in daily practice. We handcraft in small volumes and stay committed to better materials, precise methods, and the value of making well.
            </p>
            <div className="mt-8 space-y-6">
              {PROCESS_STEPS.map((step) => (
                <article key={step.title} className="border-l border-brand-line pl-4">
                  <h3
                    className="text-2xl text-brand-text"
                    style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted md:text-base">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="min-h-[620px]">
            <img
              src={`${base}our_story1.png`}
              alt="Soy wax in woven bag used in candle making"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </section>

        <section className="border-t border-brand-line bg-brand-card">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 md:grid-cols-[1fr_1fr] md:py-16">
            <img
              src={`${base}hero.png`}
              alt="Candle vessel in warm natural light"
              className="h-[320px] w-full object-cover object-center"
            />
            <div className="flex flex-col justify-center">
              <p className="text-sm leading-relaxed text-brand-muted md:text-base">
                By supporting Aromamor, you support a making practice that honors patience, careful process, and meaningful design. Each candle reflects a living craft carried forward through skill, consistency, and care.
              </p>
              <p
                className="mt-6 text-xs uppercase tracking-[0.2em] text-brand-muted"
              >
                Learn more below
              </p>
              <div className="mt-4 grid grid-cols-3 border border-brand-line">
                {MATERIAL_NOTES.map((note) => (
                  <div key={note.label} className="border-r border-brand-line last:border-r-0 p-3">
                    <img
                      src={`${base}${note.image}`}
                      alt={note.label}
                      className="mx-auto h-14 w-14 rounded-full object-cover"
                    />
                    <p className="mt-2 text-center text-xs text-brand-text">{note.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[oklch(0.955_0.018_80)]">
          <div className="mx-auto max-w-[1200px] px-6 py-14 md:py-16">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <img src={`${base}our_story1.png`} alt="Wax detail" className="h-40 w-full object-cover" />
              <img src={`${base}hero.png`} alt="Candle setup" className="h-56 w-full object-cover md:mt-8" />
              <img src={`${base}contact_picture.png`} alt="Candle brand image" className="h-64 w-full object-cover md:-mt-8" />
              <img src={`${base}founder.png`} alt="Founder portrait sample" className="h-48 w-full object-cover md:mt-10" />
              <img src={`${base}behind_footer.png`} alt="Warm destination atmosphere" className="h-52 w-full object-cover" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
