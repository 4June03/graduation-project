"use client";

import { useState } from "react";
import { Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PageHeader } from "@/components/client/layout/page-header";
import {
  ProductCard,
  type ProductData,
} from "@/components/client/products/product-card";
import { Pagination } from "@/components/client/products/pagination";

// Mock data for brands
const brands = [
  {
    id: "honda",
    name: "Honda",
    logo: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=400&width=1200",
    description:
      "Honda là một trong những nhà sản xuất xe máy lớn nhất thế giới. Với lịch sử hơn 70 năm, Honda đã khẳng định vị thế của mình với các dòng xe máy chất lượng cao, bền bỉ và tiết kiệm nhiên liệu. Tại Việt Nam, Honda là thương hiệu xe máy được ưa chuộng nhất với nhiều mẫu xe phù hợp với nhu cầu đi lại của người Việt.",
  },
  {
    id: "yamaha",
    name: "Yamaha",
    logo: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=400&width=1200",
    description:
      "Yamaha nổi tiếng với các dòng xe thể thao và xe tay ga cao cấp. Thương hiệu Nhật Bản này luôn đi đầu trong việc áp dụng công nghệ tiên tiến vào các sản phẩm của mình, mang đến trải nghiệm lái xe tuyệt vời cho người dùng.",
  },
];

// Mock data for products
const products: ProductData[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: `Honda Model ${i + 1}`,
  image: "/placeholder.svg?height=300&width=400",
  price: Math.floor(Math.random() * 100000000) + 10000000,
  oldPrice:
    Math.random() > 0.7
      ? Math.floor(Math.random() * 120000000) + 20000000
      : null,
  brand: "Honda",
  isNew: Math.random() > 0.8,
}));

export default function BrandDetailPage({
  params,
}: {
  params: { brandId: string };
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productsPerPage = 9;
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get brand data
  const brand = brands.find((b) => b.id === params.brandId) || {
    id: params.brandId,
    name: "Unknown Brand",
    logo: "/placeholder.svg?height=200&width=200",
    banner: "/placeholder.svg?height=400&width=1200",
    description: "No description available.",
  };

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle page change
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader
        title={brand.name}
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thương hiệu", href: "/brands" },
          { label: brand.name },
        ]}
      />

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block">
            <div className="sticky top-24 border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Bộ lọc</h2>
              </div>
              {/* Filter component would go here */}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Sản phẩm của {brand.name}</h2>

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
                      {/* Filter component would go here */}
                    </ScrollArea>
                  </SheetContent>
                </Sheet>

                <label htmlFor="sort-options" className="sr-only">
                  Sắp xếp sản phẩm
                </label>
                <select
                  id="sort-options"
                  className="px-3 py-2 rounded-md border text-sm"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="popular">Phổ biến nhất</option>
                </select>
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </main>
  );
}
