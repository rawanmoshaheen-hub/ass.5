"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface AuthCtx {
  token: string | null;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

function getUserId(token: string | null): string | null {
  if (!token) return null;
  try {
    return (jwtDecode(token) as { id: string }).id;
  } catch {
    return null;
  }
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const t = Cookies.get("token") ?? null;
    setToken(t);
    setUserId(getUserId(t));
  }, []);

  const login = (t: string) => {
    Cookies.set("token", t, { expires: 7 });
    setToken(t);
    setUserId(getUserId(t));
  };

  const logout = () => {
    Cookies.remove("token");
    setToken(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}