export interface CategoryMotorbike {
  bikeId: number;
  bikeName: string;
  price: number;
  oldPrice?: number;
  brandName: string;
  imageUrls: string[];
  isNew?: boolean;
  totalStock?: number;
}

export interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  createdAt: string; // ISO date string, e.g. "2025-04-23"
}

export interface ApiResponse {
  success: boolean;
  message: string;
  data: Category[];
}

export interface Brand {
  id: string;
  name: string;
}
export interface Color {
  id: string;
  name: string;
  color: string;
}
