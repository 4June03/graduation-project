import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { CategoryMotorbike } from "@/app/(pages)/categories/type";

interface ProductCardProps {
  motorbike: CategoryMotorbike;
}

export function ProductCard({ motorbike }: ProductCardProps) {
  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <Link href={`/products/${motorbike?.bikeId}`}>
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={motorbike.imageUrls[0] || "/placeholder.svg"}
              alt={motorbike.bikeName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {motorbike.isNew && (
              <Badge className="absolute top-2 left-2 bg-red-500">Mới</Badge>
            )}
            {!motorbike.totalStock && (
              <Badge variant="secondary" className="absolute top-2 right-2">
                Hết hàng
              </Badge>
            )}
          </div>
        </Link>
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {motorbike.bikeName}
          </h3>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{motorbike.brandName}</span>
            <span>•</span>
            {/* <span>{motorbike.}</span> */}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(motorbike.price)}
            </span>

            {motorbike?.totalStock != undefined && motorbike.totalStock > 0 ? (
              <Badge
                variant="outline"
                className="text-green-600 border-green-600"
              >
                Còn hàng
              </Badge>
            ) : (
              <Badge variant="outline" className="text-red-600 border-red-600">
                Hết hàng
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
