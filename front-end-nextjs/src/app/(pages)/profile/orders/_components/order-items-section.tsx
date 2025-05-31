"use client";

import { Package } from "lucide-react";
import type { OrderDetail } from "../_lib/service";
import { formatPrice } from "@/app/(pages)/profile/orders/_lib/util";

interface OrderItemsSectionProps {
  order: OrderDetail;
}

export function OrderItemsSection({ order }: OrderItemsSectionProps) {
  return (
    <div>
      <h3 className="font-medium mb-3">Sản phẩm</h3>
      <div className="space-y-3">
        {order.orderItems.map((item) => (
          <div
            key={item.orderItemId}
            className="flex gap-3 border rounded-lg p-3"
          >
            <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-muted flex items-center justify-center">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium line-clamp-1">{item.motorbikeName}</h4>
              <p className="text-sm text-muted-foreground">
                {item.variantName} - {item.colorName}
              </p>
              <div className="flex justify-between mt-1">
                <span className="text-sm">SL: {item.quantity || 1}</span>
                <span className="font-medium">{formatPrice(item.price)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
