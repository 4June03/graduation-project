import { cookies } from "next/headers";
import { getOrders, getOrderDetail } from "./_lib/service";
import { ProfileLayout } from "@/components/client/profile/profile-layout";
import { OrdersClient } from "@/app/(pages)/profile/orders/_components/order-client";

export default async function OrdersPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;
  console.log("Token phía server", token);

  let orders: any = [];
  let error = null;

  try {
    orders = await getOrders(token);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load orders";
    console.error("Error loading orders:", err);
  }

  const handleGetOrderDetail = async (orderId: number) => {
    "use server";
    return await getOrderDetail(orderId, token);
  };

  if (error) {
    return (
      <ProfileLayout title="Đơn hàng của tôi" activeTab="orders">
        <div className="text-center py-12">
          <p className="text-red-600">Lỗi: {error}</p>
          <p className="text-muted-foreground mt-2">
            Vui lòng thử lại sau hoặc đăng nhập lại
          </p>
        </div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout title="Đơn hàng của tôi" activeTab="orders">
      <OrdersClient orders={orders} onGetOrderDetail={handleGetOrderDetail} />
    </ProfileLayout>
  );
}
