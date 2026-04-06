import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const FAQS = [
  {
    q: "How long does shipping take?",
    a: "Orders are processed in 1-2 business days. Standard shipping typically arrives in 3-7 business days within the U.S.",
  },
  {
    q: "Do you offer local pickup?",
    a: "Yes. You can choose pickup at checkout when available. You will receive a confirmation once your order is ready.",
  },
  {
    q: "Can I change my order after placing it?",
    a: "If your order has not shipped, contact us as soon as possible and we will do our best to help.",
  },
  {
    q: "Are your candles clean-burning?",
    a: "Our candles are hand-poured in small batches using a soy blend and carefully selected fragrance oils for a cleaner burn.",
  },
  {
    q: "How can I contact support?",
    a: "Email us at margaritalinares@hotmail.com with your order number and we will get back to you as quickly as possible.",
  },
  {
    q: "Do you accept returns on used candles?",
    a: "Used candles are generally non-returnable, but if there is a quality issue we will always make it right.",
  },
];

export default function FaqPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-brand-line dark:border-brand-line-dark">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 dark:from-brand-bg-dark dark:via-stone-900 dark:to-brand-bg-dark" />
          <div className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full bg-amber-100/45 dark:bg-amber-900/10 blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-24 text-center flex flex-col items-center gap-5">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">Support</p>
            <h1 className="text-5xl md:text-6xl text-brand-text dark:text-brand-text-dark leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
              Frequently Asked Questions
            </h1>
            <p className="max-w-xl text-sm md:text-base text-brand-muted dark:text-brand-muted-dark leading-relaxed">
              Quick answers about orders, candles, pickup, and support.
            </p>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQS.map((item) => (
              <article key={item.q} className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-6">
                <h2 className="text-lg text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                  {item.q}
                </h2>
                <p className="mt-2 text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 pb-14">
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-amber-900/10 dark:to-stone-800/30 border border-brand-line dark:border-brand-line-dark p-8 flex flex-col items-center text-center gap-4">
            <p className="text-sm text-brand-muted dark:text-brand-muted-dark">Ready to explore scents?</p>
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
