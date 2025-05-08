"use client"

import Link from "next/link"
import { User, MapPin, ShoppingBag, Heart, Bell, Settings, CreditCard } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProfileSidebarProps {
  activeTab: string
}

export function ProfileSidebar({ activeTab }: ProfileSidebarProps) {
  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src="/placeholder.svg?height=100&width=100" alt="Avatar" />
          <AvatarFallback>NA</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>Nguyễn Văn A</CardTitle>
          <CardDescription>nguyenvana@example.com</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <nav className="flex flex-col">
          <Link
            href="/profile"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-muted ${activeTab === "personal-info" ? "bg-muted" : ""}`}
          >
            <User className="h-5 w-5" />
            <span>Thông tin cá nhân</span>
          </Link>
          <Link
            href="/profile/addresses"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-muted ${activeTab === "addresses" ? "bg-muted" : ""}`}
          >
            <MapPin className="h-5 w-5" />
            <span>Địa chỉ</span>
          </Link>
          <Link
            href="/profile/orders"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-muted ${activeTab === "orders" ? "bg-muted" : ""}`}
          >
            <ShoppingBag className="h-5 w-5" />
            <span>Đơn hàng</span>
          </Link>
          <Link
            href="/favorites"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-muted ${activeTab === "favorites" ? "bg-muted" : ""}`}
          >
            <Heart className="h-5 w-5" />
            <span>Sản phẩm yêu thích</span>
          </Link>
          <Link
            href="/profile/notifications"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-muted ${activeTab === "notifications" ? "bg-muted" : ""}`}
          >
            <Bell className="h-5 w-5" />
            <span>Thông báo</span>
            <Badge className="ml-auto">3</Badge>
          </Link>
          <Link
            href="/profile/payment-methods"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-muted ${activeTab === "payment-methods" ? "bg-muted" : ""}`}
          >
            <CreditCard className="h-5 w-5" />
            <span>Phương thức thanh toán</span>
          </Link>
          <Link
            href="/profile/settings"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-muted ${activeTab === "settings" ? "bg-muted" : ""}`}
          >
            <Settings className="h-5 w-5" />
            <span>Cài đặt</span>
          </Link>
        </nav>
      </CardContent>
    </Card>
  )
}
