import Link from "next/link";
import React from "react";

export const TopBar = () => {
  return (
    <div className="bg-primary text-primary-foreground py-2">
      <div className="container flex justify-between items-center w-full mx-auto px-4 md:px-8">
        <div className="text-sm">Hotline: 1900 1234</div>
        <div className="text-sm">
          <Link href="/promotions" className="hover:underline">
            Khuyến mãi
          </Link>
          <span className="mx-2">|</span>
          <Link href="/news" className="hover:underline">
            Tin tức
          </Link>
        </div>
      </div>
    </div>
  );
};
