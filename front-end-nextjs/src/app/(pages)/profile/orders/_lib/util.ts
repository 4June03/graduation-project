// Format price to VND
export function formatPrice(price: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

// Get status badge variant
export function getStatusVariant(
  status: string
): "default" | "outline" | "destructive" | "secondary" {
  switch (status) {
    case "DELIVERED":
      return "default";
    case "SHIPPED":
      return "outline";
    case "CONFIRMED":
      return "secondary";
    case "PENDING":
      return "outline";
    case "CANCELLED":
      return "destructive";
    default:
      return "outline";
  }
}

// Filter orders by status
export function filterOrdersByStatus(orders: any[], status: string) {
  if (status === "all") return orders;
  return orders.filter((order) => order.orderStatus === status);
}

// Filter orders by search query
export function filterOrdersBySearch(orders: any[], searchQuery: string) {
  if (!searchQuery) return orders;
  return orders.filter((order) =>
    order.orderId.toString().includes(searchQuery.toLowerCase())
  );
}

// Sort orders by date
export function sortOrdersByDate(orders: any[], sortOrder: string) {
  return [...orders].sort((a, b) => {
    const dateA = new Date(a.orderDate);
    const dateB = new Date(b.orderDate);

    if (sortOrder === "newest") {
      return dateB.getTime() - dateA.getTime();
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });
}
