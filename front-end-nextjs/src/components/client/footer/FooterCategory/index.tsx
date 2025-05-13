"use client";
import { Category } from "@/components/client/category";
import { useFetchData } from "@/hooks/useCRUD";
import Link from "next/link";
import React from "react";

export const FooterCategory = () => {
  const {
    data: apiResponse,
    isFetching,
    error,
  } = useFetchData<{
    success: boolean;
    message: string;
    data: Category[];
  }>(["categories"], `/categories`);

  const categories = apiResponse?.data || [];

  return (
    <div>
      <h3 className="font-bold text-lg mb-4">Danh mục sản phẩm</h3>
      <ul className="space-y-2">
        {(categories || []).map((category, index) => (
          <li key={category.categoryId}>
            <Link
              href={`/categories/${category.categoryId}`}
              className="text-muted-foreground hover:text-foreground"
            >
              {category.categoryName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
