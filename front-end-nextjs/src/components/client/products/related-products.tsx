import Link from "next/link";
import Image from "next/image";
import type { RelatedProduct } from "@/types/product";
import { formatCurrency } from "@/app/admin/dashboard/_lib/stats-service";

interface RelatedProductsProps {
  products: RelatedProduct[];
  title?: string;
}

export function RelatedProducts({
  products,
  title = "You might also like",
}: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group block overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-md"
          >
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 group-hover:text-primary line-clamp-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.brand}</p>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900">
                    {formatCurrency(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      {formatCurrency(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div className="flex items-center">
                  <svg
                    className="h-4 w-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 text-sm text-gray-500">
                    {product.rating}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
