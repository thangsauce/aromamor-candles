import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "Information We Collect",
    points: [
      "Basic account details such as username and login information.",
      "Order details including selected products, quantities, and fulfillment choices.",
      "Support messages you send to us through our contact channels.",
    ],
  },
  {
    title: "How We Use Information",
    points: [
      "To process and manage orders, reviews, and account access.",
      "To improve site performance, user experience, and product offerings.",
      "To respond to customer support requests and service-related updates.",
    ],
  },
  {
    title: "Data Sharing",
    points: [
      "We do not sell your personal information.",
      "We may share limited data with service providers needed for order delivery and application operations.",
      "We may disclose information when required by law or to protect platform integrity.",
    ],
  },
  {
    title: "Data Retention & Security",
    points: [
      "Data is retained only as long as needed for operational and legal purposes.",
      "We apply reasonable security measures to protect account and order data.",
      "No system is completely risk-free; users should maintain strong passwords.",
    ],
  },
  {
    title: "Your Choices",
    points: [
      "You may request updates or deletion of your account data where applicable.",
      "You may contact us with privacy questions at margaritalinares@hotmail.com.",
      "Continued use of the site indicates acceptance of this policy.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-brand-line dark:border-brand-line-dark">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 dark:from-brand-bg-dark dark:via-stone-900 dark:to-brand-bg-dark" />
          <div className="absolute top-0 left-0 w-[420px] h-[420px] rounded-full bg-amber-100/45 dark:bg-amber-900/10 blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
          <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-24 text-center flex flex-col items-center gap-5">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">Legal</p>
            <h1 className="text-5xl md:text-6xl text-brand-text dark:text-brand-text-dark leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
              Privacy Policy
            </h1>
            <p className="max-w-xl text-sm md:text-base text-brand-muted dark:text-brand-muted-dark leading-relaxed">
              How we collect, use, and protect your information when you use Aromamor.
            </p>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SECTIONS.map((section) => (
              <article key={section.title} className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-6">
                <h2 className="text-xl text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                  {section.title}
                </h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {section.points.map((point) => (
                    <li key={point} className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 pb-14">
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-amber-900/10 dark:to-stone-800/30 border border-brand-line dark:border-brand-line-dark p-8 flex flex-col items-center text-center gap-4">
            <p className="text-sm text-brand-muted dark:text-brand-muted-dark">Continue browsing with confidence.</p>
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
