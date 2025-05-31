"use client";

import type { OrderDetail } from "../_lib/service";

interface CustomerInfoSectionProps {
  order: OrderDetail;
}

export function CustomerInfoSection({ order }: CustomerInfoSectionProps) {
  return (
    <div>
      <h3 className="font-medium mb-3">Thông tin khách hàng</h3>
      <div className="bg-muted/30 p-4 rounded-lg space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Họ tên</p>
          <p>
            {order.user.firstName} {order.user.lastName}
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p>{order.user.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Số điện thoại</p>
          <p>{order.user.phone}</p>
        </div>
      </div>
    </div>
  );
}
