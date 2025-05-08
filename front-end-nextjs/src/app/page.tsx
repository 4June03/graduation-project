import { CategorySection } from "@/app/_components/category-section";
import { FeaturedProductsSection } from "@/app/_components/featured-products-section";
import { HeroBanner } from "@/app/_components/hero-banner";
import { NewsPromotionsSection } from "@/app/_components/news-promotions-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroBanner />
      <CategorySection />
      <FeaturedProductsSection />
      <NewsPromotionsSection />
    </main>
  );
}
