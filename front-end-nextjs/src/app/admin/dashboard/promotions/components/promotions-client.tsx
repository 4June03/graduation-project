"use client"

import { useState } from "react"
import { CalendarIcon, PlusCircle } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { PromotionActionDropdown } from "./promotion-action-dropdown"
import { AddPromotionModal } from "./add-promotion-modal"
import { EditPromotionModal } from "./edit-promotion-modal"
import { DeletePromotionModal } from "./delete-promotion-modal"

export type PromotionStatus = "active" | "upcoming" | "expired"

export interface Promotion {
  id: number
  name: string
  description: string
  discount: string
  startDate: Date
  endDate: Date
  status: PromotionStatus
}

const initialPromotions: Promotion[] = [
  {
    id: 1,
    name: "Khuyến mãi mùa hè",
    description: "Giảm giá 5% cho tất cả các xe máy",
    discount: "5%",
    startDate: new Date(2023, 5, 1),
    endDate: new Date(2023, 7, 31),
    status: "active",
  },
  {
    id: 2,
    name: "Ưu đãi sinh viên",
    description: "Giảm 2 triệu đồng cho sinh viên khi mua xe",
    discount: "2,000,000 VND",
    startDate: new Date(2023, 8, 1),
    endDate: new Date(2023, 11, 31),
    status: "upcoming",
  },
  {
    id: 3,
    name: "Black Friday",
    description: "Giảm giá lên đến 10% cho một số mẫu xe",
    discount: "10%",
    startDate: new Date(2023, 10, 24),
    endDate: new Date(2023, 10, 30),
    status: "upcoming",
  },
  {
    id: 4,
    name: "Tết Nguyên Đán",
    description: "Tặng phụ kiện khi mua xe",
    discount: "Phụ kiện",
    startDate: new Date(2024, 0, 15),
    endDate: new Date(2024, 1, 15),
    status: "upcoming",
  },
  {
    id: 5,
    name: "Khuyến mãi xuân",
    description: "Giảm giá 3% và tặng bảo hiểm xe",
    discount: "3% + Bảo hiểm",
    startDate: new Date(2023, 1, 1),
    endDate: new Date(2023, 2, 31),
    status: "expired",
  },
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "upcoming":
      return "bg-blue-100 text-blue-800"
    case "expired":
      return "bg-gray-100 text-gray-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Đang diễn ra"
    case "upcoming":
      return "Sắp diễn ra"
    case "expired":
      return "Đã kết thúc"
    default:
      return status
  }
}

export function PromotionsClient() {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions)
  const [date, setDate] = useState<Date | undefined>(undefined)

  // Modal states
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null)

  const filteredPromotions = promotions.filter(
    (promotion) => !date || (date >= promotion.startDate && date <= promotion.endDate),
  )

  const handleAddPromotion = (newPromotion: Omit<Promotion, "id">) => {
    const id = promotions.length > 0 ? Math.max(...promotions.map((promo) => promo.id)) + 1 : 1
    setPromotions([...promotions, { ...newPromotion, id }])
    setAddModalOpen(false)
  }

  const handleEditPromotion = (updatedPromotion: Promotion) => {
    setPromotions(promotions.map((promo) => (promo.id === updatedPromotion.id ? updatedPromotion : promo)))
    setEditModalOpen(false)
    setSelectedPromotion(null)
  }

  const handleDeletePromotion = (id: number) => {
    setPromotions(promotions.filter((promo) => promo.id !== id))
    setDeleteModalOpen(false)
    setSelectedPromotion(null)
  }

  const openEditModal = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
    setEditModalOpen(true)
  }

  const openDeleteModal = (promotion: Promotion) => {
    setSelectedPromotion(promotion)
    setDeleteModalOpen(true)
  }

  const openViewDetails = (promotion: Promotion) => {
    // In a real application, this would open a details view
    console.log("View details for promotion:", promotion)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lí khuyến mại</h1>
        <Button onClick={() => setAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm khuyến mại
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tổng số khuyến mại</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Đang diễn ra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotions.filter((promo) => promo.status === "active").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sắp diễn ra</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotions.filter((promo) => promo.status === "upcoming").length}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách khuyến mại</CardTitle>
          <CardDescription>Quản lý các chương trình khuyến mại</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full md:w-[240px] justify-start text-left font-normal",
                      !date && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : "Lọc theo ngày"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            {date && (
              <Button variant="ghost" onClick={() => setDate(undefined)} className="h-10">
                Xóa bộ lọc ngày
              </Button>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên khuyến mại</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead>Giảm giá</TableHead>
                <TableHead>Ngày bắt đầu</TableHead>
                <TableHead>Ngày kết thúc</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPromotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell className="font-medium">{promotion.id}</TableCell>
                  <TableCell>{promotion.name}</TableCell>
                  <TableCell>{promotion.description}</TableCell>
                  <TableCell>{promotion.discount}</TableCell>
                  <TableCell>{format(promotion.startDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{format(promotion.endDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(promotion.status)}`}>
                      {getStatusText(promotion.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <PromotionActionDropdown
                      promotion={promotion}
                      onView={() => openViewDetails(promotion)}
                      onEdit={() => openEditModal(promotion)}
                      onDelete={() => openDeleteModal(promotion)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddPromotionModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddPromotion} />

      {selectedPromotion && (
        <>
          <EditPromotionModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            promotion={selectedPromotion}
            onEdit={handleEditPromotion}
          />

          <DeletePromotionModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            promotion={selectedPromotion}
            onDelete={() => handleDeletePromotion(selectedPromotion.id)}
          />
        </>
      )}
    </div>
  )
}
