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
      <DialogContent className="max-w-5xl w-[90vw] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl">
            {orderDetail
              ? `Chi tiết đơn hàng #${orderDetail.orderId}`
              : "Chi tiết đơn hàng"}
          </DialogTitle>
          <DialogDescription>Thông tin chi tiết về đơn hàng</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mr-3" />
            <span className="text-lg">Đang tải dữ liệu...</span>
          </div>
        ) : orderDetail ? (
          <div className="space-y-8">
            {/* Order Status Actions */}
            <div className="flex flex-wrap gap-3 justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
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
                  <Button variant="outline">
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
            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Mã đơn hàng:
                    </span>
                    <span className="font-semibold text-lg">
                      #{orderDetail.orderId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Ngày đặt:
                    </span>
                    <span>
                      {format(new Date(orderDetail.orderDate), "dd/MM/yyyy")}
                    </span>
                  </div>
                  {orderDetail.updatedAt && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
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
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Phương thức giao hàng:
                    </span>
                    <span>
                      {getDeliveryMethodText(orderDetail.deliveryMethod)}
                    </span>
                  </div>
                  {orderDetail.paymentMethod && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Phương thức thanh toán:
                      </span>
                      <span>{orderDetail.paymentMethod}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Trạng thái đơn hàng:
                    </span>
                    <Badge
                      className={`${getOrderStatusColor(
                        orderDetail.orderStatus
                      )} text-sm px-3 py-1`}
                    >
                      {getOrderStatusText(orderDetail.orderStatus)}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Trạng thái thanh toán:
                    </span>
                    <Badge
                      className={`${getPaymentStatusColor(
                        orderDetail.paymentStatus
                      )} text-sm px-3 py-1`}
                    >
                      {getPaymentStatusText(orderDetail.paymentStatus)}
                    </Badge>
                  </div>
                  {orderDetail.branchName && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Chi nhánh:
                      </span>
                      <span>{orderDetail.branchName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Thông tin khách hàng
              </h3>
              {orderDetail.user ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Họ tên:
                      </span>
                      <span className="font-medium">
                        {getFullName(orderDetail.user)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Email:
                      </span>
                      <span>{orderDetail.user.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Số điện thoại:
                      </span>
                      <span>{orderDetail.user.phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground font-medium">
                        Ngày sinh:
                      </span>
                      <span>
                        {format(new Date(orderDetail.user.dob), "dd/MM/yyyy")}
                      </span>
                    </div>
                  </div>

                  {orderDetail.shippingAddress && (
                    <div>
                      <div className="mb-2">
                        <span className="text-muted-foreground font-medium">
                          Địa chỉ giao hàng:
                        </span>
                      </div>
                      <div className="p-3 bg-white rounded border">
                        {orderDetail.shippingAddress.addressDetail}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-muted-foreground py-3">
                  Không có thông tin khách hàng
                </div>
              )}
            </div>

            {/* Order Items */}
            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Sản phẩm đặt hàng</h3>
              {orderDetail.orderItems && orderDetail.orderItems.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[30%]">Sản phẩm</TableHead>
                        <TableHead className="w-[25%]">Phiên bản</TableHead>
                        <TableHead className="w-[15%]">Màu sắc</TableHead>
                        <TableHead className="w-[10%]">Số lượng</TableHead>
                        <TableHead className="w-[20%] text-right">
                          Giá
                        </TableHead>
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
                </div>
              ) : (
                <div className="text-muted-foreground py-3">
                  Không có sản phẩm nào
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-slate-50 p-5 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h3>
              <div className="space-y-3 max-w-md ml-auto">
                {orderDetail.subtotal !== null && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Tạm tính:
                    </span>
                    <span>{formatCurrency(orderDetail.subtotal)}</span>
                  </div>
                )}
                {orderDetail.shippingFee !== null && (
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      Phí giao hàng:
                    </span>
                    <span>{formatCurrency(orderDetail.shippingFee)}</span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-2">
              <Button variant="outline" onClick={onClose}>
                Đóng
              </Button>
              <Button>In hóa đơn</Button>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-muted-foreground">
            Không thể tải thông tin đơn hàng
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
