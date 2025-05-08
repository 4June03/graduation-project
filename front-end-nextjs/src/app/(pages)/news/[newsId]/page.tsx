import Link from "next/link"
import Image from "next/image"
import { CalendarDays, ChevronRight, Share2, MessageSquare, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"

// Mock news data
const news = {
  id: 1,
  title: "Honda ra mắt dòng xe thể thao mới với công nghệ tiên tiến",
  content: `
    <p>Honda vừa chính thức ra mắt dòng xe thể thao mới với nhiều tính năng hiện đại và thiết kế đột phá, hứa hẹn mang đến trải nghiệm lái xe hoàn toàn mới cho người dùng.</p>
    
    <p>Mẫu xe mới được trang bị động cơ 150cc, phun xăng điện tử, hệ thống phanh ABS và nhiều công nghệ tiên tiến khác. Thiết kế của xe lấy cảm hứng từ các mẫu xe đua chuyên nghiệp, với những đường nét sắc sảo và khí động học.</p>
    
    <h3>Công nghệ tiên tiến</h3>
    
    <p>Một trong những điểm nổi bật của mẫu xe mới là hệ thống điều khiển thông minh, cho phép người lái tùy chỉnh các chế độ lái khác nhau tùy theo điều kiện đường và phong cách lái. Xe cũng được trang bị màn hình LCD hiển thị đầy đủ thông tin và kết nối với điện thoại thông minh.</p>
    
    <p>Hệ thống phanh ABS hai kênh giúp tăng cường an toàn khi phanh gấp, đặc biệt là trên đường trơn trượt. Ngoài ra, xe còn có hệ thống kiểm soát lực kéo, giúp bánh xe không bị trượt khi tăng tốc.</p>
    
    <h3>Thiết kế đột phá</h3>
    
    <p>Về thiết kế, mẫu xe mới có vẻ ngoài thể thao và hiện đại. Phần đầu xe được thiết kế lại hoàn toàn với cụm đèn LED sắc sảo. Thân xe có những đường nét góc cạnh, tạo cảm giác mạnh mẽ và năng động.</p>
    
    <p>Yên xe được thiết kế lại để tăng cường sự thoải mái cho người lái và hành khách. Bảng điều khiển được bố trí hợp lý, dễ dàng thao tác khi đang di chuyển.</p>
    
    <h3>Giá bán và thời gian ra mắt</h3>
    
    <p>Mẫu xe mới dự kiến sẽ được bán ra thị trường vào tháng 4/2023 với giá bán từ 50 triệu đồng. Khách hàng có thể đặt trước tại các đại lý Honda trên toàn quốc từ ngày 1/4/2023.</p>
    
    <p>Với những tính năng và thiết kế đột phá, mẫu xe mới của Honda hứa hẹn sẽ tạo nên một làn sóng mới trên thị trường xe máy Việt Nam.</p>
  `,
  image: "/placeholder.svg?height=500&width=1000",
  date: "15/03/2023",
  category: "Sản phẩm mới",
  author: "Nguyễn Văn A",
  tags: ["Honda", "Xe thể thao", "Công nghệ mới", "ABS"],
  relatedNews: [
    {
      id: 2,
      title: "Yamaha giới thiệu công nghệ động cơ hybrid cho xe máy",
      image: "/placeholder.svg?height=200&width=300",
      date: "10/03/2023",
    },
    {
      id: 3,
      title: "Suzuki ra mắt dòng xe địa hình mới tại Việt Nam",
      image: "/placeholder.svg?height=200&width=300",
      date: "05/03/2023",
    },
    {
      id: 4,
      title: "Các mẫu xe máy điện đáng chú ý năm 2023",
      image: "/placeholder.svg?height=200&width=300",
      date: "01/03/2023",
    },
  ],
}

export default function NewsDetailPage({ params }: { params: { newsId: string } }) {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/news" className="hover:text-foreground">
              Tin tức
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>{news.category}</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <Badge variant="outline" className="mb-4">
                  {news.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{news.date}</span>
                    </div>
                    <span>•</span>
                    <span>{news.author}</span>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="relative h-[300px] md:h-[400px] w-full">
                <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
              </div>

              <div className="p-6">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: news.content }}></div>

                <div className="flex flex-wrap gap-2 mt-8">
                  {news.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Separator className="my-8" />

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Thích
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Bình luận
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4">Tin tức liên quan</h2>
              <div className="space-y-4">
                {news.relatedNews.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <Card className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="relative w-1/3 h-24">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-3 w-2/3">
                            <div className="text-xs text-muted-foreground mb-1">{item.date}</div>
                            <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              <div className="mt-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/news">Xem tất cả tin tức</Link>
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Danh mục</h2>
              <div className="space-y-2">
                {["Sản phẩm mới", "Công nghệ", "Thị trường", "Kinh nghiệm", "Sự kiện"].map((category) => (
                  <Link
                    key={category}
                    href={`/news/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="flex items-center justify-between py-2 border-b hover:text-primary"
                  >
                    <span>{category}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
