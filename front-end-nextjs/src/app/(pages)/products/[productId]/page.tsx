import { Suspense } from "react";
import { getMotorbikeById } from "./_lib/service";
import { ProductDetailClient } from "./_components/product-detail-client";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}) {
  const productId = Number.parseInt(params.productId);
  const product = await getMotorbikeById(productId);

  return {
    title: product.bikeName,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = Number.parseInt(params.productId);
  const product = await getMotorbikeById(productId);

  return (
    <Suspense
      fallback={
        <div className="container py-8">Đang tải thông tin sản phẩm...</div>
      }
    >
      <ProductDetailClient product={product} />
    </Suspense>
  );
}
