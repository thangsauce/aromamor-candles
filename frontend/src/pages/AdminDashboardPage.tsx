import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/axios";
import { useAuth } from "../store/AuthContext";

interface ProductRow {
  _id: string;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
}

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(25);
  const [description, setDescription] = useState("");

  async function loadProducts() {
    const { data } = await api.get<ProductRow[]>("/products");
    setProducts(data);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function createProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await api.post("/admin/products", { name, description, price, inStock: true, tagIds: [] });
    setName("");
    setDescription("");
    setPrice(25);
    await loadProducts();
  }

  async function deleteProduct(id: string) {
    await api.delete(`/admin/products/${id}`);
    await loadProducts();
  }

  async function toggleStock(row: ProductRow) {
    await api.put(`/admin/products/${row._id}`, { inStock: !row.inStock });
    await loadProducts();
  }

  return (
    <main className="min-h-screen bg-brand-bg dark:bg-brand-bg-dark px-6 py-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-muted">Administrator</p>
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
          <h2 className="text-xl mb-3">Create Product (Admin CRUD)</h2>
          <form onSubmit={createProduct} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input className="rounded-lg border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input className="rounded-lg border px-3 py-2" value={price} onChange={(e) => setPrice(Number(e.target.value))} type="number" min={1} required />
            <input className="rounded-lg border px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
            <button type="submit" className="rounded-lg px-3 py-2 bg-brand-accent text-white md:col-span-3">Add Product</button>
          </form>
        </section>

        <section className="rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-5">
          <h2 className="text-xl mb-3">Manage Products (Read/Update/Delete)</h2>
          <div className="flex flex-col gap-2">
            {products.map((p) => (
              <div key={p._id} className="rounded-lg border border-brand-line dark:border-brand-line-dark p-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{p.name}</p>
                  <p className="text-sm text-brand-muted">${p.price.toFixed(2)} · {p.inStock ? "In Stock" : "Out of Stock"}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleStock(p)} className="rounded-lg border px-2 py-1 text-xs" type="button">Toggle Stock</button>
                  <button onClick={() => deleteProduct(p._id)} className="rounded-lg border px-2 py-1 text-xs text-red-600" type="button">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
