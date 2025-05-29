"use client";

import { useState, useEffect } from "react";
import { CalendarIcon, RefreshCw } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { OrderActionDropdown } from "./order-action-dropdown";
import { OrderDetailModal } from "./order-detail-modal";
import {
  ApiOrder,
  ORDER_STATUS_OPTIONS,
  OrderDetail,
  PAYMENT_STATUS_OPTIONS,
} from "@/app/admin/dashboard/orders/type";
import {
  formatCurrency,
  getAllOrders,
  getDeliveryMethodText,
  getOrderDetail,
  getOrderStatusColor,
  getOrderStatusText,
  getPaymentStatusColor,
  getPaymentStatusText,
  updateOrderStatus,
  updatePaymentStatus,
} from "@/app/admin/dashboard/orders/_lib/service";
import { toast } from "sonner";

const statusFilterOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  ...ORDER_STATUS_OPTIONS,
];

const paymentFilterOptions = [
  { value: "all", label: "Tất cả thanh toán" },
  ...PAYMENT_STATUS_OPTIONS,
];

export function OrdersClient() {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [selectedOrderDetail, setSelectedOrderDetail] =
    useState<OrderDetail | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // Load orders from API
  const loadOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await getAllOrders();
      setOrders(ordersData);
    } catch (error) {
      toast.error("Không thể tải danh sách đơn hàng");
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load orders on component mount
  useEffect(() => {
    loadOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.orderStatus === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || order.paymentStatus === paymentFilter;
    const matchesDate =
      !date ||
      format(new Date(order.orderDate), "yyyy-MM-dd") ===
        format(date, "yyyy-MM-dd");

    return matchesStatus && matchesPayment && matchesDate;
  });

  // Handle order status change
  const handleOrderStatusChange = async (
    orderId: number,
    newStatus: ApiOrder["orderStatus"]
  ) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      // Update local state
      setOrders(
        orders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                orderStatus: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : order
        )
      );

      // If the detail modal is open for this order, update the detail too
      if (selectedOrderId === orderId && selectedOrderDetail) {
        setSelectedOrderDetail({
          ...selectedOrderDetail,
          orderStatus: newStatus,
          updatedAt: new Date().toISOString(),
        });
      }

      toast.success("Cập nhật trạng thái đơn hàng thành công");
    } catch (error) {
      console.error("Error updating order status:", error);

      toast.error("Không thể cập nhật trạng thái đơn hàng");
    }
  };

  // Handle payment status change
  const handlePaymentStatusChange = async (
    orderId: number,
    newStatus: ApiOrder["paymentStatus"]
  ) => {
    try {
      await updatePaymentStatus(orderId, newStatus);

      // Update local state
      setOrders(
        orders.map((order) =>
          order.orderId === orderId
            ? {
                ...order,
                paymentStatus: newStatus,
                updatedAt: new Date().toISOString(),
              }
            : order
        )
      );

      // If the detail modal is open for this order, update the detail too
      if (selectedOrderId === orderId && selectedOrderDetail) {
        setSelectedOrderDetail({
          ...selectedOrderDetail,
          paymentStatus: newStatus,
          updatedAt: new Date().toISOString(),
        });
      }

      toast.success("Cập nhật trạng thái thanh toán thành công");
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Không thể cập nhật trạng thái thanh toán");
    }
  };

  // Handle view details
  const handleViewDetails = async (order: ApiOrder) => {
    try {
      setSelectedOrderId(order.orderId);
      setLoadingDetail(true);
      setDetailModalOpen(true);

      const orderDetail = await getOrderDetail(order.orderId);
      setSelectedOrderDetail(orderDetail);
    } catch (error) {
      console.error("Error fetching order detail:", error);
      toast.error("Không thể lấy chi tiết đơn hàng");
      setDetailModalOpen(false);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedOrderId(null);
    setSelectedOrderDetail(null);
  };

  const clearFilters = () => {
    setDate(undefined);
    setStatusFilter("all");
    setPaymentFilter("all");
  };

  const hasActiveFilters =
    date || statusFilter !== "all" || paymentFilter !== "all";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lí đơn hàng</h1>
        <Button onClick={loadOrders} disabled={loading} variant="outline">
          <RefreshCw
            className={cn("mr-2 h-4 w-4", loading && "animate-spin")}
          />
          Làm mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
          <CardDescription>
            Quản lý tất cả các đơn hàng trong hệ thống ({filteredOrders.length}{" "}
            đơn hàng)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="w-full lg:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái đơn hàng" />
                </SelectTrigger>
                <SelectContent>
                  {statusFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full lg:w-[200px]">
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái thanh toán" />
                </SelectTrigger>
                <SelectContent>
                  {paymentFilterOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full lg:w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : "Chọn ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="h-10">
                Xóa bộ lọc
              </Button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin mr-2" />
              <span>Đang tải dữ liệu...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã đơn</TableHead>
                  <TableHead>Ngày đặt</TableHead>
                  <TableHead>Phương thức giao hàng</TableHead>
                  <TableHead>Tổng tiền</TableHead>
                  <TableHead>Trạng thái đơn hàng</TableHead>
                  <TableHead>Trạng thái thanh toán</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const totalAmount =
                      (order.subtotal || 0) + (order.shippingFee || 0);

                    return (
                      <TableRow key={order.orderId}>
                        <TableCell className="font-medium">
                          #{order.orderId}
                        </TableCell>
                        <TableCell>
                          {format(new Date(order.orderDate), "dd/MM/yyyy")}
                        </TableCell>
                        <TableCell>
                          {getDeliveryMethodText(order.deliveryMethod)}
                        </TableCell>
                        <TableCell>{formatCurrency(totalAmount)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                              order.orderStatus
                            )}`}
                          >
                            {getOrderStatusText(order.orderStatus)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                              order.paymentStatus
                            )}`}
                          >
                            {getPaymentStatusText(order.paymentStatus)}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <OrderActionDropdown
                            order={order}
                            onOrderStatusChange={handleOrderStatusChange}
                            onPaymentStatusChange={handlePaymentStatusChange}
                            onViewDetails={() => handleViewDetails(order)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      {hasActiveFilters
                        ? "Không tìm thấy đơn hàng phù hợp với bộ lọc"
                        : "Chưa có đơn hàng nào"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <OrderDetailModal
        orderDetail={selectedOrderDetail}
        isOpen={detailModalOpen}
        onClose={handleCloseDetailModal}
        isLoading={loadingDetail}
        onOrderStatusChange={handleOrderStatusChange}
        onPaymentStatusChange={handlePaymentStatusChange}
      />
    </div>
  );
}
