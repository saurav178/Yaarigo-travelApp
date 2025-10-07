"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images?: string[];
  title: string;
}

export default function ImageSlider({ images = [], title }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <div className="bg-gray-200 w-full h-40 flex items-center justify-center text-gray-500 text-sm">
        No images available
      </div>
    );
  }

  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-40">
      <Image
        src={images[current]}
        alt={`${title} image ${current + 1}`}
        width={400}
        height={200}
        className="rounded-lg object-cover w-full h-full"
      />

      {/* Bold clickable icons */}
      <ChevronLeft
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white cursor-pointer hover:text-gray-200 transition"
        size={22}         // larger icon
        strokeWidth={4} // bolder stroke
      />
      <ChevronRight
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white cursor-pointer hover:text-gray-200 transition"
        size={22}         // larger icon
        strokeWidth={4} // bolder stroke
      />
    </div>
  );
}
