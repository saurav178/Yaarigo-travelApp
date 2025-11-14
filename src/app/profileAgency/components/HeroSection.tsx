"use client";
import { MapPin, Star, BadgeCheck, ShieldHalf } from "lucide-react";

export default function HeroSection({ hero }: any) {
  if (!hero) {
    return <div className="h-64 bg-gray-200 animate-pulse rounded-b-2xl"></div>;
  }

  // Safety Score Logic
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
    <div
      className="relative h-[240px] md:h-[300px] bg-cover bg-center"
      style={{ backgroundImage: `url(${hero.bannerImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative h-full">
        <button className="text-black flex items-center gap-2 pt-4 font-bold transition text-md">
          <span>←</span>
          <span>Back</span>
        </button>

        <div className="absolute bottom-5 left-4 right-4 md:left-6 md:right-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-3">
            <div className="flex items-end gap-3">
              <img
                src={hero.logo}
                alt="Agency Logo"
                className="w-20 h-20 md:w-30 md:h-30 rounded-lg object-cover shadow-lg"
              />
              <div className="pl-8 pb-1">
                <div className="mb-2">
                  <span className="bg-[#1D4350] text-white px-2.5 py-1 rounded-2xl text-xs font-medium">
                    {hero.category ?? "Beach & Culture"}
                  </span>
                </div>

                {/* Verified + Safe Score Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  {/* Verified */}
                  <div className="flex items-center gap-1 bg-emerald-500 px-2 py-0.5 rounded-2xl">
                    <BadgeCheck className="w-3 h-3 text-white" />
                    <span className="text-white text-xs">Verified</span>
                  </div>

                  {/* Dynamic Safety Score Badge */}
                  <div
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-2xl ${bgColor}`}
                  >
                    <svg
                      className={`w-3 h-3 ${textColor}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {/* Full shield outline */}
                      <path d="M12 22s7-4 7-10V5l-7-3-7 3v7c0 6 7 10 7 10z" />

                      {/* LEFT HALF FILL (uses clipPath) */}
                      <defs>
                        <clipPath id="half">
                          <rect x="0" y="0" width="12" height="24" />
                        </clipPath>
                      </defs>

                      <path
                        d="M12 22s7-4 7-10V5l-7-3-7 3v7c0 6 7 10 7 10z"
                        fill="currentColor"
                        clipPath="url(#half)"
                      />
                    </svg>

                    <span className={`${textColor} text-xs`}>
                      {safety}% Safe
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 md:gap-3 text-white text-xs">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{hero.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span>
                      {hero.rating ?? "4.8"} ({hero.reviews ?? 203} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 md:gap-3 pb-1 w-full md:w-auto">
              <button className="flex-1 md:flex-none bg-[#1D4350] hover:bg-[#173844] text-white px-5 py-2 rounded-md text-xs font-medium transition">
                Contact Agency
              </button>
              <button className="flex-1 md:flex-none bg-black hover:bg-[#111111] text-white px-5 py-2 rounded-md text-xs font-medium transition">
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
