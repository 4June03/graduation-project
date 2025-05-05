"use client";
import { useDataMutation } from "@/hooks/useCRUD";
import { MotorcycleForm } from "../components/motorcycle-form";
import { MotorcycleFormValues } from "@/app/admin/dashboard/motorcycles/components/motorcycle-form-schema";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function AddMotorcyclePage() {
  const { useCreate } = useDataMutation(["motorcycles"]);
  const queryClient = useQueryClient();
  const handleAddMotorcycle = async (data: MotorcycleFormValues) => {
    await useCreate.mutate(
      {
        url: "/motorbikes",
        data,
      },
      {
        onSuccess: () => {
          toast.success("Thêm xe thành công");
          queryClient.invalidateQueries({ queryKey: ["motorcycles"] });
        },
        onError: (error) => {
          toast.error("Thêm xe thất bại");
          console.error("Lỗi thêm xe:", error);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Thêm xe mới</h1>
      </div>
      <MotorcycleForm onSubmitForm={handleAddMotorcycle} />
    </div>
  );
}
