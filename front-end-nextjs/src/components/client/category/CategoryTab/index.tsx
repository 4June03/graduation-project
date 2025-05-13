import Link from "next/link";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/components/client/category/type";

interface CategoryTabsProps {
  categories: Category[];
  currentCategoryId: number;
}

export function CategoryTabs({
  categories,
  currentCategoryId,
}: CategoryTabsProps) {
  return (
    <TabsList className="overflow-x-auto">
      <TabsTrigger value="all" asChild>
        <Link href="/categories/all">Tất cả</Link>
      </TabsTrigger>
      {categories.map((category) => (
        <TabsTrigger
          key={category.categoryId}
          value={category.categoryName}
          asChild
        >
          <Link href={`/categories/${category.categoryId}`}>
            {category.categoryName}
          </Link>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
