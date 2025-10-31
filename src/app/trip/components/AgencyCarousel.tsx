
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AgencyCard from "./AgencyCard";
import type { Agency } from "@/src/app/trip/types/types";

export default function AgencyCarousel({ agencies }: { agencies: Agency[] }) {
  const [index, setIndex] = useState(0);
  const visible = 2; // two cards visible at once
  const maxIndex = Math.max(0, agencies.length - visible);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  const cardPercent = 100 / visible; // each card width = 50%
  const translatePercent = index * cardPercent;

  return (
    <section className="relative w-full">
      {/* Heading */}
      <h3 className="text-lg font-semibold mb-4">Featured Travel Agencies</h3>

      {/* Slider Container */}
      <div className="overflow-hidden px-4 relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${translatePercent}%)`,
          }}
        >
          {agencies.map((agency) => (
            <div
              key={agency.id}
              style={{ flex: `0 0 ${cardPercent}%` }}
              className="px-4 box-border group"
            >
              {/* Hover effect on card */}
              <div className="transition-all duration-500 transform rounded-xl group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-[#eb575740]">
  <AgencyCard agency={agency} />
</div>

            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        disabled={index === 0}
        aria-label="Previous"
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-50 disabled:opacity-40 transition"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <button
        onClick={next}
        disabled={index >= maxIndex}
        aria-label="Next"
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-50 disabled:opacity-40 transition"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-[#EB5757] scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
