import { Suspense } from "react";
import { getCheckoutData } from "./_lib/service";
import CheckoutClient from "@/app/(pages)/checkout/_component/checkout-client";
import { CheckoutData } from "@/app/(pages)/checkout/type";
import { cookies } from "next/headers";
import { parseToken } from "@/utils/jwt";

export default async function CheckoutPage() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;
    console.log("Token phía server", token);

    let userId: number | null = null;

    if (token) {
      const payload = parseToken(token);
      userId = payload?.userId ?? null;
    }
    const checkoutData: CheckoutData = await getCheckoutData(userId);

    console.log("Checkout data phía server", checkoutData);

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutClient initialData={checkoutData} />
      </Suspense>
    );
  } catch (error) {
    console.log("Lỗi khi lấy dữ liệu thanh toán:", error);
    throw new Error("Không thể tải dữ liệu thanh toán");
  }
}

export async function generateMetadata() {
  return {
    title: "Đặt mua xe - Motorcycle Store",
    description: "Hoàn tất đơn hàng và chọn phương thức thanh toán",
  };
}
