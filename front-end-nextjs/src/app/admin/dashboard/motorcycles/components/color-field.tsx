"use client";

import { useFieldArray, type Control } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ImageUploadField } from "./image-upload-field";
import type { MotorcycleFormValues } from "./motorcycle-form-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Color } from "@/app/admin/dashboard/motorcycles/components/motorcycle-form";

interface ColorFieldProps {
  control: Control<MotorcycleFormValues>;
  variantIndex: number;
  colors: Color[];
}

export function ColorField({ control, variantIndex, colors }: ColorFieldProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${variantIndex}.variantColors`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Màu sắc</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              colorId: 0,
              images: [],
            })
          }
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm màu
        </Button>
      </div>

      {fields.map((field, colorIndex) => (
        <Card key={field.id} className="border-dashed">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-sm font-medium">Màu {colorIndex + 1}</h5>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => remove(colorIndex)}
                className="h-8 px-2 text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Xóa
              </Button>
            </div>

            <div className="space-y-4">
              <FormField
                control={control}
                name={`variants.${variantIndex}.variantColors.${colorIndex}.colorId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên màu</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn màu" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem
                            key={color.colorId}
                            value={color.colorId.toString()}
                          >
                            {color.colorName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`variants.${variantIndex}.variantColors.${colorIndex}.images`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hình ảnh</FormLabel>
                    <FormControl>
                      <ImageUploadField
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
