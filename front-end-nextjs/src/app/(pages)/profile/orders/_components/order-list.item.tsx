"use client";

import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { ApiOrder } from "../_lib/service";
import {
  getStatusLabel,
  getDeliveryMethodLabel,
  calculateTotal,
  formatDate,
} from "../_lib/service";
import {
  formatPrice,
  getStatusVariant,
} from "@/app/(pages)/profile/orders/_lib/util";

interface OrderListItemProps {
  order: ApiOrder;
  onViewDetail: (orderId: number) => void;
  loading: boolean;
}

export function OrderListItem({
  order,
  onViewDetail,
  loading,
}: OrderListItemProps) {
  return (
    <Card className="border">
      <CardContent className="p-0">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Đơn hàng #{order.orderId}</span>
              <span className="text-sm text-muted-foreground">
                • {formatDate(order.orderDate)}
              </span>
            </div>
            <div className="flex gap-2 mt-1">
              <Badge variant={getStatusVariant(order.orderStatus)}>
                {getStatusLabel(order.orderStatus, "order")}
              </Badge>
              <Badge
                variant={order.paymentStatus === "PAID" ? "default" : "outline"}
              >
                {getStatusLabel(order.paymentStatus, "payment")}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={() => onViewDetail(order.orderId)}
            disabled={loading}
          >
            Chi tiết
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">
                {getDeliveryMethodLabel(order.deliveryMethod)}
              </p>
              {order.paymentMethod && (
                <p className="text-sm text-muted-foreground">
                  Thanh toán: {order.paymentMethod}
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">
                {formatPrice(calculateTotal(order.subtotal, order.shippingFee))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
