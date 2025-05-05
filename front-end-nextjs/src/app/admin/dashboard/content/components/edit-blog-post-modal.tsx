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
import type { BlogPost } from "./blog-tab"

const editBlogPostSchema = z.object({
  title: z.string().min(2, { message: "Tiêu đề phải có ít nhất 2 ký tự" }),
  category: z.string().min(1, { message: "Danh mục không được để trống" }),
  author: z.string().min(2, { message: "Tên tác giả phải có ít nhất 2 ký tự" }),
  content: z.string().min(10, { message: "Nội dung phải có ít nhất 10 ký tự" }),
  status: z.enum(["published", "draft"]),
})

type EditBlogPostFormValues = z.infer<typeof editBlogPostSchema>

interface EditBlogPostModalProps {
  isOpen: boolean
  onClose: () => void
  post: BlogPost
  onEdit: (post: BlogPost) => void
  categories: string[]
}

export function EditBlogPostModal({ isOpen, onClose, post, onEdit, categories }: EditBlogPostModalProps) {
  const form = useForm<EditBlogPostFormValues>({
    resolver: zodResolver(editBlogPostSchema),
    defaultValues: {
      title: post.title,
      category: post.category,
      author: post.author,
      content: "", // In a real app, this would be fetched from the API
      status: post.status,
    },
  })

  function handleSubmit(values: EditBlogPostFormValues) {
    const currentDate = new Date().toLocaleDateString("vi-VN")
    onEdit({
      ...post,
      title: values.title,
      category: values.category,
      author: values.author,
      date: currentDate,
      status: values.status,
    })
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
          <DialogDescription>Cập nhật thông tin bài viết</DialogDescription>
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
                    <Input placeholder="Nhập tiêu đề bài viết" {...field} />
                  </FormControl>
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
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tác giả</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên tác giả" {...field} />
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
                    <Textarea placeholder="Nhập nội dung bài viết" rows={10} {...field} />
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
