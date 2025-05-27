import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { FC } from "react";

interface HeaderSearchBarProps {
  setIsSearchOpen: (isOpen: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

export const HeaderSearchBar: FC<HeaderSearchBarProps> = ({
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <div className="mt-4 relative">
      <form onSubmit={handleSearch} className="flex">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1"
          autoFocus
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" className="ml-2">
          Tìm kiếm
        </Button>
      </form>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 mr-16"
        onClick={() => setIsSearchOpen(false)}
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};
