"use client";

interface SortDropdownProps {
  sortOrder: string;
  setSortOrder: (value: string) => void;
}

export function SortDropdown({ sortOrder, setSortOrder }: SortDropdownProps) {
  return (
    <select
      className="px-3 py-2 rounded-md border text-sm"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      aria-label="Sắp xếp sản phẩm"
    >
      <option value="newest">Mới nhất</option>
      <option value="price-asc">Giá: Thấp đến cao</option>
      <option value="price-desc">Giá: Cao đến thấp</option>
      <option value="popular">Phổ biến nhất</option>
    </select>
  );
}
