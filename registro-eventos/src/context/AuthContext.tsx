import { createContext, useContext, useState } from "react";

type User = {
  username: string;
  rol: "ADMIN" | "CONSULTA";
} | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (u: string, p: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: any) {

  // ==============================
  // RESTAURAR USER (FIX REFRESH)
  // ==============================
  const [user, setUser] = useState<User>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // ==============================
  // RESTAURAR TOKEN
  // ==============================
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  // ==============================
  // LOGIN
  // ==============================
  const login = async (username: string, password: string) => {

    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) return false;

    const data = await res.json();

    const userData = {
      username: data.user.username,
      rol: data.user.rol
    };

    setUser(userData);
    setToken(data.access_token);

    // ==============================
    // PERSISTENCIA LOCAL
    // ==============================
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("user", JSON.stringify(userData));

    return true;
  };

  // ==============================
  // LOGOUT
  // ==============================
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("Auth error");
  return ctx;
}