import Link from "next/link";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category } from "@/app/(pages)/categories/type";

interface CategoryTabsProps {
  categories: Category[];
  currentCategoryId: string;
}

export function CategoryTabs({
  categories,
  currentCategoryId,
}: CategoryTabsProps) {
  return (
    <TabsList className="overflow-x-auto">
      {/* <TabsTrigger value="all" asChild>
        <Link href="/categories/all">Tất cả</Link>
      </TabsTrigger> */}
      {categories.map((category) => (
        <TabsTrigger
          className="px-10"
          key={category.categoryId}
          value={category.categoryId.toString()}
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
