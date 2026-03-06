"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

interface HeroSectionProps {
  trip: any;
}

export default function HeroSection({ trip }: HeroSectionProps) {
  const router = useRouter();

  if (!trip) return null;

  // -------- Extract Data From Payload --------
  const title = trip?.title ?? "N/A";

  const fromCity = trip?.fromLocation?.city ?? "";
  const toCity = trip?.toLocation?.city ?? "";

  const locationText =
    fromCity && toCity
      ? `${fromCity} → ${toCity}`
      : fromCity || toCity || "N/A";

  const startDate = trip?.startDate ? new Date(trip.startDate) : null;
  const endDate = trip?.endDate ? new Date(trip.endDate) : null;

  const duration =
    startDate && endDate
      ? Math.ceil(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        ) + " days"
      : "N/A";

  const coverImage =
    trip?.coverImage ||
    trip?.images?.[0] ||
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80";

  const category =
    trip?.partnerPreferences?.tripStyles?.length > 0
      ? trip.partnerPreferences.tripStyles[0]
      : "Trip";

  return (
    <div className="relative w-full h-[70vh] overflow-hidden shadow-lg hover:shadow-2xl">
      {/* Background Image */}
      <Image
        src={coverImage}
        alt={title}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Back Button: FIXED TOP-LEFT */}
      <button
        onClick={() => router.back()}
        className="absolute top-20  left-9 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white font-bold shadow-lg hover:bg-gray-800 transition-colors duration-300"
      >
        {/* Bigger visible arrow */}
        <span className="inline-block w-3 h-3 border-t-4 border-l-4 border-white rotate-[-45deg]"></span>
        Back
      </button>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-20 pb-6 text-white">
        {/* Bottom Info */}
        <div>
          {/* Category */}
          <div className="bg-[#1D4350] font-semibold px-4 py-1 rounded-full inline-block mb-2">
            {category}
          </div>

          {/* Title */}
          <h2 className="text-xl md:text-3xl font-bold leading-snug mb-2">
            {title}
          </h2>

          {/* Location & Duration */}
          <div className="flex flex-wrap items-center gap-6 text-sm md:text-base opacity-90">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-white text-sm opacity-90" />
              <span>{locationText}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-white text-sm opacity-90" />
              <span>{duration}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}