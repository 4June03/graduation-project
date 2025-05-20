import { getMotorbikesFromCategory, getAllCategories } from "./_lib/api"
import { CategoryClient } from "./_components/category-client"

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  // Fetch dữ liệu từ API
  const categoryData = await getMotorbikesFromCategory(params.categoryId)
  const categories = await getAllCategories()

  return (
    <CategoryClient
      categoryId={params.categoryId}
      categoryName={categoryData.name}
      motorbikes={categoryData.motorbikes}
      categories={categories}
    />
  )
}
