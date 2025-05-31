"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OrderTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function OrderTabs({ activeTab, onTabChange }: OrderTabsProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <TabsList className="grid grid-cols-6">
        <TabsTrigger value="all">Tất cả</TabsTrigger>
        <TabsTrigger value="PENDING">Chờ xử lý</TabsTrigger>
        <TabsTrigger value="CONFIRMED">Đã xác nhận</TabsTrigger>
        <TabsTrigger value="SHIPPED">Đang giao</TabsTrigger>
        <TabsTrigger value="DELIVERED">Đã giao</TabsTrigger>
        <TabsTrigger value="CANCELLED">Đã hủy</TabsTrigger>
      </TabsList>
    </div>
  );
}
