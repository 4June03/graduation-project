import { NewsSection } from "./news-section"
import { PromotionsSection } from "./promotions-section"

export function NewsPromotionsSection() {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto w-full">
      <div className="grid md:grid-cols-2 gap-8">
        <NewsSection />
        <PromotionsSection />
      </div>
    </section>
  )
}
