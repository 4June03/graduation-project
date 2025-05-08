"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Check, CreditCard, ArrowRight, Phone, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Steps, Step } from "@/components/ui/steps"

// Mock data for order
const orderDetails = {
  id: "ORD123456",
  items: [
    {
      id: 1,
      name: "Honda SH 150i",
      brand: "Honda",
      price: 102900000,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Mũ bảo hiểm Honda chính hãng",
      brand: "Honda",
      price: 850000,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
  ],
  subtotal: 103750000,
  shipping: 500000,
  total: 104250000,
  deliveryMethod: "delivery",
  deliveryAddress: {
    name: "Nguyễn Văn A",
    phone: "0912345678",
    address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
  },
  paymentMethod: "Tiền mặt",
  storeInfo: {
    name: "Chi nhánh Quận 1",
    address: "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    phone: "1900 1234",
    openHours: "8:00 - 20:00 (Thứ 2 - Chủ nhật)",
  },
}

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price)
}

export default function CashPaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleConfirmOrder = () => {
    setIsProcessing(true)
    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false)
      setCurrentStep(2)
      // Simulate order completion after a delay
      setTimeout(() => {
        setIsComplete(true)
        setCurrentStep(3)
      }, 2000)
    }, 2000)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Thanh toán tiền mặt</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/checkout" className="hover:text-foreground">
              Đặt mua
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/payment" className="hover:text-foreground">
              Thanh toán
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Tiền mặt</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <Steps currentStep={currentStep}>
              <Step title="Xác nhận đơn hàng" />
              <Step title="Xử lý đơn hàng" />
              <Step title="Hoàn tất" />
            </Steps>
          </div>

          {isComplete ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Đặt hàng thành công!</h2>
              <p className="text-muted-foreground mb-6">Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận.</p>
              <div className="bg-muted/30 rounded-lg p-4 mb-8 inline-block">
                <p className="font-medium">Mã đơn hàng: {orderDetails.id}</p>
              </div>

              {orderDetails.deliveryMethod === "delivery" ? (
                <div className="text-left max-w-md mx-auto mb-8 bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-medium text-lg mb-4">Thông tin giao hàng</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Người nhận:</span> {orderDetails.deliveryAddress.name}
                    </p>
                    <p>
                      <span className="font-medium">Số điện thoại:</span> {orderDetails.deliveryAddress.phone}
                    </p>
                    <p>
                      <span className="font-medium">Địa chỉ:</span> {orderDetails.deliveryAddress.address}
                    </p>
                    <p>
                      <span className="font-medium">Phương thức thanh toán:</span> {orderDetails.paymentMethod}
                    </p>
                    <p>
                      <span className="font-medium">Tổng tiền:</span> {formatPrice(orderDetails.total)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-left max-w-md mx-auto mb-8 bg-muted/30 p-6 rounded-lg">
                  <h3 className="font-medium text-lg mb-4">Thông tin cửa hàng</h3>
                  <div className="space-y-2">
                    <p>
                      <span className="font-medium">Cửa hàng:</span> {orderDetails.storeInfo.name}
                    </p>
                    <p>
                      <span className="font-medium">Địa chỉ:</span> {orderDetails.storeInfo.address}
                    </p>
                    <p>
                      <span className="font-medium">Số điện thoại:</span> {orderDetails.storeInfo.phone}
                    </p>
                    <p>
                      <span className="font-medium">Giờ mở cửa:</span> {orderDetails.storeInfo.openHours}
                    </p>
                    <p>
                      <span className="font-medium">Phương thức thanh toán:</span> {orderDetails.paymentMethod}
                    </p>
                    <p>
                      <span className="font-medium">Tổng tiền:</span> {formatPrice(orderDetails.total)}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="/profile/orders">Xem đơn hàng</Link>
                </Button>
                <Button asChild>
                  <Link href="/">Tiếp tục mua sắm</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-6">
                {/* Payment Instructions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Hướng dẫn thanh toán tiền mặt</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {orderDetails.deliveryMethod === "delivery" ? (
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Thanh toán khi nhận hàng (COD)</h3>
                            <p className="text-muted-foreground mt-1">
                              Quý khách vui lòng chuẩn bị đủ số tiền mặt để thanh toán cho nhân viên giao hàng khi nhận
                              hàng.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Phone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Liên hệ trước khi giao hàng</h3>
                            <p className="text-muted-foreground mt-1">
                              Nhân viên giao hàng sẽ liên hệ với quý khách qua số điện thoại{" "}
                              {orderDetails.deliveryAddress.phone} trước khi giao hàng.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Địa chỉ giao hàng</h3>
                            <p className="text-muted-foreground mt-1">
                              {orderDetails.deliveryAddress.name}, {orderDetails.deliveryAddress.phone}
                            </p>
                            <p className="text-muted-foreground">{orderDetails.deliveryAddress.address}</p>
                          </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                          <p className="text-yellow-800 text-sm">
                            <span className="font-medium">Lưu ý:</span> Vui lòng kiểm tra kỹ sản phẩm trước khi thanh
                            toán. Nếu có bất kỳ vấn đề gì, quý khách có thể từ chối nhận hàng.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">Đến cửa hàng thanh toán</h3>
                            <p className="text-muted-foreground mt-1">
                              Quý khách vui lòng đến cửa hàng để xem xe và thanh toán trực tiếp.
                            </p>
                          </div>
                        </div>

                        <div className="bg-muted/30 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Thông tin cửa hàng</h4>
                          <div className="space-y-2">
                            <p>
                              <span className="font-medium">Cửa hàng:</span> {orderDetails.storeInfo.name}
                            </p>
                            <p>
                              <span className="font-medium">Địa chỉ:</span> {orderDetails.storeInfo.address}
                            </p>
                            <p>
                              <span className="font-medium">Số điện thoại:</span> {orderDetails.storeInfo.phone}
                            </p>
                            <p>
                              <span className="font-medium">Giờ mở cửa:</span> {orderDetails.storeInfo.openHours}
                            </p>
                          </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                          <p className="text-yellow-800 text-sm">
                            <span className="font-medium">Lưu ý:</span> Đơn hàng sẽ được giữ trong vòng 3 ngày. Sau thời
                            gian này, đơn hàng sẽ tự động bị hủy nếu quý khách không đến nhận hàng.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Items List */}
                <Card>
                  <CardHeader>
                    <CardTitle>Sản phẩm đã đặt</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {orderDetails.items.map((item) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.brand}</p>
                            <div className="flex justify-between mt-1">
                              <span className="text-sm">SL: {item.quantity}</span>
                              <span className="font-medium">{formatPrice(item.price)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
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
                    {/* Order ID */}
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="font-medium">Mã đơn hàng: {orderDetails.id}</p>
                    </div>

                    {/* Price Summary */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{formatPrice(orderDetails.subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phí vận chuyển</span>
                        <span>{orderDetails.shipping > 0 ? formatPrice(orderDetails.shipping) : "Miễn phí"}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium text-lg">
                        <span>Tổng cộng</span>
                        <span className="text-primary">{formatPrice(orderDetails.total)}</span>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-primary" />
                        <span className="font-medium">Thanh toán tiền mặt</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleConfirmOrder} disabled={isProcessing}>
                      {isProcessing ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Đang xử lý...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Xác nhận đơn hàng
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </span>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
