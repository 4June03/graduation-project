import Link from "next/link"
import Image from "next/image"
import { Heart, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export interface ProductData {
  id: number
  name: string
  image: string
  price: number
  oldPrice?: number | null
  brand: string
  isNew?: boolean
  inStock?: boolean
}

interface ProductCardProps {
  product: ProductData
}

export function ProductCard({ product }: ProductCardProps) {
  // Format price to VND
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="relative">
          <Link href={`/products/${product.id}`}>
            <div className="relative h-48 w-full">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full"
            aria-label="Add to favorites"
          >
            <Heart className="h-5 w-5" />
          </Button>
          {product.isNew && (
            <Badge className="absolute top-2 left-2" variant="default">
              Mới
            </Badge>
          )}
          {product.oldPrice && (
            <Badge className="absolute top-2 left-2" variant="destructive">
              Giảm giá
            </Badge>
          )}
          {product.inStock === false && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="outline" className="bg-white text-foreground">
                Hết hàng
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
          <Link href={`/products/${product.id}`}>
            <h3 className="font-medium text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-muted-foreground line-through text-sm">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="w-full" size="sm" disabled={product.inStock === false}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Thêm vào giỏ
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/products/${product.id}`}>Chi tiết</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
