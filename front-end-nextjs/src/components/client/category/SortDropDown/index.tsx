import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface SortDropdownProps {
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

export function SortDropdown({ sortOrder, setSortOrder }: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="px-3 py-2 rounded-md text-sm inline-flex items-center"
        >
          {sortOrder}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuItem onClick={() => setSortOrder("newest")}>
          Mới nhất
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOrder("price-asc")}>
          Giá: Thấp đến cao
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOrder("price-desc")}>
          Giá: Cao đến thấp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSortOrder("popular")}>
          Phổ biến nhất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
