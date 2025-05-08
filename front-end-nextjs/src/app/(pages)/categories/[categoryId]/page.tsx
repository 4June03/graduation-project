"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Filter, X, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  ProductCard,
  type ProductData,
} from "@/components/client/products/product-card";
import { Pagination } from "@/components/client/products/pagination";

// Mock data for categories
const categories = [
  { id: "1", name: "Xe số" },
  { id: "2", name: "Xe tay ga" },
  { id: "3", name: "Xe thể thao" },
  { id: "4", name: "Xe phân khối lớn" },
  { id: "5", name: "Xe điện" },
  { id: "6", name: "Xe địa hình" },
];

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

// Mock data for products
const products: ProductData[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Motorcycle Model ${i + 1}`,
  image: "/placeholder.svg?height=300&width=400",
  price: Math.floor(Math.random() * 100000000) + 10000000,
  oldPrice:
    Math.random() > 0.7
      ? Math.floor(Math.random() * 120000000) + 20000000
      : null,
  brand: brands[Math.floor(Math.random() * brands.length)].name,
  isNew: Math.random() > 0.8,
}));

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    0, 200000000,
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("newest");
  const productsPerPage = 9;

  const categoryName =
    categories.find((c) => c.id === params.categoryId)?.name ||
    "Tất cả sản phẩm";

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by price range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }

    // Filter by brand
    if (
      selectedBrands.length > 0 &&
      !selectedBrands.includes(product.brand.toLowerCase())
    ) {
      return false;
    }

    // For color filtering, we would need color data in the product
    // This is a placeholder for when that data is available
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
        return b.id - a.id;
    }
  });

  // Get current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

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

  // Filter component
  const FilterComponent = () => (
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
            onValueChange={(value: any) =>
              setPriceRange(value as [number, number])
            }
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

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link href="/categories" className="hover:text-foreground">
              Danh mục
            </Link>
            <span className="mx-2">/</span>
            <span>{categoryName}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <Tabs defaultValue={params.categoryId} className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="overflow-x-auto">
              <TabsTrigger value="all" asChild>
                <Link href="/categories/all">Tất cả</Link>
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} asChild>
                  <Link href={`/categories/${category.id}`}>
                    {category.name}
                  </Link>
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="flex items-center gap-2">
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
                    <FilterComponent />
                  </ScrollArea>
                </SheetContent>
              </Sheet>

              {/* <select
                className="px-3 py-2 rounded-md border text-sm"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="newest">Mới nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="popular">Phổ biến nhất</option>
              </select> */}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block">
              <div className="sticky top-24 border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-lg">Bộ lọc</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    disabled={
                      priceRange[0] === 0 &&
                      priceRange[1] === 200000000 &&
                      selectedBrands.length === 0 &&
                      selectedColors.length === 0
                    }
                  >
                    <X className="h-4 w-4 mr-1" />
                    Xóa tất cả
                  </Button>
                </div>
                <FilterComponent />
              </div>
            </div>

            <div className="lg:col-span-3">
              <TabsContent value={params.categoryId} className="mt-0">
                {currentProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {currentProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Pagination component */}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">
                      Không tìm thấy sản phẩm nào
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Không có sản phẩm nào phù hợp với bộ lọc của bạn
                    </p>
                    <Button onClick={resetFilters}>Xóa bộ lọc</Button>
                  </div>
                )}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </main>
  );
}
