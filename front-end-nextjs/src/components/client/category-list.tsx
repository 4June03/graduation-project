import Link from "next/link"
import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"

// Mock data for categories
const categories = [
  { id: 1, name: "Xe số", image: "/placeholder.svg?height=200&width=200", count: 24 },
  { id: 2, name: "Xe tay ga", image: "/placeholder.svg?height=200&width=200", count: 36 },
  { id: 3, name: "Xe thể thao", image: "/placeholder.svg?height=200&width=200", count: 18 },
  { id: 4, name: "Xe phân khối lớn", image: "/placeholder.svg?height=200&width=200", count: 12 },
  { id: 5, name: "Xe điện", image: "/placeholder.svg?height=200&width=200", count: 8 },
  { id: 6, name: "Xe địa hình", image: "/placeholder.svg?height=200&width=200", count: 15 },
]

export function CategoryList() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
            <CardContent className="p-0">
              <div className="relative h-40 w-full">
                <Image src={category.image || "/placeholder.svg"} alt={category.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} sản phẩm</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
