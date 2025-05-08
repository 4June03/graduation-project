import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { CategoryList } from "@/components/client/category-list";

export function CategorySection() {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Danh mục xe máy</h2>
        <Link
          href="/categories"
          className="text-primary flex items-center hover:underline"
        >
          Xem tất cả <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      <CategoryList />
    </section>
  );
}
