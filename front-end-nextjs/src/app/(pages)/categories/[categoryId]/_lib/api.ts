// Types cho dữ liệu API
export interface CategoryMotorbike {
  id: number
  name: string
  price: number
  oldPrice?: number
  brand: string
  image: string
  isNew?: boolean
}

export interface CategoryData {
  id: string
  name: string
  motorbikes: CategoryMotorbike[]
}

// Hàm gọi API để lấy dữ liệu xe máy theo danh mục
export async function getMotorbikesFromCategory(categoryId: string): Promise<CategoryData> {
  try {
    const response = await fetch(`http://localhost:8080/motorbikes/category/${categoryId}`, {
      cache: "no-store", // Không cache kết quả để luôn lấy dữ liệu mới nhất
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching category data:", error)

    // Trả về dữ liệu mẫu nếu API không hoạt động
    return {
      id: categoryId,
      name: getCategoryNameById(categoryId),
      motorbikes: generateMockMotorbikes(categoryId),
    }
  }
}

// Hàm lấy tên danh mục từ ID
function getCategoryNameById(categoryId: string): string {
  const categories = [
    { id: "1", name: "Xe số" },
    { id: "2", name: "Xe tay ga" },
    { id: "3", name: "Xe thể thao" },
    { id: "4", name: "Xe phân khối lớn" },
    { id: "5", name: "Xe điện" },
    { id: "6", name: "Xe địa hình" },
  ]

  return categories.find((c) => c.id === categoryId)?.name || "Danh mục không xác định"
}

// Hàm tạo dữ liệu mẫu nếu API không hoạt động
function generateMockMotorbikes(categoryId: string): CategoryMotorbike[] {
  const brands = ["Honda", "Yamaha", "Suzuki", "Piaggio", "SYM", "Kawasaki"]

  return Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Motorcycle Model ${i + 1} (Category ${categoryId})`,
    image: "/placeholder.svg?height=300&width=400",
    price: Math.floor(Math.random() * 100000000) + 10000000,
    oldPrice: Math.random() > 0.7 ? Math.floor(Math.random() * 120000000) + 20000000 : undefined,
    brand: brands[Math.floor(Math.random() * brands.length)],
    isNew: Math.random() > 0.8,
  }))
}

// Lấy danh sách tất cả các danh mục
export async function getAllCategories() {
  // Trong thực tế, bạn sẽ gọi API để lấy danh sách danh mục
  return [
    { id: "1", name: "Xe số" },
    { id: "2", name: "Xe tay ga" },
    { id: "3", name: "Xe thể thao" },
    { id: "4", name: "Xe phân khối lớn" },
    { id: "5", name: "Xe điện" },
    { id: "6", name: "Xe địa hình" },
  ]
}
