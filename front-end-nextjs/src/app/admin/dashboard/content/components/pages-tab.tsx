"use client"

import { useState } from "react"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ContentActionDropdown } from "./content-action-dropdown"
import { AddPageModal } from "./add-page-modal"
import { EditPageModal } from "./edit-page-modal"

export interface ContentPage {
  id: number
  title: string
  slug: string
  lastUpdated: string
  status: "published" | "draft"
}

// Mock data for content pages
const initialPages: ContentPage[] = [
  { id: 1, title: "Trang chủ", slug: "home", lastUpdated: "15/03/2023", status: "published" },
  { id: 2, title: "Giới thiệu", slug: "about", lastUpdated: "20/04/2023", status: "published" },
  { id: 3, title: "Sản phẩm", slug: "products", lastUpdated: "10/05/2023", status: "published" },
  { id: 4, title: "Tin tức", slug: "news", lastUpdated: "05/06/2023", status: "published" },
  { id: 5, title: "Liên hệ", slug: "contact", lastUpdated: "12/07/2023", status: "published" },
  { id: 6, title: "Chính sách bảo hành", slug: "warranty", lastUpdated: "18/08/2023", status: "published" },
  { id: 7, title: "Khuyến mãi mùa hè", slug: "summer-promotion", lastUpdated: "25/05/2023", status: "draft" },
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case "published":
      return "bg-green-100 text-green-800"
    case "draft":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case "published":
      return "Đã xuất bản"
    case "draft":
      return "Bản nháp"
    default:
      return status
  }
}

export function PagesTab() {
  const [pages, setPages] = useState<ContentPage[]>(initialPages)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null)

  const handleAddPage = (newPage: Omit<ContentPage, "id">) => {
    const id = pages.length > 0 ? Math.max(...pages.map((page) => page.id)) + 1 : 1
    setPages([...pages, { ...newPage, id }])
    setAddModalOpen(false)
  }

  const handleEditPage = (updatedPage: ContentPage) => {
    setPages(pages.map((page) => (page.id === updatedPage.id ? updatedPage : page)))
    setEditModalOpen(false)
    setSelectedPage(null)
  }

  const handleDeletePage = (id: number) => {
    setPages(pages.filter((page) => page.id !== id))
  }

  const openEditModal = (page: ContentPage) => {
    setSelectedPage(page)
    setEditModalOpen(true)
  }

  const handleViewPage = (page: ContentPage) => {
    // In a real application, this would navigate to the page
    console.log("View page:", page)
  }

  return (
    <>
      <div className="flex justify-end">
        <Button onClick={() => setAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm trang mới
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách trang</CardTitle>
          <CardDescription>Quản lý các trang nội dung trên website</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Đường dẫn</TableHead>
                <TableHead>Cập nhật lần cuối</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.id}>
                  <TableCell className="font-medium">{page.id}</TableCell>
                  <TableCell>{page.title}</TableCell>
                  <TableCell>/{page.slug}</TableCell>
                  <TableCell>{page.lastUpdated}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(page.status)}`}>
                      {getStatusText(page.status)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <ContentActionDropdown
                      item={page}
                      type="page"
                      onView={() => handleViewPage(page)}
                      onEdit={() => openEditModal(page)}
                      onDelete={() => handleDeletePage(page.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddPageModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={handleAddPage} />

      {selectedPage && (
        <EditPageModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          page={selectedPage}
          onEdit={handleEditPage}
        />
      )}
    </>
  )
}
