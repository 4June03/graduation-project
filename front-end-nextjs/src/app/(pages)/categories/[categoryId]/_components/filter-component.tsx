"use client";

import { Brand, Color } from "@/app/(pages)/categories/type";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

interface FilterComponentProps {
  selectedPriceRanges: string[];
  togglePriceRange: (rangeId: string) => void;
  selectedBrands: number[];
  toggleBrand: (brandId: number) => void;
  resetFilters: () => void;
  brands: Brand[];
  formatPrice: (price: number) => string;
}

// Định nghĩa các khoảng giá
export const priceRanges: PriceRange[] = [
  { id: "under-10m", label: "Dưới 10.000.000", min: 0, max: 10000000 },
  {
    id: "10m-20m",
    label: "10.000.000 - 20.000.000",
    min: 10000000,
    max: 20000000,
  },
  {
    id: "20m-30m",
    label: "20.000.000 - 30.000.000",
    min: 20000000,
    max: 30000000,
  },
  {
    id: "30m-50m",
    label: "30.000.000 - 50.000.000",
    min: 30000000,
    max: 50000000,
  },
  {
    id: "50m-100m",
    label: "50.000.000 - 100.000.000",
    min: 50000000,
    max: 100000000,
  },
  {
    id: "over-100m",
    label: "Trên 100.000.000",
    min: 100000000,
    max: Number.POSITIVE_INFINITY,
  },
];

export function FilterComponent({
  selectedPriceRanges,
  togglePriceRange,
  selectedBrands,
  toggleBrand,
  resetFilters,
  brands,
  formatPrice,
}: FilterComponentProps) {
  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      {/* <div>
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
      </div> */}
      {/* Price Range Filter */}
      <div>
        <h3 className="font-medium mb-4 flex items-center justify-between">
          Khoảng giá
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              selectedPriceRanges.forEach((id) => togglePriceRange(id))
            }
            className="h-8 text-xs"
            disabled={(selectedPriceRanges || []).length === 0}
          >
            Đặt lại
          </Button>
        </h3>
        <div className="space-y-3">
          {(priceRanges || []).map((range) => (
            <div key={range.id} className="flex items-center space-x-2">
              <Checkbox
                id={`price-${range.id}`}
                checked={selectedPriceRanges.includes(range.id)}
                onCheckedChange={() => togglePriceRange(range.id)}
              />
              <Label
                htmlFor={`price-${range.id}`}
                className="text-sm font-normal cursor-pointer"
              >
                {range.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-medium mb-4">Hãng xe</h3>
        <div className="space-y-3">
          {brands.map((brand) => (
            <div key={brand.brandId} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.brandId}`}
                checked={selectedBrands.includes(brand.brandId)}
                onCheckedChange={() => toggleBrand(brand.brandId)}
              />
              <Label
                htmlFor={`brand-${brand.brandId}`}
                className="text-sm font-normal cursor-pointer"
              >
                {brand.brandName}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      {/* <div>
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
      </div> */}

      {/* Reset All Filters Button */}
      {/* Reset All Filters Button */}
      <Button
        variant="outline"
        className="w-full"
        onClick={resetFilters}
        disabled={
          selectedPriceRanges.length === 0 && selectedBrands.length === 0
        }
      >
        Xóa bộ lọc
      </Button>
    </div>
  );
}
