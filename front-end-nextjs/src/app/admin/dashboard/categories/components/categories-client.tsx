"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  AddCategoryModal,
  type CategoryFormValues,
} from "./add-category-modal";
import { EditCategoryModal } from "./edit-category-modal";
import { DeleteCategoryModal } from "./delete-category-modal";
import { useDataMutation, useFetchData } from "@/hooks/useCRUD";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

// Define the type for our category
export type Category = {
  categoryId: number;
  categoryName: string;
  description: string;
  createdAt: string;
};

// Mock data for categories
const initialCategories = [
  { id: 1, name: "Xe số", description: "Xe máy số phổ thông", count: 24 },
  {
    id: 2,
    name: "Xe tay ga",
    description: "Xe máy tay ga hiện đại",
    count: 36,
  },
  {
    id: 3,
    name: "Xe côn tay",
    description: "Xe máy côn tay thể thao",
    count: 18,
  },
  {
    id: 4,
    name: "Xe phân khối lớn",
    description: "Xe máy phân khối lớn",
    count: 12,
  },
  {
    id: 5,
    name: "Xe điện",
    description: "Xe máy điện thân thiện môi trường",
    count: 8,
  },
];

export function CategoriesClient() {
  // const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const {
    data: apiResponse,
    isFetching,
    error,
  } = useFetchData<{
    success: boolean;
    message: string;
    data: Category[];
  }>(["categories"], `/categories`);
  const { useCreate, useUpdate, useDelete } = useDataMutation<Category>([
    "categories",
  ]);
  const queryClient = useQueryClient();
  const categories = apiResponse?.data || [];

  // Handle adding a new category
  function onAddSubmit(values: CategoryFormValues) {
    console.log("Giá trị thêm mới: ", values);
    useCreate.mutate(
      {
        url: "/categories",
        data: {
          categoryName: values.categoryName,
          description: values.description,
        },
      },
      {
        onSuccess: (data) => {
          toast.success("Thêm mới danh mục thành công thành công");

          queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
          toast.error("Thêm mới danh mục thất bại");
          console.error("Lỗi thêm mới: ", error);
        },
      }
    );
  }

  // Handle editing a category
  function onEditSubmit(values: CategoryFormValues) {
    if (!currentCategory) return;
    console.log("Giá trị sửa: ", values);
    useUpdate.mutate(
      {
        url: `/categories/${currentCategory.categoryId}`,
        data: {
          categoryName: values.categoryName,
          description: values.description,
        },
      },
      {
        onSuccess: (data) => {
          toast.success("Cập nhật danh mục thành công thành công");

          queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
          toast.error("Cập nhật danh mục thất bại");
          console.error("Lỗi cập nhật: ", error);
        },
      }
    );
    setCurrentCategory(null);
  }

  // Handle deleting a category
  function onDelete(id: number) {
    useDelete.mutate(
      {
        url: `/categories/${id}`,
      },
      {
        onSuccess: () => {
          toast.success("Xóa thành công thành công");

          queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
        onError: (error) => {
          toast.error("Xóa danh mục thất bại");
          console.error("Lỗi xóa danh mục: ", error);
        },
      }
    );
  }

  // Open edit dialog and set current category
  function handleEdit(category: Category) {
    setCurrentCategory(category);
    setIsEditOpen(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lí danh mục xe</h1>
        <AddCategoryModal onSubmit={onAddSubmit} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh mục xe</CardTitle>
          <CardDescription>
            Quản lý các danh mục xe máy trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Tên danh mục</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Ngày tạo</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories &&
                categories?.map((category, index) => (
                  <TableRow key={category.categoryId}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{category.categoryName}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell>{category.createdAt}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Sửa
                        </Button>
                        <DeleteCategoryModal
                          category={category}
                          onDelete={onDelete}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Category Modal */}
      <EditCategoryModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        category={currentCategory}
        onSubmit={onEditSubmit}
      />
    </div>
  );
}
