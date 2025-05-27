"use client";
import { HeaderMenu } from "@/components/client/header/HeaderMenu";
import { HeaderSearchBar } from "@/components/client/header/HeaderSearchBar";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const MainHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };
  return (
    <div className="w-full py-4 px-4 md:px-8">
      <HeaderMenu
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
      {isSearchOpen && (
        <HeaderSearchBar
          setIsSearchOpen={setIsSearchOpen}
          handleSearch={handleSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
    </div>
  );
};
