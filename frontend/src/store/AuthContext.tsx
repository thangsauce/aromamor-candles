import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/axios";

export type UserRole = "admin" | "user";

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("aromamor_token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        localStorage.removeItem("aromamor_token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function login(username: string, password: string) {
    const { data } = await api.post("/auth/login", { username, password });
    localStorage.setItem("aromamor_token", data.token);
    setUser(data.user);
  }

  async function register(username: string, password: string) {
    const { data } = await api.post("/auth/register", { username, password, role: "user" });
    localStorage.setItem("aromamor_token", data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("aromamor_token");
    setUser(null);
  }

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return ctx;
}
