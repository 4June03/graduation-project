"use client";

import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";

import type { ApiOrder, OrderDetail } from "../_lib/service";

// Import all sub-components
import { OrderTabs } from "./order-tabs";

import { OrderList } from "./order-list";
import { OrderDetailHeader } from "./order-detail-header";
import { OrderStatusSection } from "./order-status-section";
import { OrderItemsSection } from "./order-items-section";
import { CustomerInfoSection } from "./customer-info-section";
import { DeliveryInfoSection } from "./delivery-info-section";

import { OrderFilters } from "@/app/(pages)/profile/orders/_components/order-filter";
import {
  filterOrdersBySearch,
  filterOrdersByStatus,
  sortOrdersByDate,
} from "@/app/(pages)/profile/orders/_lib/util";
import { PaymentInfoSection } from "@/app/(pages)/profile/orders/_components/payment-info-section";
import { OrderDetailActions } from "@/app/(pages)/profile/orders/_components/order-detail-action";

interface OrdersClientProps {
  orders: ApiOrder[];
  onGetOrderDetail: (orderId: number) => Promise<OrderDetail>;
}

export function OrdersClient({ orders, onGetOrderDetail }: OrdersClientProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(false);

  // Apply filters and sorting
  const filteredOrders = filterOrdersByStatus(orders, activeTab);
  const searchedOrders = filterOrdersBySearch(filteredOrders, searchQuery);
  const sortedOrders = sortOrdersByDate(searchedOrders, sortOrder);

  // Handle order detail view
  const handleViewDetail = async (orderId: number) => {
    setLoading(true);
    try {
      const orderDetail = await onGetOrderDetail(orderId);
      setSelectedOrder(orderDetail);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      {selectedOrder ? (
        <Card>
          <OrderDetailHeader
            orderId={selectedOrder.orderId}
            onBack={handleBack}
          />
          <CardContent className="space-y-6">
            <OrderStatusSection order={selectedOrder} />
            <OrderItemsSection order={selectedOrder} />
            <CustomerInfoSection order={selectedOrder} />
            <DeliveryInfoSection order={selectedOrder} />
            <PaymentInfoSection order={selectedOrder} />
            <OrderDetailActions order={selectedOrder} onBack={handleBack} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <CardTitle className="mb-6">Đơn hàng của tôi</CardTitle>
            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />
              <OrderFilters
                searchQuery={searchQuery}
                sortOrder={sortOrder}
                onSearchChange={setSearchQuery}
                onSortChange={setSortOrder}
              />
              <OrderList
                orders={sortedOrders}
                activeTab={activeTab}
                onViewDetail={handleViewDetail}
                loading={loading}
              />
            </Tabs>
          </CardContent>
        </Card>
      )}
    </>
  );
}
