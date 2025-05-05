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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { InventoryItem } from "./inventory-client"

const updateInventorySchema = z.object({
  name: z.string().min(2, { message: "Tên xe phải có ít nhất 2 ký tự" }),
  brand: z.string().min(1, { message: "Hãng xe không được để trống" }),
  category: z.string().min(1, { message: "Danh mục không được để trống" }),
  minStock: z.coerce.number().int().positive({ message: "Mức tồn kho tối thiểu phải là số dương" }),
})

type UpdateInventoryFormValues = z.infer<typeof updateInventorySchema>

interface UpdateInventoryModalProps {
  isOpen: boolean
  onClose: () => void
  item: InventoryItem
  onUpdate: (updatedItem: InventoryItem) => void
}

export function UpdateInventoryModal({ isOpen, onClose, item, onUpdate }: UpdateInventoryModalProps) {
  const form = useForm<UpdateInventoryFormValues>({
    resolver: zodResolver(updateInventorySchema),
    defaultValues: {
      name: item.name,
      brand: item.brand,
      category: item.category,
      minStock: item.minStock,
    },
  })

  const brands = ["Honda", "Yamaha", "Suzuki", "Piaggio", "SYM"]
  const categories = ["Xe số", "Xe tay ga", "Xe côn tay", "Xe phân khối lớn", "Xe điện"]

  function handleSubmit(values: UpdateInventoryFormValues) {
    onUpdate({
      ...item,
      name: values.name,
      brand: values.brand,
      category: values.category,
      minStock: values.minStock,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin tồn kho</DialogTitle>
          <DialogDescription>Cập nhật thông tin cho sản phẩm {item.name}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên xe</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên xe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hãng xe</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn hãng xe" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minStock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mức tồn kho tối thiểu</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập mức tồn kho tối thiểu"
                      {...field}
                      onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Cập nhật</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
