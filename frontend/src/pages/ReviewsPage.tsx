import { useState } from "react";
import { Link } from "react-router-dom";
import { CATALOG } from "../store/catalog";
import { useReviews } from "../store/reviews";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StarRating from "../components/StarRating";

const ALL = "all";

const inputClass = "w-full px-3 py-2 rounded-lg border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark text-sm placeholder:text-brand-muted dark:placeholder:text-brand-muted-dark focus:outline-none focus:border-brand-accent dark:focus:border-brand-accent-dark transition";

const TAG_STYLES: Record<string, string> = {
  NEW:       "bg-brand-accent/10 dark:bg-brand-accent-dark/10 text-brand-accent dark:text-brand-accent-dark border border-brand-accent/20 dark:border-brand-accent-dark/20",
  BESTSELLER:"bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-700/30",
  LIMITED:   "bg-stone-100 dark:bg-stone-800 text-brand-muted dark:text-brand-muted-dark border border-brand-line dark:border-brand-line-dark",
  SIGNATURE: "bg-brand-accent/10 dark:bg-brand-accent-dark/10 text-brand-accent dark:text-brand-accent-dark border border-brand-accent/20 dark:border-brand-accent-dark/20",
  FRESH:     "bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-800/30",
  CALM:      "bg-slate-100 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/30",
};

