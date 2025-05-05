"use client"

import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Promotion } from "./promotions-client"

interface DeletePromotionModalProps {
  isOpen: boolean
  onClose: () => void
  promotion: Promotion
  onDelete: () => void
}

export function DeletePromotionModal({ isOpen, onClose, promotion, onDelete }: DeletePromotionModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xác nhận xóa khuyến mãi</AlertDialogTitle>
          <AlertDialogDescription>
            Bạn có chắc chắn muốn xóa khuyến mãi "{promotion.name}"? Hành động này không thể hoàn tác.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="font-medium">Tên khuyến mãi:</div>
            <div>{promotion.name}</div>
            <div className="font-medium">Mô tả:</div>
            <div>{promotion.description}</div>
            <div className="font-medium">Giảm giá:</div>
            <div>{promotion.discount}</div>
            <div className="font-medium">Thời gian:</div>
            <div>
              {format(promotion.startDate, "dd/MM/yyyy")} - {format(promotion.endDate, "dd/MM/yyyy")}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete} className="bg-destructive text-destructive-foreground">
            Xóa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
