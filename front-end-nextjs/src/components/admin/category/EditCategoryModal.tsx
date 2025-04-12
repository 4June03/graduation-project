"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useQueryClient } from "@tanstack/react-query";
import { useDataMutation } from "@/hooks/useCRUD";
import { toast } from "sonner";

const editCategorySchema = z.object({
  categoryName: z.string({ message: "Tên danh mục không hợp lệ" }),
  description: z.string({ message: "Mô tả không hợp lệ" }),
});
interface editCategoryModalProps {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (value: boolean) => void;
  currentCategory: any;
}

const EditCategoryModal: FC<editCategoryModalProps> = ({
  isEditDialogOpen,
  setIsEditDialogOpen,
  currentCategory,
}) => {
  const { useUpdate } = useDataMutation(["category"]);
  const queryClient = useQueryClient();
  const handleEditCategory = (data: z.infer<typeof editCategorySchema>) => {
    const idToUpdate: number = Number(currentCategory.categoryId);
    console.log("id to update:", idToUpdate);
    useUpdate.mutate(
      { url: `/categories/${idToUpdate}`, data: data },
      {
        onSuccess: () => {
          toast.success("Cập nhật danh mục thành công!");
          queryClient.invalidateQueries({ queryKey: ["categories"] });
        },
      }
    );
    setIsEditDialogOpen(false);
    console.log(data);
  };

  console.log("current cate:", currentCategory);

  const form = useForm({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      categoryName: currentCategory.categoryName,
      description: currentCategory.description,
    },
  });

  useEffect(() => {
    if (currentCategory) {
      form.reset({
        categoryName: currentCategory.categoryName,
        description: currentCategory.description,
      });
    }
  }, [currentCategory, form]);

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sửa danh mục</DialogTitle>
          <DialogDescription>
            Thay đổi nhưng thông tin của danh mục
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditCategory)}
            className="grid gap-4 py-4"
          >
            <FormField
              name="categoryName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>Tên danh mục</FormLabel>
                    <FormControl>
                      <Input
                        id="categoryName"
                        {...field}
                        placeholder="Category name"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        {...field}
                        placeholder="Category description"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Hủy
              </Button>
              <Button type="submit">Lưu</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategoryModal;
