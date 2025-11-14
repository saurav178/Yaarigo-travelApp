"use client";
import { useState } from "react";
import { Star, Shield, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface Agency {
  images: string[]; 
  logo: string;
  name: string;
  rating: number;
  trips: number;
}

interface SimilarAgenciesCarouselProps {
  agencies: Agency[];
}

export default function SimilarAgenciesCarousel({
  agencies,
}: SimilarAgenciesCarouselProps) {
  if (!agencies || agencies.length === 0)
    return <p className="text-gray-500">No similar agencies found.</p>;

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-gray-900">
        Similar Travel Agencies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agencies.map((agency, index) => {
          const [currentImage, setCurrentImage] = useState(0);

          const prevImage = (e: React.MouseEvent) => {
            e.stopPropagation();
            setCurrentImage(
              (prev) => (prev - 1 + agency.images.length) % agency.images.length
            );
          };
          const nextImage = (e: React.MouseEvent) => {
            e.stopPropagation();
            setCurrentImage((prev) => (prev + 1) % agency.images.length);
          };

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-black overflow-hidden shadow-sm hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
            >
              <div className="relative w-full h-48 overflow-hidden">
                {/* Sliding wrapper */}
                <div
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentImage * 100}%)` }}
                >
                  {agency.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={agency.name}
                      className="w-full h-48 object-cover flex-shrink-0"
                    />
                  ))}
                </div>

                {/* Left Arrow */}
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-transparent hover:text-gray-400 transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-transparent hover:text-gray-400 transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                  Verified
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-3">
                  <img
                    src={agency.logo}
                    alt="logo"
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-gray-900">
                      {agency.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      {agency.rating}
                      <span className="relative ml-2 bg-emerald-400 px-2 py-[2px] rounded-full text-white text-[10px] flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          {/* White shield */}
                          <Shield
                            className="w-4 h-4 fill-white text-white"
                            stroke="none"
                          />

                          {/* Green tick on top */}
                          <Check
                            className="absolute inset-0 m-auto w-2 h-2 text-emerald-500"
                            strokeWidth={3}
                          />
                        </div>
                        High
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-500 text-xs mt-3 leading-snug">
                  Lorem ipsum dolor sit amet consectetur. Nulla varius faucibus
                  elementum nibh neque eget.
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button className="bg-[#1D4350] hover:bg-[#173844] text-white text-xs px-8 py-2 rounded-md font-medium transition cursor-pointer">
                    View Profile
                  </button>
                  <button className="border border-[#1D4350] text-[#1D4350] text-xs px-7 py-2 rounded-md font-medium cursor-pointer">
                    {agency.trips} trips
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
