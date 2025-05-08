"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Search, Filter, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price)
}

// Get status badge variant and text
function getStatusInfo(status: string) {
  switch (status) {
    case "completed":
      return { variant: "default" as const, text: "Hoàn thành" }
    case "shipping":
      return { variant: "outline" as const, text: "Đang giao" }
    case "processing":
      return { variant: "outline" as const, text: "Đang xử lý" }
    case "pending":
      return { variant: "outline" as const, text: "Chờ xác nhận" }
    case "cancelled":
      return { variant: "destructive" as const, text: "Đã hủy" }
    default:
      return { variant: "outline" as const, text: status }
  }
}

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
  image: string
}

interface TimelineStep {
  status: string
  date: string
  completed: boolean
  isCancelled?: boolean
}

interface Order {
  id: string
  date: string
  total: number
  status: string
  items: OrderItem[]
  paymentMethod: string
  deliveryMethod: string
  deliveryAddress: string
  timeline: TimelineStep[]
  cancelReason?: string
}

interface OrderListProps {
  orders: Order[]
}

export function OrderList({ orders }: OrderListProps) {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState("newest")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  // Filter orders based on active tab
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  // Filter orders based on search query
  const searchedOrders = filteredOrders.filter((order) => {
    if (!searchQuery) return true
    return (
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  // Sort orders
  const sortedOrders = [...searchedOrders].sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"))
    const dateB = new Date(b.date.split("/").reverse().join("-"))

    if (sortOrder === "newest") {
      return dateB.getTime() - dateA.getTime()
    } else {
      return dateA.getTime() - dateB.getTime()
    }
  })

  // Get selected order details
  const selectedOrderDetails = orders.find((order) => order.id === selectedOrder)

  return (
    <>
      {selectedOrder ? (
        <Card>
          <CardHeader className="flex flex-row items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => setSelectedOrder(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <CardTitle className="text-xl">Chi tiết đơn hàng</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Mã đơn hàng: {selectedOrderDetails?.id}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Status */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="font-medium">Trạng thái đơn hàng</h3>
                  <div className="flex items-center mt-1">
                    <Badge variant={getStatusInfo(selectedOrderDetails?.status || "").variant}>
                      {getStatusInfo(selectedOrderDetails?.status || "").text}
                    </Badge>
                    <span className="text-sm text-muted-foreground ml-2">
                      Cập nhật lần cuối: {selectedOrderDetails?.timeline[selectedOrderDetails.timeline.length - 1].date}
                    </span>
                  </div>
                </div>
                {selectedOrderDetails?.status === "pending" && (
                  <Button variant="destructive" size="sm">
                    Hủy đơn hàng
                  </Button>
                )}
              </div>

              {/* Timeline */}
              <div className="relative">
                {selectedOrderDetails?.timeline.map((step, index) => (
                  <div key={index} className="flex mb-4 last:mb-0">
                    <div className="mr-4 relative">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center ${
                          step.completed
                            ? step.isCancelled
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      {index < selectedOrderDetails.timeline.length - 1 && (
                        <div
                          className={`absolute top-6 left-1/2 w-0.5 h-6 -translate-x-1/2 ${
                            step.completed ? "bg-green-600" : "bg-muted-foreground"
                          }`}
                        ></div>
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{step.status}</p>
                      <p className="text-sm text-muted-foreground">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>

              {selectedOrderDetails?.status === "cancelled" && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md">
                  <p className="font-medium">Lý do hủy đơn: {selectedOrderDetails.cancelReason}</p>
                </div>
              )}
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-medium mb-3">Sản phẩm</h3>
              <div className="space-y-3">
                {selectedOrderDetails?.items.map((item) => (
                  <div key={item.id} className="flex gap-3 border rounded-lg p-3">
                    <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium line-clamp-1">{item.name}</h4>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm">SL: {item.quantity}</span>
                        <span className="font-medium">{formatPrice(item.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Information */}
            <div>
              <h3 className="font-medium mb-3">Thông tin giao hàng</h3>
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Phương thức nhận hàng</p>
                  <p>{selectedOrderDetails?.deliveryMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Địa chỉ</p>
                  <p>{selectedOrderDetails?.deliveryAddress}</p>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="font-medium mb-3">Thông tin thanh toán</h3>
              <div className="bg-muted/30 p-4 rounded-lg space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Phương thức thanh toán</p>
                  <p>{selectedOrderDetails?.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tổng tiền</p>
                  <p className="font-medium">{formatPrice(selectedOrderDetails?.total || 0)}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" asChild>
                <Link href="/profile/orders">Quay lại danh sách</Link>
              </Button>
              {selectedOrderDetails?.status === "completed" && <Button>Mua lại</Button>}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Đơn hàng của tôi</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-6">
                <TabsList className="grid grid-cols-5">
                  <TabsTrigger value="all">Tất cả</TabsTrigger>
                  <TabsTrigger value="pending">Chờ xác nhận</TabsTrigger>
                  <TabsTrigger value="processing">Đang xử lý</TabsTrigger>
                  <TabsTrigger value="shipping">Đang giao</TabsTrigger>
                  <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
                </TabsList>
              </div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo mã đơn hàng hoặc tên sản phẩm"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sắp xếp theo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="oldest">Cũ nhất</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value={activeTab} className="space-y-4">
                {sortedOrders.length > 0 ? (
                  sortedOrders.map((order) => (
                    <Card key={order.id} className="border">
                      <CardContent className="p-0">
                        <div className="p-4 border-b flex justify-between items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Đơn hàng {order.id}</span>
                              <span className="text-sm text-muted-foreground">• {order.date}</span>
                            </div>
                            <Badge variant={getStatusInfo(order.status).variant} className="mt-1">
                              {getStatusInfo(order.status).text}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="gap-1"
                            onClick={() => setSelectedOrder(order.id)}
                          >
                            Chi tiết
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="p-4">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex gap-4 items-center">
                              <div className="relative h-16 w-16 flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                              </div>
                              <div className="font-medium">{formatPrice(item.price)}</div>
                            </div>
                          ))}
                        </div>

                        <div className="p-4 border-t flex justify-between items-center">
                          <div className="font-medium">Tổng cộng</div>
                          <div className="font-bold text-lg">{formatPrice(order.total)}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Không tìm thấy đơn hàng nào</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </>
  )
}
