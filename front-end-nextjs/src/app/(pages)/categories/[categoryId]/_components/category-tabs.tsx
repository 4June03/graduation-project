import Link from "next/link"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Category {
  id: string
  name: string
}

interface CategoryTabsProps {
  categories: Category[]
  currentCategoryId: string
}

export function CategoryTabs({ categories, currentCategoryId }: CategoryTabsProps) {
  return (
    <TabsList className="overflow-x-auto">
      <TabsTrigger value="all" asChild>
        <Link href="/categories/all">Tất cả</Link>
      </TabsTrigger>
      {categories.map((category) => (
        <TabsTrigger key={category.id} value={category.id} asChild>
          <Link href={`/categories/${category.id}`}>{category.name}</Link>
        </TabsTrigger>
      ))}
    </TabsList>
  )
}
