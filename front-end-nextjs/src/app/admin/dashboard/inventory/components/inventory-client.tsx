"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { InventoryActionDropdown } from "./inventory-action-dropdown"
import { UpdateInventoryModal } from "./update-inventory-modal"
import { AddStockModal } from "./add-stock-modal"

export type InventoryStatus = "normal" | "low" | "out"

export interface InventoryItem {
  id: number
  name: string
  brand: string
  category: string
  stock: number
  minStock: number
  status: InventoryStatus
}

// Mock data for inventory
const initialInventory: InventoryItem[] = [
  {
    id: 1,
    name: "Honda Wave Alpha",
    brand: "Honda",
    category: "Xe số",
    stock: 15,
    minStock: 5,
    status: "normal",
  },
  {
    id: 2,
    name: "Yamaha Exciter 155",
    brand: "Yamaha",
    category: "Xe côn tay",
    stock: 8,
    minStock: 5,
    status: "normal",
  },
  {
    id: 3,
    name: "Honda Vision",
    brand: "Honda",
    category: "Xe tay ga",
    stock: 12,
    minStock: 5,
    status: "normal",
  },
  {
    id: 4,
    name: "Yamaha NVX",
    brand: "Yamaha",
    category: "Xe tay ga",
    stock: 3,
    minStock: 5,
    status: "low",
  },
  {
    id: 5,
    name: "Honda SH",
    brand: "Honda",
    category: "Xe tay ga",
    stock: 2,
    minStock: 5,
    status: "low",
  },
  {
    id: 6,
    name: "Suzuki Raider",
    brand: "Suzuki",
    category: "Xe côn tay",
    stock: 0,
    minStock: 5,
    status: "out",
  },
  {
    id: 7,
    name: "Honda Winner X",
    brand: "Honda",
    category: "Xe côn tay",
    stock: 9,
    minStock: 5,
    status: "normal",
  },
  {
    id: 8,
    name: "Yamaha Sirius",
    brand: "Yamaha",
    category: "Xe số",
    stock: 4,
    minStock: 5,
    status: "low",
  },
]

const brands = ["Tất cả", "Honda", "Yamaha", "Suzuki", "Piaggio", "SYM"]
export const statusOptions = [
  { value: "all", label: "Tất cả" },
  { value: "normal", label: "Bình thường" },
  { value: "low", label: "Sắp hết" },
  { value: "out", label: "Hết hàng" },
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case "normal":
      return "bg-green-100 text-green-800"
    case "low":
      return "bg-yellow-100 text-yellow-800"
    case "out":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusText = (status: string) => {
  switch (status) {
    case "normal":
      return "Bình thường"
    case "low":
      return "Sắp hết"
    case "out":
      return "Hết hàng"
    default:
      return status
  }
}

export function InventoryClient() {
  const [inventory, setInventory] = useState<InventoryItem[]>(initialInventory)
  const [selectedBrand, setSelectedBrand] = useState("Tất cả")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Modal states
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [addStockModalOpen, setAddStockModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)

  const filteredInventory = inventory.filter(
    (item) =>
      (selectedBrand === "Tất cả" || item.brand === selectedBrand) &&
      (selectedStatus === "all" || item.status === selectedStatus) &&
      (searchTerm === "" || item.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const handleUpdateInventory = (updatedItem: InventoryItem) => {
    setInventory(inventory.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
    setUpdateModalOpen(false)
    setSelectedItem(null)
  }

  const handleAddStock = (itemId: number, additionalStock: number) => {
    setInventory(
      inventory.map((item) => {
        if (item.id === itemId) {
          const newStock = item.stock + additionalStock
          const newStatus: InventoryStatus = newStock === 0 ? "out" : newStock < item.minStock ? "low" : "normal"

          return {
            ...item,
            stock: newStock,
            status: newStatus,
          }
        }
        return item
      }),
    )
    setAddStockModalOpen(false)
    setSelectedItem(null)
  }

  const openUpdateModal = (item: InventoryItem) => {
    setSelectedItem(item)
    setUpdateModalOpen(true)
  }

  const openAddStockModal = (item: InventoryItem) => {
    setSelectedItem(item)
    setAddStockModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lí tồn kho</h1>
        <Button>Nhập hàng mới</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tổng số xe trong kho</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.reduce((sum, item) => sum + item.stock, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sắp hết hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.filter((item) => item.status === "low").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Đã hết hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.filter((item) => item.status === "out").length}</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách tồn kho</CardTitle>
          <CardDescription>Quản lý tồn kho xe máy trong hệ thống</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Tìm kiếm theo tên xe..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn hãng xe" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Tên xe</TableHead>
                <TableHead>Hãng</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Mức tồn kho</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.brand}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </span>
                  </TableCell>
                  <TableCell className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <Progress
                        value={(item.stock / item.minStock) * 100}
                        max={200}
                        className={`h-2 ${
                          item.stock === 0
                            ? "bg-red-200"
                            : item.stock < item.minStock
                              ? "bg-yellow-200"
                              : "bg-green-200"
                        }`}
                      />
                      <span className="text-xs w-10">
                        {item.stock}/{item.minStock}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <InventoryActionDropdown
                      item={item}
                      onUpdate={() => openUpdateModal(item)}
                      onAddStock={() => openAddStockModal(item)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modals */}
      {selectedItem && (
        <>
          <UpdateInventoryModal
            isOpen={updateModalOpen}
            onClose={() => setUpdateModalOpen(false)}
            item={selectedItem}
            onUpdate={handleUpdateInventory}
          />
          <AddStockModal
            isOpen={addStockModalOpen}
            onClose={() => setAddStockModalOpen(false)}
            item={selectedItem}
            onAddStock={handleAddStock}
          />
        </>
      )}
    </div>
  )
}
