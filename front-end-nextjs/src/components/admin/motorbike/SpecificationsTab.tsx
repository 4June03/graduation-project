import { TabFormProps } from "@/components/admin/motorbike/FormAddMotorBike";
import InputForm from "@/components/common/InputForm";
import { FormField } from "@/components/ui/form";
import { TabsContent } from "@/components/ui/tabs";
import React, { FC } from "react";

const SpecificationsTab: FC<TabFormProps> = ({ form }) => {
  return (
    <TabsContent value="specifications" className="space-y-4 pt-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="weight"
              label="Trọng lượng - weight(kg)"
              placeholder="0.0"
              type="number"
            />
          )}
        />
        <FormField
          control={form.control}
          name="length"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="length"
              label="Chiều dài - length (mm)"
              placeholder="0.0"
              type="number"
            />
          )}
        />

        <FormField
          control={form.control}
          name="width"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="frontSuspension"
              label="chiều rộng - width(mm)"
              placeholder="0.0"
              type="number"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="height"
              label="Cao - height(mm)"
              placeholder="0.0"
              type="number"
            />
          )}
        />
        <FormField
          control={form.control}
          name="wheelbase"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="wheelbase"
              label="Khoảng cách trục bánh xe - wheelbase (mm)"
              placeholder="0.0"
              type="number"
            />
          )}
        />

        <FormField
          control={form.control}
          name="seatHeight"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="seatHeight"
              label="chiều cao yên - seat height(mm)"
              placeholder="0.0"
              type="number"
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="groundClearance"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="groundClearance"
              label="Khoảng cách gầm - groundClearance(mm)"
              placeholder="0.0"
              type="number"
            />
          )}
        />
        <FormField
          control={form.control}
          name="fuelTankCapacity"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="fuelTankCapacity"
              label="Dung tích bình xăng - fuelTankCapacity (lít)"
              placeholder="0.0"
              type="number"
            />
          )}
        />

        <FormField
          control={form.control}
          name="frontTireSize"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="frontTireSize"
              label="Kích thước lốp trước - frontTireSize(mm)"
              placeholder="0.0"
              type="number"
            />
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="rearTireSize"
          render={({ field }) => (
            <InputForm
              field={field}
              nameValue="rearTireSize"
              label="Kích thước lốp sau - rearTireSize(mm)"
              placeholder="0.0"
              type="number"
            />
          )}
        />
      </div>
    </TabsContent>
  );
};

export default SpecificationsTab;
