import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  register,
  registerRequest,
  registerResponse,
  loginRequest,
  loginResponse,
} from "../apis/auth";
import nookies from "nookies";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/components/provider/AuthProvider";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  sub: string;
  scope: string;
  iss: string;
  exp: number;
  iat: number;
  userId: number;
  jti: string;
}

export const useLogin = () => {
  const router = useRouter();
  const { setToken } = useAuth();

  const queryClient = useQueryClient();
  return useMutation<loginResponse, Error, loginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("đăng nhập thành công", data?.accessToken);
      toast.success("Đăng nhập thành công");

      // Lưu token vào cookie, có thể chỉnh maxAge theo độ dài TTL của JWT
      nookies.set(null, "accessToken", data.accessToken, {
        path: "/", // cookie sẽ có tác dụng trên toàn site
        maxAge: 60 * 60 * 24 * 7, // 7 ngày
        httpOnly: false, // client-side vẫn có thể đọc bằng JS (nếu cần)
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });
      setToken(data.accessToken);
      router.refresh();
      // localStorage.setItem("accessToken", data.accessToken);

      // Giải mã token để lấy scope
      const decoded = jwtDecode<DecodedToken>(data.accessToken);
      const { scope } = decoded;
      console.log("scope", scope);
      // Điều hướng tùy scope
      if (scope === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    },
    onError: (error) => {
      console.log("Lỗi đăng nhập " + error.message);
    },
  });
};

export const useRegister = () => {
  return useMutation<registerResponse, Error, registerRequest>({
    mutationFn: register,
    onSuccess: (data) => {
      console.log("đăng ký thành công", data.message);
    },

    onError: (error) => {
      console.log("Lỗi đăng ký, " + error.message);
    },
  });
};
