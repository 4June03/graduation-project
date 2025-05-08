import { PageHeader } from "@/components/client/layout/page-header";
import { BrandCard } from "@/components/client/brands/brand-card";

// Mock data for brands
const brands = [
  {
    id: "honda",
    name: "Honda",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "Honda là một trong những nhà sản xuất xe máy lớn nhất thế giới.",
    productCount: 24,
  },
  {
    id: "yamaha",
    name: "Yamaha",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "Yamaha nổi tiếng với các dòng xe thể thao và xe tay ga cao cấp.",
    productCount: 18,
  },
  {
    id: "suzuki",
    name: "Suzuki",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "Suzuki cung cấp nhiều dòng xe máy đa dạng từ xe số đến xe thể thao.",
    productCount: 15,
  },
  {
    id: "piaggio",
    name: "Piaggio",
    logo: "/placeholder.svg?height=100&width=100",
    description: "Piaggio là thương hiệu xe máy cao cấp đến từ Ý.",
    productCount: 10,
  },
  {
    id: "sym",
    name: "SYM",
    logo: "/placeholder.svg?height=100&width=100",
    description: "SYM cung cấp các dòng xe máy chất lượng với giá cả hợp lý.",
    productCount: 12,
  },
  {
    id: "kawasaki",
    name: "Kawasaki",
    logo: "/placeholder.svg?height=100&width=100",
    description: "Kawasaki nổi tiếng với các dòng xe phân khối lớn mạnh mẽ.",
    productCount: 8,
  },
  {
    id: "ducati",
    name: "Ducati",
    logo: "/placeholder.svg?height=100&width=100",
    description: "Ducati là thương hiệu xe máy thể thao cao cấp đến từ Ý.",
    productCount: 6,
  },
  {
    id: "bmw",
    name: "BMW Motorrad",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "BMW Motorrad cung cấp các dòng xe máy cao cấp với công nghệ tiên tiến.",
    productCount: 7,
  },
];

export default function BrandsPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <PageHeader
        title="Thương hiệu xe máy"
        breadcrumbs={[
          { label: "Trang chủ", href: "/" },
          { label: "Thương hiệu" },
        ]}
      />

      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </main>
  );
}
