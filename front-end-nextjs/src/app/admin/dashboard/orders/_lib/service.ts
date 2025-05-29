import {
  ApiOrder,
  ApiResponse,
  DELIVERY_METHOD_OPTIONS,
  ORDER_STATUS_OPTIONS,
  OrderDetail,
  PAYMENT_STATUS_OPTIONS,
  User,
} from "@/app/admin/dashboard/orders/type";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Types based on API response

// Get all orders
export async function getAllOrders(): Promise<ApiOrder[]> {
  try {
    const response = await axios.get<ApiResponse<ApiOrder[]>>(
      `${API_BASE_URL}/orders/all`
    );
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(
      response.data.message || "Không thể lấy danh sách đơn hàng"
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Không thể lấy danh sách đơn hàng");
  }
}

// Get order detail
export async function getOrderDetail(orderId: number): Promise<OrderDetail> {
  try {
    const response = await axios.get<ApiResponse<OrderDetail>>(
      `${API_BASE_URL}/orders/${orderId}`
    );
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || "Không thể lấy chi tiết đơn hàng");
  } catch (error) {
    console.error(`Error fetching order detail for ID ${orderId}:`, error);
    throw new Error("Không thể lấy chi tiết đơn hàng");
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: number,
  status: ApiOrder["orderStatus"]
): Promise<void> {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/orders/${orderId}/status?status=${status}`
    );
    if (!response.data?.success && response.status !== 200) {
      throw new Error("Không thể cập nhật trạng thái đơn hàng");
    }
  } catch (error) {
    console.error("Error updating order status:", error);
    throw new Error("Không thể cập nhật trạng thái đơn hàng");
  }
}

// Update payment status
export async function updatePaymentStatus(
  orderId: number,
  status: ApiOrder["paymentStatus"]
): Promise<void> {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/orders/${orderId}/payment-status?status=${status}`
    );
    if (!response.data?.success && response.status !== 200) {
      throw new Error("Không thể cập nhật trạng thái thanh toán");
    }
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw new Error("Không thể cập nhật trạng thái thanh toán");
  }
}

// Helper functions
export function formatCurrency(amount: number | null): string {
  if (amount === null || amount === undefined) return "N/A";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

export function getOrderStatusColor(status: ApiOrder["orderStatus"]): string {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "CONFIRMED":
      return "bg-blue-100 text-blue-800";
    case "SHIPPED":
      return "bg-purple-100 text-purple-800";
    case "DELIVERED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getPaymentStatusColor(
  status: ApiOrder["paymentStatus"]
): string {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "PAID":
      return "bg-green-100 text-green-800";
    case "FAILED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function getOrderStatusText(status: ApiOrder["orderStatus"]): string {
  const option = ORDER_STATUS_OPTIONS.find((opt) => opt.value === status);
  return option?.label || status;
}

export function getPaymentStatusText(
  status: ApiOrder["paymentStatus"]
): string {
  const option = PAYMENT_STATUS_OPTIONS.find((opt) => opt.value === status);
  return option?.label || status;
}

export function getDeliveryMethodText(
  method: ApiOrder["deliveryMethod"]
): string {
  const option = DELIVERY_METHOD_OPTIONS.find((opt) => opt.value === method);
  return option?.label || method;
}

export function getFullName(user: User | null | undefined): string {
  if (!user) return "N/A";
  return `${user.lastName} ${user.firstName}`.trim();
}
