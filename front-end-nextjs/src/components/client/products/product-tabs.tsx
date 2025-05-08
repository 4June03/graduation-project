"use client"

import { useState } from "react"
import { ProductSpecifications } from "./product-specifications"
import { ProductFeatures } from "./product-features"
import { ProductReviews } from "./product-reviews"

interface Specification {
  name: string
  value: string
}

interface Feature {
  id: string
  title: string
  description: string
}

interface Review {
  id: string
  author: string
  date: string
  rating: number
  title: string
  content: string
  helpful: number
  notHelpful: number
}

interface ProductTabsProps {
  specifications: Specification[]
  features: Feature[]
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

type TabType = "specifications" | "features" | "reviews"

export function ProductTabs({ specifications, features, reviews, averageRating, totalReviews }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("specifications")

  return (
    <div className="mt-8">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("specifications")}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === "specifications"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("features")}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === "features"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Features
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === "reviews"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Reviews ({totalReviews})
          </button>
        </nav>
      </div>

      <div className="py-6">
        {activeTab === "specifications" && <ProductSpecifications specifications={specifications} />}
        {activeTab === "features" && <ProductFeatures features={features} />}
        {activeTab === "reviews" && (
          <ProductReviews reviews={reviews} averageRating={averageRating} totalReviews={totalReviews} />
        )}
      </div>
    </div>
  )
}
