import { CategoryMotorbike } from "@/app/(pages)/categories/type";
import { EmptyState } from "@/components/client/category/EmptyState";
import { Pagination } from "@/components/client/products/pagination";
import { ProductCard } from "@/components/client/products/product-card";

interface ProductGridProps {
  motorbikes: CategoryMotorbike[];
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

export function ProductGrid({
  motorbikes,
  currentPage,
  totalPages,
  onPageChange,
}: ProductGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {motorbikes.length > 0 &&
          (motorbikes || []).map((motorbike) => (
            <ProductCard key={motorbike.bikeId} motorbike={motorbike} />
          ))}
      </div>

      {motorbikes.length == 0 && <EmptyState />}

      {/* Pagination component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}
