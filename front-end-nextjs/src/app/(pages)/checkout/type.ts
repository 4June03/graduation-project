export interface Branch {
  branchId: number;
  branchName: string;
  address: string;
}

export interface CheckoutFormData {
  deliveryMethod: "HOME_DELIVERY" | "STORE_PICKUP";
  paymentMethod: "CASH";
  shippingAddressId?: number;
  branchId?: number;
  note?: string;
}

export interface CreateOrderRequest {
  deliveryMethod: "HOME_DELIVERY" | "STORE_PICKUP";
  paymentMethod: "CASH";
  shippingAddressId?: number;
  branchId?: number;
  subtotal: number;
  shippingFee: number;
}

export interface CreateOrderResponse {
  success: boolean;
  message: string;
  data: {
    orderId: number;
    orderNumber: string;
    status: string;
    total: number;
  };
}

export interface CheckoutData {
  cartData: any;
  userData: any;
  branches: Branch[] | [];
}
