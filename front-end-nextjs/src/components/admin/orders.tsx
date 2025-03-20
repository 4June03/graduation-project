"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Search,
  Truck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Sample data
const ordersData = [
  {
    id: "ORD-1234",
    customer: "Nguyen Van A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    date: "2023-10-15",
    status: "Delivered",
    total: 30000000,
    payment: "Credit Card",
    items: [{ id: 1, name: "Honda Wave Alpha", price: 30000000, quantity: 1 }],
  },
  {
    id: "ORD-1235",
    customer: "Tran Thi B",
    email: "tranthib@example.com",
    phone: "0912345678",
    date: "2023-10-14",
    status: "Processing",
    total: 50000000,
    payment: "Bank Transfer",
    items: [
      { id: 2, name: "Yamaha Exciter 155", price: 50000000, quantity: 1 },
    ],
  },
  {
    id: "ORD-1236",
    customer: "Le Van C",
    email: "levanc@example.com",
    phone: "0923456789",
    date: "2023-10-12",
    status: "Shipped",
    total: 35000000,
    payment: "Cash on Delivery",
    items: [{ id: 3, name: "Honda Vision", price: 35000000, quantity: 1 }],
  },
  {
    id: "ORD-1237",
    customer: "Pham Thi D",
    email: "phamthid@example.com",
    phone: "0934567890",
    date: "2023-10-10",
    status: "Delivered",
    total: 70000000,
    payment: "Credit Card",
    items: [{ id: 4, name: "Honda SH 150i", price: 70000000, quantity: 1 }],
  },
  {
    id: "ORD-1238",
    customer: "Hoang Van E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    date: "2023-10-08",
    status: "Cancelled",
    total: 35000000,
    payment: "Bank Transfer",
    items: [{ id: 5, name: "Yamaha Grande", price: 35000000, quantity: 1 }],
  },
  {
    id: "ORD-1239",
    customer: "Nguyen Thi F",
    email: "nguyenthif@example.com",
    phone: "0956789012",
    date: "2023-10-05",
    status: "Pending",
    total: 45000000,
    payment: "Cash on Delivery",
    items: [
      { id: 6, name: "Suzuki Raider R150", price: 45000000, quantity: 1 },
    ],
  },
  {
    id: "ORD-1240",
    customer: "Tran Van G",
    email: "tranvang@example.com",
    phone: "0967890123",
    date: "2023-10-03",
    status: "Delivered",
    total: 46000000,
    payment: "Credit Card",
    items: [{ id: 7, name: "Honda Winner X", price: 46000000, quantity: 1 }],
  },
  {
    id: "ORD-1241",
    customer: "Le Thi H",
    email: "lethih@example.com",
    phone: "0978901234",
    date: "2023-10-01",
    status: "Refunded",
    total: 90000000,
    payment: "Credit Card",
    items: [{ id: 8, name: "Yamaha YZF R15", price: 90000000, quantity: 1 }],
  },
];

