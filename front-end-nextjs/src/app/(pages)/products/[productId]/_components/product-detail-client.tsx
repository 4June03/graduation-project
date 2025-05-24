"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Breadcrumb } from "@/components/client/layout/breadcrumb";
import { ProductGallery } from "@/components/client/products/product-gallery";
import { ProductVariantSelector } from "@/components/client/products/product-variant-selector";
import { ProductColorSelector } from "@/components/client/products/product-color-selector";
import { Product } from "@/app/(pages)/products/type";
import { useAuth } from "@/components/provider/AuthProvider";
import { AddToCartRequest } from "@/app/(pages)/cart/type";
import { toast } from "sonner";
import { addToCart } from "@/app/(pages)/cart/_lib/service";

interface ProductDetailClientProps {
  product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const router = useRouter();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const { userId } = useAuth();
  // Xử lý khi thay đổi biến thể
  const handleVariantChange = (variantIndex: number) => {
    setSelectedVariantIndex(variantIndex);
    setSelectedColorIndex(0); // Reset color selection when variant changes
  };

  // Xử lý khi thay đổi màu sắc
  const handleColorChange = (colorIndex: number) => {
    setSelectedColorIndex(colorIndex);
  };

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = async () => {
    try {
      const selectedVariant = product.variants[selectedVariantIndex];
      const selectedVariantColor =
        selectedVariant.variantColors[selectedColorIndex];

      if (!userId) {
        toast.error("Vui lòng đăng nhập");
        return;
      }

      // Dữ liệu gửi lên API
      const cartData: AddToCartRequest = {
        userId: userId,
        productId: product.bikeId,
        variantId: selectedVariant.variantId,
        variantColorId: selectedVariantColor.variantColorId,
      };

      console.log("Variant:", selectedVariant);

      console.log("Dữ liệu gửi lên API thêm vào giỏ hàng:", cartData);

      const response = await addToCart(cartData);

      // Trong thực tế, đây sẽ là một API call
      // const response = await fetch("localhost:8080/cart", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(cartData),
      // });
      // const result = await response.json();

      // Giả lập API call thành công
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
        console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      }
    }
  };

  // Xử lý mua ngay
  const handleBuyNow = () => {
    const selectedVariant = product.variants[selectedVariantIndex];
    const selectedColor = selectedVariant.variantColors[selectedColorIndex];

    // Dữ liệu gửi lên API
    const cartData = {
      userId: userId, // Giả sử userId là 1, trong thực tế sẽ lấy từ context hoặc state
      productId: product.bikeId,
      variantId: selectedVariant.variantId,
      variantColorId: selectedColor.colorId,
    };

    console.log("Dữ liệu gửi lên API mua ngay:", cartData);

    // Trong thực tế, đây sẽ là một API call để thêm vào giỏ hàng trước
    // const response = await fetch('/api/cart/add', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(cartData),
    // });

    router.push("/checkout");
  };

  // Xử lý thêm vào danh sách yêu thích
  const handleAddToWishlist = async () => {
    // Trong thực tế, đây sẽ là một API call
    console.log(`Thêm xe ${product.bikeName} vào danh sách yêu thích`);

    alert("Đã thêm sản phẩm vào danh sách yêu thích");
  };

  // Chuẩn bị dữ liệu cho breadcrumb
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Danh mục", href: "/categories" },
    {
      label: product.categoryName,
      href: `/categories/${product.categoryName}`,
    },
    { label: product.bikeName, href: `/products/${product.bikeId}` },
  ];

  // Lấy biến thể và màu sắc đã chọn
  const selectedVariant = product?.variants[selectedVariantIndex];
  const selectedColor = selectedVariant?.variantColors[selectedColorIndex];

  // Chuẩn bị hình ảnh cho gallery
  const galleryImages = selectedColor.images.map((img, index) => ({
    id: `${index}`,
    url: img.imageUrl,
    alt: `${product.bikeName} - ${selectedVariant.variantName} - Hình ${
      index + 1
    }`,
  }));

  // Chuẩn bị thông số kỹ thuật cơ bản
  const basicSpecs = [
    { name: "Trọng lượng", value: `${product.basicSpecification.weight} kg` },
    { name: "Chiều dài", value: `${product.basicSpecification.length} mm` },
    { name: "Chiều rộng", value: `${product.basicSpecification.width} mm` },
    { name: "Chiều cao", value: `${product.basicSpecification.height} mm` },
    {
      name: "Chiều dài cơ sở",
      value: `${product.basicSpecification.wheelbase} mm`,
    },
    {
      name: "Chiều cao yên",
      value: `${product.basicSpecification.seatHeight} mm`,
    },
    {
      name: "Khoảng sáng gầm",
      value: `${product.basicSpecification.groundClearance} mm`,
    },
    {
      name: "Dung tích bình xăng",
      value: `${product.basicSpecification.fuelTankCapacity} lít`,
    },
    {
      name: "Kích thước lốp trước",
      value: `${product.basicSpecification.frontTireSize} inch`,
    },
    {
      name: "Kích thước lốp sau",
      value: `${product.basicSpecification.rearTireSize} inch`,
    },
  ];

  // Chuẩn bị thông số động cơ và khung xe
  const engineSpecs = [
    { name: "Giảm xóc trước", value: product.engineAndFrame.frontSuspension },
    { name: "Giảm xóc sau", value: product.engineAndFrame.rearSuspension },
    { name: "Loại động cơ", value: product.engineAndFrame.engineType },
    {
      name: "Công suất tối đa",
      value: `${product.engineAndFrame.maximumPower} HP`,
    },
    {
      name: "Dung tích xy-lanh",
      value: `${product.engineAndFrame.displacement} cc`,
    },
    { name: "Đường kính xy-lanh", value: `${product.engineAndFrame.bore} mm` },
    { name: "Hành trình piston", value: `${product.engineAndFrame.stroke} mm` },
    {
      name: "Tỷ số nén",
      value: `${product.engineAndFrame.compressionRatio}:1`,
    },
  ];

  // Nếu chưa có variants, hiển thị loading placeholder
  if (!product?.variants?.length) {
    return <div className="container py-8">Đang tải thông tin sản phẩm…</div>;
  }

  return (
    <main className="flex min-h-screen flex-col">
      <div className="bg-muted/30 py-6">
        <div className="container">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      <div className="container py-8 w-full mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Gallery */}
          <ProductGallery images={galleryImages} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.bikeName}</h1>
              <p className="text-gray-500">Thương hiệu: {product.brandName}</p>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 15.934l-6.18 3.254 1.18-6.875L.001 7.496l6.9-1.002L10 .252l3.1 6.242 6.9 1.002-4.999 4.817 1.18 6.875z"
                      />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({product.rating} đánh giá)
                </span>
              </div>
            </div>

            <hr className="my-6" />

            <div className="space-y-6">
              {/* Mô tả sản phẩm */}
              <div>
                <h3 className="text-lg font-medium mb-2">Mô tả</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              {/* Chọn biến thể */}
              <ProductVariantSelector
                variants={product.variants}
                selectedVariantIndex={selectedVariantIndex}
                onChange={handleVariantChange}
              />

              {/* Chọn màu sắc */}
              <ProductColorSelector
                colors={selectedVariant.variantColors}
                selectedColorIndex={selectedColorIndex}
                onChangeColor={handleColorChange}
              />

              {/* Hiển thị giá */}
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">
                  {formatCurrency(selectedVariant.variantPrice)}
                </span>
              </div>

              {/* Các nút thao tác */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
                <button
                  onClick={handleAddToCart}
                  disabled={selectedVariant.variantStock <= 0}
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  <svg
                    className="mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={selectedVariant.variantStock <= 0}
                  className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 disabled:opacity-50"
                >
                  Mua ngay
                </button>
                <button
                  onClick={handleAddToWishlist}
                  className="h-10 w-10 p-0 flex items-center justify-center border border-gray-300 rounded-md"
                  aria-label="Thêm vào yêu thích"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-green-500 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <span className="font-medium">Giao hàng miễn phí</span>
                      <p className="text-sm text-muted-foreground">
                        Cho đơn hàng trên 5 triệu đồng
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <svg
                      className="h-5 w-5 text-green-500 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div>
                      <span className="font-medium">
                        Bảo hành chính hãng 3 năm
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Tại tất cả các trung tâm bảo hành trên toàn quốc
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông số kỹ thuật */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
            Thông số kỹ thuật
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Thông số cơ bản</h3>
              <div className="space-y-2">
                {basicSpecs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-100"
                  >
                    <span className="text-gray-600">{spec.name}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Động cơ & Khung xe</h3>
              <div className="space-y-2">
                {engineSpecs.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-2 border-b border-gray-100"
                  >
                    <span className="text-gray-600">{spec.name}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video giới thiệu */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">
            Video giới thiệu
          </h2>
          {product.videoUrl ? (
            <div className="aspect-video max-w-3xl mx-auto">
              <iframe
                src={product.videoUrl}
                className="w-full h-full rounded-lg shadow-md"
                title={`Video ${product.bikeName}`}
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 font-medium">
                Không có video cho sản phẩm này
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Hàm định dạng tiền tệ
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}
