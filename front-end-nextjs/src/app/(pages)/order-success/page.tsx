import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getOrderDetails } from "./_lib/service";

import OrderSuccessLoading from "./loading";
import OrderSuccessClient from "@/app/(pages)/order-success/_component/order-success-client";

interface OrderSuccessPageProps {
  searchParams: {
    orderId?: string;
  };
}

export default async function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  const { orderId } = searchParams;

  if (!orderId) {
    notFound();
  }

  try {
    const orderData = await getOrderDetails(orderId);

    if (!orderData.success) {
      throw new Error(orderData.message);
    }

    return (
      <Suspense fallback={<OrderSuccessLoading />}>
        <OrderSuccessClient orderData={orderData.data} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error loading order success page:", error);
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Lỗi tải thông tin đơn hàng
          </h1>
          <p className="text-muted-foreground">
            Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.
          </p>
        </div>
      </div>
    );
  }
}
