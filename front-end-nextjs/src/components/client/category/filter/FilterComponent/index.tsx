"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";

interface Brand {
  id: string;
  name: string;
}

interface Color {
  id: string;
  name: string;
  color: string;
}

interface FilterComponentProps {
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  selectedBrands: string[];
  toggleBrand: (brandId: string) => void;
  selectedColors: string[];
  toggleColor: (colorId: string) => void;
  resetFilters: () => void;
  brands: Brand[];
  colors: Color[];
  formatPrice: (price: number) => string;
}

export function FilterComponent({
  priceRange,
  setPriceRange,
  selectedBrands,
  toggleBrand,
  selectedColors,
  toggleColor,
  resetFilters,
  brands,
  colors,
  formatPrice,
}: FilterComponentProps) {
  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div>
        <h3 className="font-medium mb-4 flex items-center justify-between">
          Khoảng giá
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPriceRange([0, 200000000])}
            className="h-8 text-xs"
            disabled={priceRange[0] === 0 && priceRange[1] === 200000000}
          >
            Đặt lại
          </Button>
        </h3>
        <div className="px-2 pt-2 pb-6">
          <Slider
            defaultValue={[0, 200000000]}
            value={priceRange}
            max={200000000}
            step={5000000}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="mb-6"
          />
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">
              {formatPrice(priceRange[0])}
            </div>
            <div className="text-sm font-medium">
              {formatPrice(priceRange[1])}
            </div>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-medium mb-4">Hãng xe</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
              />
              <Label
                htmlFor={`brand-${brand.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {brand.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div>
        <h3 className="font-medium mb-4">Màu sắc</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                color.color
              } ${
                selectedColors.includes(color.id)
                  ? "ring-2 ring-offset-2 ring-primary"
                  : "ring-1 ring-muted"
              }`}
              onClick={() => toggleColor(color.id)}
              title={color.name}
            >
              {selectedColors.includes(color.id) && (
                <Check
                  className={`h-4 w-4 ${
                    color.id === "white" ? "text-black" : "text-white"
                  }`}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Reset All Filters Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={resetFilters}
        disabled={
          priceRange[0] === 0 &&
          priceRange[1] === 200000000 &&
          selectedBrands.length === 0 &&
          selectedColors.length === 0
        }
      >
        Xóa bộ lọc
      </Button>
    </div>
  );
}
