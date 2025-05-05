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
import type { ContentPage } from "./pages-tab"
import type { BlogPost } from "./blog-tab"
import type { Banner } from "./banners-tab"

interface ContentActionDropdownProps {
  item: ContentPage | BlogPost | Banner
  type: "page" | "blog" | "banner"
  onView: () => void
  onEdit: () => void
  onDelete: () => void
}

export function ContentActionDropdown({ item, type, onView, onEdit, onDelete }: ContentActionDropdownProps) {
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
        <DropdownMenuItem onClick={onView}>
          {type === "page" ? "Xem trang" : type === "blog" ? "Xem bài viết" : "Xem banner"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEdit}>Sửa</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="text-destructive">
          Xóa
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
