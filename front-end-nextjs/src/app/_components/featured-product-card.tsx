import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/app/(pages)/profile/orders/_lib/util";

interface FeaturedProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  categoryName: string;
  brandName: string;
  isNew?: boolean;
  inStock: boolean;
}

export function FeaturedProductCard({
  id,
  name,
  price,
  imageUrl,
  categoryName,
  brandName,
  isNew = false,
  inStock = true,
}: FeaturedProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="group">
      <div className="overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg?height=300&width=300"}
            alt={name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isNew && (
            <Badge className="absolute right-2 top-2 bg-primary text-white">
              Mới
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="mb-1 text-sm text-muted-foreground">
            {brandName} • {categoryName}
          </div>
          <h3 className="mb-2 line-clamp-2 font-medium">{name}</h3>
          <div className="flex items-center justify-between">
            <div className="font-semibold text-primary">
              {formatPrice(price)}
            </div>
            <div className="text-sm text-muted-foreground">
              {inStock ? "Còn hàng" : "Hết hàng"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
