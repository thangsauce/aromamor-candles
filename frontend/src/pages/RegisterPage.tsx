import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import type { Location } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function RegisterPage() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation =
    (location.state as { backgroundLocation?: Location } | null)?.backgroundLocation;
  const hasBackground = Boolean(backgroundLocation);
  const modalBackgroundLocation = backgroundLocation ?? location;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      await register(username.trim(), password);
      navigate("/dashboard");
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
    <main className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-[oklch(0.15_0.02_60/.42)] backdrop-blur-sm" />
      <div className="relative w-full max-w-md">
        <form
          onSubmit={onSubmit}
          className="w-full rounded-2xl border border-brand-line dark:border-brand-line-dark bg-brand-card dark:bg-brand-card-dark p-6 flex flex-col gap-4 shadow-[0_24px_60px_oklch(0.2_0.02_72/.28)]"
        >
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                if (backgroundLocation) {
                  navigate(backgroundLocation, { replace: true });
                } else {
                  navigate("/", { replace: true });
                }
              }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-line text-brand-muted transition hover:bg-brand-line"
              aria-label="Close registration"
            >
              ×
            </button>
          </div>
          <p
            className="text-center text-4xl text-brand-text dark:text-brand-text-dark"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Aromamor
          </p>
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

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xl px-4 py-2.5 bg-brand-accent dark:bg-brand-accent-dark text-white font-medium disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>

          <p className="text-sm text-brand-muted dark:text-brand-muted-dark">
            Already have an account?{" "}
            <Link
              to="/login"
              replace={hasBackground}
              state={{ backgroundLocation: modalBackgroundLocation }}
              className="underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
