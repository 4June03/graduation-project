"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export function HeroBanner() {
  return (
    <section className="relative w-full h-[500px]">
      <Carousel className="w-full h-full">
        <CarouselContent>
          <CarouselItem>
            <div className="relative w-full h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=1920"
                alt="New motorcycle model"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-8 md:px-16">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Khám phá dòng xe mới nhất</h1>
                <p className="text-white text-lg md:text-xl max-w-md mb-6">
                  Trải nghiệm công nghệ tiên tiến và thiết kế hiện đại
                </p>
                <Button asChild size="lg" className="w-fit">
                  <Link href="/categories/new-arrivals">Xem ngay</Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-full h-[500px]">
              <Image
                src="/placeholder.svg?height=500&width=1920"
                alt="Special promotion"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-8 md:px-16">
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Ưu đãi đặc biệt tháng 3</h1>
                <p className="text-white text-lg md:text-xl max-w-md mb-6">
                  Giảm giá lên đến 20% cho các dòng xe phổ thông
                </p>
                <Button asChild size="lg" className="w-fit">
                  <Link href="/promotions">Xem khuyến mãi</Link>
                </Button>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </section>
  )
}
