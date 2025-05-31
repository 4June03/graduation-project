"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FilterComponent } from "./filter-component";

interface Brand {
  brandId: number;
  brandName: string;
}

interface Color {
  colorId: string;
  colorName: string;
}

interface FilterSidebarProps {
  selectedPriceRanges: string[];
  togglePriceRange: (rangeId: string) => void;
  selectedBrands: number[];
  toggleBrand: (brandId: number) => void;
  selectedColors?: string[];
  toggleColor?: (colorId: string) => void;
  resetFilters: () => void;
  brands: Brand[];
  colors?: Color[];
  formatPrice: (price: number) => string;
  isDisabled: boolean;
}

export function FilterSidebar({
  selectedPriceRanges,
  togglePriceRange,
  selectedBrands,
  toggleBrand,
  selectedColors,
  toggleColor,
  resetFilters,
  brands,
  colors,
  formatPrice,
  isDisabled,
}: FilterSidebarProps) {
  return (
    <div className="sticky top-24 border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-lg">Bộ lọc</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          disabled={isDisabled}
        >
          <X className="h-4 w-4 mr-1" />
          Xóa tất cả
        </Button>
      </div>
      <FilterComponent
        selectedPriceRanges={selectedPriceRanges}
        togglePriceRange={togglePriceRange}
        selectedBrands={selectedBrands}
        toggleBrand={toggleBrand}
        resetFilters={resetFilters}
        brands={brands}
        formatPrice={formatPrice}
      />
    </div>
  );
}
