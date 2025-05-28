"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, Truck, CreditCard, Store } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import { createOrder, calculateShippingFee } from "../_lib/service";
import { CheckoutData, CheckoutFormData } from "@/app/(pages)/checkout/type";
import { toast } from "sonner";
import { cleanImageUrl } from "@/app/(pages)/cart/_lib/service";
import { useAuth } from "@/components/provider/AuthProvider";

interface CheckoutClientProps {
  initialData: CheckoutData;
}

// Format price to VND
function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CheckoutClient({ initialData }: CheckoutClientProps) {
  const router = useRouter();
  const { cartData, userData } = initialData;
  const { token } = useAuth();
  const [formData, setFormData] = useState<CheckoutFormData>({
    deliveryMethod: "STORE_PICKUP",
    paymentMethod: "CASH",
  });
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate totals
  const subtotal = cartData?.grandTotal || 0;
  const shippingFee = calculateShippingFee(formData.deliveryMethod);
  const total = subtotal + shippingFee;

  const handleDeliveryMethodChange = (
    value: "HOME_DELIVERY" | "STORE_PICKUP"
  ) => {
    setFormData((prev) => ({
      ...prev,
      deliveryMethod: value,
      shippingAddressId:
        value === "HOME_DELIVERY"
          ? userData.addresses[0]?.addressId
          : undefined,
    }));
  };

  const handleAddressChange = (addressId: string) => {
    setFormData((prev) => ({
      ...prev,
      shippingAddressId: Number.parseInt(addressId),
    }));
  };

  const handleSubmit = async () => {
    if (!cartData?.cartItemList?.length) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.");
      return;
    }

    if (
      formData.deliveryMethod === "HOME_DELIVERY" &&
      !formData.shippingAddressId
    ) {
      toast.error("Vui lòng chọn địa chỉ giao hàng.");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderData = {
        deliveryMethod: formData.deliveryMethod,
        paymentMethod: formData.paymentMethod,
        subtotal,
        shippingFee,
        ...(formData.deliveryMethod === "HOME_DELIVERY" && {
          shippingAddressId: formData.shippingAddressId,
        }),
      };

      const result = await createOrder(orderData, token);

      if (result.success) {
        toast.success(`Đơn hàng #${result.data.orderNumber} đã được tạo.`);
        // router.push(`/payment?orderId=${result.data.orderId}`);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error creating order:", error);

      toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cartData?.cartItemList?.length) {
    return (
      <main className="flex min-h-screen flex-col">
        <div className="bg-muted/30 py-6">
          <div className="container">
            <h1 className="text-3xl font-bold mb-2">Đặt mua xe</h1>
          </div>
        </div>
        <div className="container py-8">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Giỏ hàng trống</p>
              <Button asChild className="mt-4">
                <Link href="/">Tiếp tục mua sắm</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
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

      <div className="container py-8">
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
                  value={formData.deliveryMethod}
                  onValueChange={handleDeliveryMethodChange}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <RadioGroupItem
                      value="STORE_PICKUP"
                      id="store"
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="store"
                        className="flex items-center text-base font-medium cursor-pointer"
                      >
                        <Store className="h-5 w-5 mr-2 text-primary" />
                        Đến cửa hàng thanh toán
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Quý khách vui lòng đến cửa hàng để xem xe và thanh toán
                        trực tiếp
                      </p>

                      {formData.deliveryMethod === "STORE_PICKUP" && (
                        <div className="mt-4">
                          <div>
                            <Label htmlFor="store-note">Ghi chú</Label>
                            <Textarea
                              id="store-note"
                              placeholder="Ghi chú về thời gian đến cửa hàng hoặc yêu cầu khác"
                              className="mt-1"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <RadioGroupItem
                      value="HOME_DELIVERY"
                      id="delivery"
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="delivery"
                        className="flex items-center text-base font-medium cursor-pointer"
                      >
                        <Truck className="h-5 w-5 mr-2 text-primary" />
                        Giao tận nơi
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Xe sẽ được giao đến địa chỉ của quý khách (phí vận
                        chuyển: {formatPrice(500000)})
                      </p>

                      {formData.deliveryMethod === "HOME_DELIVERY" && (
                        <div className="mt-4 space-y-4">
                          <div className="bg-muted/30 p-4 rounded-lg">
                            <h3 className="font-medium mb-4">
                              Địa chỉ giao hàng
                            </h3>

                            {userData.addresses?.length > 0 ? (
                              <RadioGroup
                                value={formData.shippingAddressId?.toString()}
                                onValueChange={handleAddressChange}
                                className="space-y-3"
                              >
                                {userData.addresses.map((address: any) => (
                                  <div
                                    key={address.addressId}
                                    className="flex items-start space-x-3"
                                  >
                                    <RadioGroupItem
                                      value={address.addressId.toString()}
                                      id={`address-${address.addressId}`}
                                      className="mt-1"
                                    />
                                    <div>
                                      <Label
                                        htmlFor={`address-${address.addressId}`}
                                        className="font-medium cursor-pointer"
                                      >
                                        {userData.firstName} {userData.lastName}
                                      </Label>
                                      <p className="text-sm">
                                        {userData.phone}
                                      </p>
                                      <p className="text-sm text-muted-foreground">
                                        {address.addressDetail}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </RadioGroup>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                Chưa có địa chỉ giao hàng.
                                <Link
                                  href="/profile/addresses"
                                  className="text-primary hover:underline ml-1"
                                >
                                  Thêm địa chỉ mới
                                </Link>
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="delivery-note">
                              Ghi chú giao hàng
                            </Label>
                            <Textarea
                              id="delivery-note"
                              placeholder="Ghi chú về thời gian giao hàng hoặc yêu cầu khác"
                              className="mt-1"
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
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
                <div className="flex items-start space-x-3 border rounded-lg p-4">
                  <div className="mt-1">
                    <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary"></div>
                  </div>
                  <div>
                    <Label className="flex items-center text-base font-medium">
                      <CreditCard className="h-5 w-5 mr-2 text-primary" />
                      Thanh toán khi nhận hàng (COD)
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Thanh toán khi nhận xe
                    </p>
                  </div>
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
                {/* Cart Items */}
                <div className="space-y-3">
                  {(cartData.cartItemList || [])?.map((item: any) => {
                    const imageUrl = cleanImageUrl(item?.imageUrl);

                    return (
                      <div key={item.cartItemId} className="flex gap-3">
                        <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                          <Image
                            src={imageUrl || "/placeholder.svg"}
                            alt={item.motorbikeName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium line-clamp-1">
                            {item.bikeName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.variantName}
                          </p>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm">SL: {item.quantity}</span>
                            <span className="font-medium">
                              {formatPrice(item.variantPrice)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Separator />

                {/* Price Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Phí vận chuyển
                    </span>
                    <span>
                      {shippingFee > 0 ? formatPrice(shippingFee) : "Miễn phí"}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Tổng cộng</span>
                    <span className="text-primary">
                      {formatPrice(subtotal + shippingFee)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? "Đang xử lý..." : "Đặt hàng"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
