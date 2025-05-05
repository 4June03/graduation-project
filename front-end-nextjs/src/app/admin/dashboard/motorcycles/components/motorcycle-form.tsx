"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { BasicInfoSection } from "./basic-info-section";
import { SpecificationsSection } from "./specifications-section";
import { EngineSection } from "./engine-section";
import { VariantSection } from "./variant-section";
import {
  motorcycleFormSchema,
  type MotorcycleFormValues,
} from "./motorcycle-form-schema";
import { useFetchData } from "@/hooks/useCRUD";
import { Category } from "@/app/admin/dashboard/categories/components/categories-client";

export type Brand = {
  brandId: number;
  brandName: string;
};

export type Color = {
  colorId: number;
  colorName: string;
};

// Default values for the form
const defaultValues: MotorcycleFormValues = {
  bikeName: "",
  description: "",
  videoUrl: "",
  categoryId: 1,
  brandId: 1,
  basicSpecification: {
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
    wheelbase: 0,
    seatHeight: 0,
    groundClearance: 0,
    fuelTankCapacity: 0,
    frontTireSize: 0,
    rearTireSize: 0,
  },
  engineAndFrame: {
    frontSuspension: "",
    rearSuspension: "",
    engineType: "",
    maximumPower: 0,
    displacement: 0,
    bore: 0,
    stroke: 0,
    compressionRatio: 0,
  },
  variants: [
    {
      variantName: "",
      variantPrice: 0,
      variantStock: 0,
      variantColors: [
        {
          colorId: 1,
          images: [],
        },
      ],
    },
  ],
};

interface MotorcycleFormProps {
  initialData?: MotorcycleFormValues & { id?: number };
  onSubmitForm?: (values: MotorcycleFormValues) => Promise<void>;
}

export function MotorcycleForm({
  initialData,
  onSubmitForm,
}: MotorcycleFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const {
    data: brands,
    isLoading: brandsLoading,
    isError: brandsError,
  } = useFetchData<Brand[]>(["brands"], "/motorbikes/brands");

  const {
    data: categoryApiResponse,
    isFetching,
    error,
  } = useFetchData<{
    success: boolean;
    message: string;
    data: Category[];
  }>(["categories"], `/categories`);
  const categories = categoryApiResponse?.data || [];

  const form = useForm<MotorcycleFormValues>({
    resolver: zodResolver(motorcycleFormSchema),
    defaultValues: initialData || defaultValues,
  });

  // Reset form with initial data when it changes
  useEffect(() => {
    if (initialData) {
      form.reset(initialData);
    }
  }, [form, initialData]);

  async function onSubmit(values: MotorcycleFormValues) {
    try {
      // In a real application, this would be an API call
      console.log("Form values:", values);
      await onSubmitForm?.(values);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Redirect back to motorcycles list
      router.push("/admin/dashboard/motorcycles");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-10">
        <BasicInfoSection
          control={form.control}
          categories={categories}
          brands={brands ?? []}
        />
        <SpecificationsSection control={form.control} />
        <EngineSection control={form.control} />
        <VariantSection control={form.control} />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/dashboard/motorcycles")}
          >
            Hủy
          </Button>
          <Button type="submit">{isEditing ? "Cập nhật" : "Thêm mới"}</Button>
        </div>
      </form>
    </Form>
  );
}
