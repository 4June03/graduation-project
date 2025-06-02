"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useDataMutation, useFetchData } from "@/hooks/useCRUD";
import { useQueryClient } from "@tanstack/react-query";
import { DeleteMotorcycleModal } from "@/app/admin/dashboard/motorcycles/components/delete-motorcyles-modal";

const brands = [
  "Tất cả",
  "Honda",
  "Yamaha",
  "Suzuki",
  "Piaggio",
  "SYM",
  "Ducati",
  "BMW",
  "Kawasaki",
];

export default function MotorcyclesPage() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: apiResponse,
    isFetching,
    error,
  } = useFetchData<{
    success: boolean;
    message: string;
    data: any;
  }>(["motorbikes"], `/motorbikes`);
  const { useCreate, useUpdate, useDelete } = useDataMutation<any>([
    "motorbikes",
  ]);
  const queryClient = useQueryClient();
  const motorcycles = apiResponse?.data?.content || null;
  // State cho modal xóa
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [motorcycleToDelete, setMotorcycleToDelete] = useState<{
    bikeId: number;
    bikeName: string;
  } | null>(null);

  useEffect(() => {
    console.log("List motorbikes: ", motorcycles);
  }, []);

  // Dữ liệu mẫu cho phân trang
  const totalPages = apiResponse?.data?.totalPages; // Giả sử backend trả về 10 trang
  const itemsPerPage = 8; // Số lượng xe mỗi trang

  const filteredMotorcycles = motorcycles?.filter(
    (motorcycle: any) =>
      (selectedBrand === "Tất cả" || motorcycle.brandName === selectedBrand) &&
      (searchTerm === "" ||
        motorcycle.brandName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Xử lý mở modal xóa
  const handleDeleteClick = (motorcycle: {
    bikeId: number;
    bikeName: string;
  }) => {
    setMotorcycleToDelete(motorcycle);
    setDeleteModalOpen(true);
  };

  // Hàm tạo các nút phân trang
  const renderPaginationItems = () => {
    const items = [];

    // Luôn hiển thị trang đầu tiên
    items.push(
      <PaginationItem key="first">
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    // Thêm dấu ... nếu trang hiện tại > 3
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis-1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Hiển thị các trang xung quanh trang hiện tại
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (i === 1 || i === totalPages) continue; // Bỏ qua trang đầu và trang cuối vì đã hiển thị riêng

      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Thêm dấu ... nếu trang hiện tại < totalPages - 2
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis-2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }

    // Luôn hiển thị trang cuối cùng nếu có nhiều hơn 1 trang
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Quản lí danh sách xe</h1>
        <Button onClick={() => router.push("/admin/dashboard/motorcycles/add")}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Thêm xe mới
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách xe máy</CardTitle>
          <CardDescription>
            Quản lý tất cả các xe máy trong hệ thống
          </CardDescription>
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
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Tên xe</TableHead>
                <TableHead>Hãng</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá (VND)</TableHead>
                <TableHead>Tồn kho</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {motorcycles &&
                filteredMotorcycles.map((motorcycle: any, index: number) => {
                  const totalStock = motorcycle.variants.reduce(
                    (sum: number, variant: any) => {
                      return sum + variant.variantStock;
                    },
                    0
                  );

                  console.log("giá trị totalStock", totalStock);

                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{motorcycle.bikeName}</TableCell>
                      <TableCell>{motorcycle.brandName}</TableCell>
                      <TableCell>{motorcycle.categoryName}</TableCell>
                      <TableCell>
                        {motorcycle.variants[0].variantPrice}
                      </TableCell>
                      <TableCell>{totalStock}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(`/products/${motorcycle.bikeId}`)
                            }
                          >
                            Chi tiết
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(
                                `/admin/dashboard/motorcycles/edit/${motorcycle.bikeId}`
                              )
                            }
                          >
                            Sửa
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              handleDeleteClick({
                                bikeId: motorcycle.bikeId,
                                bikeName: motorcycle.bikeName,
                              })
                            }
                          >
                            Xóa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {isFetching && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Đang tải dữ liệu...
                  </TableCell>
                </TableRow>
              )}
              {error && !isFetching && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    Có lỗi xảy ra: {error.message}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Phân trang */}
          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  {currentPage > 1 && (
                    <PaginationPrevious
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                    />
                  )}
                </PaginationItem>

                {renderPaginationItems()}

                <PaginationItem>
                  {currentPage < totalPages && (
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                      }
                    />
                  )}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>

      {/* Modal xác nhận xóa */}
      {motorcycleToDelete && (
        <DeleteMotorcycleModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          motorcycleId={motorcycleToDelete.bikeId}
          motorcycleName={motorcycleToDelete.bikeName}
        />
      )}
    </div>
  );
}
