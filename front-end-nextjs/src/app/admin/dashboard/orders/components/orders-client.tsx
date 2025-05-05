"use client";

import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";

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
import { Calendar } from "@/components/ui/calendar";

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface Order {
  id: string;
  customer: string;
  motorcycle: string;
  date: Date;
  total: string;
  status: OrderStatus;
}

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Nguyễn Văn A",
    motorcycle: "Honda Wave Alpha",
    date: new Date(2023, 2, 15),
    total: "18,500,000",
    status: "completed",
  },
  {
    id: "ORD-002",
    customer: "Trần Thị B",
    motorcycle: "Yamaha Exciter 155",
    date: new Date(2023, 2, 18),
    total: "50,200,000",
    status: "processing",
  },
  {
    id: "ORD-003",
    customer: "Lê Văn C",
    motorcycle: "Honda Vision",
    date: new Date(2023, 2, 20),
    total: "32,500,000",
    status: "completed",
  },
  {
    id: "ORD-004",
    customer: "Phạm Thị D",
    motorcycle: "Honda SH",
    date: new Date(2023, 2, 22),
    total: "95,800,000",
    status: "processing",
  },
  {
    id: "ORD-005",
    customer: "Hoàng Văn E",
    motorcycle: "Yamaha NVX",
    date: new Date(2023, 2, 25),
    total: "42,300,000",
    status: "pending",
  },
  {
    id: "ORD-006",
    customer: "Ngô Thị F",
    motorcycle: "Suzuki Raider",
    date: new Date(2023, 2, 28),
    total: "49,500,000",
    status: "cancelled",
  },
];

export const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "processing", label: "Đang xử lý" },
  { value: "completed", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
];

export const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "pending":
      return "Chờ xử lý";
    case "processing":
      return "Đang xử lý";
    case "completed":
      return "Hoàn thành";
    case "cancelled":
      return "Đã hủy";
    default:
      return status;
  }
};

export function OrdersClient() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "all" || order.status === statusFilter) &&
      (!date || format(order.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
  );

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lí đơn hàng</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
          <CardDescription>
            Quản lý tất cả các đơn hàng trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="w-full md:w-[200px]">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
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
                      "w-full md:w-[240px] justify-start text-left font-normal",
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
            {date && (
              <Button
                variant="ghost"
                onClick={() => setDate(undefined)}
                className="h-10"
              >
                Xóa bộ lọc ngày
              </Button>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Xe</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Tổng tiền (VND)</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.motorcycle}</TableCell>
                  <TableCell>{format(order.date, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <OrderActionDropdown
                      order={order}
                      onStatusChange={handleStatusChange}
                      onViewDetails={() => handleViewDetails(order)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <OrderDetailModal
        order={selectedOrder}
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
      />
    </div>
  );
}
