import { useState, useEffect } from "react";
import nookies from "nookies";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Nếu bạn lưu token trong cookie
    // const cookies = nookies.get(null);
    // setToken(cookies.authToken || null);

    // Hoặc nếu dùng localStorage:
    setToken(window.localStorage.getItem("accessToken"));
  }, []);

  const isLoggedIn = Boolean(token);

  return { token, isLoggedIn };
}
