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
import { Brand, CategoryMotorbike } from "@/app/(pages)/categories/type";
import { Category } from "@/app/admin/dashboard/categories/components/categories-client";
import { priceRanges } from "@/app/(pages)/categories/[categoryId]/_components/filter-component";

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
  brands: Brand[];
}

export function CategoryClient({
  categoryId,
  categoryName,
  motorbikes,
  categories,
  totalElement,
  totalPage,
  brands = [],
}: CategoryClientProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 200000000,
  ]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const productsPerPage = 9;

  const keys: string[] = ["motorbikes"];

  const filteredProducts = motorbikes.filter((motorbike) => {
    // Get first variant price for filtering
    const firstVariantPrice = motorbike.price || motorbike.price;

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      const isInPriceRange = selectedPriceRanges.some((rangeId) => {
        const range = priceRanges.find((r) => r.id === rangeId);
        if (!range) return false;
        return (
          firstVariantPrice >= range.min &&
          (range.max === Number.POSITIVE_INFINITY
            ? true
            : firstVariantPrice <= range.max)
        );
      });
      if (!isInPriceRange) return false;
    }

    // Filter by brand
    if (
      selectedBrands.length > 0 &&
      (motorbike.brandId == null || !selectedBrands.includes(motorbike.brandId))
    ) {
      return false;
    }

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

  console.log("Danh sashc sản phẩm hiện tại:", currentProducts);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [priceRange, selectedBrands, sortOrder]);

  // Toggle price range selection
  const togglePriceRange = (rangeId: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(rangeId)
        ? prev.filter((id) => id !== rangeId)
        : [...prev, rangeId]
    );
  };

  // Toggle brand selection
  const toggleBrand = (brandId: number) => {
    setSelectedBrands((prev) =>
      prev.includes(brandId)
        ? prev.filter((id) => id !== brandId)
        : [...prev, brandId]
    );
  };

  // Toggle brand selection
  // const toggleBrand = (brandId: string) => {
  //   setSelectedBrands((prev) =>
  //     prev.includes(brandId)
  //       ? prev.filter((id) => id !== brandId)
  //       : [...prev, brandId]
  //   );
  // };

  // Toggle color selection

  // Reset all filters
  const resetFilters = () => {
    setPriceRange([0, 200000000]);
    setSelectedBrands([]);
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
    selectedBrands.length === 0;

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
              {/* <MobileFilter
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
                formatPrice={formatPrice}
              /> */}

              <SortDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block">
              <FilterSidebar
                selectedPriceRanges={selectedPriceRanges}
                togglePriceRange={togglePriceRange}
                selectedBrands={selectedBrands}
                toggleBrand={toggleBrand}
                resetFilters={resetFilters}
                brands={brands}
                formatPrice={formatPrice}
                isDisabled={isFiltersDefault}
              />
            </div>

            <div className="lg:col-span-3">
              <TabsContent value={categoryId} className="mt-0">
                {currentProducts.length > 0 ? (
                  <ProductGrid
                    motorbikes={currentProducts}
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
