import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import { useAuth } from "../store/AuthContext";

interface ProductRow {
  _id: string;
  name: string;
}

interface ReviewRow {
  _id: string;
  title: string;
  body: string;
  rating: number;
  product: ProductRow;
}

export default function UserDashboardPage() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [myReviews, setMyReviews] = useState<ReviewRow[]>([]);
  const [productId, setProductId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(5);

  async function loadAll() {
    const [pRes, rRes] = await Promise.all([api.get<ProductRow[]>("/products"), api.get<ReviewRow[]>("/reviews/mine")]);
    setProducts(pRes.data);
    setMyReviews(rRes.data);
    if (!productId && pRes.data.length > 0) {
      setProductId(pRes.data[0]._id);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function createReview(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await api.post("/reviews", { productId, title, body, rating });
    setTitle("");
    setBody("");
    setRating(5);
    await loadAll();
  }

  async function updateReview(id: string) {
    const nextTitle = window.prompt("New title:");
    if (!nextTitle) {
      return;
    }

    await api.put(`/reviews/${id}`, { title: nextTitle });
    await loadAll();
  }

  async function deleteReview(id: string) {
    await api.delete(`/reviews/${id}`);
    await loadAll();
  }

  return (
    <main className="min-h-screen bg-brand-bg dark:bg-brand-bg-dark px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">Standard User</p>
            <h1 className="text-3xl text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)" }}>
              Welcome, {user?.username}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/shop" className="text-sm underline">Storefront</Link>
            <button onClick={logout} className="rounded-lg border px-3 py-1.5 text-sm" type="button">Logout</button>
          </div>
        </div>

        <section className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-5">
          <h2 className="text-xl mb-3">Create Your Review</h2>
          <form onSubmit={createReview} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select className="rounded-lg border px-3 py-2" value={productId} onChange={(e) => setProductId(e.target.value)} required>
              {products.map((p) => (
                <option value={p._id} key={p._id}>{p.name}</option>
              ))}
            </select>
            <input className="rounded-lg border px-3 py-2" type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
            <input className="rounded-lg border px-3 py-2 md:col-span-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Review title" required />
            <textarea className="rounded-lg border px-3 py-2 md:col-span-2" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Your review" required />
            <button type="submit" className="rounded-lg px-3 py-2 bg-brand-accent text-white md:col-span-2">Add Review</button>
          </form>
        </section>

        <section className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-5">
          <h2 className="text-xl mb-3">My Reviews (Only Your Own Data)</h2>
          <div className="flex flex-col gap-2">
            {myReviews.map((r) => (
              <div key={r._id} className="rounded-lg border border-brand-line dark:border-brand-line-dark p-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{r.title} · {r.rating}/5</p>
                  <p className="text-sm text-brand-muted">{r.product?.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateReview(r._id)} className="rounded-lg border px-2 py-1 text-xs" type="button">Update</button>
                  <button onClick={() => deleteReview(r._id)} className="rounded-lg border px-2 py-1 text-xs text-red-600" type="button">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
