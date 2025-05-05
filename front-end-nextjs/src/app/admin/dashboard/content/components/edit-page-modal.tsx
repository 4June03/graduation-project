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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ContentPage } from "./pages-tab"

const editPageSchema = z.object({
  title: z.string().min(2, { message: "Tiêu đề phải có ít nhất 2 ký tự" }),
  slug: z.string().min(2, { message: "Đường dẫn phải có ít nhất 2 ký tự" }),
  content: z.string().min(10, { message: "Nội dung phải có ít nhất 10 ký tự" }),
  status: z.enum(["published", "draft"]),
})

type EditPageFormValues = z.infer<typeof editPageSchema>

interface EditPageModalProps {
  isOpen: boolean
  onClose: () => void
  page: ContentPage
  onEdit: (page: ContentPage) => void
}

export function EditPageModal({ isOpen, onClose, page, onEdit }: EditPageModalProps) {
  const form = useForm<EditPageFormValues>({
    resolver: zodResolver(editPageSchema),
    defaultValues: {
      title: page.title,
      slug: page.slug,
      content: "", // In a real app, this would be fetched from the API
      status: page.status,
    },
  })

  function handleSubmit(values: EditPageFormValues) {
    const currentDate = new Date().toLocaleDateString("vi-VN")
    onEdit({
      ...page,
      title: values.title,
      slug: values.slug,
      lastUpdated: currentDate,
      status: values.status,
    })
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa trang</DialogTitle>
          <DialogDescription>Cập nhật thông tin trang</DialogDescription>
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
                    <Input placeholder="Nhập tiêu đề trang" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Đường dẫn</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập đường dẫn (slug)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Nhập nội dung trang" rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trạng thái</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn trạng thái" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="published">Xuất bản</SelectItem>
                      <SelectItem value="draft">Bản nháp</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
