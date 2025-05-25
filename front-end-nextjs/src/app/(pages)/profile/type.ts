// Types for API requests and responses
export interface UserData {
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

export interface Address {
  addressId: number;
  addressDetail: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone: string;
  dob: string;
}

export interface UpdateAddressesRequest {
  addresses: {
    addressDetail: string;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
