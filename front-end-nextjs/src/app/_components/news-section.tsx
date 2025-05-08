import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function NewsSection() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tin tức mới nhất</h2>
        <Link href="/news" className="text-primary flex items-center hover:underline">
          Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <Link key={item} href={`/news/${item}`}>
            <Card className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-1/3 h-48 sm:h-auto">
                    <Image
                      src={`/placeholder.svg?height=200&width=300`}
                      alt={`News ${item}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 sm:w-2/3">
                    <p className="text-sm text-muted-foreground mb-2">12/03/2023</p>
                    <h3 className="font-semibold text-lg mb-2">Ra mắt dòng xe thể thao mới nhất từ Honda</h3>
                    <p className="text-muted-foreground line-clamp-2">
                      Honda vừa chính thức ra mắt dòng xe thể thao mới với nhiều tính năng hiện đại và thiết kế đột
                      phá...
                    </p>
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
