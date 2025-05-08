"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"

interface FavoritesHeaderProps {
  totalItems: number
  selectedItems: number[]
  onSelectAll: () => void
  onRemoveSelected: () => void
}

export function FavoritesHeader({ totalItems, selectedItems, onSelectAll, onRemoveSelected }: FavoritesHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2">
        <Checkbox
          id="select-all"
          checked={selectedItems.length === totalItems && totalItems > 0}
          onCheckedChange={onSelectAll}
        />
        <label htmlFor="select-all" className="text-sm font-medium">
          Chọn tất cả ({totalItems})
        </label>
      </div>

      {selectedItems.length > 0 && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Xóa đã chọn ({selectedItems.length})
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Xóa sản phẩm yêu thích</AlertDialogTitle>
              <AlertDialogDescription>
                Bạn có chắc chắn muốn xóa {selectedItems.length} sản phẩm đã chọn khỏi danh sách yêu thích?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Hủy</AlertDialogCancel>
              <AlertDialogAction onClick={onRemoveSelected} className="bg-red-500 hover:bg-red-600">
                Xóa
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  )
}
