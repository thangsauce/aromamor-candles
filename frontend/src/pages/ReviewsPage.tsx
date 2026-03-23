import { useState } from "react";
import { Link } from "react-router-dom";
import { CATALOG } from "../store/catalog";
import { useReviews } from "../store/reviews";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StarRating from "../components/StarRating";

const ALL = "all";

const inputClass = "w-full px-3 py-2 rounded-lg border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark text-brand-text dark:text-brand-text-dark text-sm placeholder:text-brand-muted dark:placeholder:text-brand-muted-dark focus:outline-none focus:border-brand-accent dark:focus:border-brand-accent-dark transition";

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
        <section className="bg-gradient-to-br from-amber-50 to-stone-100 dark:from-brand-bg-dark dark:to-stone-900 border-b border-brand-line dark:border-brand-line-dark">
          <div className="max-w-[1100px] mx-auto px-4 py-16 flex flex-col items-center text-center gap-4">
            <span className="text-sm tracking-widest uppercase text-brand-muted dark:text-brand-muted-dark">⭐ Customer Reviews</span>
            <h1 className="text-4xl md:text-5xl font-semibold text-brand-text dark:text-brand-text-dark">What travelers are saying</h1>
            <p className="text-brand-muted dark:text-brand-muted-dark max-w-md">
              Real reviews from real customers. Share your experience with Aromamor.
            </p>
          </div>
        </section>

        <div className="max-w-[1100px] mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Sidebar */}
            <aside className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4">

              {/* Filter by candle */}
              <div className="bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark p-5">
                <h2 className="font-semibold text-brand-text dark:text-brand-text-dark mb-3">Filter by Candle</h2>
                <div className="flex flex-col gap-1">
                  <button
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${selected === ALL ? "bg-brand-accent/10 dark:bg-brand-accent-dark/10 text-brand-accent dark:text-brand-accent-dark font-semibold" : "text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"}`}
                    onClick={() => setSelected(ALL)}
                    type="button"
                  >
                    <span>All Candles</span>
                    <span className="text-xs bg-brand-line dark:bg-brand-line-dark px-1.5 py-0.5 rounded-full text-brand-muted dark:text-brand-muted-dark">
                      {products.reduce((s, p) => s + totalReviews(p.id), 0)}
                    </span>
                  </button>
                  {products.map((p) => (
                    <button
                      key={p.id}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition ${selected === p.id ? "bg-brand-accent/10 dark:bg-brand-accent-dark/10 text-brand-accent dark:text-brand-accent-dark font-semibold" : "text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark"}`}
                      onClick={() => setSelected(p.id)}
                      type="button"
                    >
                      <div className="text-left">
                        <div className="font-medium text-xs">{p.name}</div>
                        {totalReviews(p.id) > 0 && (
                          <div className="flex items-center gap-1 mt-0.5">
                            <StarRating rating={avgRating(p.id)} size={10} />
                            <span className="text-[10px] text-brand-muted dark:text-brand-muted-dark">{avgRating(p.id).toFixed(1)}</span>
                          </div>
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
                <h2 className="font-semibold text-brand-text dark:text-brand-text-dark mb-4">Write a Review</h2>
                {submitted && (
                  <div className="mb-4 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-xs">
                    ✅ Review submitted! Thanks for your feedback.
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
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark">Your Name</label>
                    <input required placeholder="Jane D." value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark">Rating</label>
                    <div className="flex items-center gap-2">
                      <StarRating rating={formRating} size={26} interactive onChange={setFormRating} />
                      <span className="text-xs text-brand-muted dark:text-brand-muted-dark">{formRating}/5</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark">Review Title</label>
                    <input required placeholder="Absolutely love this scent!" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className={inputClass} />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-brand-muted dark:text-brand-muted-dark">Your Review</label>
                    <textarea required placeholder="Tell us about your experience..." value={formBody} onChange={(e) => setFormBody(e.target.value)} className={`${inputClass} min-h-[80px] resize-y`} />
                  </div>

                  <button className="w-full px-4 py-2 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark font-semibold text-sm hover:opacity-90 transition" type="submit">
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
                  <section key={p.id} className="flex flex-col gap-4">
                    {/* Candle header */}
                    <div className="flex items-start justify-between gap-4 pb-4 border-b border-brand-line dark:border-brand-line-dark">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h2 className="font-semibold text-brand-text dark:text-brand-text-dark">{p.name}</h2>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-brand-accent/20 dark:bg-brand-accent-dark/20 text-brand-accent dark:text-brand-accent-dark">{p.tag}</span>
                        </div>
                        <p className="text-xs text-brand-muted dark:text-brand-muted-dark mt-0.5">{p.mood} • {p.destination}</p>
                        {reviews.length > 0 ? (
                          <div className="flex items-center gap-2 mt-1.5">
                            <StarRating rating={avg} size={14} />
                            <span className="text-sm font-semibold text-brand-text dark:text-brand-text-dark">{avg.toFixed(1)}</span>
                            <span className="text-xs text-brand-muted dark:text-brand-muted-dark">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
                          </div>
                        ) : (
                          <p className="text-xs text-brand-muted dark:text-brand-muted-dark mt-1.5">No reviews yet — be the first!</p>
                        )}
                      </div>
                      <Link
                        className="flex-shrink-0 px-4 py-2 rounded-xl bg-brand-accent dark:bg-brand-accent-dark text-white dark:text-brand-bg-dark text-sm font-semibold hover:opacity-90 transition"
                        to="/"
                      >
                        Shop
                      </Link>
                    </div>

                    {/* Review cards */}
                    {reviews.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {reviews.map((r) => (
                          <div key={r.id} className="bg-brand-card dark:bg-brand-card-dark rounded-2xl border border-brand-line dark:border-brand-line-dark p-4">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div>
                                <StarRating rating={r.rating} size={13} />
                                <h3 className="text-sm font-semibold text-brand-text dark:text-brand-text-dark mt-1">{r.title}</h3>
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
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-line dark:border-brand-line-dark">
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
                        <p className="mb-3">No reviews for this candle yet.</p>
                        <button
                          className="px-4 py-2 rounded-xl border border-brand-line dark:border-brand-line-dark text-sm text-brand-text dark:text-brand-text-dark hover:bg-brand-line dark:hover:bg-brand-line-dark transition"
                          type="button"
                          onClick={() => { setFormProduct(p.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        >
                          ✍️ Write the first review
                        </button>
                      </div>
                    )}
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
