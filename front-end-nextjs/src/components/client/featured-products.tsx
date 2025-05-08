import {
  ProductCard,
  type ProductData,
} from "@/components/client/products/product-card";

// Mock data for featured products
const featuredProducts: ProductData[] = [
  {
    id: 1,
    name: "Honda Wave Alpha",
    image: "/placeholder.svg?height=300&width=400",
    price: 17800000,
    oldPrice: 18500000,
    brand: "Honda",
    isNew: true,
  },
  {
    id: 2,
    name: "Yamaha Exciter 155",
    image: "/placeholder.svg?height=300&width=400",
    price: 50900000,
    oldPrice: null,
    brand: "Yamaha",
    isNew: false,
  },
  {
    id: 3,
    name: "Suzuki Raider R150",
    image: "/placeholder.svg?height=300&width=400",
    price: 49990000,
    oldPrice: 52000000,
    brand: "Suzuki",
    isNew: false,
  },
  {
    id: 4,
    name: "Honda SH 150i",
    image: "/placeholder.svg?height=300&width=400",
    price: 102900000,
    oldPrice: null,
    brand: "Honda",
    isNew: true,
  },
  {
    id: 5,
    name: "Yamaha Grande",
    image: "/placeholder.svg?height=300&width=400",
    price: 45500000,
    oldPrice: 47000000,
    brand: "Yamaha",
    isNew: false,
  },
  {
    id: 6,
    name: "Piaggio Vespa Primavera",
    image: "/placeholder.svg?height=300&width=400",
    price: 74900000,
    oldPrice: null,
    brand: "Piaggio",
    isNew: false,
  },
  {
    id: 7,
    name: "Honda Vision",
    image: "/placeholder.svg?height=300&width=400",
    price: 30800000,
    oldPrice: null,
    brand: "Honda",
    isNew: false,
  },
  {
    id: 8,
    name: "Yamaha YZF-R15",
    image: "/placeholder.svg?height=300&width=400",
    price: 70000000,
    oldPrice: 72500000,
    brand: "Yamaha",
    isNew: true,
  },
];

export function FeaturedProducts() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {featuredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
