import { Suspense } from "react";
import { getCheckoutData } from "./_lib/service";
import CheckoutClient from "@/app/(pages)/checkout/_component/checkout-client";
import { CheckoutData } from "@/app/(pages)/checkout/type";

export default async function CheckoutPage() {
  const userId = 1;

  const checkoutData: CheckoutData = await getCheckoutData(userId);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutClient initialData={checkoutData} />
    </Suspense>
  );
}

export async function generateMetadata() {
  return {
    title: "Đặt mua xe - Motorcycle Store",
    description: "Hoàn tất đơn hàng và chọn phương thức thanh toán",
  };
}
