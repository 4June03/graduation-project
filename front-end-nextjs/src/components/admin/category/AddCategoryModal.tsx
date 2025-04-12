"use client";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDataMutation } from "@/hooks/useCRUD";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";

interface AddCategoryModalProps {
  isAddDialogOpen?: boolean;
  setIsAddDialogOpen?: (value: boolean) => void;
}

const addCategorySchema = z.object({
  categoryName: z.string({ message: "Tên danh mục không hợp lệ" }),
  description: z.string({ message: "Mô tả không hợp lệ" }),
});

const AddCategoryModal: FC<AddCategoryModalProps> = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { useCreate } = useDataMutation(["category"]);
  const queryClient = useQueryClient();
  const handleAddCategory = (data: z.infer<typeof addCategorySchema>) => {
    console.log(data);

    useCreate.mutate(
      {
        url: "/categories",
        data: data,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Thêm danh mục thành công!");
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          setIsAddDialogOpen(false);
        },
      }
    );
  };

  const form = useForm({
    resolver: zodResolver(addCategorySchema),
    defaultValues: {
      categoryName: "",
      description: "",
    },
  });

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm danh mục mới</DialogTitle>
          <DialogDescription>
            Tạo một danh mục mới cho cửa hàng xe.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddCategory)}
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
                      <Input id="name" {...field} placeholder="Category name" />
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
                        id="name"
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
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Category</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
