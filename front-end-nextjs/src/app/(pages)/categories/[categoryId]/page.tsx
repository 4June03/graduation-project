import {
  getMotorbikesFromCategory,
  getAllCategories,
  getBrands,
} from "./_lib/api";
import { CategoryClient } from "./_components/category-client";

export default async function CategoryPage({
  params,
}: {
  params: { categoryId: string };
}) {
  // Fetch dữ liệu từ API

  const { categoryId } = params;
  const { motorbikes, totalElement, totalPage, categoryName } =
    await getMotorbikesFromCategory(categoryId);
  // const categories = await getAllCategories();

  // Fetch dữ liệu song song
  const [categoryData, brands] = await Promise.all([
    getAllCategories(),
    getBrands(),
  ]);

  return (
    <CategoryClient
      brands={brands}
      categoryId={categoryId}
      categoryName={categoryName}
      motorbikes={motorbikes}
      categories={categoryData}
      totalElement={totalElement}
      totalPage={totalPage}
    />
  );
}
