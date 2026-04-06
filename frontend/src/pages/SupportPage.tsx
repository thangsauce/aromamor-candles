import Header from "../components/Header";
import Footer from "../components/Footer";

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
];

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

export default function SupportPage() {
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
              FAQ, Shipping &amp; Returns
            </h1>
            <p className="max-w-xl text-sm md:text-base text-brand-muted dark:text-brand-muted-dark leading-relaxed">
              Everything you need to know about delivery timelines, returns, and common questions before you place your order.
            </p>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 py-14 flex flex-col gap-14">
          <section>
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark mb-2">Frequently Asked Questions</p>
              <h2 className="text-3xl text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                FAQ
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {FAQS.map((item) => (
                <article key={item.q} className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-6">
                  <h3 className="text-lg text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                    {item.q}
                  </h3>
                  <p className="mt-2 text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">{item.a}</p>
                </article>
              ))}
            </div>
          </section>

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
      </main>
      <Footer />
    </div>
  );
}
