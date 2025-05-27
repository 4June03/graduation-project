export interface SearchMotorbike {
  bikeId: number;
  bikeName: string;
  price: number;
  imageUrls: string[];
  totalStock: number;
  categoryName: string;
  brandName: string;
  new: boolean;
}

export interface SearchResponse {
  success: boolean;
  message: string;
  data: {
    content: SearchMotorbike[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        unsorted: boolean;
        sorted: boolean;
      };
      offset: number;
      unpaged: boolean;
      paged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
}

export interface SearchProductData {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  inStock: boolean;
  isNew: boolean;
}
