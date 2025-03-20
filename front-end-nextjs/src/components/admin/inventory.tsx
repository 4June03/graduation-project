"use client";

import { useState } from "react";
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Edit,
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
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

// Sample data
const inventoryData = [
  {
    id: 1,
    name: "Honda Wave Alpha",
    sku: "HWA-001",
    category: "Standard",
    stock: 25,
    minStock: 5,
    location: "Warehouse A",
    lastUpdated: "2023-10-15",
    status: "In Stock",
  },
  {
    id: 2,
    name: "Yamaha Exciter 155",
    sku: "YE-155",
    category: "Sport Bikes",
    stock: 15,
    minStock: 5,
    location: "Warehouse A",
    lastUpdated: "2023-10-14",
    status: "In Stock",
  },
  {
    id: 3,
    name: "Honda Vision",
    sku: "HV-001",
    category: "Scooters",
    stock: 20,
    minStock: 5,
    location: "Warehouse B",
    lastUpdated: "2023-10-12",
    status: "In Stock",
  },
  {
    id: 4,
    name: "Honda SH 150i",
    sku: "HSH-150",
    category: "Scooters",
    stock: 10,
    minStock: 5,
    location: "Warehouse A",
    lastUpdated: "2023-10-10",
    status: "In Stock",
  },
  {
    id: 5,
    name: "Yamaha Grande",
    sku: "YG-001",
    category: "Scooters",
    stock: 18,
    minStock: 5,
    location: "Warehouse B",
    lastUpdated: "2023-10-08",
    status: "In Stock",
  },
  {
    id: 6,
    name: "Suzuki Raider R150",
    sku: "SR-150",
    category: "Sport Bikes",
    stock: 0,
    minStock: 5,
    location: "Warehouse A",
    lastUpdated: "2023-10-05",
    status: "Out of Stock",
  },
  {
    id: 7,
    name: "Honda Winner X",
    sku: "HWX-001",
    category: "Sport Bikes",
    stock: 5,
    minStock: 5,
    location: "Warehouse B",
    lastUpdated: "2023-10-03",
    status: "Low Stock",
  },
  {
    id: 8,
    name: "Yamaha YZF R15",
    sku: "YR-15",
    category: "Sport Bikes",
    stock: 3,
    minStock: 5,
    location: "Warehouse A",
    lastUpdated: "2023-10-01",
    status: "Low Stock",
  },
];

const categories = [
  "Sport Bikes",
  "Cruisers",
  "Scooters",
  "Off-Road",
  "Touring",
  "Standard",
  "Electric",
];

const locations = ["Warehouse A", "Warehouse B", "Showroom"];

