"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Edit,
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

// Sample data
const categoriesData = [
  {
    id: 1,
    name: "Sport Bikes",
    description: "High-performance motorcycles designed for speed",
    products: 24,
    createdAt: "2023-01-15",
  },
  {
    id: 2,
    name: "Cruisers",
    description: "Comfortable motorcycles for long rides",
    products: 18,
    createdAt: "2023-02-10",
  },
  {
    id: 3,
    name: "Scooters",
    description: "Easy to ride urban transportation",
    products: 32,
    createdAt: "2023-03-05",
  },
  {
    id: 4,
    name: "Off-Road",
    description: "Motorcycles designed for rough terrain",
    products: 15,
    createdAt: "2023-04-20",
  },
  {
    id: 5,
    name: "Touring",
    description: "Motorcycles for long-distance travel",
    products: 12,
    createdAt: "2023-05-12",
  },
  {
    id: 6,
    name: "Standard",
    description: "Versatile motorcycles for everyday use",
    products: 28,
    createdAt: "2023-06-18",
  },
  {
    id: 7,
    name: "Electric",
    description: "Eco-friendly electric motorcycles",
    products: 9,
    createdAt: "2023-07-22",
  },
];

export function Categories() {
  const [categories, setCategories] = useState(categoriesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  // Sorting function
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered categories
  const getSortedCategories = () => {
    const filteredCategories = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return [...filteredCategories].sort((a, b) => {
      const key = sortConfig.key as keyof typeof a;
      if (a[key] < b[key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  // Handle add category
  const handleAddCategory = () => {
    const id = Math.max(...categories.map((c) => c.id)) + 1;
    const today = new Date().toISOString().split("T")[0];

    setCategories([
      ...categories,
      {
        id,
        name: newCategory.name,
        description: newCategory.description,
        products: 0,
        createdAt: today,
      },
    ]);

    setNewCategory({ name: "", description: "" });
    setIsAddDialogOpen(false);
  };

  // Handle edit category
  const handleEditCategory = () => {
    setCategories(
      categories.map((category) =>
        category.id === currentCategory?.id
          ? {
              ...category,
              name: currentCategory?.name,
              description: currentCategory?.description,
            }
          : category
      )
    );
    setIsEditDialogOpen(false);
  };

  // Handle delete category
  const handleDeleteCategory = () => {
    setCategories(
      categories.filter((category) => category.id !== currentCategory?.id)
    );
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>
                Create a new category for your motorcycle products.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory({ ...newCategory, name: e.target.value })
                  }
                  placeholder="Category name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                  placeholder="Category description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>
            Manage your motorcycle categories and subcategories.
          </CardDescription>
          <div className="flex items-center gap-2 pt-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 md:w-[300px]"
            />
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
                  Name
                  {sortConfig.key === "name" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Description
                </TableHead>
                <TableHead
                  className="cursor-pointer text-right"
                  onClick={() => requestSort("products")}
                >
                  Products
                  {sortConfig.key === "products" &&
                    (sortConfig.direction === "ascending" ? (
                      <ChevronUp className="ml-1 h-4 w-4 inline" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4 inline" />
                    ))}
                </TableHead>
                <TableHead
                  className="hidden md:table-cell cursor-pointer"
                  onClick={() => requestSort("createdAt")}
                >
                  Created At
                  {sortConfig.key === "createdAt" &&
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
              {getSortedCategories().map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.id}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-right">
                    {category.products}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {category.createdAt}
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
                            setCurrentCategory(category);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setCurrentCategory(category);
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
              {getSortedCategories().length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    No categories found. Try a different search term.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Make changes to the category details.
            </DialogDescription>
          </DialogHeader>
          {currentCategory && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={currentCategory.name}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Input
                  id="edit-description"
                  value={currentCategory.description}
                  onChange={(e) =>
                    setCurrentCategory({
                      ...currentCategory,
                      description: e.target.value,
                    })
                  }
                />
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
            <Button onClick={handleEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          {currentCategory && (
            <div className="py-4">
              <p>
                You are about to delete: <strong>{currentCategory.name}</strong>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                This will remove the category and all its associations.
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
