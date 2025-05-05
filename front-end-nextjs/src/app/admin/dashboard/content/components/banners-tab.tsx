"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ContentActionDropdown } from "./content-action-dropdown"
import { AddBannerModal } from "./add-banner-modal"
import { EditBannerModal } from "./edit-banner-modal"

export interface Banner {
  id: number
  title: string
  position: string
  startDate: string
  endDate: string
  status: "active" | "scheduled"
}

// Mock data for banners
const initialBanners: Banner[] = [
  {
    id: 1,
    title: "Khuyến mãi mùa hè",
    position: "Trang chủ",
    startDate: "01/06/2023",
    endDate: "31/08/2023",
    status: "active",
  },
  {
    id: 2,
    title: "Ưu đãi sinh viên",
    position: "Sản phẩm",
    startDate: "01/09/2023",
    endDate: "31/12/2023",
    status: "scheduled",
  },
  {
    id: 3,
    title: "Black Friday",
    position: "Trang chủ",
    startDate: "24/11/2023",
    endDate: "30/11/2023",
    status: "scheduled",
  },
  {
    id: 4,
    title: "Tết Nguyên Đán",
    position: "Trang chủ",
    startDate: "15/01/2024",
    endDate: "15/02/2024",
    status: "scheduled",
  },
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "scheduled":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case "active":
      return "Đang hiển thị"
    case "scheduled":
      return "Đã lên lịch"
    default:
      return status
  }
}

export function BannersTab() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null)

  const handleAddBanner = (newBanner: Omit<Banner, "id">) => {
    const id = banners.length > 0 ? Math.max(...banners.map((banner) => banner.id)) + 1 : 1
    setBanners([...banners, { ...newBanner, id }])
    setAddModalOpen(false)
  }

  const handleEditBanner = (updatedBanner: Banner) => {
    setBanners(banners.map((banner) => (banner.id === updatedBanner.id ? updatedBanner : banner)))
    setEditModalOpen(false)
    setSelectedBanner(null)
  }

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter((banner) => banner.id !== id))
  }

  const openEditModal = (banner: Banner) => {
    setSelectedBanner(banner)
    setEditModalOpen(true)
  }

  const handleViewBanner = (banner: Banner) => {
    // In a real application, this would show a preview of the banner
    console.log("View banner:", banner)
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm banner
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách banner</CardTitle>
          <CardDescription>Quản lý các banner quảng cáo trên website</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Vị trí</TableHead>
                <TableHead>Ngày bắt đầu</TableHead>
                <TableHead>Ngày kết thúc</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.id}>
                  <TableCell className="font-medium">{banner.id}</TableCell>
                  <TableCell>{banner.title}</TableCell>
                  <TableCell>{banner.position}</TableCell>
                  <TableCell>{banner.startDate}</TableCell>
                  <TableCell>{banner.endDate}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(banner.status)}`}>
                      {getStatusText(banner.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <ContentActionDropdown
                      item={banner}
                      type="banner"
                      onView={() => handleViewBanner(banner)}
                      onEdit={() => openEditModal(banner)}
                      onDelete={() => handleDeleteBanner(banner.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddBannerModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddBanner} />

      {selectedBanner && (
        <EditBannerModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          banner={selectedBanner}
          onEdit={handleEditBanner}
        />
      )}
    </>
  )
}