export function Inventory() {
  const [inventory, setInventory] = useState(inventoryData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [isAdjustDialogOpen, setIsAdjustDialogOpen] = useState(false);
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [adjustQuantity, setAdjustQuantity] = useState("");
  const [restockQuantity, setRestockQuantity] = useState("");

  // Sorting function
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered inventory
  const getFilteredInventory = () => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      const matchesLocation =
        locationFilter === "all" || item.location === locationFilter;

      return (
        matchesSearch && matchesCategory && matchesStatus && matchesLocation
      );
    });
  };

  const getSortedInventory = () => {
    const filteredInventory = getFilteredInventory();

    return [...filteredInventory].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle adjust inventory
  const handleAdjustInventory = () => {
    const newStock =
      Number.parseInt(currentItem.stock) + Number.parseInt(adjustQuantity);
    const status =
      newStock === 0
        ? "Out of Stock"
        : newStock <= currentItem.minStock
        ? "Low Stock"
        : "In Stock";

    setInventory(
      inventory.map((item) =>
        item.id === currentItem.id
          ? {
              ...item,
              stock: newStock,
              status,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );

    setAdjustQuantity("");
    setIsAdjustDialogOpen(false);
  };

  // Handle restock inventory
  const handleRestockInventory = () => {
    const newStock =
      Number.parseInt(currentItem.stock) + Number.parseInt(restockQuantity);
    const status =
      newStock === 0
        ? "Out of Stock"
        : newStock <= currentItem.minStock
        ? "Low Stock"
        : "In Stock";

    setInventory(
      inventory.map((item) =>
        item.id === currentItem.id
          ? {
              ...item,
              stock: newStock,
              status,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );

    setRestockQuantity("");
    setIsRestockDialogOpen(false);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-500">{status}</Badge>;
      case "Low Stock":
        return <Badge className="bg-yellow-500">{status}</Badge>;
      case "Out of Stock":
        return <Badge className="bg-red-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get stock level indicator
  const getStockLevelIndicator = (item) => {
    if (item.stock === 0) {
      return <Progress value={0} className="h-2 w-full" />;
    }

    const percentage = Math.min((item.stock / (item.minStock * 3)) * 100, 100);

    let color = "bg-green-500";
    if (item.stock <= item.minStock) {
      color = "bg-red-500";
    } else if (item.stock <= item.minStock * 2) {
      color = "bg-yellow-500";
    }

    return (
      <div className="flex items-center gap-2">
        <Progress value={percentage} className={`h-2 w-full ${color}`} />
        <span className="text-xs whitespace-nowrap">{item.stock} units</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => {
              const lowStockItems = inventory.filter(
                (item) =>
                  item.status === "Low Stock" || item.status === "Out of Stock"
              );
              if (lowStockItems.length > 0) {
                setCurrentItem(lowStockItems[0]);
                setIsRestockDialogOpen(true);
              }
            }}
          >
            <Truck className="mr-2 h-4 w-4" />
            Restock Items
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventory.filter((item) => item.status === "In Stock").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              {inventory.filter((item) => item.status === "Low Stock").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {
                inventory.filter((item) => item.status === "Out of Stock")
                  .length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Inventory</CardTitle>
          <CardDescription>
            Track and manage your motorcycle inventory.
          </CardDescription>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search inventory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full sm:w-[300px]"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-9 w-full sm:w-[150px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-9 w-full sm:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="In Stock">In Stock</SelectItem>
                  <SelectItem value="Low Stock">Low Stock</SelectItem>
                  <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="h-9 w-full sm:w-[150px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="w-[80px] cursor-pointer"
                  onClick={() => requestSort("id")}
                >
                  ID
                  {sortConfig.key === "id" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  Product
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead className="hidden md:table-cell">SKU</TableHead>
                <TableHead
                  className="hidden md:table-cell cursor-pointer"
                  onClick={() => requestSort("category")}
                >
                  Category
                  {sortConfig.key === "category" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSortedInventory().map((item) => (
                <TableRow
                  key={item.id}
                  className={item.stock <= item.minStock ? "bg-red-50" : ""}
                >
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.sku}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.category}
                  </TableCell>
                  <TableCell className="w-[200px]">
                    {getStockLevelIndicator(item)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {item.location}
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                            setCurrentItem(item);
                            setIsAdjustDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Adjust Stock
                        </DropdownMenuItem>
                        {(item.status === "Low Stock" ||
                          item.status === "Out of Stock") && (
                          <DropdownMenuItem
                            onClick={() => {
                              setCurrentItem(item);
                              setIsRestockDialogOpen(true);
                            }}
                          >
                            <Truck className="mr-2 h-4 w-4" />
                            Restock
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {getSortedInventory().length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No inventory items found. Try a different search term or
                    filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Adjust Inventory Dialog */}
      <Dialog open={isAdjustDialogOpen} onOpenChange={setIsAdjustDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adjust Inventory</DialogTitle>
            <DialogDescription>
              Update the stock quantity for this product.
            </DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="py-4">
              <div className="mb-4">
                <h3 className="font-medium">{currentItem.name}</h3>
                <p className="text-sm text-muted-foreground">
                  SKU: {currentItem.sku}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-sm">Current Stock: {currentItem.stock}</p>
                  {getStatusBadge(currentItem.status)}
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="adjust-quantity">
                    Adjust Quantity (+ or -)
                  </Label>
                  <Input
                    id="adjust-quantity"
                    type="number"
                    value={adjustQuantity}
                    onChange={(e) => setAdjustQuantity(e.target.value)}
                    placeholder="Enter quantity to add or remove"
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter a positive number to add stock or a negative number to
                    remove stock.
                  </p>
                </div>
                {adjustQuantity && (
                  <div className="p-4 rounded-md bg-muted">
                    <p className="font-medium">Preview:</p>
                    <div className="flex items-center gap-2">
                      <p>
                        {currentItem.stock}{" "}
                        {Number.parseInt(adjustQuantity) >= 0 ? "+" : ""}{" "}
                        {adjustQuantity} ={" "}
                        {Number.parseInt(currentItem.stock) +
                          Number.parseInt(adjustQuantity)}
                      </p>
                      {Number.parseInt(adjustQuantity) < 0 &&
                        Number.parseInt(currentItem.stock) +
                          Number.parseInt(adjustQuantity) <
                          0 && <Badge className="bg-red-500">Invalid</Badge>}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAdjustDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAdjustInventory}
              disabled={
                !adjustQuantity ||
                Number.parseInt(currentItem?.stock) +
                  Number.parseInt(adjustQuantity) <
                  0
              }
            >
              Update Stock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Restock Inventory Dialog */}
      <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restock Inventory</DialogTitle>
            <DialogDescription>Add stock to this product.</DialogDescription>
          </DialogHeader>
          {currentItem && (
            <div className="py-4">
              <div className="mb-4">
                <div className="flex items-start gap-2">
                  {currentItem.status === "Out of Stock" ? (
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  )}
                  <div>
                    <h3 className="font-medium">{currentItem.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      SKU: {currentItem.sku}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-sm">
                        Current Stock: {currentItem.stock}
                      </p>
                      {getStatusBadge(currentItem.status)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="restock-quantity">Restock Quantity</Label>
                  <Input
                    id="restock-quantity"
                    type="number"
                    min="1"
                    value={restockQuantity}
                    onChange={(e) => setRestockQuantity(e.target.value)}
                    placeholder="Enter quantity to add"
                  />
                </div>
                {restockQuantity && (
                  <div className="p-4 rounded-md bg-muted">
                    <p className="font-medium">Preview:</p>
                    <div className="flex items-center gap-2">
                      <p>
                        {currentItem.stock} + {restockQuantity} ={" "}
                        {Number.parseInt(currentItem.stock) +
                          Number.parseInt(restockQuantity)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRestockDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleRestockInventory}
              disabled={
                !restockQuantity || Number.parseInt(restockQuantity) <= 0
              }
            >
              Restock
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
