"use client";

import { Badge } from "@/components/ui/badge";
import type { OrderDetail } from "../_lib/service";
import { getStatusLabel, formatDateTime } from "../_lib/service";
import { getStatusVariant } from "@/app/(pages)/profile/orders/_lib/util";

interface OrderStatusSectionProps {
  order: OrderDetail;
}

export function OrderStatusSection({ order }: OrderStatusSectionProps) {
  return (
    <div className="bg-muted/30 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-medium">Trạng thái đơn hàng</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={getStatusVariant(order.orderStatus)}>
              {getStatusLabel(order.orderStatus, "order")}
            </Badge>
            <Badge
              variant={order.paymentStatus === "PAID" ? "default" : "outline"}
            >
              {getStatusLabel(order.paymentStatus, "payment")}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground">
            Cập nhật lần cuối:{" "}
            {formatDateTime(order.updatedAt || order.orderDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
