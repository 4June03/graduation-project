"use client";

import type { OrderDetail } from "../_lib/service";
import { getDeliveryMethodLabel } from "../_lib/service";

interface DeliveryInfoSectionProps {
  order: OrderDetail;
}

export function DeliveryInfoSection({ order }: DeliveryInfoSectionProps) {
  return (
    <div>
      <h3 className="font-medium mb-3">Thông tin giao hàng</h3>
      <div className="bg-muted/30 p-4 rounded-lg space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Phương thức nhận hàng</p>
          <p>{getDeliveryMethodLabel(order.deliveryMethod)}</p>
        </div>
        {order.shippingAddress && (
          <div>
            <p className="text-sm text-muted-foreground">Địa chỉ giao hàng</p>
            <p>{order.shippingAddress.addressDetail}</p>
          </div>
        )}
        {order.branchName && (
          <div>
            <p className="text-sm text-muted-foreground">Chi nhánh</p>
            <p>{order.branchName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
