import {
  AddToCartRequest,
  APIResponse,
  CartData,
  RemoveFromCartRequest,
} from "@/app/(pages)/cart/type";
import { toast } from "sonner";

// Mock data for fallback
const mockCartData: CartData = {
  cartItemList: [
    {
      cartItemId: 1,
      bikeId: 1,
      motorbikeName: "Honda SH 150i",
      variantName: "Standard",
      colorName: "Đỏ",
      variantPrice: 102900000,
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
    {
      cartItemId: 2,
      bikeId: 2,
      motorbikeName: "Mũ bảo hiểm Honda chính hãng",
      variantName: "Standard",
      colorName: "Đen",
      variantPrice: 850000,
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  ],
  total: 103750000,
  shippingFee: 500000,
  grandTotal: 104250000,
};

// Function to get user ID from token
export function getUserIdFromToken(): number {
  // Nếu đang chạy trong môi trường server của Next.js App Router
  return 1; // Giả sử user ID là 1, bạn có thể thay đổi logic này để lấy từ token
}

// Get cart by user ID
export async function getCartByUserId(
  userId: number | null
): Promise<CartData> {
  try {
    const response = await fetch(`http://localhost:8080/cart/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch cart: ${response.status}`);
    }

    const result: APIResponse = await response.json();

    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.message);
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    // Return mock data as fallback
    return mockCartData;
  }
}

// Add item to cart
export async function addToCart(request: AddToCartRequest): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Lỗi thêm vào giỏ hàng: ${response.status}`);
    }

    const result = await response.json();
    toast.success("Thêm vào giỏ hàng thành công");
    return result.success || true;
  } catch (error) {
    toast.error("Thêm vào giỏ hàng thất bại");
    console.error("Error adding to cart:", error);
    throw error;
  }
}

// Remove item from cart
export async function removeFromCart(
  request: RemoveFromCartRequest
): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:8080/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to remove from cart: ${response.status}`);
    }

    const result = await response.json();
    return result.success || true;
  } catch (error) {
    console.error("Error removing from cart:", error);
    throw error;
  }
}

export function cleanImageUrl(url: string | null | undefined) {
  if (!url) return null;

  const optionalMatch = url.match(/^Optional\[(.*)\]$/);
  return optionalMatch ? optionalMatch[1] : url;
}
