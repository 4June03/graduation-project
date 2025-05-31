"use client";

import { Button } from "@/components/ui/button";
import type { OrderDetail } from "../_lib/service";

interface OrderDetailActionsProps {
  order: OrderDetail;
  onBack: () => void;
}

export function OrderDetailActions({ order, onBack }: OrderDetailActionsProps) {
  return (
    <div className="flex justify-between items-center pt-4">
      <Button variant="outline" onClick={onBack}>
        Quay lại danh sách
      </Button>
      {order.orderStatus === "DELIVERED" && <Button>Mua lại</Button>}
    </div>
  );
}
