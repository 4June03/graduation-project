"use client";

import { ProfileLayout } from "@/components/client/profile/profile-layout";
import { NotificationList } from "@/components/client/profile/notification-list";

// Mock data for notifications
const notifications = [
  {
    id: 1,
    title: "Đơn hàng đã được giao thành công",
    message:
      "Đơn hàng #ORD123456 đã được giao thành công. Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi.",
    date: "15/03/2023 14:30",
    isRead: false,
    type: "order",
    link: "/profile/orders",
  },
  {
    id: 2,
    title: "Khuyến mãi đặc biệt tháng 3",
    message: "Giảm giá lên đến 20% cho các dòng xe phổ thông. Xem ngay!",
    date: "10/03/2023 09:15",
    isRead: false,
    type: "promotion",
    link: "/promotions",
  },
  {
    id: 3,
    title: "Đơn hàng đã được xác nhận",
    message:
      "Đơn hàng #ORD123457 đã được xác nhận và đang được chuẩn bị giao hàng.",
    date: "10/03/2023 08:45",
    isRead: false,
    type: "order",
    link: "/profile/orders",
  },
  {
    id: 4,
    title: "Cập nhật chính sách bảo hành",
    message:
      "Chúng tôi vừa cập nhật chính sách bảo hành mới. Xem chi tiết tại đây.",
    date: "05/03/2023 10:20",
    isRead: true,
    type: "system",
    link: "/warranty",
  },
  {
    id: 5,
    title: "Mẫu xe mới ra mắt",
    message:
      "Honda vừa ra mắt mẫu xe SH 350i mới với nhiều tính năng hiện đại. Khám phá ngay!",
    date: "01/03/2023 15:45",
    isRead: true,
    type: "news",
    link: "/news/5",
  },
  {
    id: 6,
    title: "Nhắc nhở bảo dưỡng xe",
    message:
      "Xe của bạn đã đến thời gian bảo dưỡng định kỳ. Đặt lịch ngay để được hỗ trợ tốt nhất.",
    date: "28/02/2023 11:30",
    isRead: true,
    type: "service",
    link: "/service",
  },
];

export default function NotificationsPage() {
  return (
    <ProfileLayout title="Thông báo" activeTab="notifications">
      <NotificationList initialNotifications={notifications} />
    </ProfileLayout>
  );
}
