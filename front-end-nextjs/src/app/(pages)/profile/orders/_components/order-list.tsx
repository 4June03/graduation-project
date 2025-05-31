"use client";

import { Package } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import type { ApiOrder } from "../_lib/service";
import { OrderListItem } from "@/app/(pages)/profile/orders/_components/order-list.item";

interface OrderListProps {
  orders: ApiOrder[];
  activeTab: string;
  onViewDetail: (orderId: number) => void;
  loading: boolean;
}

export function OrderList({
  orders,
  activeTab,
  onViewDetail,
  loading,
}: OrderListProps) {
  return (
    <Tabs value={activeTab}>
      <TabsContent value={activeTab} className="space-y-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderListItem
              key={order.orderId}
              order={order}
              onViewDetail={onViewDetail}
              loading={loading}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Không tìm thấy đơn hàng nào</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
