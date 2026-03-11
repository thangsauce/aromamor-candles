import { useState } from "react";
import { Link } from "react-router-dom";
import { CATALOG } from "../store/catalog";
import { useReviews } from "../store/reviews";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StarRating from "../components/StarRating";

const ALL = "all";

export default function ReviewsPage() {
  const { getReviews, addReview, deleteReview, avgRating, totalReviews } = useReviews();
  const [selected, setSelected] = useState<string>(ALL);
  const products = Object.values(CATALOG);

  // Form state
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
    <>
      <Header />
      <main style={{ width: "100%" }}>
        {/* Page hero */}
        <section className="hero">
          <div className="wrap hero-card">
            <p className="kicker">⭐ Customer Reviews</p>
            <h2>What travelers are saying</h2>
            <p className="muted">
              Real reviews from real customers. Share your experience with Aromamor.
            </p>
          </div>
        </section>

        <div className="wrap" style={{ paddingTop: 0 }}>
          <div className="reviews-layout">

            {/* LEFT: filter + write review */}
            <aside className="reviews-sidebar">

              {/* Candle filter */}
              <div className="panel" style={{ marginBottom: 14 }}>
                <h3>Filter by Candle</h3>
                <div className="reviews-filter-list">
                  <button
                    className={`reviews-filter-btn${selected === ALL ? " active" : ""}`}
                    onClick={() => setSelected(ALL)}
                    type="button"
                  >
                    <span>All Candles</span>
                    <span className="badge">
                      {products.reduce((s, p) => s + totalReviews(p.id), 0)}
                    </span>
                  </button>
                  {products.map((p) => (
                    <button
                      key={p.id}
                      className={`reviews-filter-btn${selected === p.id ? " active" : ""}`}
                      onClick={() => setSelected(p.id)}
                      type="button"
                    >
                      <div style={{ textAlign: "left" }}>
                        <div style={{ fontWeight: 800, fontSize: 13 }}>{p.name}</div>
                        {totalReviews(p.id) > 0 && (
                          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                            <StarRating rating={avgRating(p.id)} size={11} />
                            <span style={{ fontSize: 11, color: "var(--muted)" }}>
                              {avgRating(p.id).toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="badge">{totalReviews(p.id)}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Write a review form */}
              <div className="panel">
                <h3>Write a Review</h3>
                {submitted && (
                  <div className="review-success">
                    ✅ Review submitted! Thanks for your feedback.
                  </div>
                )}
                <form className="form" onSubmit={handleSubmit}>
                  <div className="row">
                    <label className="muted tiny">Candle</label>
                    <select
                      value={formProduct}
                      onChange={(e) => setFormProduct(e.target.value)}
                    >
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="row">
                    <label className="muted tiny">Your Name</label>
                    <input
                      required
                      placeholder="Jane D."
                      value={formAuthor}
                      onChange={(e) => setFormAuthor(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <label className="muted tiny">Rating</label>
                    <div className="review-star-picker">
                      <StarRating
                        rating={formRating}
                        size={28}
                        interactive
                        onChange={setFormRating}
                      />
                      <span className="muted tiny">{formRating} / 5</span>
                    </div>
                  </div>

                  <div className="row">
                    <label className="muted tiny">Review Title</label>
                    <input
                      required
                      placeholder="Absolutely love this scent!"
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                    />
                  </div>

                  <div className="row">
                    <label className="muted tiny">Your Review</label>
                    <textarea
                      required
                      placeholder="Tell us about your experience..."
                      value={formBody}
                      onChange={(e) => setFormBody(e.target.value)}
                    />
                  </div>

                  <button className="btn primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                    Submit Review
                  </button>
                </form>
              </div>
            </aside>

            {/* RIGHT: reviews list */}
            <div className="reviews-main">
              {displayProducts.map((p) => {
                const reviews = getReviews(p.id);
                const avg = avgRating(p.id);

                return (
                  <section key={p.id} className="reviews-candle-section">
                    {/* Candle header */}
                    <div className="reviews-candle-header">
                      <div className="reviews-candle-info">
                        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                          <h3 style={{ margin: 0 }}>{p.name}</h3>
                          <span className="pill">{p.tag}</span>
                        </div>
                        <p className="muted" style={{ margin: "4px 0 0", fontSize: 13 }}>
                          {p.mood} • {p.destination}
                        </p>
                        {reviews.length > 0 ? (
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                            <StarRating rating={avg} size={16} />
                            <span style={{ fontWeight: 900 }}>{avg.toFixed(1)}</span>
                            <span className="muted tiny">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
                          </div>
                        ) : (
                          <p className="muted tiny" style={{ marginTop: 6 }}>No reviews yet — be the first!</p>
                        )}
                      </div>
                      <Link
                        className="btn primary"
                        to="/"
                        style={{ whiteSpace: "nowrap", flexShrink: 0 }}
                      >
                        Shop This Candle
                      </Link>
                    </div>

                    {/* Review cards */}
                    {reviews.length > 0 ? (
                      <div className="reviews-list">
                        {reviews.map((r) => (
                          <div key={r.id} className="review-card">
                            <div className="review-card-top">
                              <div>
                                <StarRating rating={r.rating} size={14} />
                                <h4 className="review-title">{r.title}</h4>
                              </div>
                              <button
                                className="review-delete-btn"
                                onClick={() => deleteReview(p.id, r.id)}
                                type="button"
                                title="Delete review"
                              >
                                ✕
                              </button>
                            </div>
                            <p className="review-body">{r.body}</p>
                            <div className="review-meta">
                              <span className="review-author">— {r.author}</span>
                              <span className="muted tiny">
                                {new Date(r.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="review-empty">
                        <p className="muted">No reviews for this candle yet.</p>
                        <button
                          className="btn"
                          type="button"
                          onClick={() => {
                            setFormProduct(p.id);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
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
    </>
  );
}
