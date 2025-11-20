"use client";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";

interface HeroSectionProps {
  hero: {
    bannerImage: string;
    logo: string;
    agencyName: string;
    category?: string;
    safetyScore?: number;
    location: string;
    rating?: number;
    reviews?: number;
  };
}

export default function HeroSection({ hero }: HeroSectionProps) {
  if (!hero) {
    return <div className="h-64 bg-gray-200 animate-pulse rounded-b-2xl"></div>;
  }

  const safety = hero.safetyScore ?? 0;

  let bgColor = "bg-red-100";
  let textColor = "text-red-600";
  if (safety >= 85) {
    bgColor = "bg-emerald-100";
    textColor = "text-emerald-600";
  } else if (safety >= 50) {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-600";
  }

  return (
    <div className="relative">
      <div className="w-full h-64 md:h-80 relative">
        <Image
          src={hero.bannerImage}
          alt="Banner"
          fill
          className="object-cover"
        />
      </div>
      <div className="-mt-12 md:-mt-16 w-full relative">
        <div className="flex items-start justify-between bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 p-6 mx-auto max-w-full">
          <div className="flex items-start gap-6">
            <div className="relative w-50 h-50 md:w-60 md:h-60 -mt-30 overflow-hidden shadow-xl z-20 group">
              <Image
                src={hero.logo}
                alt="Profile"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* Hero Info */}
            <div className="flex flex-col gap-2 mt-0">
              <h2 className="text-xl md:text-2xl font-bold">
                {hero.agencyName}
              </h2>

              {hero.category && (
                <span className="bg-[#1D4350] text-white px-2 py-1 text-xs font-medium">
                  {hero.category}
                </span>
              )}

              {/* Location */}
              <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span>{hero.location}</span>
              </div>

              {/* Safety score + Rating inline */}
              <div className="flex items-center gap-3 mt-2">
                <div
                  className={`px-2 py-0.5 rounded-2xl ${bgColor} ${textColor} text-xs`}
                >
                  {safety}% Safe
                </div>
                {hero.rating && (
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    {/* CUSTOM FILLED STAR */}
                    <div className="relative w-4 h-4">
                      {/* Gray empty star */}
                      <svg
                        className="w-4 h-4 text-gray-300 absolute top-0 left-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>

                      {/* Yellow filled star based on rating */}
                      <div
                        className="absolute top-0 left-0 overflow-hidden"
                        style={{ width: `${(hero.rating / 5) * 100}%` }}
                      >
                        <svg
                          className="w-4 h-4 text-yellow-400 fill-yellow-400"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      </div>
                    </div>

                    <span>
                      {hero.rating} ({hero.reviews})
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-[#1D4350] hover:bg-[#173844] text-white px-8 py-3 text-xs font-medium transition cursor-pointer">
              Contact
            </button>
            <button className="bg-black hover:bg-[#111111] text-white px-8 py-3 text-xs font-medium transition cursor-pointer">
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
