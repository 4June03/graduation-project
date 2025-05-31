"use client";

import { formatPrice } from "@/app/(pages)/profile/orders/_lib/util";
import type { OrderDetail } from "../_lib/service";
import { calculateTotal } from "../_lib/service";

interface PaymentInfoSectionProps {
  order: OrderDetail;
}

export function PaymentInfoSection({ order }: PaymentInfoSectionProps) {
  return (
    <div>
      <h3 className="font-medium mb-3">Thông tin thanh toán</h3>
      <div className="bg-muted/30 p-4 rounded-lg space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">
            Phương thức thanh toán
          </p>
          <p>{order.paymentMethod || "Chưa xác định"}</p>
        </div>
        <div className="space-y-2">
          {order.subtotal && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tạm tính</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
          )}
          {order.shippingFee && (
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Phí vận chuyển
              </span>
              <span>{formatPrice(order.shippingFee)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium text-lg border-t pt-2">
            <span>Tổng tiền</span>
            <span>
              {formatPrice(
                order.totalAmount ||
                  calculateTotal(order.subtotal, order.shippingFee)
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
