"use client";
import { useFetchData } from "@/hooks/useCRUD";
import { MotorcycleForm } from "../../components/motorcycle-form";

interface EditMotorcyclePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock function to fetch motorcycle data by ID
async function getMotorcycleById(id: string) {
  const { data } = useFetchData<any>(["motorcycles"], `/motorbikes/${id}`);

  // In a real application, this would fetch data from an API
  return data;
}

export default async function EditMotorcyclePage({
  params,
}: EditMotorcyclePageProps) {
  // Await the params to get the motorcycle ID
  const { id: bikeId } = await params;

  // const res = await getMotorcycleById(params.id);
  const res = await getMotorcycleById(bikeId);
  console.log("Motorcycle data:", res);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cập nhật thông tin xe</h1>
      </div>
      <MotorcycleForm initialData={res?.data} />
    </div>
  );
}
