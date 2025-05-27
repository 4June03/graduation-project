import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchProductData } from "@/app/(pages)/search/type";

interface SearchResultsProps {
  results: SearchProductData[];
  query: string;
  totalResults: number;
}

export function SearchResults({
  results,
  query,
  totalResults,
}: SearchResultsProps) {
  if (!query) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Nhập từ khóa để tìm kiếm xe máy
        </h2>
        <p className="text-gray-500">Ví dụ: Honda, Yamaha, Vision, Lead...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-600 mb-2">
          Không tìm thấy kết quả nào cho "{query}"
        </h2>
        <p className="text-gray-500 mb-4">Hãy thử tìm kiếm với từ khóa khác</p>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="secondary">Honda</Badge>
          <Badge variant="secondary">Yamaha</Badge>
          <Badge variant="secondary">Vision</Badge>
          <Badge variant="secondary">Lead</Badge>
          <Badge variant="secondary">Future</Badge>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-gray-600">
          Tìm thấy <span className="font-semibold">{totalResults}</span> kết quả
          cho "{query}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="group hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-2 left-2 bg-red-500">
                      Mới
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge
                      variant="secondary"
                      className="absolute top-2 right-2"
                    >
                      Hết hàng
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{product.brand}</span>
                    <span>•</span>
                    <span>{product.category}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(product.price)}
                    </span>

                    {product.inStock ? (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-600"
                      >
                        Còn hàng
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-red-600 border-red-600"
                      >
                        Hết hàng
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
