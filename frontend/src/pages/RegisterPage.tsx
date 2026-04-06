import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth, type UserRole } from "../store/AuthContext";

export default function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/dashboard"} replace />;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await register(username.trim(), password, role);
      navigate(role === "admin" ? "/admin" : "/dashboard");
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err &&
        "response" in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : "Registration failed";

      setError(message || "Registration failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen grid place-items-center px-4 bg-brand-bg dark:bg-brand-bg-dark">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-6 flex flex-col gap-4"
      >
        <h1 className="text-2xl text-brand-text dark:text-brand-text-dark" style={{ fontFamily: "var(--font-display)" }}>
          Register
        </h1>

        <label className="text-sm text-brand-text dark:text-brand-text-dark flex flex-col gap-1">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark px-3 py-2"
            required
          />
        </label>

        <label className="text-sm text-brand-text dark:text-brand-text-dark flex flex-col gap-1">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark px-3 py-2"
            required
          />
        </label>

        <label className="text-sm text-brand-text dark:text-brand-text-dark flex flex-col gap-1">
          Account Type
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            className="rounded-xl border border-brand-line dark:border-brand-line-dark bg-brand-bg dark:bg-brand-bg-dark px-3 py-2"
          >
            <option value="user">Standard User</option>
            <option value="admin">Administrator</option>
          </select>
        </label>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl px-4 py-2.5 bg-brand-accent dark:bg-brand-accent-dark text-white font-medium disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>

        <p className="text-sm text-brand-muted dark:text-brand-muted-dark">
          Already have an account? <Link to="/login" className="underline">Sign in</Link>
        </p>
      </form>
    </main>
  );
}
