import {
  SearchMotorbike,
  SearchProductData,
  SearchResponse,
} from "@/app/(pages)/search/type";

const API_BASE_URL = "http://localhost:8080";

export async function searchMotorbikes(
  query: string
): Promise<SearchProductData[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/motorbikes/search?name=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Failed to search motorbikes");
    }

    const data: SearchResponse = await response.json();

    if (!data.success) {
      throw new Error(data.message || "Search failed");
    }

    // Transform API response to match ProductCard interface
    return data.data.content.map(
      (motorbike: SearchMotorbike): SearchProductData => ({
        id: motorbike.bikeId,
        name: motorbike.bikeName,
        price: motorbike.price,
        image:
          motorbike.imageUrls[0] || "/placeholder.svg?height=300&width=300",
        category: motorbike.categoryName,
        brand: motorbike.brandName,
        inStock: motorbike.totalStock > 0,
        isNew: motorbike.new,
      })
    );
  } catch (error) {
    console.error("Error searching motorbikes:", error);
    // Return empty array on error
    return [];
  }
}
