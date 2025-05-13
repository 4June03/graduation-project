import Link from "next/link";
import React from "react";

export const FooterInfo = () => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Thông tin</h3>
      <ul className="space-y-2">
        <li>
          <Link
            href="/about"
            className="text-muted-foreground hover:text-foreground"
          >
            Giới thiệu
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-muted-foreground hover:text-foreground"
          >
            Liên hệ
          </Link>
        </li>
        <li>
          <Link
            href="/news"
            className="text-muted-foreground hover:text-foreground"
          >
            Tin tức
          </Link>
        </li>
        <li>
          <Link
            href="/promotions"
            className="text-muted-foreground hover:text-foreground"
          >
            Khuyến mãi
          </Link>
        </li>
        <li>
          <Link
            href="/warranty"
            className="text-muted-foreground hover:text-foreground"
          >
            Chính sách bảo hành
          </Link>
        </li>
        <li>
          <Link
            href="/terms"
            className="text-muted-foreground hover:text-foreground"
          >
            Điều khoản sử dụng
          </Link>
        </li>
      </ul>
    </div>
  );
};
