"use client";

import type { ProductVariant } from "@/types/product";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantIndex: number;
  onChange: (index: number) => void;
}

export function ProductVariantSelector({
  variants,
  selectedVariantIndex,
  onChange,
}: ProductVariantSelectorProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Phiên bản</h3>
        <RadioGroup
          className="space-y-3"
          value={selectedVariantIndex.toString()}
          onValueChange={(value) => onChange(Number.parseInt(value))}
        >
          {variants.map((variant, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                value={index.toString()}
                id={`variant-${index}`}
              />
              <Label
                htmlFor={`variant-${index}`}
                className="flex items-center justify-between flex-1"
              >
                <span className="font-medium">{variant.variantName}</span>
                <span className="text-sm">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(variant.variantPrice)}
                  {variant.variantStock <= 0 && (
                    <span className="ml-2 text-red-500 text-xs font-medium">
                      Hết hàng
                    </span>
                  )}
                  {variant.variantStock > 0 && variant.variantStock <= 5 && (
                    <span className="ml-2 text-orange-500 text-xs font-medium">
                      Sắp hết hàng
                    </span>
                  )}
                </span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
