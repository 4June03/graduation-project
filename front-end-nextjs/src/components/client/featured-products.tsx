import { CategoryMotorbike } from "@/app/(pages)/categories/type";
import { ProductCard } from "@/components/client/products/product-card";

// Mock data for featured products
const featuredProducts: CategoryMotorbike[] = [];

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {/* {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} */}
    </div>
  );
}
