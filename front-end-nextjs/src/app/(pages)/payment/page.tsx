"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Check, CreditCard, Wallet, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

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
}

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price)
}

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("cash")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  const handlePayment = () => {
    setIsProcessing(true)
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Thanh toán</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/checkout" className="hover:text-foreground">
              Đặt mua
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Thanh toán</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {isComplete ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Thanh toán thành công!</h2>
            <p className="text-muted-foreground mb-6">
              Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được xác nhận.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 mb-8 inline-block">
              <p className="font-medium">Mã đơn hàng: {orderDetails.id}</p>
            </div>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link href="/profile?tab=orders">Xem đơn hàng</Link>
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
              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Phương thức thanh toán</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={paymentMethod} 
                    onValueChange={setPaymentMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="cash" id="cash" className="mt-1" />
                      <div>
                        <Label htmlFor="cash" className="flex items-center text-base font-medium cursor-pointer">
                          <CreditCard className="h-5 w-5 mr-2 text-primary" />
                          Thanh toán tiền mặt
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Thanh toán khi nhận hàng hoặc tại cửa hàng
                        </p>
                        
                        {paymentMethod === "cash" && (
                          <div className="mt-4 bg-muted/30 p-4 rounded-lg">
                            <p className="text-sm">
                              Quý khách vui lòng chuẩn bị đủ số tiền mặt khi nhận hàng hoặc khi đến cửa hàng.
                            </p>
                            <p className="text-sm mt-2">
                              Nhân viên giao hàng sẽ liên hệ trước khi giao hàng.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                      <RadioGroupItem value="e-wallet" id="e-wallet" className="mt-1" />
                      <div className="w-full">
                        <Label htmlFor="e-wallet" className="flex items-center text-base font-medium cursor-pointer">
                          <Wallet className="h-5 w-5 mr-2 text-primary" />
                          Thanh toán qua ví điện tử
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Thanh toán qua các ví điện tử phổ biến
                        </p>
                        
                        {paymentMethod === "e-wallet" && (
                          <div className="mt-4 space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                              <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-primary">
                                <Image src="/placeholder.svg?height=40&width=40&text=MoMo" alt="MoMo" width={40} height={40} />
                                <span className="text-sm mt-2">MoMo</span>
                              </div>
                              <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-primary">
                                <Image src="/placeholder.svg?height=40&width=40&text=ZaloPay" alt="ZaloPay" width={40} height={40} />
                                <span className="text-sm mt-2">ZaloPay</span>
                              </div>
                              <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-primary">
                                <Image src="/placeholder.svg?height=40&width=40&text=VNPay" alt="VNPay" width={40} height={40} />
                                <span className="text-sm mt-2">VNPay</span>
                              </div>
                              <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-primary">
                                <Image src="/placeholder.svg?height=40&width=40&text=ShopeePay" alt="ShopeePay" width={40} height={40} />
                  alt="ShopeePay" width={40} height={40} />
                <span className="text-sm mt-2">ShopeePay</span>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm">
                Quý khách vui lòng quét mã QR hoặc nhập thông tin chuyển khoản sau:
              </p>
              <div className="flex items-center justify-center my-4">
                <Image 
                  src="/placeholder.svg?height=200&width=200&text=QR+Code" 
                  alt="QR Code" 
                  width={200} 
                  height={200} 
                  className="border"
                />
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Số tài khoản:</span> 0123456789</p>
                <p><span className="font-medium">Chủ tài khoản:</span> CÔNG TY TNHH MOTORBIKE</p>
                <p><span className="font-medium">Ngân hàng:</span> Vietcombank</p>
                <p><span className="font-medium">Nội dung chuyển khoản:</span> {orderDetails.id}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
  
  {/* Delivery Information */}
  <Card>
    <CardHeader>
      <CardTitle>Thông tin giao hàng</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <ChevronRight className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium">Phương thức nhận hàng</h3>
            <p className="text-muted-foreground">
              {orderDetails.deliveryMethod === "delivery" ? "Giao tận nơi" : "Đến cửa hàng thanh toán"}
            </p>
          </div>
        </div>
        
        {orderDetails.deliveryMethod === "delivery" && (
          <div className="flex items-start gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Địa chỉ giao hàng</h3>
              <p className="font-medium">{orderDetails.deliveryAddress.name}</p>
              <p>{orderDetails.deliveryAddress.phone}</p>
              <p className="text-muted-foreground">{orderDetails.deliveryAddress.address}</p>
            </div>
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
      {/* Order ID */}
      <div className="bg-muted/30 p-3 rounded-lg">
        <p className="font-medium">Mã đơn hàng: {orderDetails.id}</p>
      </div>
      
      {/* Cart Items */}
      <div className="space-y-3">
        {orderDetails.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium line-clamp-1">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.brand}</p>
              <div className="flex justify-between mt-1">
                <span className="text-sm">SL: {item.quantity}</span>
                <span className="font-medium">{formatPrice(item.price)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <Separator />
      
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
    </CardContent>
    <CardFooter>
      <Button 
        className="w-full" 
        size="lg" 
        onClick={handlePayment}
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang xử lý...
          </span>
        ) : (
          <span className="flex items-center">
            Hoàn tất thanh toán
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
</main>
)
}
