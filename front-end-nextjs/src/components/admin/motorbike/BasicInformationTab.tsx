import { TabsContent } from "@/components/ui/tabs";
import React, { FC } from "react";
import InputForm from "@/components/common/InputForm";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TabFormProps } from "@/components/admin/motorbike/FormAddMotorBike";

const BasicInformationTab: FC<TabFormProps> = ({ form }) => {
  return (
    <TabsContent value="basic" className="space-y-4 pt-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="bikeName"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="bikeName"
              label="Bike Name"
              placeholder="Motorcycle Name"
              type="text"
            />
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="videoUrl"
              label="VideoUrl"
              placeholder="video url"
              type="text"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Danh mục">Danh mục</SelectItem>
                    <SelectItem value="Danh mục 2">Danh mục 2</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brandId"
          render={({ field: { onChange, value } }) => (
            <FormItem>
              <FormLabel>Thương hiệu xe</FormLabel>
              <FormControl>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thương hiệu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Honda">Honda</SelectItem>
                    <SelectItem value="Yamaha">Yamaha</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="w-full">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả xe</FormLabel>
              <FormControl>
                <Textarea placeholder="Mô tả xe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </TabsContent>
  );
};

export default BasicInformationTab;
