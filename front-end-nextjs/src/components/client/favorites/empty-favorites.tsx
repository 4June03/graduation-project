import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export function EmptyFavorites() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
        <Heart className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Danh sách yêu thích trống</h2>
      <p className="text-muted-foreground mb-6">Bạn chưa thêm sản phẩm nào vào danh sách yêu thích</p>
      <Button asChild>
        <Link href="/categories">Khám phá sản phẩm</Link>
      </Button>
    </div>
  )
}
