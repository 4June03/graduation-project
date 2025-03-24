import { useMutation } from "@tanstack/react-query";
import {
  login,
  register,
  registerRequest,
  registerResponse,
  loginRequest,
  loginResponse,
} from "../apis/auth";

export const useLogin = () => {
  return useMutation<loginResponse, Error, loginRequest>({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("đăng nhập thành công", data.accessToken);
      localStorage.setItem("accessToken", data.accessToken);
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
