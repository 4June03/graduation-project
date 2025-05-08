import Link from "next/link"
import Image from "next/image"
import { CalendarDays, Clock, Share2, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

// Mock promotion data
const promotion = {
  id: 1,
  title: "Ưu đãi đặc biệt tháng 3/2023",
  description:
    "Giảm giá lên đến 20% cho các dòng xe phổ thông và nhiều quà tặng hấp dẫn khi mua xe tại đại lý chính hãng.",
  content: `
    <p>Chào mừng tháng 3 với chương trình khuyến mãi đặc biệt dành cho khách hàng mua xe máy tại hệ thống đại lý chính hãng trên toàn quốc.</p>
    
    <h3>Chi tiết chương trình:</h3>
    <ul>
      <li>Giảm ngay 20% cho dòng xe Honda Wave Alpha</li>
      <li>Giảm 15% cho dòng xe Yamaha Exciter 155</li>
      <li>Giảm 10% cho dòng xe Honda Vision</li>
      <li>Tặng mũ bảo hiểm chính hãng</li>
      <li>Tặng 1 năm bảo hiểm xe máy</li>
      <li>Tặng phiếu bảo dưỡng miễn phí 3 lần</li>
    </ul>
    
    <h3>Điều kiện áp dụng:</h3>
    <ul>
      <li>Áp dụng cho khách hàng mua xe trực tiếp tại đại lý</li>
      <li>Không áp dụng đồng thời với các chương trình khuyến mãi khác</li>
      <li>Số lượng xe khuyến mãi có hạn</li>
    </ul>
    
    <p>Đừng bỏ lỡ cơ hội sở hữu xe máy chính hãng với giá ưu đãi cùng nhiều quà tặng hấp dẫn!</p>
  `,
  image: "/placeholder.svg?height=500&width=1000",
  discount: "20%",
  startDate: "01/03/2023",
  endDate: "31/03/2023",
  daysLeft: 5,
  brands: ["Honda", "Yamaha", "Suzuki"],
  relatedProducts: [
    {
      id: 1,
      name: "Honda Wave Alpha",
      price: 17800000,
      oldPrice: 18500000,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      name: "Yamaha Exciter 155",
      price: 50900000,
      oldPrice: null,
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      name: "Honda Vision",
      price: 30800000,
      oldPrice: 32000000,
      image: "/placeholder.svg?height=300&width=400",
    },
  ],
}

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price)
}

export default function PromotionDetailPage({ params }: { params: { promotionId: string } }) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/promotions" className="hover:text-foreground">
              Khuyến mãi
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>{promotion.title}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-[300px] md:h-[400px] w-full">
                <Image
                  src={promotion.image || "/placeholder.svg"}
                  alt={promotion.title}
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-4 left-4" variant="destructive">
                  Giảm {promotion.discount}
                </Badge>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>
                        {promotion.startDate} - {promotion.endDate}
                      </span>
                    </div>
                    {promotion.daysLeft > 0 ? (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Còn {promotion.daysLeft} ngày</span>
                      </div>
                    ) : (
                      <Badge variant="outline">Đã kết thúc</Badge>
                    )}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>

                <h1 className="text-3xl font-bold mb-4">{promotion.title}</h1>
                <p className="text-muted-foreground mb-6">{promotion.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {promotion.brands.map((brand) => (
                    <Badge key={brand} variant="outline">
                      {brand}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: promotion.content }}></div>

                <div className="mt-8 flex justify-center">
                  <Button size="lg">Mua ngay</Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Sản phẩm áp dụng</h2>
              <div className="space-y-4">
                {promotion.relatedProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="relative w-1/3 h-24">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3 w-2/3">
                            <h3 className="font-medium text-sm mb-1 line-clamp-2">{product.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                              {product.oldPrice && (
                                <span className="text-muted-foreground line-through text-xs">
                                  {formatPrice(product.oldPrice)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  Xem tất cả
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Thông tin liên hệ</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>Để biết thêm chi tiết về chương trình khuyến mãi, vui lòng liên hệ:</p>
                <p>Hotline: 1900 1234</p>
                <p>Email: info@motorcycle.com</p>
                <p>Hoặc ghé thăm đại lý gần nhất để được tư vấn trực tiếp.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
