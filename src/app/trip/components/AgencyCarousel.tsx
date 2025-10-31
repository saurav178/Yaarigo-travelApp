"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight,  } from "lucide-react";
import AgencyCard from "./AgencyCard";
import type { Agency } from "@/src/app/trip/types/types";

export default function AgencyCarousel({ agencies }: { agencies: Agency[] }) {
  const [index, setIndex] = useState(0);
  const totalPages = Math.ceil(agencies.length / 2);

  const next = () => setIndex((i) => (i + 1 < totalPages ? i + 1 : i));
  const prev = () => setIndex((i) => (i - 1 >= 0 ? i - 1 : i));

  const start = index * 2;
  const visible = agencies.slice(start, start + 2);

  return (
    <div className="relative w-full">
      {/* Heading */}
      <h3 className="text-lg font-semibold mb-4">Featured Travel Agencies</h3>

      {/* Navigation buttons */}
      <button
        onClick={prev}
        disabled={index === 0}
        className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-50 disabled:opacity-40"
      >
        <ChevronLeft className="w-5 h-5 text-gray-600" />
      </button>

      <div className="overflow-hidden px-6">
        <div className="flex items-center justify-center gap-6 transition-transform duration-500">
          {visible.length === 2 ? (
            <div className="relative flex items-center justify-between gap-6 w-full">
              {/* Left Card */}
              <div className="w-1/2">
                <AgencyCard agency={visible[0]} />
              </div>

              {/* Right Card */}
              <div className="w-1/2">
                <AgencyCard agency={visible[1]} />
              </div>
            </div>
          ) : (
            // if odd number (last one)
            <div className="flex justify-center w-full">
              <div className="w-1/2">
                <AgencyCard agency={visible[0]} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={next}
        disabled={index === totalPages - 1}
        className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white border p-2 rounded-full shadow hover:bg-gray-50 disabled:opacity-40"
      >
        <ChevronRight className="w-5 h-5 text-gray-600" />
      </button>

      {/* bottom dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? "bg-[#EB5757]" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
