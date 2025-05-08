export interface ProductImage {
  imageUrl: string
}

export interface VariantColor {
  colorId: number
  images: ProductImage[]
}

export interface ProductVariant {
  variantId: number
  variantName: string
  variantPrice: number
  variantStock: number
  variantColors: VariantColor[]
}

export interface BasicSpecification {
  weight: number
  length: number
  width: number
  height: number
  wheelbase: number
  seatHeight: number
  groundClearance: number
  fuelTankCapacity: number
  frontTireSize: number
  rearTireSize: number
}

export interface EngineAndFrame {
  frontSuspension: string
  rearSuspension: string
  engineType: string
  maximumPower: number
  displacement: number
  bore: number
  stroke: number
  compressionRatio: number
}

export interface Product {
  bikeId: number
  bikeName: string
  description: string
  videoUrl: string
  categoryName: string
  brandName: string
  rating: number
  basicSpecification: BasicSpecification
  engineAndFrame: EngineAndFrame
  variants: ProductVariant[]
}

export interface Specification {
  name: string
  value: string | number
}

export interface Feature {
  id: string
  title: string
  description: string
}

export interface Review {
  id: string
  author: string
  date: string
  rating: number
  title: string
  content: string
  helpful: number
  notHelpful: number
}

export interface RelatedProduct {
  id: string
  name: string
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
}
