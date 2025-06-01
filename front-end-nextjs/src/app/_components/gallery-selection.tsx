"use client";

import Image from "next/image";
import { useState } from "react";

const galleryImages = [
  {
    id: 1,
    src: "/images/sub-banner1.PNG",
    alt: "Motorcycle Adventure",
    title: "Phiêu Lưu Cùng Xe Máy",
    description: "Khám phá những cung đường tuyệt đẹp",
  },
  {
    id: 2,
    src: "/images/sub-banner2.PNG",
    alt: "Motorcycle Technology",
    title: "Công Nghệ Hiện Đại",
    description: "Trải nghiệm công nghệ tiên tiến",
  },
  {
    id: 3,
    src: "/images/banner3.PNG",
    alt: "Motorcycle Community",
    title: "Cộng Đồng Biker",
    description: "Kết nối với những người đam mê",
  },
  {
    id: 4,
    src: "/images/sub-banner4.PNG",
    alt: "Motorcycle Culture",
    title: "Văn Hóa Xe Máy",
    description: "Khám phá văn hóa độc đáo",
  },
];

export function GallerySection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Khám Phá Thế Giới Xe Máy
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Cùng chúng tôi khám phá những câu chuyện thú vị, công nghệ tiên tiến
            và cộng đồng đam mê xe máy
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
              onMouseEnter={() => setHoveredId(image.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredId === image.id ? "scale-110" : "scale-100"
                  }`}
                />

                {/* Overlay
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                    hoveredId === image.id ? "bg-opacity-40" : "bg-opacity-0"
                  }`}
                /> */}

                {/* Content */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 text-white transition-all duration-300 ${
                    hoveredId === image.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                  <p className="text-sm text-gray-200">{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
