"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortingDropdownProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function SortingDropdown({
  value,
  onValueChange,
}: SortingDropdownProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sắp xếp theo" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Mới nhất</SelectItem>
        <SelectItem value="price-asc">Giá: Thấp đến cao</SelectItem>
        <SelectItem value="price-desc">Giá: Cao đến thấp</SelectItem>
        <SelectItem value="name-asc">Tên: A-Z</SelectItem>
        <SelectItem value="name-desc">Tên: Z-A</SelectItem>
        <SelectItem value="popular">Phổ biến nhất</SelectItem>
      </SelectContent>
    </Select>
  );
}
