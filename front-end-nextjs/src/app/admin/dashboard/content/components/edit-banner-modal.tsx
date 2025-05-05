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
import type { Banner } from "./banners-tab"

const editBannerSchema = z.object({
  title: z.string().min(2, { message: "Tiêu đề phải có ít nhất 2 ký tự" }),
  position: z.string().min(1, { message: "Vị trí không được để trống" }),
  imageUrl: z.string().url({ message: "URL hình ảnh không hợp lệ" }),
  startDate: z.string().min(1, { message: "Ngày bắt đầu không được để trống" }),
  endDate: z.string().min(1, { message: "Ngày kết thúc không được để trống" }),
})

type EditBannerFormValues = z.infer<typeof editBannerSchema>

interface EditBannerModalProps {
  isOpen: boolean
  onClose: () => void
  banner: Banner
  onEdit: (banner: Banner) => void
}

export function EditBannerModal({ isOpen, onClose, banner, onEdit }: EditBannerModalProps) {
  const form = useForm<EditBannerFormValues>({
    resolver: zodResolver(editBannerSchema),
    defaultValues: {
      title: banner.title,
      position: banner.position,
      imageUrl: "", // In a real app, this would be fetched from the API
      startDate: banner.startDate,
      endDate: banner.endDate,
    },
  })

  const positions = ["Trang chủ", "Sản phẩm", "Tin tức", "Liên hệ"]

  function handleSubmit(values: EditBannerFormValues) {
    const now = new Date()
    const startDate = new Date(values.startDate)
    const endDate = new Date(values.endDate)

    const status: "active" | "scheduled" = now >= startDate && now <= endDate ? "active" : "scheduled"

    onEdit({
      ...banner,
      title: values.title,
      position: values.position,
      startDate: values.startDate,
      endDate: values.endDate,
      status,
    })
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa banner</DialogTitle>
          <DialogDescription>Cập nhật thông tin banner</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiêu đề</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tiêu đề banner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vị trí</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vị trí hiển thị" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {positions.map((position) => (
                        <SelectItem key={position} value={position}>
                          {position}
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
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL hình ảnh</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập URL hình ảnh banner" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày bắt đầu</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ngày kết thúc</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
