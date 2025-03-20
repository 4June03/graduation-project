"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Sample data
const productsData = [
  {
    id: 1,
    name: "Honda Wave Alpha",
    category: "Standard",
    price: 30000000,
    stock: 25,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 2,
    name: "Yamaha Exciter 155",
    category: "Sport Bikes",
    price: 50000000,
    stock: 15,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 3,
    name: "Honda Vision",
    category: "Scooters",
    price: 35000000,
    stock: 20,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 4,
    name: "Honda SH 150i",
    category: "Scooters",
    price: 70000000,
    stock: 10,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 5,
    name: "Yamaha Grande",
    category: "Scooters",
    price: 35000000,
    stock: 18,
    status: "In Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 6,
    name: "Suzuki Raider R150",
    category: "Sport Bikes",
    price: 45000000,
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 7,
    name: "Honda Winner X",
    category: "Sport Bikes",
    price: 46000000,
    stock: 5,
    status: "Low Stock",
    image: "/placeholder.svg?height=50&width=50",
  },
  {
    id: 8,
    name: "Yamaha YZF R15",
    category: "Sport Bikes",
    price: 90000000,
    stock: 3,
    status: "Low Stock",
    image: "/placeholder.svg?height=50&width=50",
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

export function Products() {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    status: "In Stock",
    image: "/placeholder.svg?height=200&width=200",
  });

  // Sorting function
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered products
  const getFilteredProducts = () => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  const getSortedProducts = () => {
    const filteredProducts = getFilteredProducts();

    return [...filteredProducts].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle add product
  const handleAddProduct = () => {
    const id = Math.max(...products.map((p) => p.id)) + 1;
    const status =
      newProduct.stock === "0"
        ? "Out of Stock"
        : Number.parseInt(newProduct.stock) <= 5
        ? "Low Stock"
        : "In Stock";

    setProducts([
      ...products,
      {
        id,
        name: newProduct.name,
        category: newProduct.category,
        price: Number.parseInt(newProduct.price),
        stock: Number.parseInt(newProduct.stock),
        status,
        image: newProduct.image,
      },
    ]);

    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      status: "In Stock",
      image: "/placeholder.svg?height=200&width=200",
    });
    setIsAddDialogOpen(false);
  };

  // Handle edit product
  const handleEditProduct = () => {
    const status =
      currentProduct.stock === 0
        ? "Out of Stock"
        : currentProduct.stock <= 5
        ? "Low Stock"
        : "In Stock";

    setProducts(
      products.map((product) =>
        product.id === currentProduct.id
          ? {
              ...currentProduct,
              status,
            }
          : product
      )
    );
    setIsEditDialogOpen(false);
  };

  // Handle delete product
  const handleDeleteProduct = () => {
    setProducts(products.filter((product) => product.id !== currentProduct.id));
    setIsDeleteDialogOpen(false);
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new motorcycle product in your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                    placeholder="Product name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    onValueChange={(value) =>
                      setNewProduct({ ...newProduct, category: value })
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price (VND)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder="Product price"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, stock: e.target.value })
                    }
                    placeholder="Stock quantity"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
                  }
                  placeholder="Image URL"
                />
                <div className="flex justify-center mt-2">
                  <img
                    src={newProduct.image || "/placeholder.svg"}
                    alt="Product preview"
                    className="h-32 w-32 object-cover border rounded-md"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddProduct}>Add Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Products</CardTitle>
          <CardDescription>
            Manage your motorcycle products inventory.
          </CardDescription>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 w-full sm:w-[300px]"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-9 w-full sm:w-[180px]">
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
                <SelectTrigger className="h-9 w-full sm:w-[180px]">
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
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => requestSort("name")}
                >
                  Name
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
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
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => requestSort("price")}
                >
                  Price
                  {sortConfig.key === "price" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead
                  className="hidden md:table-cell cursor-pointer text-right"
                  onClick={() => requestSort("stock")}
                >
                  Stock
                  {sortConfig.key === "stock" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getSortedProducts().map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.category}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.price.toLocaleString()}₫
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-right">
                    {product.stock}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {getStatusBadge(product.status)}
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
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsViewDialogOpen(true);
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setCurrentProduct(product);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {getSortedProducts().length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No products found. Try a different search term or filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {currentProduct && (
            <div className="grid md:grid-cols-2 gap-6 py-4">
              <div className="flex justify-center">
                <img
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.name}
                  className="h-64 w-64 object-cover rounded-md border"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    {currentProduct.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {currentProduct.category}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-xl font-bold">
                      {currentProduct.price.toLocaleString()}₫
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Stock</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-bold">
                        {currentProduct.stock}
                      </p>
                      {getStatusBadge(currentProduct.status)}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Product ID</p>
                  <p className="text-muted-foreground">{currentProduct.id}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product details.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-name">Product Name</Label>
                  <Input
                    id="edit-name"
                    value={currentProduct.name}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-category">Category</Label>
                  <Select
                    value={currentProduct.category}
                    onValueChange={(value) =>
                      setCurrentProduct({ ...currentProduct, category: value })
                    }
                  >
                    <SelectTrigger id="edit-category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-price">Price (VND)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={currentProduct.price}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={currentProduct.stock}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        stock: Number.parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Image URL</Label>
                <Input
                  id="edit-image"
                  value={currentProduct.image}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      image: e.target.value,
                    })
                  }
                />
                <div className="flex justify-center mt-2">
                  <img
                    src={currentProduct.image || "/placeholder.svg"}
                    alt="Product preview"
                    className="h-32 w-32 object-cover border rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          {currentProduct && (
            <div className="py-4">
              <div className="flex items-center gap-4">
                <img
                  src={currentProduct.image || "/placeholder.svg"}
                  alt={currentProduct.name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div>
                  <p className="font-medium">{currentProduct.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {currentProduct.category}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    {currentProduct.price.toLocaleString()}₫
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
