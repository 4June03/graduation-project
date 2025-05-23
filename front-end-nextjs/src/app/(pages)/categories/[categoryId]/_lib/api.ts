// Types cho dữ liệu API

import { ApiResponse, CategoryMotorbike } from "@/app/(pages)/categories/type";

export interface CategoryData {
  id: string;
  categoryName: string;
  motorbikes: CategoryMotorbike[];
  totalElement: number;
  totalPage: number;
}

// Hàm gọi API để lấy dữ liệu xe máy theo danh mục
export async function getMotorbikesFromCategory(
  categoryId: string
): Promise<CategoryData> {
  try {
    const response = await fetch(
      `http://localhost:8080/motorbikes/category/${categoryId}`,
      {
        cache: "no-store", // Không cache kết quả để luôn lấy dữ liệu mới nhất
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const data = await response.json();
    const motorbikes: CategoryMotorbike[] = data.data.content || [];
    const totalElement: number = data?.data.totalElements || 0;
    const totalPage: number = data?.data.totalPages || 0;
    // console.log("List by Category", motorbikes);
    console.log("total element", totalElement);
    console.log("total page", totalPage);

    return {
      motorbikes,
      totalElement,
      totalPage,
      id: categoryId,
      categoryName: data.data.name,
    };
  } catch (error) {
    console.error("Error fetching category data:", error);

    // Trả về dữ liệu mẫu nếu API không hoạt động
    return {
      id: categoryId,
      categoryName: getCategoryNameById(categoryId),
      motorbikes: generateMockMotorbikes(categoryId),
      totalElement: 0,
      totalPage: 0,
    };
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
  ];

  return (
    categories.find((c) => c.id === categoryId)?.name ||
    "Danh mục không xác định"
  );
}

// Hàm tạo dữ liệu mẫu nếu API không hoạt động
function generateMockMotorbikes(categoryId: string): CategoryMotorbike[] {
  const brands = ["Honda", "Yamaha", "Suzuki", "Piaggio", "SYM", "Kawasaki"];

  return Array.from({ length: 24 }, (_, i) => ({
    bikeId: 0,
    bikeName: `Motorcycle Model ${i + 1} (Category ${categoryId})`,
    imageUrls: ["/placeholder.svg?height=300&width=400"],
    price: Math.floor(Math.random() * 100000000) + 10000000,
    oldPrice:
      Math.random() > 0.7
        ? Math.floor(Math.random() * 120000000) + 20000000
        : undefined,
    brandName: brands[Math.floor(Math.random() * brands.length)],
    isNew: Math.random() > 0.8,
  }));
}

// Lấy danh sách tất cả các danh mục
export async function getAllCategories() {
  // Trong thực tế, bạn sẽ gọi API để lấy danh sách danh mục
  const url = "http://localhost:8080/categories";

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }

    const json: ApiResponse = await response.json();

    if (!json.success) {
      throw new Error(`API error: ${json.message}`);
    }

    return json.data;
  } catch (error) {
    // You can customize error handling here
    console.error("Failed to fetch categories:", error);
    throw error;
  }
}
