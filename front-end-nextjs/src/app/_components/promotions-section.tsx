import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function PromotionsSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Khuyến mãi hot</h2>
        <Link href="/promotions" className="text-primary flex items-center hover:underline">
          Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <Link key={item} href={`/promotions/${item}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
                    <Image
                      src={`/placeholder.svg?height=200&width=300`}
                      alt={`Promotion ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 sm:w-2/3">
                    <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded w-fit mb-2">
                      Giảm 15%
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Ưu đãi đặc biệt cho dòng xe Yamaha</h3>
                    <p className="text-muted-foreground line-clamp-2">
                      Giảm ngay 15% khi mua xe Yamaha và nhận thêm nhiều quà tặng hấp dẫn từ đại lý...
                    </p>
                    <p className="text-sm font-medium mt-2">Còn 5 ngày</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
