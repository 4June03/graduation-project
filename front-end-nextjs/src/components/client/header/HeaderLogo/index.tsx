import Image from "next/image";
import Link from "next/link";
import React from "react";

export const HeaderLogo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="relative h-10 w-10">
        <Image
          src="/images/web-logo2.png"
          alt="Logo"
          fill
          className="object-contain"
        />
      </div>
      <span className="font-bold text-xl hidden sm:inline-block">
        KVN Motor
      </span>
    </Link>
  );
};
