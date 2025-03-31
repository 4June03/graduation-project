import { TabFormProps } from "@/components/admin/motorbike/FormAddMotorBike";
import InputForm from "@/components/common/InputForm";
import { FormField } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import React, { FC } from "react";

const EngineAndFrameTab: FC<TabFormProps> = ({ form }) => {
  return (
    <TabsContent value="engine" className="space-y-4 pt-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FormField
          control={form.control}
          name="frontSuspension"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="frontSuspension"
              label="Phuộc trước - front suspension"
              placeholder="Phuộc trước"
              type="text"
            />
          )}
        />
        <FormField
          control={form.control}
          name="rearSuspension"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="rearSuspension"
              label="Phuộc sau - rear suspension"
              placeholder="Phuộc sau"
              type="text"
            />
          )}
        />
        <FormField
          control={form.control}
          name="engineType"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="engineType"
              label="Loại động cơ"
              placeholder="loại động cơ"
              type="text"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FormField
          control={form.control}
          name="maximumPower"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="maximumPower"
              label="Công suất tối đa (HP)"
              placeholder="0.0"
              type="number"
            />
          )}
        />
        <FormField
          control={form.control}
          name="displacement"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="displacement"
              label="Dung tích xi lanh (cc) - displacement"
              placeholder="0.0"
              type="text"
            />
          )}
        />
        <FormField
          control={form.control}
          name="bore"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="bore"
              label="Đường kính xi lanh (mm) - bore"
              placeholder="0.0"
              type="text"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FormField
          control={form.control}
          name="stroke"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="stroke"
              label="Hành trình piston (mm) - stroke"
              placeholder="0.0"
              type="number"
            />
          )}
        />
        <FormField
          control={form.control}
          name="compressionRatio"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="compressionRatio"
              label="Tỉ số khí nén - compression ratio"
              placeholder="0.0"
              type="number"
            />
          )}
        />
      </div>
    </TabsContent>
  );
};

export default EngineAndFrameTab;
