import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock promotions data
const promotions = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `Ưu đãi đặc biệt tháng ${(i % 3) + 1}/2023`,
  description:
    "Giảm giá lên đến 20% cho các dòng xe phổ thông và nhiều quà tặng hấp dẫn khi mua xe tại đại lý chính hãng.",
  image: "/placeholder.svg?height=300&width=600",
  discount: `${((i % 3) + 1) * 5}%`,
  startDate: "01/03/2023",
  endDate: "31/03/2023",
  daysLeft: i % 10,
  brands: ["Honda", "Yamaha", "Suzuki"].slice(0, (i % 3) + 1),
}))

export default function PromotionsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2">Khuyến mãi</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span>Khuyến mãi</span>
          </div>
        </div>
      </div>

      <div className="container py-8 w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo) => (
            <Link key={promo.id} href={`/promotions/${promo.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <CardContent className="p-0">
                  <div className="relative h-48 w-full">
                    <Image src={promo.image || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
                    <Badge className="absolute top-3 left-3" variant="destructive">
                      Giảm {promo.discount}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-1" />
                        <span>
                          {promo.startDate} - {promo.endDate}
                        </span>
                      </div>
                      {promo.daysLeft > 0 ? (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Còn {promo.daysLeft} ngày</span>
                        </div>
                      ) : (
                        <Badge variant="outline">Đã kết thúc</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{promo.title}</h3>
                    <p className="text-muted-foreground mb-3 line-clamp-2">{promo.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {promo.brands.map((brand) => (
                        <Badge key={brand} variant="outline">
                          {brand}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
