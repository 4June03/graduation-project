"use client"

import { format } from "date-fns"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { type Order, getStatusColor, getStatusText } from "./orders-client"

interface OrderDetailModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailModal({ order, isOpen, onClose }: OrderDetailModalProps) {
  if (!order) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn hàng #{order.id}</DialogTitle>
          <DialogDescription>Thông tin chi tiết về đơn hàng</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Thông tin đơn hàng</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mã đơn:</span>
                <span className="font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngày đặt:</span>
                <span>{format(order.date, "dd/MM/yyyy")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trạng thái:</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tổng tiền:</span>
                <span className="font-medium">{order.total} VND</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Thông tin khách hàng</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Khách hàng:</span>
                <span>{order.customer}</span>
              </div>
              {/* Thêm thông tin khách hàng khác nếu có */}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số điện thoại:</span>
                <span>0912 345 678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span>khachhang@example.com</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Địa chỉ:</span>
                <span>123 Đường ABC, Quận XYZ, TP. HCM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Chi tiết sản phẩm</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sản phẩm</TableHead>
                <TableHead>Phiên bản</TableHead>
                <TableHead>Màu sắc</TableHead>
                <TableHead className="text-right">Giá (VND)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{order.motorcycle}</TableCell>
                <TableCell>Tiêu chuẩn</TableCell>
                <TableCell>Đen</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Lịch sử đơn hàng</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>{format(new Date(2023, 2, 15), "dd/MM/yyyy HH:mm")}</span>
              <span>Đơn hàng được tạo</span>
            </div>
            <div className="flex justify-between">
              <span>{format(new Date(2023, 2, 16), "dd/MM/yyyy HH:mm")}</span>
              <span>Đơn hàng được xác nhận</span>
            </div>
            <div className="flex justify-between">
              <span>{format(new Date(2023, 2, 18), "dd/MM/yyyy HH:mm")}</span>
              <span>Đơn hàng đã hoàn thành</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
