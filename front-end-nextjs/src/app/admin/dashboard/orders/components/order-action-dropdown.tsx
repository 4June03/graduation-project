"use client"

import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { Order, OrderStatus } from "./orders-client"

interface OrderActionDropdownProps {
  order: Order
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void
  onViewDetails: () => void
}

export function OrderActionDropdown({ order, onStatusChange, onViewDetails }: OrderActionDropdownProps) {
  // Define available status transitions
  const availableStatuses: OrderStatus[] = ["pending", "processing", "completed", "cancelled"].filter(
    (status) => status !== order.status,
  ) as OrderStatus[]

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
        <DropdownMenuItem onClick={onViewDetails}>Xem chi tiết</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Cập nhật trạng thái</DropdownMenuLabel>
        {availableStatuses.map((status) => (
          <DropdownMenuItem key={status} onClick={() => onStatusChange(order.id, status)}>
            {getStatusLabel(status)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "Chuyển sang Chờ xử lý"
    case "processing":
      return "Chuyển sang Đang xử lý"
    case "completed":
      return "Đánh dấu Hoàn thành"
    case "cancelled":
      return "Hủy đơn hàng"
    default:
      return status
  }
}
