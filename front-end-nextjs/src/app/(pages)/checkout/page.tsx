"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Truck, CreditCard, Wallet, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// Mock data for cart items
const cartItems = [
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
]

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price)
}

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState("store")
  const [showAddressForm, setShowAddressForm] = useState(false)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = deliveryMethod === "delivery" ? 500000 : 0
  const total = subtotal + shipping

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2">Đặt mua xe</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href="/cart" className="hover:text-foreground">
              Giỏ hàng
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Đặt mua</span>
          </div>
        </div>
      </div>

      <div className="container py-8 w-full mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Delivery Method */}
            <Card>
              <CardHeader>
                <CardTitle>Phương thức nhận hàng</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={deliveryMethod}
                  onValueChange={(value) => {
                    setDeliveryMethod(value)
                    if (value === "delivery") {
                      setShowAddressForm(true)
                    }
                  }}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <RadioGroupItem value="store" id="store" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="store" className="flex items-center text-base font-medium cursor-pointer">
                        <Store className="h-5 w-5 mr-2 text-primary" />
                        Đến cửa hàng thanh toán
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Quý khách vui lòng đến cửa hàng để xem xe và thanh toán trực tiếp
                      </p>

                      {deliveryMethod === "store" && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h3 className="font-medium mb-2">Chọn cửa hàng</h3>
                            <RadioGroup defaultValue="store1" className="space-y-3">
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="store1" id="store1" className="mt-1" />
                                <div>
                                  <Label htmlFor="store1" className="font-medium cursor-pointer">
                                    Chi nhánh Quận 1
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="store2" id="store2" className="mt-1" />
                                <div>
                                  <Label htmlFor="store2" className="font-medium cursor-pointer">
                                    Chi nhánh Quận 7
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    456 Đường Nguyễn Thị Thập, Phường Tân Phú, Quận 7, TP. Hồ Chí Minh
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-start space-x-3">
                                <RadioGroupItem value="store3" id="store3" className="mt-1" />
                                <div>
                                  <Label htmlFor="store3" className="font-medium cursor-pointer">
                                    Chi nhánh Quận 9
                                  </Label>
                                  <p className="text-sm text-muted-foreground">
                                    789 Đường Lê Văn Việt, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh
                                  </p>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>

                          <div>
                            <Label htmlFor="store-note">Ghi chú</Label>
                            <Textarea
                              id="store-note"
                              placeholder="Ghi chú về thời gian đến cửa hàng hoặc yêu cầu khác"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="delivery" className="flex items-center text-base font-medium cursor-pointer">
                        <Truck className="h-5 w-5 mr-2 text-primary" />
                        Giao tận nơi
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Xe sẽ được giao đến địa chỉ của quý khách (phí vận chuyển: {formatPrice(500000)})
                      </p>

                      {deliveryMethod === "delivery" && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="font-medium">Địa chỉ giao hàng</h3>
                              <Button variant="outline" size="sm" onClick={() => setShowAddressForm(!showAddressForm)}>
                                {showAddressForm ? "Chọn địa chỉ có sẵn" : "Thêm địa chỉ mới"}
                              </Button>
                            </div>

                            {!showAddressForm ? (
                              <RadioGroup defaultValue="address1" className="space-y-3">
                                <div className="flex items-start space-x-3">
                                  <RadioGroupItem value="address1" id="address1" className="mt-1" />
                                  <div>
                                    <Label htmlFor="address1" className="font-medium cursor-pointer">
                                      Nguyễn Văn A
                                    </Label>
                                    <p className="text-sm">0912345678</p>
                                    <p className="text-sm text-muted-foreground">
                                      123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                  <RadioGroupItem value="address2" id="address2" className="mt-1" />
                                  <div>
                                    <Label htmlFor="address2" className="font-medium cursor-pointer">
                                      Nguyễn Văn A
                                    </Label>
                                    <p className="text-sm">0912345678</p>
                                    <p className="text-sm text-muted-foreground">
                                      456 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh
                                    </p>
                                  </div>
                                </div>
                              </RadioGroup>
                            ) : (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="full-name">Họ và tên</Label>
                                    <Input id="full-name" placeholder="Nguyễn Văn A" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="phone">Số điện thoại</Label>
                                    <Input id="phone" placeholder="0912345678" />
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="address">Địa chỉ</Label>
                                  <Input id="address" placeholder="Số nhà, tên đường" />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="province">Tỉnh/Thành phố</Label>
                                    <select id="province" className="w-full h-10 px-3 rounded-md border">
                                      <option value="">Chọn Tỉnh/TP</option>
                                      <option value="hcm">TP. Hồ Chí Minh</option>
                                      <option value="hn">Hà Nội</option>
                                    </select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="district">Quận/Huyện</Label>
                                    <select id="district" className="w-full h-10 px-3 rounded-md border">
                                      <option value="">Chọn Quận/Huyện</option>
                                      <option value="q1">Quận 1</option>
                                      <option value="q2">Quận 2</option>
                                    </select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="ward">Phường/Xã</Label>
                                    <select id="ward" className="w-full h-10 px-3 rounded-md border">
                                      <option value="">Chọn Phường/Xã</option>
                                      <option value="bn">Bến Nghé</option>
                                      <option value="cl">Cầu Kho</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="delivery-note">Ghi chú giao hàng</Label>
                            <Textarea
                              id="delivery-note"
                              placeholder="Ghi chú về thời gian giao hàng hoặc yêu cầu khác"
                              className="mt-1"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle>Phương thức thanh toán</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="cash" className="space-y-4">
                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <RadioGroupItem value="cash" id="cash" className="mt-1" />
                    <div>
                      <Label htmlFor="cash" className="flex items-center text-base font-medium cursor-pointer">
                        <CreditCard className="h-5 w-5 mr-2 text-primary" />
                        Thanh toán tiền mặt
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">Thanh toán khi nhận hàng hoặc tại cửa hàng</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <RadioGroupItem value="e-wallet" id="e-wallet" className="mt-1" />
                    <div className="w-full">
                      <Label htmlFor="e-wallet" className="flex items-center text-base font-medium cursor-pointer">
                        <Wallet className="h-5 w-5 mr-2 text-primary" />
                        Thanh toán qua ví điện tử
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">Thanh toán qua các ví điện tử phổ biến</p>

                      <div className="mt-4 grid grid-cols-4 gap-4">
                        <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-primary">
                          <Image
                            src="/placeholder.svg?height=40&width=40&text=MoMo"
                            alt="MoMo"
                            width={40}
                            height={40}
                          />
                          <span className="text-sm mt-2">MoMo</span>
                        </div>
                        <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-primary">
                          <Image
                            src="/placeholder.svg?height=40&width=40&text=ZaloPay"
                            alt="ZaloPay"
                            width={40}
                            height={40}
                          />
                          <span className="text-sm mt-2">ZaloPay</span>
                        </div>
                        <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-primary">
                          <Image
                            src="/placeholder.svg?height=40&width=40&text=VNPay"
                            alt="VNPay"
                            width={40}
                            height={40}
                          />
                          <span className="text-sm mt-2">VNPay</span>
                        </div>
                        <div className="border rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-primary">
                          <Image
                            src="/placeholder.svg?height=40&width=40&text=ShopeePay"
                            alt="ShopeePay"
                            width={40}
                            height={40}
                          />
                          <span className="text-sm mt-2">ShopeePay</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </RadioGroup>
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
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
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
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phí vận chuyển</span>
                    <span>{shipping > 0 ? formatPrice(shipping) : "Miễn phí"}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Tổng cộng</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Coupon Code */}
                <div className="pt-2">
                  <Label htmlFor="coupon">Mã giảm giá</Label>
                  <div className="flex mt-1">
                    <Input id="coupon" placeholder="Nhập mã giảm giá" className="rounded-r-none" />
                    <Button className="rounded-l-none">Áp dụng</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" size="lg">
                  <Link href="/payment">Tiến hành thanh toán</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
