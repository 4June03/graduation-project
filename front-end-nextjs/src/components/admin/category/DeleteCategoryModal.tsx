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
  const handleDeleteCategory = () => {
    console.log("Xóa danh mục thành công");
  };

  return (
    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this category? This action cannot be
            undone.
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
