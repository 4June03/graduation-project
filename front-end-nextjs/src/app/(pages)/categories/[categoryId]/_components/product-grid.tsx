import { Pagination } from "@/components/client/products/pagination";
import {
  ProductCard,
  ProductData,
} from "@/components/client/products/product-card";

interface ProductGridProps {
  products: ProductData[];
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
          <ProductCard key={product.id} product={product} />
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
