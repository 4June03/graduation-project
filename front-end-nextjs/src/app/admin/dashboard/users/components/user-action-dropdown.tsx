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
import type { User } from "./users-client"

interface UserActionDropdownProps {
  user: User
  onEdit: () => void
  onChangePassword: () => void
  onToggleStatus: () => void
}

export function UserActionDropdown({ user, onEdit, onChangePassword, onToggleStatus }: UserActionDropdownProps) {
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
        <DropdownMenuItem onClick={onEdit}>Sửa thông tin</DropdownMenuItem>
        <DropdownMenuItem onClick={onChangePassword}>Đổi mật khẩu</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onToggleStatus} className={user.status === "active" ? "text-destructive" : ""}>
          {user.status === "active" ? "Vô hiệu hóa" : "Kích hoạt"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
