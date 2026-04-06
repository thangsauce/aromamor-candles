import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const SHIPPING_ROWS = [
  {
    title: "Processing Time",
    value: "1-2 business days",
    note: "Orders placed on weekends or holidays begin processing on the next business day.",
  },
  {
    title: "Standard Shipping",
    value: "3-7 business days",
    note: "Delivery windows may vary by carrier and location.",
  },
  {
    title: "Shipping Confirmation",
    value: "Tracking included",
    note: "A tracking email is sent once your package leaves our studio.",
  },
];

const RETURN_POLICY = [
  "Returns are accepted within 14 days of delivery for unused items in original packaging.",
  "If your item arrives damaged, contact us within 48 hours with your order number and photos.",
  "Used candles cannot be returned, but we will always help if there is a quality issue.",
  "Refunds are issued to the original payment method after returned items are inspected.",
];

export default function ShippingReturnsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-brand-line dark:border-brand-line-dark">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 dark:from-brand-bg-dark dark:via-stone-900 dark:to-brand-bg-dark" />
          <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-amber-100/45 dark:bg-amber-900/10 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-24 text-center flex flex-col items-center gap-5">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">Support</p>
            <h1 className="text-5xl md:text-6xl text-brand-text dark:text-brand-text-dark leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
              Shipping &amp; Returns
            </h1>
            <p className="max-w-xl text-sm md:text-base text-brand-muted dark:text-brand-muted-dark leading-relaxed">
              Delivery timelines and return policy details to help you shop with confidence.
            </p>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 py-14 flex flex-col gap-14">
          <section>
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark mb-2">Delivery Details</p>
              <h2 className="text-3xl text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                Shipping
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SHIPPING_ROWS.map((row) => (
                <article key={row.title} className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-6 flex flex-col gap-2">
                  <p className="text-xs tracking-[0.16em] uppercase text-brand-muted dark:text-brand-muted-dark">{row.title}</p>
                  <p className="text-lg text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                    {row.value}
                  </p>
                  <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">{row.note}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-8 md:p-10">
            <div className="max-w-3xl mx-auto text-center mb-6">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark mb-2">Policy</p>
              <h2 className="text-3xl text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                Returns
              </h2>
            </div>
            <ul className="grid grid-cols-1 gap-3">
              {RETURN_POLICY.map((line) => (
                <li key={line} className="rounded-xl border border-brand-line/70 dark:border-brand-line-dark/70 bg-brand-bg dark:bg-brand-bg-dark px-4 py-3 text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">
                  {line}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="max-w-[1200px] mx-auto px-6 pb-14">
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-amber-900/10 dark:to-stone-800/30 border border-brand-line dark:border-brand-line-dark p-8 flex flex-col items-center text-center gap-4">
            <p className="text-sm text-brand-muted dark:text-brand-muted-dark">Discover your next signature candle.</p>
            <Link
              className="px-7 py-2.5 rounded-full bg-brand-text dark:bg-brand-text-dark text-brand-bg dark:text-brand-bg-dark text-sm font-medium hover:opacity-90 transition"
              to="/shop"
            >
              Back to Shop
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
