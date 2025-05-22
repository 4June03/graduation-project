import { getMotorbikesFromCategory, getAllCategories } from "./_lib/api";
import { CategoryClient } from "./_components/category-client";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  // Fetch dữ liệu từ API

  const { categoryId } = await params;
  const { motorbikes, totalElement, totalPage, categoryName } =
    await getMotorbikesFromCategory(categoryId);
  const categories = await getAllCategories();

  return (
    <CategoryClient
      categoryId={categoryId}
      categoryName={categoryName}
      motorbikes={motorbikes}
      categories={categories}
      totalElement={totalElement}
      totalPage={totalPage}
    />
  );
}
