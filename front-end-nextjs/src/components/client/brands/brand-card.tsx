import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export interface BrandData {
  id: string
  name: string
  logo: string
  description: string
  productCount: number
}

interface BrandCardProps {
  brand: BrandData
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-center mb-4">
          <div className="relative h-20 w-20">
            <Image src={brand.logo || "/placeholder.svg"} alt={brand.name} fill className="object-contain" />
          </div>
        </div>
        <h3 className="text-xl font-bold text-center mb-2">{brand.name}</h3>
        <p className="text-muted-foreground text-sm text-center mb-2 line-clamp-2">{brand.description}</p>
        <p className="text-center text-sm">
          <span className="font-medium">{brand.productCount}</span> sản phẩm
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-center">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/brands/${brand.id}`} className="flex items-center">
            Xem sản phẩm
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
