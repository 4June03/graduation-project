// Types for API requests and responses
export interface AddToCartRequest {
  userId: number | null;
  productId: number;
  variantId: number;
  variantColorId: number;
}

export interface RemoveFromCartRequest {
  userId: number;
  cartItemId: number;
}

export interface CartItem {
  cartItemId: number;
  bikeId: number;
  motorbikeName: string;
  variantName: string;
  colorName: string;
  variantPrice: number;
  imageUrl: string;
}

export interface CartData {
  cartItemList: CartItem[];
  total: number;
  shippingFee: number;
  grandTotal: number;
}

export interface APIResponse {
  success: boolean;
  message: string;
  data: CartData;
}
