import { CategorySection } from "@/app/_components/category-section";
import { FeaturedProductsSection } from "@/app/_components/featured-products-section";
import { GallerySection } from "@/app/_components/gallery-selection";
import { HeroBanner } from "@/app/_components/hero-banner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroBanner />
      <CategorySection />
      <FeaturedProductsSection />
      <GallerySection />
    </main>
  );
}
