"use client"

import { useState } from "react"
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Address {
  id: number
  name: string
  phone: string
  address: string
  district: string
  city: string
  isDefault: boolean
}

interface AddressListProps {
  initialAddresses: Address[]
}

export function AddressList({ initialAddresses }: AddressListProps) {
  const [addresses, setAddresses] = useState(initialAddresses)
  const [editingAddress, setEditingAddress] = useState<Partial<Address> | null>(null)
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null)

  // Set address as default
  const setAsDefault = (id: number) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      })),
    )
  }

  // Edit address
  const handleEditAddress = (address: Address) => {
    setEditingAddress({ ...address })
  }

  // Save edited address
  const saveAddress = () => {
    if (editingAddress) {
      if (editingAddress.id) {
        // Update existing address
        setAddresses(
          addresses.map((address) => (address.id === editingAddress.id ? (editingAddress as Address) : address)),
        )
      } else {
        // Add new address
        const newAddress = {
          ...editingAddress,
          id: Math.max(0, ...addresses.map((a) => a.id)) + 1,
          isDefault: addresses.length === 0 ? true : !!editingAddress.isDefault,
        } as Address
        setAddresses([...addresses, newAddress])
      }
      setEditingAddress(null)
    }
  }

  // Delete address
  const deleteAddress = () => {
    if (addressToDelete) {
      setAddresses(addresses.filter((address) => address.id !== addressToDelete))
      setAddressToDelete(null)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Địa chỉ của tôi</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                setEditingAddress({
                  name: "",
                  phone: "",
                  address: "",
                  district: "",
                  city: "",
                  isDefault: addresses.length === 0,
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm địa chỉ mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingAddress?.id ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}</DialogTitle>
              <DialogDescription>Vui lòng nhập thông tin địa chỉ của bạn</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Họ và tên</Label>
                  <Input
                    id="name"
                    value={editingAddress?.name || ""}
                    onChange={(e) => setEditingAddress({ ...editingAddress, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    value={editingAddress?.phone || ""}
                    onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input
                  id="address"
                  value={editingAddress?.address || ""}
                  onChange={(e) => setEditingAddress({ ...editingAddress, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="district">Quận/Huyện</Label>
                  <Input
                    id="district"
                    value={editingAddress?.district || ""}
                    onChange={(e) => setEditingAddress({ ...editingAddress, district: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Tỉnh/Thành phố</Label>
                  <Input
                    id="city"
                    value={editingAddress?.city || ""}
                    onChange={(e) => setEditingAddress({ ...editingAddress, city: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={saveAddress}>Lưu địa chỉ</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {addresses.length > 0 ? (
          <div className="space-y-4">
            {addresses.map((address) => (
              <Card key={address.id} className="border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{address.name}</h3>
                          {address.isDefault && (
                            <Badge variant="outline" className="text-xs">
                              Mặc định
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{address.phone}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {address.address}, {address.district}, {address.city}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => handleEditAddress(address)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Sửa
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Chỉnh sửa địa chỉ</DialogTitle>
                            <DialogDescription>Vui lòng nhập thông tin địa chỉ của bạn</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Họ và tên</Label>
                                <Input
                                  id="edit-name"
                                  value={editingAddress?.name || ""}
                                  onChange={(e) => setEditingAddress({ ...editingAddress, name: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-phone">Số điện thoại</Label>
                                <Input
                                  id="edit-phone"
                                  value={editingAddress?.phone || ""}
                                  onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value })}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-address">Địa chỉ</Label>
                              <Input
                                id="edit-address"
                                value={editingAddress?.address || ""}
                                onChange={(e) => setEditingAddress({ ...editingAddress, address: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-district">Quận/Huyện</Label>
                                <Input
                                  id="edit-district"
                                  value={editingAddress?.district || ""}
                                  onChange={(e) => setEditingAddress({ ...editingAddress, district: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-city">Tỉnh/Thành phố</Label>
                                <Input
                                  id="edit-city"
                                  value={editingAddress?.city || ""}
                                  onChange={(e) => setEditingAddress({ ...editingAddress, city: e.target.value })}
                                />
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Hủy</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button onClick={saveAddress}>Lưu thay đổi</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => setAddressToDelete(address.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Xóa địa chỉ</AlertDialogTitle>
                            <AlertDialogDescription>
                              Bạn có chắc chắn muốn xóa địa chỉ này? Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Hủy</AlertDialogCancel>
                            <AlertDialogAction onClick={deleteAddress} className="bg-red-500 hover:bg-red-600">
                              Xóa
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  {!address.isDefault && (
                    <Button variant="link" className="mt-2 h-auto p-0" onClick={() => setAsDefault(address.id)}>
                      Đặt làm mặc định
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-medium mb-2">Chưa có địa chỉ nào</h2>
            <p className="text-muted-foreground mb-6">Bạn chưa thêm địa chỉ nào vào danh sách</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  onClick={() =>
                    setEditingAddress({
                      name: "",
                      phone: "",
                      address: "",
                      district: "",
                      city: "",
                      isDefault: true,
                    })
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm địa chỉ mới
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Thêm địa chỉ mới</DialogTitle>
                  <DialogDescription>Vui lòng nhập thông tin địa chỉ của bạn</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-name">Họ và tên</Label>
                      <Input
                        id="new-name"
                        value={editingAddress?.name || ""}
                        onChange={(e) => setEditingAddress({ ...editingAddress, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-phone">Số điện thoại</Label>
                      <Input
                        id="new-phone"
                        value={editingAddress?.phone || ""}
                        onChange={(e) => setEditingAddress({ ...editingAddress, phone: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-address">Địa chỉ</Label>
                    <Input
                      id="new-address"
                      value={editingAddress?.address || ""}
                      onChange={(e) => setEditingAddress({ ...editingAddress, address: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-district">Quận/Huyện</Label>
                      <Input
                        id="new-district"
                        value={editingAddress?.district || ""}
                        onChange={(e) => setEditingAddress({ ...editingAddress, district: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-city">Tỉnh/Thành phố</Label>
                      <Input
                        id="new-city"
                        value={editingAddress?.city || ""}
                        onChange={(e) => setEditingAddress({ ...editingAddress, city: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Hủy</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={saveAddress}>Lưu địa chỉ</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
