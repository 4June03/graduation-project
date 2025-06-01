import { SearchMotorbike } from "@/app/(pages)/search/type";

export async function getTopSellingProducts(): Promise<SearchMotorbike[]> {
  try {
    const response = await fetch(
      "http://localhost:8080/api/stats/top-selling-cards?limit=8",
      {
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching top selling products: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch top selling products:", error);
    return [];
  }
}
