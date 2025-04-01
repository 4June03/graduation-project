"use client";
import BasicInformationTab from "@/components/admin/motorbike/BasicInformationTab";
import EngineAndFrameTab from "@/components/admin/motorbike/EngineAndFrameTab";
import SpecificationsTab from "@/components/admin/motorbike/SpecificationsTab";
import InputForm from "@/components/common/InputForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export interface TabFormProps {
  form: any;
}

export const FormAddMotorBikeSchema = z.object({
  bikeName: z.string().min(1, "Tên xe không được để trống"),
  description: z.string().optional(),
  videoUrl: z.string().optional(),
  categoryId: z.string().min(1, "Vui lòng chọn danh mục"),
  brandId: z.string().min(1, "Vui lòng chọn thương hiệu"),

  weight: z.coerce.number().positive("Trọng lượng phải lớn hơn 0").optional(),
  length: z.coerce.number().positive("Chiều dài phải lớn hơn 0").optional(),
  width: z.coerce.number().positive("Chiều rộng phải lớn hơn 0").optional(),
  height: z.coerce.number().positive("Chiều cao phải lớn hơn 0").optional(),
  wheelbase: z.coerce
    .number()
    .positive("Chiều dài cơ sở phải lớn hơn 0")
    .optional(),
  seatHeight: z.coerce
    .number()
    .positive("Chiều cao yên phải lớn hơn 0")
    .optional(),
  groundClearance: z.coerce
    .number()
    .positive("Khoảng sáng gầm phải lớn hơn 0")
    .optional(),
  fuelTankCapacity: z.coerce
    .number()
    .positive("Dung tích bình xăng phải lớn hơn 0")
    .optional(),

  frontTireSize: z.string().optional(),
  rearTireSize: z.string().optional(),
  frontSuspension: z.string().optional(),
  rearSuspension: z.string().optional(),
  engineType: z.string().min(1, "Loại động cơ không được để trống"),

  maximumPower: z.coerce
    .number()
    .nonnegative("Công suất tối đa không hợp lệ")
    .optional(),
  displacement: z.coerce
    .number()
    .nonnegative("Dung tích không hợp lệ")
    .optional(),
  bore: z.coerce
    .number()
    .nonnegative("Đường kính xy lanh không hợp lệ")
    .optional(),
  stroke: z.coerce
    .number()
    .nonnegative("Hành trình piston không hợp lệ")
    .optional(),
  compressionRatio: z.coerce
    .number()
    .nonnegative("Tỷ số nén không hợp lệ")
    .optional(),
  // variants: z.array(z.string()).optional(),
});

const FormAddMotorBike = () => {
  const form = useForm({
    resolver: zodResolver(FormAddMotorBikeSchema),
    defaultValues: {
      bikeName: "",
      description: "",
      videoUrl: "",
      categoryId: "",
      brandId: "",
      weight: 0.0,
      length: 0.0,
      width: 0.0,
      height: 0.0,
      wheelbase: 0.0,
      seatHeight: 0.0,
      groundClearance: 0.0,
      fuelTankCapacity: 0.0,
      frontTireSize: "",
      rearTireSize: "",
      frontSuspension: "",
      rearSuspension: "",
      engineType: "",
      maximumPower: 0.0,
      displacement: 0.0,
      bore: 0.0,
      stroke: 0.0,
      compressionRatio: 0.0,
      // variants: [],
    },
  });

  const onsubmitData = (data: z.infer<typeof FormAddMotorBikeSchema>) => {
    const formattedData = {
      bikeName: data.bikeName,
      description: data.description,
      videoUrl: data.videoUrl,
      categoryId: Number(data.categoryId), // Chuyển đổi sang số nếu cần
      brandId: Number(data.brandId),
      basicSpecification: {
        weight: data.weight,
        length: data.length,
        width: data.width,
        height: data.height,
        wheelbase: data.wheelbase,
        seatHeight: data.seatHeight,
        groundClearance: data.groundClearance,
        fuelTankCapacity: data.fuelTankCapacity,
        frontTireSize: data.frontTireSize,
        rearTireSize: data.rearTireSize,
      },
      engineAndFrame: {
        frontSuspension: data.frontSuspension,
        rearSuspension: data.rearSuspension,
        engineType: data.engineType,
        maximumPower: data.maximumPower,
        displacement: data.displacement,
        bore: data.bore,
        stroke: data.stroke,
        compressionRatio: data.compressionRatio,
      },
      variants: [],
    };

    console.log("data form: ", formattedData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onsubmitData)}>
        <div className="space-y-6 py-4 px-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Add New Motorcycle</h1>
            <div className="flex gap-2">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit">Save Product</Button>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="engine">Engine & Frame</TabsTrigger>
              <TabsTrigger value="variants">Variants & Images</TabsTrigger>
            </TabsList>

            <BasicInformationTab form={form} />
            <SpecificationsTab form={form} />
            <EngineAndFrameTab form={form} />
          </Tabs>
        </div>
      </form>
    </Form>
  );
};

export default FormAddMotorBike;