export default function ReviewsPage() {
  const { getReviews, addReview, deleteReview, avgRating, totalReviews } = useReviews();
  const [selected, setSelected] = useState<string>(ALL);
  const products = Object.values(CATALOG);

  const [formProduct, setFormProduct] = useState<string>(products[0]?.id ?? "");
  const [formAuthor, setFormAuthor] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formTitle, setFormTitle] = useState("");
  const [formBody, setFormBody] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor.trim() || !formTitle.trim() || !formBody.trim()) return;
    addReview({
      productId: formProduct,
      author: formAuthor.trim(),
      rating: formRating,
      title: formTitle.trim(),
      body: formBody.trim(),
    });
    setFormAuthor("");
    setFormRating(5);
    setFormTitle("");
    setFormBody("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const displayProducts =
    selected === ALL ? products : products.filter((p) => p.id === selected);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="relative overflow-hidden border-b border-brand-line dark:border-brand-line-dark">
          <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-amber-50 to-stone-100 dark:from-brand-bg-dark dark:via-stone-900 dark:to-brand-bg-dark" />
          <div className="relative max-w-[1200px] mx-auto px-6 py-16 flex flex-col items-start gap-3">
            <p className="text-xs tracking-[0.2em] uppercase text-brand-muted dark:text-brand-muted-dark">Customer Reviews</p>
            <h1
              className="text-4xl md:text-5xl text-brand-text dark:text-brand-text-dark"
              style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
            >
              What travelers are saying
            </h1>
            <p className="text-brand-muted dark:text-brand-muted-dark max-w-md text-sm">
              Real reviews from real customers. Share your experience with Aromamor.
            </p>
          </div>
        </section>

        <div className="max-w-[1200px] mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">

              {/* Filter by candle */}
              <div className="bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark p-5">
                <h2
                  className="text-base text-brand-text dark:text-brand-text-dark mb-3"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  Filter by Candle
                </h2>
                <div className="flex flex-col gap-1">
                  {/* All Candles */}
                  <button
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${selected === ALL ? "bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark" : "text-brand-muted dark:text-brand-muted-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"}`}
                    onClick={() => setSelected(ALL)}
                    type="button"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${selected === ALL ? "border-brand-accent dark:border-brand-accent-dark" : "border-brand-line dark:border-brand-line-dark"}`}>
                        {selected === ALL && <div className="w-2 h-2 rounded-full bg-brand-accent dark:bg-brand-accent-dark" />}
                      </div>
                      <span className={selected === ALL ? "font-medium" : ""}>All Candles</span>
                    </div>
                    <span className="text-xs bg-brand-line dark:bg-brand-line-dark px-1.5 py-0.5 rounded-full text-brand-muted dark:text-brand-muted-dark">
                      {products.reduce((s, p) => s + totalReviews(p.id), 0)}
                    </span>
                  </button>
                  {products.map((p) => (
                    <button
                      key={p.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${selected === p.id ? "bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark" : "text-brand-muted dark:text-brand-muted-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"}`}
                      onClick={() => setSelected(p.id)}
                      type="button"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${selected === p.id ? "border-brand-accent dark:border-brand-accent-dark" : "border-brand-line dark:border-brand-line-dark"}`}>
                          {selected === p.id && <div className="w-2 h-2 rounded-full bg-brand-accent dark:bg-brand-accent-dark" />}
                        </div>
                        <div className="text-left min-w-0">
                          <div className={`text-xs truncate ${selected === p.id ? "font-medium text-brand-text dark:text-brand-text-dark" : ""}`}>{p.name}</div>
                          {totalReviews(p.id) > 0 && (
                            <div className="flex items-center gap-1 mt-0.5">
                              <StarRating rating={avgRating(p.id)} size={10} />
                              <span className="text-[10px] text-brand-muted dark:text-brand-muted-dark">{avgRating(p.id).toFixed(1)}</span>
                            </div>
                          )}
                        </div>
                        {p.tag && (
                          <span className={`flex-shrink-0 ml-auto px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide ${TAG_STYLES[p.tag] ?? ""}`}>
                            {p.tag}
                          </span>
                        )}
                      </div>
                      <span className="text-xs bg-brand-line dark:bg-brand-line-dark px-1.5 py-0.5 rounded-full text-brand-muted dark:text-brand-muted-dark flex-shrink-0 ml-2">
                        {totalReviews(p.id)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Write a review */}
              <div className="bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark p-5">
                <h2
                  className="text-base text-brand-text dark:text-brand-text-dark mb-4"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                >
                  Write a Review
                </h2>
                {submitted && (
                  <div className="mb-4 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-xs">
                    Review submitted! Thanks for your feedback.
                  </div>
                )}
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark">Candle</label>
                    <select value={formProduct} onChange={(e) => setFormProduct(e.target.value)} className={inputClass}>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark">Rating</label>
                    <div className="flex items-center gap-2">
                      <StarRating rating={formRating} size={26} interactive onChange={setFormRating} />
                      <span className="text-xs text-brand-muted dark:text-brand-muted-dark">{formRating}/5</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark">Headline</label>
                    <input required placeholder="Your review headline..." value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark">Your Name</label>
                    <input required placeholder="Jane D." value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark">Your Review</label>
                    <textarea required placeholder="Tell us about your experience..." value={formBody} onChange={(e) => setFormBody(e.target.value)} className={`${inputClass} min-h-[80px] resize-y`} />
                  </div>

                  <button
                    className="w-full px-4 py-2.5 rounded-full bg-brand-text dark:bg-brand-text-dark text-brand-bg dark:text-brand-bg-dark text-sm font-medium hover:opacity-90 transition"
                    type="submit"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </aside>

            {/* Main reviews list */}
            <div className="flex-1 flex flex-col gap-8 min-w-0">
              {displayProducts.map((p) => {
                const reviews = getReviews(p.id);
                const avg = avgRating(p.id);

                return (
                  <section key={p.id} className="bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark overflow-hidden">
                    {/* Candle header */}
                    <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-brand-line dark:border-brand-line-dark">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2
                            className="text-base text-brand-text dark:text-brand-text-dark"
                            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                          >
                            {p.name}
                          </h2>
                          {p.tag && (
                            <span className={`px-2 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wide ${TAG_STYLES[p.tag] ?? ""}`}>
                              {p.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-brand-muted dark:text-brand-muted-dark mt-0.5">{p.mood} · {p.destination}</p>
                        {reviews.length > 0 && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <StarRating rating={avg} size={13} />
                            <span className="text-xs font-medium text-brand-text dark:text-brand-text-dark">{avg.toFixed(1)}</span>
                            <span className="text-xs text-brand-muted dark:text-brand-muted-dark">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
                          </div>
                        )}
                      </div>
                      <Link
                        className="flex-shrink-0 px-4 py-1.5 rounded-full border border-brand-line dark:border-brand-line-dark text-xs text-brand-text dark:text-brand-text-dark hover:border-brand-accent dark:hover:border-brand-accent-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
                        to="/"
                      >
                        Shop This Candle
                      </Link>
                    </div>

                    {/* Review cards */}
                    <div className="px-5 py-4">
                      {reviews.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {reviews.map((r) => (
                            <div key={r.id} className="border-b border-brand-line dark:border-brand-line-dark pb-4 last:border-0 last:pb-0">
                              <div className="flex items-start justify-between gap-2 mb-1.5">
                                <div>
                                  <StarRating rating={r.rating} size={12} />
                                  <h3 className="text-sm font-medium text-brand-text dark:text-brand-text-dark mt-1">{r.title}</h3>
                                </div>
                                <button
                                  className="text-brand-muted dark:text-brand-muted-dark hover:text-red-500 transition text-xs p-1 flex-shrink-0"
                                  onClick={() => deleteReview(p.id, r.id)}
                                  type="button"
                                  title="Delete review"
                                >
                                  ✕
                                </button>
                              </div>
                              <p className="text-sm text-brand-muted dark:text-brand-muted-dark leading-relaxed">{r.body}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs font-medium text-brand-text dark:text-brand-text-dark">— {r.author}</span>
                                <span className="text-xs text-brand-muted dark:text-brand-muted-dark">
                                  {new Date(r.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-brand-muted dark:text-brand-muted-dark">
                          <p className="text-sm mb-3">No reviews for this candle yet.</p>
                          <button
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-brand-line dark:border-brand-line-dark text-sm text-brand-text dark:text-brand-text-dark hover:border-brand-accent dark:hover:border-brand-accent-dark hover:text-brand-accent dark:hover:text-brand-accent-dark transition"
                            type="button"
                            onClick={() => { setFormProduct(p.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
                            </svg>
                            Write the first review
                          </button>
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
