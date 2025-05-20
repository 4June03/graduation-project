import axios from "axios";
import { request } from "http";

const BASE_URL = "http://localhost:8080";

export interface loginRequest {
  email: string;
  password: string;
}

export interface loginResponse {
  accessToken: string;
}

export interface registerRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
}

export interface registerResponse {
  message: string;
}

export const login = async (request: loginRequest): Promise<loginResponse> => {
  const response = await axios.post(`${BASE_URL}/api/login`, request);
  return response.data;
};

export const register = async (
  request: registerRequest
): Promise<registerResponse> => {
  const response = await axios.post(`${BASE_URL}/api/register`, request);
  return response.data;
};
