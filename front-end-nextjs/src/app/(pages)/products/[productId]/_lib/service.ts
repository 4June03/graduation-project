import { Product } from "@/app/(pages)/products/type";

/**
 * Lấy thông tin chi tiết xe máy từ API
 * @param id ID của xe máy
 * @returns Thông tin chi tiết xe máy
 */
export async function getMotorbikeById(id: number): Promise<Product> {
  try {
    const response = await fetch(`http://localhost:8080/motorbikes/${id}`, {
      cache: "no-store", // Không cache kết quả để luôn lấy dữ liệu mới nhất
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch motorbike: ${response.status}`);
    }

    const result = (await response.json()) as {
      success: boolean;
      message: string;
      data: Product;
    };

    return result.data;
  } catch (error) {
    console.error("Error fetching motorbike:", error);

    // Trả về dữ liệu mẫu khi có lỗi (chỉ dùng trong môi trường development)
    return {
      bikeId: 1,
      bikeName: "Honda",
      description: "This is an example motorbike.",
      videoUrl: "http://example.com/video",
      categoryName: "Xe số",
      brandName: "Yamaha",
      rating: 0,
      basicSpecification: {
        weight: 150.0,
        length: 2000.0,
        width: 800.0,
        height: 1000.0,
        wheelbase: 1400.0,
        seatHeight: 800.0,
        groundClearance: 150.0,
        fuelTankCapacity: 15.0,
        frontTireSize: 17.0,
        rearTireSize: 17.0,
      },
      engineAndFrame: {
        frontSuspension: "Telescopic",
        rearSuspension: "Mono shock",
        engineType: "Single cylinder",
        maximumPower: 20.0,
        displacement: 250.0,
        bore: 60.0,
        stroke: 50.0,
        compressionRatio: 10.0,
      },
      variants: [
        {
          variantId: 1,
          variantName: "Standard",
          variantPrice: 100000.0,
          variantStock: 10,
          variantColors: [
            {
              variantColorId: 1,
              colorId: 1, // Đỏ
              images: [
                {
                  imageUrl: "/placeholder.svg?height=600&width=600&text=Red+1",
                },
                {
                  imageUrl: "/placeholder.svg?height=600&width=600&text=Red+2",
                },
                {
                  imageUrl: "/placeholder.svg?height=600&width=600&text=Red+3",
                },
              ],
            },
            {
              variantColorId: 2,
              colorId: 2, // Đen
              images: [
                {
                  imageUrl:
                    "/placeholder.svg?height=600&width=600&text=Black+1",
                },
                {
                  imageUrl:
                    "/placeholder.svg?height=600&width=600&text=Black+2",
                },
              ],
            },
          ],
        },
        {
          variantId: 2,
          variantName: "Deluxe",
          variantPrice: 150000.0,
          variantStock: 5,
          variantColors: [
            {
              variantColorId: 3,
              colorId: 3, // Trắng
              images: [
                {
                  imageUrl:
                    "/placeholder.svg?height=600&width=600&text=White+1",
                },
                {
                  imageUrl:
                    "/placeholder.svg?height=600&width=600&text=White+2",
                },
                {
                  imageUrl:
                    "/placeholder.svg?height=600&width=600&text=White+3",
                },
              ],
            },
            {
              variantColorId: 4,
              colorId: 4, // Xanh dương
              images: [
                {
                  imageUrl: "/placeholder.svg?height=600&width=600&text=Blue+1",
                },
                {
                  imageUrl: "/placeholder.svg?height=600&width=600&text=Blue+2",
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
