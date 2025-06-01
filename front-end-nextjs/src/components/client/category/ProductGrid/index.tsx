import { CategoryMotorbike } from "@/app/(pages)/categories/type";
import { Pagination } from "@/components/client/products/pagination";
import { ProductCard } from "@/components/client/products/product-card";

interface ProductGridProps {
  products: CategoryMotorbike[];
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export function ProductGrid({
  products,
  currentPage,
  totalPages,
  onPageChange,
}: ProductGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.bikeId} motorbike={product} />
        ))}
      </div>

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
