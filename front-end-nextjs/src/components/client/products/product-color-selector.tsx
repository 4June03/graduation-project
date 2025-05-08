"use client"

import type { VariantColor } from "@/types/product"

interface ProductColorSelectorProps {
  colors: VariantColor[]
  selectedColorIndex: number
  onChange: (colorIndex: number) => void
}

export function ProductColorSelector({ colors, selectedColorIndex, onChange }: ProductColorSelectorProps) {
  if (!colors || colors.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Màu sắc</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color, index) => {
            // Giả sử colorId là mã màu, trong thực tế bạn cần map colorId sang mã màu thực tế
            const colorMap: Record<number, string> = {
              1: "#FF0000", // Đỏ
              2: "#000000", // Đen
              3: "#FFFFFF", // Trắng
              4: "#0000FF", // Xanh dương
              5: "#008000", // Xanh lá
              6: "#FFFF00", // Vàng
              7: "#FFA500", // Cam
              8: "#800080", // Tím
              9: "#A52A2A", // Nâu
              10: "#808080", // Xám
            }

            const colorCode = colorMap[color.colorId] || "#CCCCCC"

            return (
              <button
                key={color.colorId}
                onClick={() => onChange(index)}
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColorIndex === index ? "border-black ring-2 ring-black ring-offset-2" : "border-gray-300"
                }`}
                style={{ backgroundColor: colorCode }}
                aria-label={`Màu ${color.colorId}`}
                title={`Màu ${color.colorId}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}
