import { OrderSuccessResponse } from "@/app/(pages)/order-success/type";

export async function getOrderDetails(
  orderId: string
): Promise<OrderSuccessResponse> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/orders/${orderId}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch order details: ${response.status}`);
    }

    const result: OrderSuccessResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
}
