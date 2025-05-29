"use client";

import { format } from "date-fns";
import { RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ApiOrder,
  ORDER_STATUS_OPTIONS,
  OrderDetail,
  PAYMENT_STATUS_OPTIONS,
} from "@/app/admin/dashboard/orders/type";
import {
  formatCurrency,
  getDeliveryMethodText,
  getFullName,
  getOrderStatusColor,
  getOrderStatusText,
  getPaymentStatusColor,
  getPaymentStatusText,
} from "@/app/admin/dashboard/orders/_lib/service";

interface OrderDetailModalProps {
  orderDetail: OrderDetail | null;
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onOrderStatusChange: (
    orderId: number,
    newStatus: ApiOrder["orderStatus"]
  ) => void;
  onPaymentStatusChange: (
    orderId: number,
    newStatus: ApiOrder["paymentStatus"]
  ) => void;
}

export function OrderDetailModal({
  orderDetail,
  isOpen,
  isLoading,
  onClose,
  onOrderStatusChange,
  onPaymentStatusChange,
}: OrderDetailModalProps) {
  if (!isOpen) return null;

  // Calculate total amount
  const totalAmount = orderDetail
    ? orderDetail.totalAmount !== null
      ? orderDetail.totalAmount
      : (orderDetail.subtotal || 0) + (orderDetail.shippingFee || 0)
    : 0;

  // Filter out current status from options
  const orderStatusOptions = orderDetail
    ? ORDER_STATUS_OPTIONS.filter(
        (option) => option.value !== orderDetail.orderStatus
      )
    : [];
  const paymentStatusOptions = orderDetail
    ? PAYMENT_STATUS_OPTIONS.filter(
        (option) => option.value !== orderDetail.paymentStatus
      )
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto w-full">
        <DialogHeader>
          <DialogTitle>
            {orderDetail
              ? `Chi tiết đơn hàng #${orderDetail.orderId}`
              : "Chi tiết đơn hàng"}
          </DialogTitle>
          <DialogDescription>Thông tin chi tiết về đơn hàng</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin mr-2" />
            <span>Đang tải dữ liệu...</span>
          </div>
        ) : orderDetail ? (
          <div className="space-y-6">
            {/* Order Status Actions */}
            <div className="flex flex-wrap gap-2 justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Cập nhật trạng thái đơn hàng
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {orderStatusOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() =>
                        onOrderStatusChange(
                          orderDetail.orderId,
                          option.value as ApiOrder["orderStatus"]
                        )
                      }
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Cập nhật trạng thái thanh toán
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {paymentStatusOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() =>
                        onPaymentStatusChange(
                          orderDetail.orderId,
                          option.value as ApiOrder["paymentStatus"]
                        )
                      }
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Order Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Thông tin đơn hàng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mã đơn hàng:</span>
                    <span className="font-medium">#{orderDetail.orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày đặt:</span>
                    <span>
                      {format(new Date(orderDetail.orderDate), "dd/MM/yyyy")}
                    </span>
                  </div>
                  {orderDetail.updatedAt && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Cập nhật lần cuối:
                      </span>
                      <span>
                        {format(
                          new Date(orderDetail.updatedAt),
                          "dd/MM/yyyy HH:mm"
                        )}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Phương thức giao hàng:
                    </span>
                    <span>
                      {getDeliveryMethodText(orderDetail.deliveryMethod)}
                    </span>
                  </div>
                  {orderDetail.paymentMethod && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Phương thức thanh toán:
                      </span>
                      <span>{orderDetail.paymentMethod}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Trạng thái đơn hàng:
                    </span>
                    <Badge
                      className={getOrderStatusColor(orderDetail.orderStatus)}
                    >
                      {getOrderStatusText(orderDetail.orderStatus)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Trạng thái thanh toán:
                    </span>
                    <Badge
                      className={getPaymentStatusColor(
                        orderDetail.paymentStatus
                      )}
                    >
                      {getPaymentStatusText(orderDetail.paymentStatus)}
                    </Badge>
                  </div>
                  {orderDetail.branchName && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Chi nhánh:</span>
                      <span>{orderDetail.branchName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Thông tin khách hàng
              </h3>
              {orderDetail.user ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Họ tên:</span>
                      <span>{getFullName(orderDetail.user)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Email:</span>
                      <span>{orderDetail.user.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Số điện thoại:
                      </span>
                      <span>{orderDetail.user.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ngày sinh:</span>
                      <span>
                        {format(new Date(orderDetail.user.dob), "dd/MM/yyyy")}
                      </span>
                    </div>
                  </div>

                  {orderDetail.shippingAddress && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Địa chỉ giao hàng:
                        </span>
                        <span className="text-right">
                          {orderDetail.shippingAddress.addressDetail}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-muted-foreground">
                  Không có thông tin khách hàng
                </div>
              )}
            </div>

            <Separator />

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Sản phẩm đặt hàng</h3>
              {orderDetail.orderItems && orderDetail.orderItems.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Phiên bản</TableHead>
                      <TableHead>Màu sắc</TableHead>
                      <TableHead>Số lượng</TableHead>
                      <TableHead className="text-right">Giá</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetail.orderItems.map((item) => (
                      <TableRow key={item.orderItemId}>
                        <TableCell className="font-medium">
                          {item.motorbikeName}
                        </TableCell>
                        <TableCell>{item.variantName}</TableCell>
                        <TableCell>{item.colorName}</TableCell>
                        <TableCell>{item.quantity || 1}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrency(item.price)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-muted-foreground">
                  Không có sản phẩm nào
                </div>
              )}
            </div>

            <Separator />

            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Tóm tắt đơn hàng</h3>
              <div className="space-y-2">
                {orderDetail.subtotal !== null && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tạm tính:</span>
                    <span>{formatCurrency(orderDetail.subtotal)}</span>
                  </div>
                )}
                {orderDetail.shippingFee !== null && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Phí giao hàng:
                    </span>
                    <span>{formatCurrency(orderDetail.shippingFee)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            Không thể tải thông tin đơn hàng
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
