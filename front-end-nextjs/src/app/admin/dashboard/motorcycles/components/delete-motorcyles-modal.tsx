"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface DeleteMotorcycleModalProps {
  isOpen: boolean;
  onClose: () => void;
  motorcycleId: number;
  motorcycleName: string;
}

export function DeleteMotorcycleModal({
  isOpen,
  onClose,
  motorcycleId,
  motorcycleName,
}: DeleteMotorcycleModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);

      // Gọi API xóa motorbike
      const response = await fetch(
        `http://localhost:8080/motorbikes/${motorcycleId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Lỗi khi xóa xe: ${response.status}`);
      }

      toast.success(`Đã xóa xe ${motorcycleName}`);

      onClose();
    } catch (error) {
      console.error("Lỗi khi xóa xe:", error);

      toast.error(`Lỗi khi xóa xe: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xác nhận xóa</DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn xóa xe{" "}
            <span className="font-medium">{motorcycleName}</span>? Hành động này
            không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Hủy
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xóa...
              </>
            ) : (
              "Xóa"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
