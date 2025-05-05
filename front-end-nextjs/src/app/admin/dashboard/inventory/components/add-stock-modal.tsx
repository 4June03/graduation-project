"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { InventoryItem } from "./inventory-client"

const addStockSchema = z.object({
  quantity: z.coerce.number().int().positive({ message: "Số lượng phải là số nguyên dương" }),
  supplier: z.string().min(2, { message: "Nhà cung cấp phải có ít nhất 2 ký tự" }),
  invoiceNumber: z.string().min(1, { message: "Số hóa đơn không được để trống" }),
})

type AddStockFormValues = z.infer<typeof addStockSchema>

interface AddStockModalProps {
  isOpen: boolean
  onClose: () => void
  item: InventoryItem
  onAddStock: (itemId: number, quantity: number) => void
}

export function AddStockModal({ isOpen, onClose, item, onAddStock }: AddStockModalProps) {
  const form = useForm<AddStockFormValues>({
    resolver: zodResolver(addStockSchema),
    defaultValues: {
      quantity: 1,
      supplier: "",
      invoiceNumber: "",
    },
  })

  function handleSubmit(values: AddStockFormValues) {
    onAddStock(item.id, values.quantity)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nhập thêm hàng</DialogTitle>
          <DialogDescription>Nhập thêm hàng cho sản phẩm {item.name}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Sản phẩm:</p>
                <p>{item.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Tồn kho hiện tại:</p>
                <p>{item.stock} chiếc</p>
              </div>
            </div>

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng nhập thêm</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập số lượng"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhà cung cấp</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên nhà cung cấp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="invoiceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số hóa đơn</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập số hóa đơn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Nhập hàng</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
