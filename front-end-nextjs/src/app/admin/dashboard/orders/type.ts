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
