import { Suspense } from "react";
import { getMotorbikeById } from "./_lib/service";
import { ProductDetailClient } from "./_components/product-detail-client";
import { Product } from "@/app/(pages)/products/type";

// export async function generateMetadata({
//   params,
// }: {
//   params: { productId: string }; // Khai báo params là Promise
// }) {
//   const { productId } = params; // Await params để lấy giá trị thực tế
//   const id = Number.parseInt(productId);
//   const product = await getMotorbikeById(id);

//   return {
//     title: product.bikeName,
//     description: product.description,
//   };
// }

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>; // Khai báo params là Promise
}) {
  const { productId } = await params; // Await params để lấy giá trị thực tế
  const id = Number.parseInt(productId);
  const product: Product = await getMotorbikeById(id);

  // console.log("prodetail: ", product);
  console.log("product.variants:", product);
  return (
    <Suspense
      fallback={
        <div className="container py-8">Đang tải thông tin sản phẩm...</div>
      }
    >
      <div className="container py-8 w-full mx-auto">
        <ProductDetailClient product={product} />
      </div>
    </Suspense>
  );
}
