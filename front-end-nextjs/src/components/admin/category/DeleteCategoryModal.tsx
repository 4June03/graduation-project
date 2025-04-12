"use client";
import React, { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDataMutation } from "@/hooks/useCRUD";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface deleteCategoryModalProps {
  isDeleteDialogOpen?: boolean;
  setIsDeleteDialogOpen: (value: boolean) => void;
  currentCategory: any;
}

const DeleteCategoryModal: FC<deleteCategoryModalProps> = ({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  currentCategory,
}) => {
  const { useDelete } = useDataMutation(["category"]);
  const queryClient = useQueryClient();

  const handleDeleteCategory = () => {
    console.log("Xóa danh mục:", currentCategory.categoryId);
    useDelete.mutate(
      {
        url: `/categories/${currentCategory.categoryId}`,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["categories"] });
          toast.success("Xóa danh mục thành công!");
          setIsDeleteDialogOpen(false);
        },
      }
    );
    console.log("Xóa danh mục thành công");
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Xóa danh mục</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa danh mục này không?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p>
            Bạn có muốn xóa danh mục:{" "}
            <strong>{currentCategory.categoryName}</strong>
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This will remove the category and all its associations.
          </p>
        </div>

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
  );
};

export default DeleteCategoryModal;
