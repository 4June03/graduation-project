import Link from "next/link";
import React from "react";

export const FooterCategory = () => {
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Danh mục sản phẩm</h3>
      <ul className="space-y-2">
        {[1, 1, 1, 1, 1, 1].map((_, index) => (
          <li key={index}>
            <Link
              href="/categories/1"
              className="text-muted-foreground hover:text-foreground"
            >
              Xe máy số
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/categories/1"
            className="text-muted-foreground hover:text-foreground"
          >
            Xe số
          </Link>
        </li>
      </ul>
    </div>
  );
};
