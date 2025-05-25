"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Address } from "@/app/(pages)/profile/type";
import { updateUserAddresses } from "@/app/(pages)/profile/_lib/service";
import { useAuth } from "@/components/provider/AuthProvider";
import { ProfileLayout } from "@/components/client/profile/profile-layout";

interface AddressesClientProps {
  initialAddresses: Address[];
}

export function AddressesClient({ initialAddresses }: AddressesClientProps) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [editingAddress, setEditingAddress] = useState<Partial<Address> | null>(
    null
  );
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useAuth();

  // Save addresses to API
  const saveAddressesToAPI = async (newAddresses: Address[]) => {
    try {
      setIsLoading(true);

      const addressesData = {
        addresses: newAddresses.map((addr) => ({
          addressDetail: addr.addressDetail,
        })),
      };

      const success = await updateUserAddresses(userId, addressesData); // Replace with actual user ID

      if (success) {
        toast.success("Cập nhật địa chỉ thành công!");
        return true;
      } else {
        toast.error("Có lỗi xảy ra khi cập nhật địa chỉ");
        return false;
      }
    } catch (error) {
      console.error("Error updating addresses:", error);
      toast.error("Có lỗi xảy ra khi cập nhật địa chỉ");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Edit address
  const handleEditAddress = (address: Address) => {
    setEditingAddress({ ...address });
  };

  // Save edited address
  const saveAddress = async () => {
    if (editingAddress) {
      let newAddresses: Address[];

      if (editingAddress.addressId) {
        // Update existing address
        newAddresses = addresses.map((address) =>
          address.addressId === editingAddress.addressId
            ? { ...address, addressDetail: editingAddress.addressDetail || "" }
            : address
        );
      } else {
        // Add new address
        const newAddress: Address = {
          addressId: Math.max(0, ...addresses.map((a) => a.addressId)) + 1,
          addressDetail: editingAddress.addressDetail || "",
        };
        newAddresses = [...addresses, newAddress];
      }

      // Save to API
      const success = await saveAddressesToAPI(newAddresses);

      if (success) {
        setAddresses(newAddresses);
        setEditingAddress(null);
      }
    }
  };

  // Delete address
  const deleteAddress = async () => {
    if (addressToDelete) {
      const newAddresses = addresses.filter(
        (address) => address.addressId !== addressToDelete
      );

      // Save to API
      const success = await saveAddressesToAPI(newAddresses);

      if (success) {
        setAddresses(newAddresses);
        setAddressToDelete(null);
      }
    }
  };

  return (
    <ProfileLayout title="Địa chỉ của tôi" activeTab="addresses">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Địa chỉ của tôi</CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                onClick={() =>
                  setEditingAddress({
                    addressDetail: "",
                  })
                }
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm địa chỉ mới
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingAddress?.addressId
                    ? "Chỉnh sửa địa chỉ"
                    : "Thêm địa chỉ mới"}
                </DialogTitle>
                <DialogDescription>
                  Vui lòng nhập thông tin địa chỉ của bạn
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ chi tiết</Label>
                  <Input
                    id="address"
                    value={editingAddress?.addressDetail || ""}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        addressDetail: e.target.value,
                      })
                    }
                    placeholder="Nhập địa chỉ chi tiết..."
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" disabled={isLoading}>
                    Hủy
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={saveAddress} disabled={isLoading}>
                    {isLoading ? "Đang lưu..." : "Lưu địa chỉ"}
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {addresses.length > 0 ? (
            <div className="space-y-4">
              {addresses.map((address) => (
                <Card key={address.addressId} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {address.addressDetail}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditAddress(address)}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Sửa
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                              <DialogTitle>Chỉnh sửa địa chỉ</DialogTitle>
                              <DialogDescription>
                                Vui lòng nhập thông tin địa chỉ của bạn
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-address">
                                  Địa chỉ chi tiết
                                </Label>
                                <Input
                                  id="edit-address"
                                  value={editingAddress?.addressDetail || ""}
                                  onChange={(e) =>
                                    setEditingAddress({
                                      ...editingAddress,
                                      addressDetail: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline" disabled={isLoading}>
                                  Hủy
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  onClick={saveAddress}
                                  disabled={isLoading}
                                >
                                  {isLoading ? "Đang lưu..." : "Lưu thay đổi"}
                                </Button>
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
                              onClick={() =>
                                setAddressToDelete(address.addressId)
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Xóa địa chỉ</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa địa chỉ này? Hành động
                                này không thể hoàn tác.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={deleteAddress}
                                className="bg-red-500 hover:bg-red-600"
                                disabled={isLoading}
                              >
                                {isLoading ? "Đang xóa..." : "Xóa"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
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
              <p className="text-muted-foreground mb-6">
                Bạn chưa thêm địa chỉ nào vào danh sách
              </p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() =>
                      setEditingAddress({
                        addressDetail: "",
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
                    <DialogDescription>
                      Vui lòng nhập thông tin địa chỉ của bạn
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-address">Địa chỉ chi tiết</Label>
                      <Input
                        id="new-address"
                        value={editingAddress?.addressDetail || ""}
                        onChange={(e) =>
                          setEditingAddress({
                            ...editingAddress,
                            addressDetail: e.target.value,
                          })
                        }
                        placeholder="Nhập địa chỉ chi tiết..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isLoading}>
                        Hủy
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={saveAddress} disabled={isLoading}>
                        {isLoading ? "Đang lưu..." : "Lưu địa chỉ"}
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
      </Card>
    </ProfileLayout>
  );
}
