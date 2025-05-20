import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter } from "lucide-react"
import { FilterComponent } from "./filter-component"

interface Brand {
  id: string
  name: string
}

interface Color {
  id: string
  name: string
  color: string
}

interface MobileFilterProps {
  isFilterOpen: boolean
  setIsFilterOpen: (value: boolean) => void
  priceRange: [number, number]
  setPriceRange: (value: [number, number]) => void
  selectedBrands: string[]
  toggleBrand: (brandId: string) => void
  selectedColors: string[]
  toggleColor: (colorId: string) => void
  resetFilters: () => void
  brands: Brand[]
  colors: Color[]
  formatPrice: (price: number) => string
}

export function MobileFilter({
  isFilterOpen,
  setIsFilterOpen,
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
}: MobileFilterProps) {
  return (
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
        <ScrollArea className="h-[calc(100vh-80px)] py-4">
          <FilterComponent
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            selectedColors={selectedColors}
            toggleColor={toggleColor}
            resetFilters={resetFilters}
            brands={brands}
            colors={colors}
            formatPrice={formatPrice}
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
