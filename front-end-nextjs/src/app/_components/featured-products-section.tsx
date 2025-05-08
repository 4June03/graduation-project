import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { FeaturedProducts } from "@/components/client/featured-products";

export function FeaturedProductsSection() {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full bg-muted/30">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Sản phẩm nổi bật</h2>
        <Link
          href="/products"
          className="text-primary flex items-center hover:underline"
        >
          Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <FeaturedProducts />
    </section>
  );
}
