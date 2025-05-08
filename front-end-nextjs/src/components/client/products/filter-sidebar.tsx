"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface FilterOption {
  id: string
  name: string
}

interface FilterSidebarProps {
  priceRange: [number, number]
  setPriceRange: (value: [number, number]) => void
  selectedBrands: string[]
  toggleBrand: (brandId: string) => void
  selectedColors: string[]
  toggleColor: (colorId: string) => void
  resetFilters: () => void
  brands: FilterOption[]
  colors: { id: string; name: string; color: string }[]
  maxPrice: number
}

export function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedBrands,
  toggleBrand,
  selectedColors,
  toggleColor,
  resetFilters,
  brands,
  colors,
  maxPrice,
}: FilterSidebarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const FilterComponent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4 flex items-center justify-between">
          Khoảng giá
          <Button variant="ghost" size="sm" onClick={() => setPriceRange([0, maxPrice])} className="h-8 text-xs">
            Đặt lại
          </Button>
        </h3>
        <Slider
          defaultValue={[0, maxPrice]}
          max={maxPrice}
          step={1000000}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          className="mb-6"
        />
        <div className="flex justify-between text-sm">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Hãng xe</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand.id}`}
                checked={selectedBrands.includes(brand.id)}
                onCheckedChange={() => toggleBrand(brand.id)}
              />
              <label
                htmlFor={`brand-${brand.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Màu sắc</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                selectedColors.includes(color.id) ? "ring-2 ring-primary ring-offset-2" : ""
              }`}
              onClick={() => toggleColor(color.id)}
              title={color.name}
            >
              <span className={`w-6 h-6 rounded-full ${color.color}`}></span>
            </button>
          ))}
        </div>
      </div>

      <Button variant="outline" className="w-full" onClick={resetFilters}>
        Xóa bộ lọc
      </Button>
    </div>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden">
            <Filter className="h-4 w-4 mr-2" />
            Lọc
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle>Bộ lọc</SheetTitle>
          </SheetHeader>
          <div className="h-[calc(100vh-80px)] overflow-y-auto py-4">
            <FilterComponent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Filter Sidebar */}
      <div className="hidden lg:block">
        <div className="sticky top-24 border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Bộ lọc</h2>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <X className="h-4 w-4 mr-1" />
              Xóa tất cả
            </Button>
          </div>
          <FilterComponent />
        </div>
      </div>
    </>
  )
}
