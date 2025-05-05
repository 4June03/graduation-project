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
import type { InventoryItem } from "./inventory-client"

interface InventoryActionDropdownProps {
  item: InventoryItem
  onUpdate: () => void
  onAddStock: () => void
}

export function InventoryActionDropdown({ item, onUpdate, onAddStock }: InventoryActionDropdownProps) {
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
        <DropdownMenuItem onClick={onUpdate}>Cập nhật thông tin</DropdownMenuItem>
        <DropdownMenuItem onClick={onAddStock}>Nhập thêm hàng</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Xem lịch sử nhập hàng</DropdownMenuItem>
        <DropdownMenuItem>Xuất báo cáo</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
