"use client";

import { ProfileLayout } from "@/components/client/profile/profile-layout";
import { OrderList } from "@/components/client/profile/order-list";

// Mock data for orders
const orders = [
  {
    id: "ORD123456",
    date: "15/03/2023",
    total: 102900000,
    status: "completed",
    items: [
      {
        id: 1,
        name: "Honda SH 150i",
        quantity: 1,
        price: 102900000,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    paymentMethod: "Tiền mặt",
    deliveryMethod: "Giao tận nơi",
    deliveryAddress:
      "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    timeline: [
      { status: "Đặt hàng", date: "15/03/2023 08:30", completed: true },
      { status: "Xác nhận", date: "15/03/2023 09:15", completed: true },
      { status: "Đóng gói", date: "15/03/2023 10:45", completed: true },
      { status: "Vận chuyển", date: "15/03/2023 13:20", completed: true },
      { status: "Giao hàng", date: "15/03/2023 16:30", completed: true },
    ],
  },
  {
    id: "ORD123457",
    date: "10/03/2023",
    total: 17800000,
    status: "shipping",
    items: [
      {
        id: 2,
        name: "Honda Wave Alpha",
        quantity: 1,
        price: 17800000,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    paymentMethod: "Ví điện tử MoMo",
    deliveryMethod: "Giao tận nơi",
    deliveryAddress:
      "456 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    timeline: [
      { status: "Đặt hàng", date: "10/03/2023 14:20", completed: true },
      { status: "Xác nhận", date: "10/03/2023 15:05", completed: true },
      { status: "Đóng gói", date: "11/03/2023 09:30", completed: true },
      { status: "Vận chuyển", date: "11/03/2023 14:15", completed: true },
      { status: "Giao hàng", date: "Dự kiến 12/03/2023", completed: false },
    ],
  },
  {
    id: "ORD123458",
    date: "05/03/2023",
    total: 49990000,
    status: "processing",
    items: [
      {
        id: 3,
        name: "Suzuki Raider R150",
        quantity: 1,
        price: 49990000,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    paymentMethod: "Tiền mặt",
    deliveryMethod: "Đến cửa hàng",
    deliveryAddress:
      "Chi nhánh Quận 1, 123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    timeline: [
      { status: "Đặt hàng", date: "05/03/2023 10:15", completed: true },
      { status: "Xác nhận", date: "05/03/2023 11:30", completed: true },
      { status: "Chuẩn bị xe", date: "Đang xử lý", completed: false },
      { status: "Sẵn sàng nhận", date: "Chưa sẵn sàng", completed: false },
    ],
  },
  {
    id: "ORD123459",
    date: "01/03/2023",
    total: 850000,
    status: "pending",
    items: [
      {
        id: 4,
        name: "Mũ bảo hiểm Honda chính hãng",
        quantity: 1,
        price: 850000,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    paymentMethod: "Chưa thanh toán",
    deliveryMethod: "Giao tận nơi",
    deliveryAddress:
      "789 Đường Lê Văn Việt, Phường Hiệp Phú, Quận 9, TP. Hồ Chí Minh",
    timeline: [
      { status: "Đặt hàng", date: "01/03/2023 16:45", completed: true },
      { status: "Xác nhận", date: "Đang chờ xác nhận", completed: false },
    ],
  },
  {
    id: "ORD123460",
    date: "25/02/2023",
    total: 45500000,
    status: "cancelled",
    items: [
      {
        id: 5,
        name: "Yamaha Grande",
        quantity: 1,
        price: 45500000,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    paymentMethod: "Hủy đơn hàng",
    deliveryMethod: "Giao tận nơi",
    deliveryAddress:
      "123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    timeline: [
      { status: "Đặt hàng", date: "25/02/2023 09:10", completed: true },
      {
        status: "Hủy đơn",
        date: "25/02/2023 14:30",
        completed: true,
        isCancelled: true,
      },
    ],
    cancelReason: "Khách hàng đổi ý",
  },
];

export default function OrdersPage() {
  return (
    <ProfileLayout title="Đơn hàng của tôi" activeTab="orders">
      <OrderList orders={orders} />
    </ProfileLayout>
  );
}
