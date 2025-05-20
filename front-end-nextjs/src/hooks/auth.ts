import { useState, useEffect } from "react";
import nookies from "nookies";
import { parseToken } from "@/utils/jwt";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = localStorage.getItem("accessToken");
    setToken(t);
    if (t) {
      const payload = parseToken(t);
      setUserId(payload?.userId ?? null);
    }
  }, []);

  return {
    token,
    isLoggedIn: Boolean(token),
    userId,
  };
}
