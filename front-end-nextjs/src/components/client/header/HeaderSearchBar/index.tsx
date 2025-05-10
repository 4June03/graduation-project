import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { FC } from "react";

interface HeaderSearchBarProps {
  setIsSearchOpen: (isOpen: boolean) => void;
}

export const HeaderSearchBar: FC<HeaderSearchBarProps> = ({
  setIsSearchOpen,
}) => {
  return (
    <div className="mt-4 relative">
      <div className="flex">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1"
          autoFocus
        />
        <Button className="ml-2">Tìm kiếm</Button>
      </div>
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
