"use client";
import BasicInformationTab from "@/components/admin/motorbike/BasicInformationTab";
import EngineAndFrameTab from "@/components/admin/motorbike/EngineAndFrameTab";
import SpecificationsTab from "@/components/admin/motorbike/SpecificationsTab";
import InputForm from "@/components/common/InputForm";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { useForm } from "react-hook-form";

export interface TabFormProps {
  form: any;
}

const FormAddMotorBike = () => {
  const form = useForm({
    defaultValues: {
      bikeName: "",
      description: "",
      videoUrl: "",
      categoryId: "",
      brandId: "",
      basicSpecification: {
        weight: "",
        length: "",
        width: "",
        height: "",
        wheelbase: "",
        seatHeight: "",
        groundClearance: "",
        fuelTankCapacity: "",
        frontTireSize: "",
        rearTireSize: "",
      },
      engineAndFrame: {
        frontSuspension: "",
        rearSuspension: "",
        engineType: "",
        maximumPower: 0.0,
        displacement: 0.0,
        bore: 0.0,
        stroke: 0.0,
        compressionRatio: 0.0,
      },
      variants: [],
    },
  });

  const onsubmitData = (data) => {
    console.log("data form: ", data);
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
