"use client";
import { HeaderMenu } from "@/components/client/header/HeaderMenu";
import { HeaderSearchBar } from "@/components/client/header/HeaderSearchBar";
import React, { useState } from "react";

export const MainHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  return (
    <div className="w-full py-4 px-4 md:px-8">
      <HeaderMenu
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      {isSearchOpen && <HeaderSearchBar setIsSearchOpen={setIsSearchOpen} />}
    </div>
  );
};
