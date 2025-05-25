import {
  ApiResponse,
  UpdateAddressesRequest,
  UpdateUserRequest,
  UserData,
} from "@/app/(pages)/profile/type";

// Mock user ID - replace with actual token parsing
function getUserIdFromToken(): number {
  // TODO: Implement actual token parsing logic
  // const token = getTokenFromCookies() or getTokenFromLocalStorage()
  // const decoded = jwt.decode(token)
  // return decoded.userId
  return 1; // Mock user ID
}

// Get user by ID
export async function getUserById(userId: number): Promise<UserData> {
  try {
    const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`);
    }

    const result: ApiResponse<UserData> = await response.json();

    if (!result.success) {
      throw new Error(result.message);
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    // Return mock data as fallback
    return {
      firstName: "Nghĩa",
      lastName: "Nguyễn Hữu Víp",
      email: "nghia@gmail.com",
      phone: "0384958887",
      avatar: null,
      dob: "2003-04-06",
      createdAt: "2025-04-20",
      updatedAt: "2025-04-23",
      isActive: true,
      addresses: [
        {
          addressId: 6,
          addressDetail: "Minh khai, Bắc Từ Liêm, Hà Nội",
        },
        {
          addressId: 5,
          addressDetail: "Hòa Thắng, Hữu Lũng, Lạng Sơn",
        },
      ],
    };
  }
}

// Update user info
export async function updateUserInfo(
  userId: number | null,
  userData: UpdateUserRequest
): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update user: ${response.status}`);
    }

    const result: ApiResponse<any> = await response.json();
    return result.success;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// Update user addresses
export async function updateUserAddresses(
  userId: number | null,
  addressesData: UpdateAddressesRequest
): Promise<boolean> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/user/${userId}/addresses`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addressesData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update addresses: ${response.status}`);
    }

    const result: ApiResponse<any> = await response.json();
    return result.success;
  } catch (error) {
    console.error("Error updating addresses:", error);
    throw error;
  }
}

// Get current user data
export async function getCurrentUser(): Promise<UserData> {
  const userId = getUserIdFromToken();
  return getUserById(userId);
}
