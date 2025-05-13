import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  register,
  registerRequest,
  registerResponse,
  loginRequest,
  loginResponse,
} from "../apis/auth";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation<loginResponse, Error, loginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("đăng nhập thành công", data?.accessToken);
      toast.success("Đăng nhập thành công");
      router.refresh();
      localStorage.setItem("accessToken", data.accessToken);
      router.push("/");
      // lưu vào cookie, path=/ để cookie có hiệu lực trên toàn site
      // setCookie(null, "accessToken", data.accessToken, {
      //   maxAge: 30 * 24 * 60 * 60, // 30 ngày
      //   path: "/",
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "lax",
      // });
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
