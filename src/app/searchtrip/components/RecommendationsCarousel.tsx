// src/components/RecommendationsCarousel.tsx
"use client";

import { useState } from "react";
import TripCard from "@/src/app/searchtrip/components/RecommendationsCards";
import { recommendations } from "@/src/app/searchtrip/data/recommendations";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function RecommendationsCarousel() {
  const visible = 3;
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, recommendations.length - visible);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // number of pages (how many distinct positions)
  const pages = maxIndex + 1;

  return (
    <section>
      <div className="relative w">
        {/* track container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(recommendations.length / visible) * 100}%`,
              transform: `translateX(-${(index * 100) / (recommendations.length)}%)`,
            }}
          >
            {recommendations.map((r) => (
              <div key={r.id} className="w-1/3 px-3 box-border">
                <TripCard rec={r} />
              </div>
            ))}
          </div>
        </div>

        {/* left / right buttons */}
        <button
          onClick={prev}
          disabled={index === 0}
          className="absolute -left-5 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 disabled:opacity-40"
          aria-label="prev"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={next}
          disabled={index >= maxIndex}
          className="absolute -right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100 disabled:opacity-40"
          aria-label="next"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* dots */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-[#EB5757]" : "bg-gray-300"}`}
            aria-label={`go to ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
