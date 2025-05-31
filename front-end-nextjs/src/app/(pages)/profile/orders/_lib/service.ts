export interface ApiOrder {
  orderId: number;
  userId: number | null;
  orderDate: string;
  updatedAt: string | null;
  shippingFee: number | null;
  subtotal: number | null;
  deliveryMethod: "HOME_DELIVERY" | "STORE_PICKUP";
  paymentMethod: string | null;
  orderStatus: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
}

export interface Address {
  addressId: number;
  addressDetail: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  dob: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  addresses: Address[];
}

export interface OrderItem {
  orderItemId: number;
  motorbikeId: number;
  motorbikeName: string;
  variantId: number;
  variantName: string;
  variantColorId: number;
  colorName: string;
  quantity: number | null;
  price: number;
}

export interface OrderDetail {
  orderId: number;
  userId: number | null;
  user: User;
  orderDate: string;
  updatedAt: string | null;
  orderItems: OrderItem[];
  shippingFee: number | null;
  subtotal: number | null;
  totalAmount: number | null;
  deliveryMethod: "HOME_DELIVERY" | "STORE_PICKUP";
  paymentMethod: string | null;
  orderStatus: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  paymentStatus: "PENDING" | "PAID" | "FAILED";
  branchId: number | null;
  branchName: string | null;
  shippingAddress: Address | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Order status options
export const ORDER_STATUS_OPTIONS = [
  { value: "PENDING", label: "Chờ xử lý" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "SHIPPED", label: "Đang giao hàng" },
  { value: "DELIVERED", label: "Đã giao hàng" },
  { value: "CANCELLED", label: "Đã hủy" },
] as const;

// Payment status options
export const PAYMENT_STATUS_OPTIONS = [
  { value: "PENDING", label: "Chờ thanh toán" },
  { value: "PAID", label: "Đã thanh toán" },
  { value: "FAILED", label: "Thanh toán thất bại" },
] as const;

// Delivery method options
export const DELIVERY_METHOD_OPTIONS = [
  { value: "HOME_DELIVERY", label: "Giao hàng tận nơi" },
  { value: "STORE_PICKUP", label: "Nhận tại cửa hàng" },
] as const;

// Get auth token from cookies

// Get list of orders for current user
export async function getOrders(
  token: string | undefined
): Promise<ApiOrder[]> {
  try {
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch("http://localhost:8080/api/orders", {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch orders: ${response.status}`);
    }

    const result: ApiResponse<ApiOrder[]> = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

// Get order detail by orderId
export async function getOrderDetail(
  orderId: number,
  token: string | undefined
): Promise<OrderDetail> {
  try {
    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(
      `http://localhost:8080/api/orders/${orderId}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch order detail: ${response.status}`);
    }

    const result: ApiResponse<OrderDetail> = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching order detail:", error);
    throw error;
  }
}

// Helper function to get status label
export function getStatusLabel(
  status: string,
  type: "order" | "payment"
): string {
  if (type === "order") {
    const option = ORDER_STATUS_OPTIONS.find((opt) => opt.value === status);
    return option?.label || status;
  } else {
    const option = PAYMENT_STATUS_OPTIONS.find((opt) => opt.value === status);
    return option?.label || status;
  }
}

// Helper function to get delivery method label
export function getDeliveryMethodLabel(method: string): string {
  const option = DELIVERY_METHOD_OPTIONS.find((opt) => opt.value === method);
  return option?.label || method;
}

// Helper function to calculate total amount
export function calculateTotal(
  subtotal: number | null,
  shippingFee: number | null
): number {
  const sub = subtotal || 0;
  const shipping = shippingFee || 0;
  return sub + shipping;
}

// Helper function to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

// Helper function to format datetime
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
