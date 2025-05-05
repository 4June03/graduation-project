"use client";

import { useFieldArray, type Control } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ColorField } from "./color-field";
import type { MotorcycleFormValues } from "./motorcycle-form-schema";
import { useFetchData } from "@/hooks/useCRUD";
import { Color } from "@/app/admin/dashboard/motorcycles/components/motorcycle-form";

interface VariantSectionProps {
  control: Control<MotorcycleFormValues>;
}

export function VariantSection({ control }: VariantSectionProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const {
    data: colors,
    isLoading: colorsLoading,
    isError: colorError,
  } = useFetchData<Color[]>(["colors"], "/motorbikes/colors");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Biến thể sản phẩm</CardTitle>
        <Button
          type="button"
          onClick={() =>
            append({
              variantName: "",
              variantPrice: 0,
              variantStock: 0,
              variantColors: [],
            })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm biến thể
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="border-dashed">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Biến thể {index + 1}</h3>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => remove(index)}
                  className="text-destructive"
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Xóa
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <FormField
                  control={control}
                  name={`variants.${index}.variantName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên biến thể</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập tên biến thể" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`variants.${index}.variantPrice`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá (VND)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập giá"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`variants.${index}.variantStock`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Nhập số lượng"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value, 10))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <ColorField
                control={control}
                variantIndex={index}
                colors={colors ?? []}
              />
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
