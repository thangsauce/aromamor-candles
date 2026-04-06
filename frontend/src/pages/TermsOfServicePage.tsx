import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const TERMS = [
  {
    title: "Use of the Site",
    body: "By using this site, you agree to use it lawfully and in a way that does not disrupt service for other users.",
  },
  {
    title: "Accounts",
    body: "You are responsible for maintaining the confidentiality of your login credentials and all activity under your account.",
  },
  {
    title: "Products & Orders",
    body: "Product availability and pricing may change without notice. We reserve the right to cancel or adjust orders when necessary.",
  },
  {
    title: "Returns & Refunds",
    body: "Returns and refunds are handled according to the Shipping & Returns policy published on this website.",
  },
  {
    title: "Intellectual Property",
    body: "All branding, text, imagery, and design assets on this site belong to Aromamor unless otherwise stated.",
  },
  {
    title: "Limitation of Liability",
    body: "Aromamor is not liable for indirect or incidental damages arising from use of this site, to the fullest extent permitted by law.",
  },
  {
    title: "Changes to Terms",
    body: "These terms may be updated periodically. Continued use of the site after updates means you accept the revised terms.",
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden border-b border-brand-line dark:border-brand-line-dark">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 dark:from-brand-bg-dark dark:via-stone-900 dark:to-brand-bg-dark" />
          <div className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full bg-amber-100/45 dark:bg-amber-900/10 blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative max-w-[1200px] mx-auto px-6 py-20 md:py-24 text-center flex flex-col items-center gap-5">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">Legal</p>
            <h1 className="text-5xl md:text-6xl text-brand-text dark:text-brand-text-dark leading-[1.1]" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
              Terms of Service
            </h1>
            <p className="max-w-xl text-sm md:text-base text-brand-muted dark:text-brand-muted-dark leading-relaxed">
              The terms that govern your use of the Aromamor website and services.
            </p>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TERMS.map((term) => (
              <article key={term.title} className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-6">
                <h2 className="text-xl text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}>
                  {term.title}
                </h2>
                <p className="mt-2 text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">{term.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 pb-14">
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 dark:from-amber-900/10 dark:to-stone-800/30 border border-brand-line dark:border-brand-line-dark p-8 flex flex-col items-center text-center gap-4">
            <p className="text-sm text-brand-muted dark:text-brand-muted-dark">All set - explore the collection.</p>
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
