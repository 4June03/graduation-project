"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price)
}

interface FavoriteProduct {
  id: number
  name: string
  brand: string
  price: number
  oldPrice?: number | null
  image: string
}

interface FavoritesListProps {
  products: FavoriteProduct[]
}

export function FavoritesList({ products }: FavoritesListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sản phẩm yêu thích</CardTitle>
        <CardDescription>Danh sách sản phẩm bạn đã yêu thích</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.slice(0, 4).map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="relative w-1/3 h-32">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="p-4 w-2/3 flex flex-col">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
                      <h3 className="font-medium line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold">{formatPrice(product.price)}</span>
                        {product.oldPrice && (
                          <span className="text-muted-foreground line-through text-sm">
                            {formatPrice(product.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-auto pt-2 flex justify-between items-center">
                      <Button variant="link" size="sm" className="h-auto p-0">
                        Xem chi tiết
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" asChild>
            <Link href="/favorites">Xem tất cả</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
