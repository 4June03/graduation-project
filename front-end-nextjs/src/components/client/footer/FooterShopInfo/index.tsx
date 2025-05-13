import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const FooterShopInfo = () => {
  return (
    <div>
      <Link href="/" className="flex items-center gap-2 mb-4">
        <div className="relative h-10 w-10">
          <Image
            src="/images/web-logo2.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-bold text-xl">MotorBike</span>
      </Link>
      <p className="text-muted-foreground mb-4">
        Chuyên cung cấp các loại xe máy chính hãng với giá cả cạnh tranh và dịch
        vụ chăm sóc khách hàng tốt nhất.
      </p>
      <div className="flex gap-4">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Facebook className="h-5 w-5" />
          <span className="sr-only">Facebook</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Instagram className="h-5 w-5" />
          <span className="sr-only">Instagram</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Youtube className="h-5 w-5" />
          <span className="sr-only">Youtube</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Twitter className="h-5 w-5" />
          <span className="sr-only">Twitter</span>
        </Button>
      </div>
    </div>
  );
};
