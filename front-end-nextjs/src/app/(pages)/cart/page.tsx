"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Mock data for cart items
const initialCartItems = [
  {
    id: 1,
    name: "Honda SH 150i",
    brand: "Honda",
    price: 102900000,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
  {
    id: 2,
    name: "Mũ bảo hiểm Honda chính hãng",
    brand: "Honda",
    price: 850000,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
  },
  {
    id: 3,
    name: "Găng tay bảo hộ Komine GK-163",
    brand: "Komine",
    price: 750000,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    inStock: true,
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

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [couponCode, setCouponCode] = useState("")
  const [couponApplied, setCouponApplied] = useState(false)
  const [couponDiscount, setCouponDiscount] = useState(0)

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 5000000 ? 0 : 500000
  const total = subtotal + shipping - couponDiscount

  // Update quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "motorbike10") {
      setCouponApplied(true)
      setCouponDiscount(Math.round(subtotal * 0.1)) // 10% discount
    } else {
      setCouponApplied(false)
      setCouponDiscount(0)
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Giỏ hàng</h1>
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Trang chủ
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span>Giỏ hàng</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {cartItems.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Sản phẩm ({cartItems.length})</h2>
                <Button variant="ghost" className="text-muted-foreground" onClick={() => setCartItems([])}>
                  Xóa tất cả
                </Button>
              </div>

              {/* Cart Item List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <Link href={`/products/${item.id}`} className="font-medium hover:text-primary">
                                {item.name}
                              </Link>
                              <p className="text-sm text-muted-foreground">{item.brand}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground"
                              onClick={() => removeItem(item.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex justify-between items-end mt-4">
                            <div className="flex items-center border rounded-md">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{formatPrice(item.price)}</p>
                              {item.quantity > 1 && (
                                <p className="text-sm text-muted-foreground">
                                  {formatPrice(item.price)} x {item.quantity}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Related Products */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Có thể bạn cũng thích</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((id) => (
                    <Card key={id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative h-32 w-full">
                          <Image
                            src={`/placeholder.svg?height=150&width=200`}
                            alt={`Sản phẩm đề xuất ${id}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="font-medium text-sm line-clamp-2">Phụ kiện xe máy {id}</h3>
                          <p className="text-primary font-bold mt-1">{formatPrice(350000 * id)}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="p-3 pt-0">
                        <Button variant="outline" size="sm" className="w-full">
                          Thêm vào giỏ
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{formatPrice(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phí vận chuyển</span>
                        <span>{shipping > 0 ? formatPrice(shipping) : "Miễn phí"}</span>
                      </div>
                      {couponApplied && (
                        <div className="flex justify-between text-green-600">
                          <span>Giảm giá (10%)</span>
                          <span>-{formatPrice(couponDiscount)}</span>
                        </div>
                      )}
                    </div>

                    <Separator />

                    <div className="flex justify-between font-medium text-lg">
                      <span>Tổng cộng</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>

                    {subtotal < 5000000 && (
                      <Alert className="bg-muted/50 border-primary/20">
                        <AlertDescription>
                          Mua thêm {formatPrice(5000000 - subtotal)} để được miễn phí vận chuyển
                        </AlertDescription>
                      </Alert>
                    )}

                    {/* Coupon Code */}
                    <div>
                      <Label htmlFor="coupon">Mã giảm giá</Label>
                      <div className="flex mt-1">
                        <Input
                          id="coupon"
                          placeholder="Nhập mã giảm giá"
                          className="rounded-r-none"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button className="rounded-l-none" onClick={applyCoupon} disabled={!couponCode}>
                          Áp dụng
                        </Button>
                      </div>
                      {couponApplied && <p className="text-green-600 text-sm mt-1">Đã áp dụng mã giảm giá 10%</p>}
                      <p className="text-xs text-muted-foreground mt-2">Mã giảm giá mẫu: MOTORBIKE10</p>
                    </div>

                    <Button asChild className="w-full" size="lg">
                      <Link href="/checkout">
                        Tiến hành đặt hàng
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="text-center">
                      <Button variant="link" asChild className="text-muted-foreground">
                        <Link href="/categories">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          Tiếp tục mua sắm
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
            <p className="text-muted-foreground mb-6">Bạn chưa thêm sản phẩm nào vào giỏ hàng</p>
            <Button asChild>
              <Link href="/categories">Khám phá sản phẩm</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  )
}
