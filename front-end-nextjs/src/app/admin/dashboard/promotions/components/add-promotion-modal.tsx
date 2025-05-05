"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import type { Promotion } from "./promotions-client"

const addPromotionSchema = z
  .object({
    name: z.string().min(2, { message: "Tên khuyến mãi phải có ít nhất 2 ký tự" }),
    description: z.string().min(5, { message: "Mô tả phải có ít nhất 5 ký tự" }),
    discount: z.string().min(1, { message: "Giảm giá không được để trống" }),
    startDate: z.date({ required_error: "Ngày bắt đầu là bắt buộc" }),
    endDate: z.date({ required_error: "Ngày kết thúc là bắt buộc" }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "Ngày kết thúc phải sau ngày bắt đầu",
    path: ["endDate"],
  })

type AddPromotionFormValues = z.infer<typeof addPromotionSchema>

interface AddPromotionModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (promotion: Omit<Promotion, "id">) => void
}

export function AddPromotionModal({ isOpen, onClose, onAdd }: AddPromotionModalProps) {
  const form = useForm<AddPromotionFormValues>({
    resolver: zodResolver(addPromotionSchema),
    defaultValues: {
      name: "",
      description: "",
      discount: "",
    },
  })

  function handleSubmit(values: AddPromotionFormValues) {
    const now = new Date()
    let status: "active" | "upcoming" | "expired" = "upcoming"

    if (values.startDate <= now && values.endDate >= now) {
      status = "active"
    } else if (values.endDate < now) {
      status = "expired"
    }

    onAdd({
      ...values,
      status,
    })
    form.reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm khuyến mãi mới</DialogTitle>
          <DialogDescription>Điền thông tin để tạo chương trình khuyến mãi mới</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên khuyến mãi</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập tên khuyến mãi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập mô tả khuyến mãi" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giảm giá</FormLabel>
                  <FormControl>
                    <Input placeholder="Ví dụ: 5%, 1,000,000 VND, Phụ kiện..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày bắt đầu</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Ngày kết thúc</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                        >
                          {field.value ? format(field.value, "dd/MM/yyyy") : <span>Chọn ngày</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Thêm khuyến mãi</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
