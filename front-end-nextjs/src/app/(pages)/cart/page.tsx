import { Suspense } from "react";
import { getCartByUserId, getUserIdFromToken } from "./_lib/service";
import CartClient from "./_components/cart-client";
import { cookies } from "next/headers";
import { parseToken } from "@/utils/jwt";

// Loading component
function CartLoading() {
  return (
    <div className="container py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export default async function CartPage() {
  try {
    // Get user ID from token
    // const userId = getUserIdFromToken();
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;
    console.log("Token phía server", token);

    let userId: number | null = null;

    if (token) {
      const payload = parseToken(token);
      userId = payload?.userId ?? null;
    }
    // Fetch cart data from API
    const cartData = await getCartByUserId(userId);

    // console.log("CArt data", cartData);

    return (
      <Suspense fallback={<CartLoading />}>
        <CartClient initialCartData={cartData} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading cart:", error);

    // Return empty cart state on error
    const emptyCartData = {
      cartItemList: [],
      total: 0,
      shippingFee: 500000,
      grandTotal: 500000,
    };

    return <CartClient initialCartData={emptyCartData} />;
  }
}

// Generate metadata for SEO
export async function generateMetadata() {
  return {
    title: "Giỏ hàng - Motorcycle Store",
    description: "Xem và quản lý các sản phẩm trong giỏ hàng của bạn",
  };
}
