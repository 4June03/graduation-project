import { TabFormProps } from "@/components/admin/motorbike/FormAddMotorBike";
import VariantColors from "@/components/admin/motorbike/VariantColor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import { Trash2 } from "lucide-react";
import React, { FC } from "react";
import { useFieldArray } from "react-hook-form";

const colors = [
  { id: "1", name: "Red" },
  { id: "2", name: "Blue" },
  { id: "3", name: "Black" },
];

const VariantTab: FC<TabFormProps> = ({ form }) => {
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control: form.control, name: "variants" });

  return (
    <>
      <TabsContent value="variants" className="space-y-6 pt-4">
        {variantFields.map((variant, index) => (
          <Card key={variant.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Biến thể {index + 1}</h3>
                {variantFields.length > 1 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeVariant(index)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Xóa biến thể
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
                <FormField
                  control={form.control}
                  name={`variants.${index}.variantName`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên biến thể</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ví dụ: Standard, Deluxe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.variantPrice`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value))
                          }
                          placeholder="Nhập giá"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.variantStock`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số lượng tồn kho</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          placeholder="Nhập số lượng"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator className="my-4" />

              {/* Quản lý variantColors */}
              <VariantColors
                variantIndex={index}
                control={form.control}
                colors={colors}
              />
            </CardContent>
          </Card>
        ))}

        <Button
          variant="outline"
          onClick={() =>
            appendVariant({
              variantName: "",
              variantPrice: 0,
              variantStock: 0,
              variantColors: [],
            })
          }
        >
          Thêm biến thể
        </Button>
      </TabsContent>
    </>
  );
};

export default VariantTab;
