"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, X, ShoppingBag, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { cleanImageUrl, removeFromCart } from "../_lib/service";
import { toast } from "sonner";
import { useAuth } from "@/components/provider/AuthProvider";
import { CartData, CartItem } from "@/app/(pages)/cart/type";

interface CartClientProps {
  initialCartData: CartData;
}

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CartClient({ initialCartData }: CartClientProps) {
  const [cartData, setCartData] = useState<CartData>(initialCartData);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [isRemoving, setIsRemoving] = useState<number | null>(null);

  // Remove item from cart
  const handleRemoveItem = async (cartItemId: number, userId: number) => {
    setIsRemoving(cartItemId);

    try {
      await removeFromCart({ userId, cartItemId });

      // Update cart data by removing the item
      const updatedCartItems = cartData.cartItemList.filter(
        (item) => item.cartItemId !== cartItemId
      );
      const newTotal = updatedCartItems.reduce(
        (sum, item) => sum + item.variantPrice,
        0
      );
      const newGrandTotal = newTotal + cartData.shippingFee - couponDiscount;

      setCartData({
        ...cartData,
        cartItemList: updatedCartItems,
        total: newTotal,
        grandTotal: newGrandTotal,
      });

      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    } catch (error) {
      toast.error("Không thể xóa sản phẩm khỏi giỏ hàng");
    } finally {
      setIsRemoving(null);
    }
  };

  // Clear all items from cart
  const handleClearCart = () => {
    // TODO: Implement clear all cart API
    setCartData({
      ...cartData,
      cartItemList: [],
      total: 0,
      grandTotal: cartData.shippingFee,
    });

    toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng");
  };

  // Apply coupon (mock implementation)
  const applyCoupon = () => {
    if (couponCode.toLowerCase() === "motorbike10") {
      setCouponApplied(true);
      const discount = Math.round(cartData.total * 0.1); // 10% discount
      setCouponDiscount(discount);

      setCartData({
        ...cartData,
        grandTotal: cartData.total + cartData.shippingFee - discount,
      });

      toast.success("Đã áp dụng mã giảm giá");
    } else {
      setCouponApplied(false);
      setCouponDiscount(0);

      toast.error("Mã giảm giá không hợp lệ");
    }
  };

  const { cartItemList, total, shippingFee, grandTotal } = cartData;
  const { userId } = useAuth();

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container w-full mx-auto">
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

      <div className="container py-8 w-full mx-auto">
        {cartItemList.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Sản phẩm ({cartItemList.length})
                </h2>
                <Button
                  variant="ghost"
                  className="text-muted-foreground"
                  onClick={handleClearCart}
                >
                  Xóa tất cả
                </Button>
              </div>

              {/* Cart Item List */}
              <div className="space-y-4">
                {cartItemList.map((item: CartItem) => {
                  const imageURL = cleanImageUrl(item.imageUrl);

                  return (
                    <Card key={item.cartItemId} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
                            <Image
                              src={
                                imageURL ||
                                "/placeholder.svg?height=100&width=100"
                              }
                              alt={item.motorbikeName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <Link
                                  href={`/products/${item.bikeId}`}
                                  className="font-medium hover:text-primary"
                                >
                                  {item.motorbikeName}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                  {item.variantName} - {item.colorName}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground"
                                onClick={() =>
                                  handleRemoveItem(item.cartItemId, userId || 0)
                                }
                                disabled={isRemoving === item.cartItemId}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex justify-between items-end mt-4">
                              <div className="text-sm text-muted-foreground">
                                Số lượng: 1
                              </div>
                              <div className="text-right">
                                <p className="font-medium">
                                  {formatPrice(item.variantPrice)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Related Products */}
              {/* <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">
                  Có thể bạn cũng thích
                </h2>
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
                          <h3 className="font-medium text-sm line-clamp-2">
                            Phụ kiện xe máy {id}
                          </h3>
                          <p className="text-primary font-bold mt-1">
                            {formatPrice(350000 * id)}
                          </p>
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
              </div> */}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Tóm tắt đơn hàng
                  </h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Phí vận chuyển
                        </span>
                        <span>{formatPrice(shippingFee)}</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between font-medium text-lg">
                      <span>Tổng cộng</span>
                      <span className="text-primary">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>

                    <Button asChild className="w-full" size="lg">
                      <Link href="/checkout">
                        Tiến hành đặt hàng
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>

                    <div className="text-center">
                      <Button
                        variant="link"
                        asChild
                        className="text-muted-foreground"
                      >
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
            <p className="text-muted-foreground mb-6">
              Bạn chưa thêm sản phẩm nào vào giỏ hàng
            </p>
            <Button asChild>
              <Link href="/categories">Khám phá sản phẩm</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
