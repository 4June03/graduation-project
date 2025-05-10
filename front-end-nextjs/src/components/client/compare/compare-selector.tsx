"use client";

import Image from "next/image";
import { X, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface Motorcycle {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
}

interface CompareSelectorProps {
  motorcycles: Motorcycle[];
  selectedMotorcycles: number[];
  onSelectMotorcycle: (index: number, motorcycleId: number) => void;
  onRemoveMotorcycle: (index: number) => void;
  onAddMotorcycle: () => void;
  canAddMore: boolean;
  getAvailableMotorcycles: (
    currentIndex: number
  ) => { id: number; name: string }[];
}

export function CompareSelector({
  motorcycles,
  selectedMotorcycles,
  onSelectMotorcycle,
  onRemoveMotorcycle,
  onAddMotorcycle,
  canAddMore,
  getAvailableMotorcycles,
}: CompareSelectorProps) {
  // Format price to VND
  function formatPrice(price: number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(price);
  }

  // Find motorcycle by ID
  const findMotorcycle = (id: number) => {
    return motorcycles.find((m) => m.id === id) || null;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {selectedMotorcycles.map((motorcycleId, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-medium">Xe {index + 1}</h3>
              {motorcycleId !== 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-muted-foreground"
                  onClick={() => onRemoveMotorcycle(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="p-4">
              <Select
                value={motorcycleId.toString()}
                onValueChange={(value) =>
                  onSelectMotorcycle(index, Number.parseInt(value))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn xe" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableMotorcycles(index).map((m) => (
                    <SelectItem key={m.id} value={m.id.toString()}>
                      {m.id === 0 ? m.name : m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {motorcycleId !== 0 && (
                <div className="mt-4">
                  <div className="relative h-40 w-full mb-3">
                    <Image
                      src={
                        findMotorcycle(motorcycleId)?.image ||
                        "/placeholder.svg"
                      }
                      alt={findMotorcycle(motorcycleId)?.name || ""}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h4 className="font-medium text-center">
                    {findMotorcycle(motorcycleId)?.brand}{" "}
                    {findMotorcycle(motorcycleId)?.name}
                  </h4>
                  <p className="text-center text-primary font-bold mt-1">
                    {formatPrice(findMotorcycle(motorcycleId)?.price || 0)}
                  </p>
                </div>
              )}

              {motorcycleId === 0 && (
                <div className="flex flex-col items-center justify-center h-56 border-2 border-dashed rounded-md mt-4">
                  <div className="text-muted-foreground text-center">
                    <div className="flex justify-center mb-2">
                      <Plus className="h-8 w-8" />
                    </div>
                    <p>Chọn xe để so sánh</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      {canAddMore && (
        <div
          className="flex flex-col items-center justify-center border-2 border-dashed rounded-md h-96 cursor-pointer hover:bg-muted/30 transition-colors"
          onClick={onAddMotorcycle}
        >
          <div className="text-muted-foreground text-center">
            <div className="flex justify-center mb-2">
              <Plus className="h-8 w-8" />
            </div>
            <p>Thêm xe để so sánh</p>
            <p className="text-sm mt-1">(Tối đa 3 xe)</p>
          </div>
        </div>
      )}
    </div>
  );
}
