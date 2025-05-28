import { getCartByUserId } from "@/app/(pages)/cart/_lib/service";
import {
  CheckoutData,
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/app/(pages)/checkout/type";

import { getUserById } from "@/app/(pages)/profile/_lib/service";

// Mock user ID - replace with actual token parsing
function getUserIdFromToken(): number {
  // TODO: Implement actual token parsing logic
  return 1; // Mock user ID
}

// Get checkout data (cart + user only)
export async function getCheckoutData(
  userId: number | null
): Promise<CheckoutData> {
  try {
    const [cartData, userData] = await Promise.all([
      getCartByUserId(userId),
      getUserById(userId),
    ]);

    return {
      cartData,
      userData,
    };
  } catch (error) {
    console.error("Error fetching checkout data:", error);
    throw error;
  }
}

// Create order
export async function createOrder(
  orderData: CreateOrderRequest,
  token: string | null | undefined
): Promise<CreateOrderResponse> {
  try {
    const response = await fetch("http://localhost:8080/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.status}`);
    }

    const result: CreateOrderResponse = await response.json();
    return result;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Calculate shipping fee based on delivery method
export function calculateShippingFee(
  deliveryMethod: "HOME_DELIVERY" | "STORE_PICKUP"
): number {
  return deliveryMethod === "HOME_DELIVERY" ? 500000 : 0;
}
