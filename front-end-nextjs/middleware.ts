import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Chỉ áp dụng cho đường dẫn /admin và mọi subpath
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      // Chưa login → redirect về trang login hoặc trang chủ
      return NextResponse.redirect(new URL("/", req.url));
    }

    try {
      // Thay SECRET_KEY bằng biến môi trường tương ứng
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
        scope: string;
      };

      console.log(`Payload: ${JSON.stringify(payload)}`);

      // Nếu không có quyền ADMIN thì redirect
      if (payload.scope !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      // Token sai, hết hạn, v.v.
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Các route khác hoặc admin đã auth đúng → tiếp tục
  return NextResponse.next();
}

// Áp middleware cho tất cả đường dẫn /admin/**
export const config = {
  matcher: ["/admin/:path*"],
};
