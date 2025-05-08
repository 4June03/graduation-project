import { formatCurrency } from "@/lib/utils"

interface ProductInfoProps {
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  availability: "in-stock" | "low-stock" | "out-of-stock"
  sku: string
}

export function ProductInfo({
  name,
  brand,
  price,
  originalPrice,
  rating,
  reviewCount,
  availability,
  sku,
}: ProductInfoProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  const availabilityMap = {
    "in-stock": { label: "In Stock", color: "text-green-600" },
    "low-stock": { label: "Low Stock", color: "text-amber-600" },
    "out-of-stock": { label: "Out of Stock", color: "text-red-600" },
  }

  const { label, color } = availabilityMap[availability]

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-500">By {brand}</p>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
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
        <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold">{formatCurrency(price)}</span>
        {originalPrice && (
          <>
            <span className="text-lg text-gray-500 line-through">{formatCurrency(originalPrice)}</span>
            <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800">{discount}% OFF</span>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4 text-sm">
        <div>
          <span className="font-medium">Availability:</span> <span className={color}>{label}</span>
        </div>
        <div>
          <span className="font-medium">SKU:</span> {sku}
        </div>
      </div>
    </div>
  )
}
