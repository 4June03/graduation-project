"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Check,
  ChevronRight,
  Package,
  Truck,
  Store,
  CreditCard,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { OrderDetails } from "@/app/(pages)/order-success/type";
import { cleanImageUrl } from "@/app/(pages)/cart/_lib/service";

interface OrderSuccessClientProps {
  orderData: OrderDetails;
}

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

// Format date
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Get status color
function getStatusColor(status: string) {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "CONFIRMED":
      return "bg-blue-100 text-blue-800";
    case "COMPLETED":
      return "bg-green-100 text-green-800";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Get status text
function getStatusText(status: string) {
  switch (status) {
    case "PENDING":
      return "Chờ xác nhận";
    case "CONFIRMED":
      return "Đã xác nhận";
    case "COMPLETED":
      return "Hoàn thành";
    case "CANCELLED":
      return "Đã hủy";
    default:
      return status;
  }
}

export default function OrderSuccessClient({
  orderData,
}: OrderSuccessClientProps) {
  const total = orderData.subtotal + orderData.shippingFee;

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Đặt hàng thành công</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/cart" className="hover:text-foreground">
              Giỏ hàng
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/checkout" className="hover:text-foreground">
              Đặt mua
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Thành công</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Success Message */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-2">Đặt hàng thành công!</h2>
            <p className="text-muted-foreground text-lg mb-4">
              Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được tiếp nhận và đang
              được xử lý.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 inline-block">
              <p className="font-medium text-lg">
                Mã đơn hàng: #{orderData.orderId}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    Sản phẩm đã đặt
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orderData.orderItems.map((item) => {
                      //   const imageUrl = cleanImageUrl(item?.imageUrl);

                      return (
                        <div
                          key={item.orderItemId}
                          className="flex gap-4 p-4 border rounded-lg"
                        >
                          {/* <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={imageUrl}
                              alt={item.motorbikeName}
                              fill
                              className="object-cover"
                            />
                          </div> */}
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">
                              {item.motorbikeName}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {item.variantName}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Màu: {item.colorName}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm">
                                Số lượng: {item.quantity || 1}
                              </span>
                              <span className="font-medium text-lg">
                                {formatPrice(item.price)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Thông tin khách hàng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Họ và tên</p>
                      <p className="font-medium">
                        {orderData.user.firstName} {orderData.user.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{orderData.user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Số điện thoại
                      </p>
                      <p className="font-medium">{orderData.user.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Ngày đặt hàng
                      </p>
                      <p className="font-medium">
                        {formatDate(orderData.orderDate)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {orderData.deliveryMethod === "HOME_DELIVERY" ? (
                      <Truck className="h-5 w-5 mr-2" />
                    ) : (
                      <Store className="h-5 w-5 mr-2" />
                    )}
                    Thông tin giao hàng
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Phương thức nhận hàng
                      </p>
                      <p className="font-medium">
                        {orderData.deliveryMethod === "HOME_DELIVERY"
                          ? "Giao tận nơi"
                          : "Đến cửa hàng thanh toán"}
                      </p>
                    </div>
                    {orderData.shippingAddress && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Địa chỉ giao hàng
                        </p>
                        <p className="font-medium">
                          {orderData?.shippingAddress?.addressDetail}
                        </p>
                      </div>
                    )}
                    {orderData.branchName && (
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Cửa hàng
                        </p>
                        <p className="font-medium">{orderData.branchName}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Tóm tắt đơn hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Status */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Trạng thái đơn hàng
                      </span>
                      <Badge className={getStatusColor(orderData.orderStatus)}>
                        {getStatusText(orderData.orderStatus)}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Trạng thái thanh toán
                      </span>
                      <Badge
                        className={getStatusColor(orderData.paymentStatus)}
                      >
                        {getStatusText(orderData.paymentStatus)}
                      </Badge>
                    </div>
                  </div>

                  <Separator />

                  {/* Payment Method */}
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Thanh toán khi nhận hàng (COD)
                    </span>
                  </div>

                  <Separator />

                  {/* Price Summary */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tạm tính</span>
                      <span>{formatPrice(orderData.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Phí vận chuyển
                      </span>
                      <span>
                        {orderData.shippingFee > 0
                          ? formatPrice(orderData.shippingFee)
                          : "Miễn phí"}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Tổng cộng</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <Button asChild className="w-full">
                      <Link href="/profile/orders">Xem đơn hàng của tôi</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/">Tiếp tục mua sắm</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
