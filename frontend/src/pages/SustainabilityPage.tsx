import Header from "../components/Header";
import Footer from "../components/Footer";

const IMAGE_STRIP = [
  {
    src: "our_story1.png",
    alt: "Candle materials and woven textures",
    label: "Cleaner wax",
  },
  {
    src: "founder.png",
    alt: "Founder portrait for small-batch craftsmanship",
    label: "Small-batch care",
  },
  {
    src: "hero.png",
    alt: "Warm candle scene in a calm interior",
    label: "Quiet burn",
  },
  {
    src: "contact_picture.png",
    alt: "Natural light and thoughtful home objects",
    label: "Home first",
  },
];

const CLOSING_GALLERY = [
  {
    src: "shop_hero.png",
    alt: "Destination candle by the sea",
    className: "mt-0 h-[220px] md:mt-10 md:h-[280px]",
  },
  {
    src: "our_story.png",
    alt: "Soft interior scene with candles",
    className: "mt-8 h-[260px] md:mt-0 md:h-[340px]",
  },
  {
    src: "hero.png",
    alt: "Warm tabletop candle detail",
    className: "mt-0 h-[220px] md:mt-16 md:h-[250px]",
  },
];

export default function SustainabilityPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-[oklch(0.982_0.012_82)] text-[oklch(0.22_0.018_72)]">
        <section className="relative h-screen min-h-[100svh] overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}sustainability.png`}
            alt="Aromamor sustainability story hero"
            className="absolute inset-0 h-full w-full object-cover object-[38%_center] md:object-center"
          />
          <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,oklch(0.17_0.02_72/.3),oklch(0.17_0.02_72/.1)_58%,transparent)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.18_0.02_70/.12),oklch(0.18_0.02_70/.34)_44%,oklch(0.18_0.02_70/.58)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,oklch(0.982_0.012_82/0),oklch(0.982_0.012_82))]" />
          <div className="relative mx-auto flex h-full max-w-[1240px] flex-col items-start justify-start gap-5 px-6 pt-48 text-left md:px-10 md:pt-56">
            <p className="text-xs uppercase tracking-[0.24em] text-[oklch(0.94_0.01_82)]">Sustainability</p>
            <h1
              className="max-w-3xl text-5xl leading-[1.02] text-[oklch(0.985_0.01_82)] md:text-7xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              <em style={{ fontStyle: "italic", fontWeight: 300 }}>Clean</em> Ingredients
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[oklch(0.94_0.012_82)] md:text-lg">
              100% soy wax blend, phthalate-free fragrance oils, and cotton wicks. Nothing that shouldn't be in your home.
            </p>
          </div>
        </section>

        <section className="border-t border-[oklch(0.82_0.02_78/.35)] bg-[oklch(0.988_0.008_82)]">
          <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:px-10 md:py-24">
            <div className="flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.48_0.03_74)]">Inside the ritual</p>
              <h2
                className="max-w-lg text-3xl leading-[1.16] md:text-[2.8rem]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                We think sustainability begins with what lives closest to the flame, the wax, the wick, and the air it leaves behind.
              </h2>
            </div>
            <div className="grid gap-5 text-sm leading-relaxed text-[oklch(0.34_0.02_72)] md:text-base">
              <p>
                For us, cleaner ingredients are not a marketing layer added at the end. They are part of the candle from the start,
                shaping how it burns, how it settles into a room, and how comfortable it feels to return to every evening.
              </p>
              <p>
                We choose materials that feel more considered for home use because scent should bring atmosphere, not heaviness.
                A candle can still feel transportive, luxurious, and gift-worthy while being gentler in the details that matter.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1240px] px-6 py-10 md:px-10 md:py-14">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {IMAGE_STRIP.map((image) => (
              <div key={image.label} className="flex flex-col gap-3">
                <img
                  src={`${import.meta.env.BASE_URL}${image.src}`}
                  alt={image.alt}
                  className="h-[220px] w-full object-cover"
                />
                <p className="text-center text-[11px] uppercase tracking-[0.16em] text-[oklch(0.5_0.03_74)]">
                  {image.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[oklch(0.973_0.012_82)]">
          <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-16 md:grid-cols-[0.84fr_1.16fr] md:px-10 md:py-24">
            <div className="flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.48_0.03_74)]">Core belief</p>
              <h2
                className="max-w-md text-3xl leading-[1.14] md:text-[2.7rem]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                We believe sustainability begins with what burns in your home.
              </h2>
              <div className="mt-2 grid gap-4 text-sm leading-relaxed text-[oklch(0.34_0.02_72)] md:text-base">
                <p>
                  Our candles are made with a soy wax blend, phthalate-free fragrance oils, and cotton wicks because the ritual of
                  scent should feel calm, clean, and easy to live with. We care about what touches the room as much as what perfumes it.
                </p>
                <p>
                  That standard shapes every pour. The goal is not sterility or stripped-back minimalism, but warmth with intention,
                  fragrance with softness, and a finished candle that feels as considered as the home it enters.
                </p>
              </div>
            </div>
            <div className="overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}contact_picture.png`}
                alt="Thoughtful candle ingredients and calm natural light"
                className="h-[380px] w-full object-cover md:h-[520px]"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1240px] px-6 py-16 md:px-10 md:py-24">
          <div className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:items-start">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.48_0.03_74)]">Local rhythm</p>
            <div className="grid gap-5">
              <h2
                className="max-w-4xl text-3xl leading-[1.16] md:text-[2.6rem]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                Smaller batches let us pour more thoughtfully, produce more carefully, and keep waste from becoming part of the process.
              </h2>
              <div className="grid gap-5 text-sm leading-relaxed text-[oklch(0.34_0.02_72)] md:grid-cols-2 md:text-base">
                <p>
                  We are not interested in scaling the life out of the work. Keeping pours smaller means fragrance can be checked more
                  closely, finishes can be caught by hand, and each run can stay tied to real attention instead of factory speed.
                </p>
                <p>
                  That slower pace supports a better kind of object, one made to be lit often, gifted deliberately, and kept on a table
                  because it belongs there. Sustainability, for us, is inseparable from restraint.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}founder.png`}
            alt="Aromamor founder in a quiet landscape"
            className="h-[52svh] min-h-[420px] w-full object-cover object-center md:h-[66svh]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.18_0.02_70/.06),oklch(0.18_0.02_70/.24)_100%)]" />
        </section>

        <section className="bg-[oklch(0.988_0.008_82)]">
          <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-16 md:grid-cols-[1.08fr_0.92fr] md:px-10 md:py-24">
            <div className="overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}shop_hero.png`}
                alt="Candle near the coast at golden hour"
                className="h-[360px] w-full object-cover md:h-[520px]"
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.48_0.03_74)]">Reducing waste</p>
              <h2
                className="max-w-md text-3xl leading-[1.14] md:text-[2.5rem]"
                style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
              >
                We would rather make less, pour with intention, and send out candles that feel worth keeping.
              </h2>
              <div className="grid gap-5 text-sm leading-relaxed text-[oklch(0.34_0.02_72)] md:text-base">
                <p>
                  A lower-waste approach is not only about packaging. It also comes from not overproducing, not treating every vessel as
                  disposable, and not flooding a collection with more than it needs to say.
                </p>
                <p>
                  We think a candle should earn its place through fragrance, quality, and mood. When something is made thoughtfully, it is
                  more likely to be used fully, gifted meaningfully, and remembered long after the wax is gone.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[oklch(0.955_0.018_80)]">
          <div className="mx-auto w-full max-w-[1240px] px-6 py-16 text-center md:px-10 md:py-24">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[oklch(0.48_0.03_74)]">Closing note</p>
          <h2
            className="mx-auto mt-4 max-w-4xl text-3xl leading-[1.14] md:text-[3rem]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
          >
            We believe a candle&apos;s value is not only in how it smells, but in how thoughtfully it was made and how gently it lives in a room.
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {CLOSING_GALLERY.map((image) => (
              <img
                key={image.src}
                src={`${import.meta.env.BASE_URL}${image.src}`}
                alt={image.alt}
                className={`w-full object-cover ${image.className}`}
              />
            ))}
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
