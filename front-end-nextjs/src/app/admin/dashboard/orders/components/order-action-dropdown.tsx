"use client";

import { MoreHorizontal, Eye, Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  ApiOrder,
  ORDER_STATUS_OPTIONS,
  PAYMENT_STATUS_OPTIONS,
} from "@/app/admin/dashboard/orders/type";

interface OrderActionDropdownProps {
  order: ApiOrder;
  onOrderStatusChange: (
    orderId: number,
    newStatus: ApiOrder["orderStatus"]
  ) => void;
  onPaymentStatusChange: (
    orderId: number,
    newStatus: ApiOrder["paymentStatus"]
  ) => void;
  onViewDetails: () => void;
}

export function OrderActionDropdown({
  order,
  onOrderStatusChange,
  onPaymentStatusChange,
  onViewDetails,
}: OrderActionDropdownProps) {
  // Filter out current status from options
  const orderStatusOptions = ORDER_STATUS_OPTIONS.filter(
    (option) => option.value !== order.orderStatus
  );
  const paymentStatusOptions = PAYMENT_STATUS_OPTIONS.filter(
    (option) => option.value !== order.paymentStatus
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Mở menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
        <DropdownMenuItem onClick={onViewDetails}>
          <Eye className="mr-2 h-4 w-4" />
          Xem chi tiết
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Order Status Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Check className="mr-2 h-4 w-4" />
            Cập nhật trạng thái đơn hàng
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {orderStatusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() =>
                  onOrderStatusChange(
                    order.orderId,
                    option.value as ApiOrder["orderStatus"]
                  )
                }
              >
                {option.label}
              </DropdownMenuItem>
            ))}
            {orderStatusOptions.length === 0 && (
              <DropdownMenuItem disabled>
                Không có trạng thái khác
              </DropdownMenuItem>
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        {/* Payment Status Submenu */}
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <CreditCard className="mr-2 h-4 w-4" />
            Cập nhật trạng thái thanh toán
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {paymentStatusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() =>
                  onPaymentStatusChange(
                    order.orderId,
                    option.value as ApiOrder["paymentStatus"]
                  )
                }
              >
                {option.label}
              </DropdownMenuItem>
            ))}
            {paymentStatusOptions.length === 0 && (
              <DropdownMenuItem disabled>
                Không có trạng thái khác
              </DropdownMenuItem>
            )}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
