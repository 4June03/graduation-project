import * as z from "zod";

// Define the schema for image
export const imageSchema = z.object({
  imageUrl: z.string().url({ message: "URL ảnh không hợp lệ" }),
});

// Define the schema for color
export const colorSchema = z.object({
  colorId: z.number().optional(),
  images: z.array(imageSchema).min(1, { message: "Phải có ít nhất 1 ảnh" }),
});

// Define the schema for variant
export const variantSchema = z.object({
  variantName: z
    .string()
    .min(1, { message: "Tên biến thể không được để trống" }),
  variantPrice: z.number().positive({ message: "Giá phải là số dương" }),
  variantStock: z
    .number()
    .int()
    .nonnegative({ message: "Số lượng không được âm" }),
  variantColors: z
    .array(colorSchema)
    .min(1, { message: "Phải có ít nhất 1 màu" }),
});

// Define the schema for basic specification
export const basicSpecificationSchema = z.object({
  weight: z.number().positive({ message: "Trọng lượng phải là số dương" }),
  length: z.number().positive({ message: "Chiều dài phải là số dương" }),
  width: z.number().positive({ message: "Chiều rộng phải là số dương" }),
  height: z.number().positive({ message: "Chiều cao phải là số dương" }),
  wheelbase: z
    .number()
    .positive({ message: "Chiều dài cơ sở phải là số dương" }),
  seatHeight: z
    .number()
    .positive({ message: "Chiều cao yên phải là số dương" }),
  groundClearance: z
    .number()
    .positive({ message: "Khoảng sáng gầm phải là số dương" }),
  fuelTankCapacity: z
    .number()
    .positive({ message: "Dung tích bình xăng phải là số dương" }),
  frontTireSize: z
    .number()
    .positive({ message: "Kích thước lốp trước phải là số dương" }),
  rearTireSize: z
    .number()
    .positive({ message: "Kích thước lốp sau phải là số dương" }),
});

// Define the schema for engine and frame
export const engineAndFrameSchema = z.object({
  frontSuspension: z
    .string()
    .min(1, { message: "Giảm xóc trước không được để trống" }),
  rearSuspension: z
    .string()
    .min(1, { message: "Giảm xóc sau không được để trống" }),
  engineType: z
    .string()
    .min(1, { message: "Loại động cơ không được để trống" }),
  maximumPower: z
    .number()
    .positive({ message: "Công suất tối đa phải là số dương" }),
  displacement: z
    .number()
    .positive({ message: "Dung tích xi-lanh phải là số dương" }),
  bore: z.number().positive({ message: "Đường kính xi-lanh phải là số dương" }),
  stroke: z
    .number()
    .positive({ message: "Hành trình piston phải là số dương" }),
  compressionRatio: z
    .number()
    .positive({ message: "Tỷ số nén phải là số dương" }),
});

// Define the main schema for the motorcycle form
export const motorcycleFormSchema = z.object({
  bikeName: z.string().min(2, { message: "Tên xe phải có ít nhất 2 ký tự" }),
  description: z
    .string()
    .min(10, { message: "Mô tả phải có ít nhất 10 ký tự" }),
  videoUrl: z
    .string()
    .url({ message: "URL video không hợp lệ" })
    .optional()
    .or(z.literal("")),
  categoryId: z.number(),
  brandId: z.number(),
  basicSpecification: basicSpecificationSchema,
  engineAndFrame: engineAndFrameSchema,
  variants: z
    .array(variantSchema)
    .min(1, { message: "Phải có ít nhất 1 biến thể" }),
});

export type MotorcycleFormValues = z.infer<typeof motorcycleFormSchema>;
