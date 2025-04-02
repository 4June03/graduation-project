import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import React from "react";
import { useFieldArray } from "react-hook-form";

const VariantColors = ({ variantIndex, control, colors }: any) => {
  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: `variants.${variantIndex}.variantColors`,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Màu sắc & Hình ảnh</h4>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            appendColor({
              colorId: "",
              images: [{ imageUrl: "" }, { imageUrl: "" }, { imageUrl: "" }],
            })
          }
        >
          <Plus className="h-4 w-4 mr-1" /> Thêm màu
        </Button>
      </div>

      {colorFields.map((colorField, colorIndex) => (
        <div key={colorField.id} className="p-4 border rounded-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20"></div>
              <h5 className="font-medium">Màu {colorIndex + 1}</h5>
            </div>
            {colorFields.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeColor(colorIndex)}
              >
                <X className="h-4 w-4 mr-1" /> Xóa
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <FormField
              control={control}
              name={`variants.${variantIndex}.variantColors.${colorIndex}.colorId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Màu sắc</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn màu" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color: any) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <FormLabel>Hình ảnh (tối đa 3)</FormLabel>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {colorField.images.map((_, imageIndex: number) => (
                  <FormField
                    key={imageIndex}
                    control={control}
                    name={`variants.${variantIndex}.variantColors.${colorIndex}.images.${imageIndex}.imageUrl`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={`URL hình ảnh ${imageIndex + 1}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VariantColors;
