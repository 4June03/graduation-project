import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ChevronRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock news data
const featuredNews = {
  id: 1,
  title: "Honda ra mắt dòng xe thể thao mới với công nghệ tiên tiến",
  excerpt:
    "Honda vừa chính thức ra mắt dòng xe thể thao mới với nhiều tính năng hiện đại và thiết kế đột phá, hứa hẹn mang đến trải nghiệm lái xe hoàn toàn mới cho người dùng.",
  content:
    "Honda vừa chính thức ra mắt dòng xe thể thao mới với nhiều tính năng hiện đại và thiết kế đột phá, hứa hẹn mang đến trải nghiệm lái xe hoàn toàn mới cho người dùng.",
  image: "/placeholder.svg?height=500&width=1000",
  date: "15/03/2023",
  category: "Sản phẩm mới",
  author: "Nguyễn Văn A",
};

const news = Array.from({ length: 9 }, (_, i) => ({
  id: i + 2,
  title: [
    "Yamaha giới thiệu công nghệ động cơ hybrid cho xe máy",
    "Suzuki ra mắt dòng xe địa hình mới tại Việt Nam",
    "Piaggio mở rộng mạng lưới đại lý tại miền Trung",
    "Honda đạt doanh số kỷ lục trong quý 1/2023",
    "Yamaha tổ chức sự kiện trải nghiệm xe thể thao tại Hà Nội",
    "Các mẫu xe máy điện đáng chú ý năm 2023",
    "Xu hướng thiết kế xe máy trong tương lai",
    "Bảo dưỡng xe máy đúng cách trong mùa mưa",
    "Kinh nghiệm chọn mua xe máy phù hợp cho người mới",
  ][i],
  excerpt:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.",
  image: "/placeholder.svg?height=300&width=500",
  date: `${(i % 28) + 1}/0${(i % 3) + 1}/2023`,
  category: ["Sản phẩm mới", "Công nghệ", "Thị trường", "Kinh nghiệm"][i % 4],
  author: ["Nguyễn Văn A", "Trần Thị B", "Lê Văn C"][i % 3],
}));

export default function NewsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2">Tin tức</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span>Tin tức</span>
          </div>
        </div>
      </div>

      <div className="container py-8 w-full mx-auto">
        {/* Featured News */}
        <div className="mb-12">
          <Link href={`/news/${featuredNews.id}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative h-[300px] md:h-auto">
                    <Image
                      src={featuredNews.image || "/placeholder.svg"}
                      alt={featuredNews.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4" variant="default">
                      {featuredNews.category}
                    </Badge>
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{featuredNews.date}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredNews.author}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                      {featuredNews.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredNews.excerpt}
                    </p>
                    <div className="mt-auto">
                      <span className="text-primary flex items-center hover:underline">
                        Đọc tiếp <ChevronRight className="h-4 w-4 ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <Separator className="my-8" />

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <CardContent className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-3 left-3" variant="default">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground mb-3 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <div className="text-primary flex items-center hover:underline">
                      Đọc tiếp <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
