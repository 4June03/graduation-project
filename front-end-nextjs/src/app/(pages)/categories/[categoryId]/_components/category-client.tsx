"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { CategoryHeader } from "./category-header";
import { CategoryTabs } from "./category-tabs";
import { ProductGrid } from "./product-grid";
import { EmptyState } from "./empty-state";
import { FilterSidebar } from "./filter-sidebar";
import { MobileFilter } from "./mobile-filter";
import { SortDropdown } from "./sort-dropdown";

import { useFetchData } from "@/hooks/useCRUD";
import { CategoryMotorbike } from "@/app/(pages)/categories/type";
import { Category } from "@/app/admin/dashboard/categories/components/categories-client";

// Mock data for brands
const brands = [
  { id: "honda", name: "Honda" },
  { id: "yamaha", name: "Yamaha" },
  { id: "suzuki", name: "Suzuki" },
  { id: "piaggio", name: "Piaggio" },
  { id: "sym", name: "SYM" },
  { id: "kawasaki", name: "Kawasaki" },
];

// Mock data for colors
const colors = [
  { id: "black", name: "Đen", color: "bg-black" },
  { id: "white", name: "Trắng", color: "bg-white border" },
  { id: "red", name: "Đỏ", color: "bg-red-500" },
  { id: "blue", name: "Xanh dương", color: "bg-blue-500" },
  { id: "green", name: "Xanh lá", color: "bg-green-500" },
  { id: "yellow", name: "Vàng", color: "bg-yellow-500" },
  { id: "gray", name: "Xám", color: "bg-gray-500" },
  { id: "orange", name: "Cam", color: "bg-orange-500" },
];

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

interface CategoryClientProps {
  categoryId: string;
  categoryName: string;
  motorbikes: CategoryMotorbike[];
  categories: Category[];
  totalElement: number;
  totalPage: number;
}

export function CategoryClient({
  categoryId,
  categoryName,
  motorbikes,
  categories,
  totalElement,
  totalPage,
}: CategoryClientProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 200000000,
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const productsPerPage = 9;

  const keys: string[] = ["motorbikes"];

  // Filter products based on selected filters
  const filteredProducts = motorbikes.filter((motorbike) => {
    // Filter by price range
    if (motorbike.price < priceRange[0] || motorbike.price > priceRange[1]) {
      return false;
    }

    // Filter by brand
    if (
      selectedBrands.length > 0 &&
      !selectedBrands.includes(motorbike?.brandName.toLowerCase())
    ) {
      return false;
    }

    //   // For color filtering, we would need color data in the product
    //   // This is a placeholder for when that data is available
    // if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
    //   return false
    // }

    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "popular":
        // Placeholder for popularity sorting
        return 0;
      case "newest":
      default:
        // Placeholder for newest sorting (would use date in real data)
        return b.bikeId - a.bikeId;
    }
  });

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, selectedBrands, selectedColors, sortOrder]);

  // Toggle brand selection
  const toggleBrand = (brandId: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  // Toggle color selection
  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.filter((id) => id !== colorId)
        : [...prev, colorId]
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 200000000]);
    setSelectedBrands([]);
    setSelectedColors([]);
  };

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Check if filters are at default values
  const isFiltersDefault =
    priceRange[0] === 0 &&
    priceRange[1] === 200000000 &&
    selectedBrands.length === 0 &&
    selectedColors.length === 0;

  return (
    <main className="flex min-h-screen flex-col">
      <CategoryHeader categoryName={categoryName} />

      <div className="container py-8 w-full mx-auto">
        <Tabs defaultValue={categoryId} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <CategoryTabs
              categories={categories}
              currentCategoryId={categoryId}
            />

            <div className="flex items-center gap-2">
              <MobileFilter
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
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

              <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block">
              <FilterSidebar
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
                isDisabled={isFiltersDefault}
              />
            </div>

            <div className="lg:col-span-3">
              <TabsContent value={categoryId} className="mt-0">
                {currentProducts.length > 0 ? (
                  <ProductGrid
                    motorbikes={motorbikes}
                    currentPage={currentPage}
                    totalPages={totalPage}
                    onPageChange={handlePageChange}
                  />
                ) : (
                  <EmptyState resetFilters={resetFilters} />
                )}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
