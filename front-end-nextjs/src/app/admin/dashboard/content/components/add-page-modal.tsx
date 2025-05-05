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

const addPageSchema = z.object({
  title: z.string().min(2, { message: "Tiêu đề phải có ít nhất 2 ký tự" }),
  slug: z.string().min(2, { message: "Đường dẫn phải có ít nhất 2 ký tự" }),
  content: z.string().min(10, { message: "Nội dung phải có ít nhất 10 ký tự" }),
  status: z.enum(["published", "draft"]),
})

type AddPageFormValues = z.infer<typeof addPageSchema>

interface AddPageModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (page: Omit<ContentPage, "id">) => void
}

export function AddPageModal({ isOpen, onClose, onAdd }: AddPageModalProps) {
  const form = useForm<AddPageFormValues>({
    resolver: zodResolver(addPageSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      status: "draft",
    },
  })

  function handleSubmit(values: AddPageFormValues) {
    const currentDate = new Date().toLocaleDateString("vi-VN")
    onAdd({
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
          <DialogTitle>Thêm trang mới</DialogTitle>
          <DialogDescription>Điền thông tin để tạo trang mới</DialogDescription>
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
              <Button type="submit">Thêm trang</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
