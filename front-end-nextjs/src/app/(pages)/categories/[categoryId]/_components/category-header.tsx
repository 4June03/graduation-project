import Link from "next/link"

interface CategoryHeaderProps {
  categoryName: string
}

export function CategoryHeader({ categoryName }: CategoryHeaderProps) {
  return (
    <div className="bg-muted/30 py-6">
      <div className="container">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <Link href="/categories" className="hover:text-foreground">
            Danh mục
          </Link>
          <span className="mx-2">/</span>
          <span>{categoryName}</span>
        </div>
      </div>
    </div>
  )
}
