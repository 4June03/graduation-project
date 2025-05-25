import { getCartByUserId } from "@/app/(pages)/cart/_lib/service";
import {
  Branch,
  CheckoutData,
  CreateOrderRequest,
  CreateOrderResponse,
} from "@/app/(pages)/checkout/type";
import { getUserById } from "@/app/(pages)/profile/_lib/service";
import { useAuth } from "@/components/provider/AuthProvider";

// Mock user ID - replace with actual token parsing
// Get branches for store pickup
export async function getBranches(): Promise<Branch[]> {
  try {
    const response = await fetch("http://localhost:8080/api/branches", {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch branches: ${response.status}`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching branches:", error);
    // Return mock data as fallback
    return [
      {
        branchId: 1,
        branchName: "Chi nhánh Quận 1",
        address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
      },
      {
        branchId: 2,
        branchName: "Chi nhánh Quận 7",
        address:
          "456 Đường Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP. Hồ Chí Minh",
      },
      {
        branchId: 3,
        branchName: "Chi nhánh Quận 9",
        address:
          "789 Đường Lê Văn Việt, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh",
      },
    ];
  }
}

// Get checkout data (cart + user + branches)
export async function getCheckoutData(
  userId: number | null
): Promise<CheckoutData> {
  try {
    const [cartData, userData, branches] = await Promise.all([
      getCartByUserId(userId),
      getUserById(userId),
      getBranches(),
    ]);

    return {
      cartData,
      userData,
      branches,
    };
  } catch (error) {
    console.error("Error fetching checkout data:", error);
    throw error;
  }
}

// Create order
export async function createOrder(
  orderData: CreateOrderRequest,
  token: string | null
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
