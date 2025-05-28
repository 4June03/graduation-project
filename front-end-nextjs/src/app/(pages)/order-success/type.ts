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
  imageUrl: string | null;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar: string | null;
  dob: string | null;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  addresses: any[];
}

export interface OrderDetails {
  orderId: number;
  userId: number | null;
  user: User;
  orderDate: string;
  updatedAt: string | null;
  orderItems: OrderItem[];
  shippingFee: number;
  subtotal: number;
  totalAmount: number | null;
  deliveryMethod: "HOME_DELIVERY" | "STORE_PICKUP";
  paymentMethod: "CASH";
  orderStatus: string;
  paymentStatus: string;
  branchId: number | null;
  branchName: string | null;
  shippingAddress: {
    addressId: number;
    addressDetail: string;
  };
}

export interface OrderSuccessResponse {
  success: boolean;
  message: string;
  data: OrderDetails;
}