export function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "date",
    direction: "descending",
  });
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);

  // Sorting function
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered orders
  const getFilteredOrders = () => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      let matchesDate = true;
      if (dateFilter.from && dateFilter.to) {
        const orderDate = new Date(order.date);
        const fromDate = new Date(dateFilter.from);
        const toDate = new Date(dateFilter.to);
        matchesDate = orderDate >= fromDate && orderDate <= toDate;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  };

  const getSortedOrders = () => {
    const filteredOrders = getFilteredOrders();

    return [...filteredOrders].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle update order status
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Shipped":
        return <Badge className="bg-blue-500">{status}</Badge>;
      case "Processing":
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-orange-500">{status}</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500">{status}</Badge>;
      case "Refunded":
        return <Badge className="bg-purple-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Handle select all orders
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(getSortedOrders().map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Handle select single order
  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFilter({ from: "", to: "" });
    setIsFilterPopoverOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled={selectedOrders.length === 0}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter((order) => order.status === "Pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter((order) => order.status === "Processing").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.filter((order) => order.status === "Delivered").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
          <CardDescription>View and manage customer orders.</CardDescription>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full sm:w-[300px]"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Shipped">Shipped</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Popover
              open={isFilterPopoverOpen}
              onOpenChange={setIsFilterPopoverOpen}
            >
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Orders</h4>
                  <div className="space-y-2">
                    <Label htmlFor="date-from">Date From</Label>
                    <Input
                      id="date-from"
                      type="date"
                      value={dateFilter.from}
                      onChange={(e) =>
                        setDateFilter({ ...dateFilter, from: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-to">Date To</Label>
                    <Input
                      id="date-to"
                      type="date"
                      value={dateFilter.to}
                      onChange={(e) =>
                        setDateFilter({ ...dateFilter, to: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Button variant="outline" size="sm" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setIsFilterPopoverOpen(false)}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <Checkbox
                    onCheckedChange={handleSelectAll}
                    checked={
                      selectedOrders.length === getSortedOrders().length &&
                      getSortedOrders().length > 0
                    }
                  />
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  Order ID
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("customer")}
                >
                  Customer
                  {sortConfig.key === "customer" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead
                  className="hidden md:table-cell cursor-pointer"
                  onClick={() => requestSort("date")}
                >
                  Date
                  {sortConfig.key === "date" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => requestSort("total")}
                >
                  Total
                  {sortConfig.key === "total" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSortedOrders().map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={() => handleSelectOrder(order.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <p>{order.customer}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.date}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    {order.total.toLocaleString()}₫
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentOrder(order);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem
                          disabled={order.status === "Pending"}
                          onClick={() =>
                            handleUpdateStatus(order.id, "Pending")
                          }
                        >
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={order.status === "Processing"}
                          onClick={() =>
                            handleUpdateStatus(order.id, "Processing")
                          }
                        >
                          Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={order.status === "Shipped"}
                          onClick={() =>
                            handleUpdateStatus(order.id, "Shipped")
                          }
                        >
                          <Truck className="mr-2 h-4 w-4" />
                          Shipped
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={order.status === "Delivered"}
                          onClick={() =>
                            handleUpdateStatus(order.id, "Delivered")
                          }
                        >
                          Delivered
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={order.status === "Cancelled"}
                          onClick={() =>
                            handleUpdateStatus(order.id, "Cancelled")
                          }
                          className="text-red-600"
                        >
                          Cancelled
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          disabled={order.status === "Refunded"}
                          onClick={() =>
                            handleUpdateStatus(order.id, "Refunded")
                          }
                        >
                          Refunded
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {getSortedOrders().length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No orders found. Try a different search term or filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Order Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              View complete order information.
            </DialogDescription>
          </DialogHeader>
          {currentOrder && (
            <div className="py-4">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Order Details</TabsTrigger>
                  <TabsTrigger value="customer">Customer Info</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4 pt-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {currentOrder.id}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Placed on {currentOrder.date}
                      </p>
                    </div>
                    <div>{getStatusBadge(currentOrder.status)}</div>
                  </div>

                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentOrder.items.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right">
                              {item.price.toLocaleString()}₫
                            </TableCell>
                            <TableCell className="text-right">
                              {item.quantity}
                            </TableCell>
                            <TableCell className="text-right">
                              {(item.price * item.quantity).toLocaleString()}₫
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="text-right font-medium"
                          >
                            Subtotal
                          </TableCell>
                          <TableCell className="text-right">
                            {currentOrder.total.toLocaleString()}₫
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="text-right font-medium"
                          >
                            Tax (10%)
                          </TableCell>
                          <TableCell className="text-right">
                            {(currentOrder.total * 0.1).toLocaleString()}₫
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            className="text-right font-bold"
                          >
                            Total
                          </TableCell>
                          <TableCell className="text-right font-bold">
                            {(currentOrder.total * 1.1).toLocaleString()}₫
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Payment Information</h4>
                      <p>Method: {currentOrder.payment}</p>
                      <p>Status: Paid</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Shipping Information</h4>
                      <p>Method: Standard Delivery</p>
                      <p>Status: {currentOrder.status}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="customer" className="space-y-4 pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Customer Information</h4>
                      <p className="font-semibold">{currentOrder.customer}</p>
                      <p>Email: {currentOrder.email}</p>
                      <p>Phone: {currentOrder.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <p>123 Example Street</p>
                      <p>District 1, Ho Chi Minh City</p>
                      <p>Vietnam</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Billing Address</h4>
                      <p>Same as shipping address</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsViewDialogOpen(false)}
            >
              Close
            </Button>
            <Button>Print Invoice</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
