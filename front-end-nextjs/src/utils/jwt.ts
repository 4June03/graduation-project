import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string;
  scope: string;
  iss: string;
  exp: number;
  iat: number;
  userId: number;
  jti: string;
}

export function parseToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token); //giải mã token
  } catch {
    return null;
  }
}
