import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getTopSellingProducts } from "../_lib/service";
import { FeaturedProductCard } from "./featured-product-card";

export async function FeaturedProductsSection() {
  const products = await getTopSellingProducts();

  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full bg-muted/30">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Xe bán chạy</h2>
        <Link
          href="/products"
          className="text-primary flex items-center hover:underline"
        >
          Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Không có sản phẩm nổi bật</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <FeaturedProductCard
              key={product.bikeId}
              id={product.bikeId}
              name={product.bikeName}
              price={product.price}
              imageUrl={product.imageUrls[0] || ""}
              categoryName={product.categoryName}
              brandName={product.brandName}
              isNew={product.new}
              inStock={product.totalStock > 0}
            />
          ))}
        </div>
      )}
    </section>
  );
}
