import { FooterCategory } from "@/components/client/footer/FooterCategory";
import { FooterContact } from "@/components/client/footer/FooterContact";
import { FooterInfo } from "@/components/client/footer/FooterInfo";
import { FooterShopInfo } from "@/components/client/footer/FooterShopInfo";
import React from "react";

export const FooterContainer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12 w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterShopInfo />
          <FooterCategory />
          <FooterInfo />
          <FooterContact />
        </div>
        <div className="border-t py-6"></div>
      </div>
    </footer>
  );
};
