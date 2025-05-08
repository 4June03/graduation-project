"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square w-full bg-gray-100 rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Không có hình ảnh
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={images[currentImageIndex].url || "/placeholder.svg"}
          alt={images[currentImageIndex].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
              aria-label="Hình ảnh trước"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-md hover:bg-white"
              aria-label="Hình ảnh tiếp theo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <Button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md ${
                index === currentImageIndex
                  ? "ring-2 ring-offset-2 ring-black"
                  : "ring-1 ring-gray-200"
              }`}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
