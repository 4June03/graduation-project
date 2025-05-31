import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Filter } from "lucide-react";
import { FilterComponent } from "./filter-component";

interface Brand {
  brandId: number;
  brandName: string;
}

interface Color {
  colorId: string;
  colorName: string;
}

interface MobileFilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (value: boolean) => void;
  selectedPriceRanges: string[];
  togglePriceRange: (rangeId: string) => void;
  selectedBrands: number[];
  toggleBrand: (brandId: number) => void;
  selectedColors: string[];
  toggleColor: (colorId: string) => void;
  resetFilters: () => void;
  brands: Brand[];
  colors: Color[];
  formatPrice: (price: number) => string;
}

export function MobileFilter({
  isFilterOpen,
  setIsFilterOpen,
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
            selectedPriceRanges={selectedPriceRanges}
            togglePriceRange={togglePriceRange}
            selectedBrands={selectedBrands}
            toggleBrand={toggleBrand}
            resetFilters={resetFilters}
            brands={brands}
            formatPrice={formatPrice}
          />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
