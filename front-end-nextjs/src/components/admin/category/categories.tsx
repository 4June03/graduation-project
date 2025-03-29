"use client";

import { use, useState } from "react";
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

import AddCategoryModal from "@/components/admin/category/AddCategoryModal";
import EditCategoryModal from "@/components/admin/category/EditCategoryModal";
import DeleteCategoryModal from "@/components/admin/category/DeleteCategoryModal";
import { useFetchData } from "@/hooks/useCRUD";

import { ClipLoader } from "react-spinners";

interface Category {
  categoryId: number;
  categoryName: string;
  description: string;
  createdAt: string;
}

interface CategoriesResponse {
  success: boolean;
  message: string;
  data: Category[];
}

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
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [currentCategory, setCurrentCategory] = useState<Category>({
    categoryId: 0,
    categoryName: "",
    description: "",
    createdAt: "",
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const {
    data: categorySample,
    isLoading,
    isError,
  } = useFetchData<CategoriesResponse>(["categories"], "categories");
  console.log("data fetch bởi useFetchData", categorySample?.data);
  const [categories, setCategories] = useState(categoriesData);
  // Sorting function
  const requestSort = (key: string) => {
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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Categories</h1>

        <AddCategoryModal />
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
              {categorySample?.data.map((category) => (
                <TableRow key={category.categoryId}>
                  {isLoading && (
                    <TableCell className="w-full flex justify-center pt-4">
                      <ClipLoader color="#36d7b7" size={50} />
                    </TableCell>
                  )}
                  <TableCell className="font-medium">
                    {category.categoryId}
                  </TableCell>
                  <TableCell>{category.categoryName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {category.description}
                  </TableCell>
                  <TableCell className="text-right">
                    {category?.categoryName}
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
              {isError && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Lỗi load danh sách category
                  </TableCell>
                </TableRow>
              )}
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-6 text-muted-foreground"
                  >
                    <ClipLoader color="#36d7b7" size={50} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <EditCategoryModal
        currentCategory={currentCategory}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
      />

      {/* Delete Dialog */}
      <DeleteCategoryModal
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        currentCategory={currentCategory}
      />
    </div>
  );
}
