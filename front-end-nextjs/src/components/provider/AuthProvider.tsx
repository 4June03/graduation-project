"use client";
import { parseToken } from "@/utils/jwt";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  userId: number | null;
  isLoggedIn: boolean;
  setToken: (t: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  isLoggedIn: false,
  setToken: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [token, _setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  // wrapper để vừa cập nhật state, vừa lưu/removal localStorage
  const setToken = (t: string | null) => {
    if (t) {
      localStorage.setItem("accessToken", t);
      const payload = parseToken(t);
      setUserId(payload?.userId ?? null);
      _setToken(t);
    } else {
      localStorage.removeItem("accessToken");
      setUserId(null);
      _setToken(null);
    }
  };

  // Khi app khởi chạy, kiểm tra xem token đã có chưa
  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    const t = localStorage.getItem("accessToken");
    if (t) {
      _setToken(t);
      const payload = parseToken(t);
      setUserId(payload?.userId ?? null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        isLoggedIn: Boolean(token),
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
