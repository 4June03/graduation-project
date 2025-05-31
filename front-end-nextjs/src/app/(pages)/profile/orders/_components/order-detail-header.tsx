"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface OrderDetailHeaderProps {
  orderId: number;
  onBack: () => void;
}

export function OrderDetailHeader({ orderId, onBack }: OrderDetailHeaderProps) {
  return (
    <CardHeader className="flex flex-row items-center">
      <Button variant="ghost" size="icon" className="mr-2" onClick={onBack}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <CardTitle className="text-xl">Chi tiết đơn hàng</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Mã đơn hàng: #{orderId}
        </p>
      </div>
    </CardHeader>
  );
}
