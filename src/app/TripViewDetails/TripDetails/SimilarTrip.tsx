// "use client";

// import { useEffect, useState, useRef } from "react";
// import TripCard from "@/app/searchtrip/components/TripCard";
// import { ApiTrip } from "@/app/searchtrip/types/types";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// export default function SimilarTrip() {
//   const [trips, setTrips] = useState<ApiTrip[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const res = await fetch(`${API_BASE_URL}/trips/search?page=1&limit=10`);
//         const data = await res.json();
//         if (data?.results) {
//           setTrips(data.results);
//         }
//       } catch (error) {
//         console.error("Failed to fetch trips", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrips();
//   }, []);

//   const scrollToIndex = (index: number) => {
//     const container = scrollRef.current;
//     if (!container) return;
//     const card = container.children[index] as HTMLElement;
//     if (card) {
//       card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
//       setCurrentIndex(index);
//     }
//   };

//   const handleScroll = () => {
//     const container = scrollRef.current;
//     if (!container) return;
//     const index = Math.round(container.scrollLeft / container.offsetWidth);
//     setCurrentIndex(index);
//   };

//   if (loading) {
//     return (
//       <div className="mt-10">
//         <div className="h-7 w-40 bg-gray-200 rounded animate-pulse mb-4" />
//         <div className="w-full h-[220px] bg-gray-200 rounded-2xl animate-pulse" />
//       </div>
//     );
//   }

//   if (!trips.length) return null;

//   return (
//     <div className="mt-10">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-xl font-bold text-[#1d4350]">Similar Trips</h2>
//         <span className="text-sm text-gray-400 font-medium">
//           {currentIndex + 1} / {trips.length}
//         </span>
//       </div>

//       {/* Full-width scroll — one card per view */}
//       <div
//         ref={scrollRef}
//         onScroll={handleScroll}
//         className="flex overflow-x-auto scrollbar-hide"
//         style={{
//           scrollSnapType: "x mandatory",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         {trips.map((trip) => (
//           <div
//             key={trip._id}
//             className="w-full flex-shrink-0"
//             style={{ scrollSnapAlign: "start" }}
//           >
//             <TripCard trip={trip} />
//           </div>
//         ))}
//       </div>

//       {/* Dot indicators */}
//       <div className="flex justify-center items-center gap-2 mt-4">
//         {trips.map((_, i) => (
//           <button
//             key={i}
//             onClick={() => scrollToIndex(i)}
//             className={`rounded-full transition-all duration-300 ${
//               i === currentIndex
//                 ? "w-6 h-2 bg-[#1d4350]"
//                 : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>

//       {/* Prev / Next */}
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={() => scrollToIndex(Math.max(0, currentIndex - 1))}
//           disabled={currentIndex === 0}
//           className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
//         >
//           ← Prev
//         </button>
//         <button
//           onClick={() => scrollToIndex(Math.min(trips.length - 1, currentIndex + 1))}
//           disabled={currentIndex === trips.length - 1}
//           className="px-4 py-2 rounded-lg text-sm font-medium bg-[#1d4350] text-white hover:bg-[#16343f] disabled:opacity-30 disabled:cursor-not-allowed transition"
//         >
//           Next →
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState, useRef } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { ApiTrip } from "@/app/searchtrip/types/types";
import { ROUTES } from "@/lib/routes";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function SimilarTrip() {
  const [trips, setTrips] = useState<ApiTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/trips/search?page=1&limit=10`);
        const data = await res.json();
        if (data?.results) setTrips(data.results);
      } catch (error) {
        console.error("Failed to fetch trips", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const cardW = container.scrollWidth / trips.length;
    const index = Math.round(container.scrollLeft / cardW);
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="mt-8">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="flex gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex-1 h-52 bg-gray-200 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!trips.length) return null;

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-800">Similar Trips</h2>
        <span className="text-xs text-gray-400">
          {currentIndex + 1} / {trips.length}
        </span>
      </div>

      {/* Cards scroll */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide gap-3"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {trips.map((trip) => {
          const imageUrl = trip.ogImage || trip.coverImage;
          const title = trip.title || "Untitled Trip";
          const agencyName = "Trip Agency";
          const agencyInitials = agencyName.substring(0, 2).toUpperCase();
          const startDate = formatDate(trip.startDate);
          const endDate = formatDate(trip.endDate);
          const dateRange = startDate
            ? `${startDate}${endDate && endDate !== startDate ? ` – ${endDate}` : ""}`
            : "";

          const toLocation = trip.toLocation
            ? `${trip.toLocation.city}${trip.toLocation.country ? ", " + trip.toLocation.country : ""}`
            : "";

          const fromLocation = trip.fromLocation
            ? `${trip.fromLocation.city}${trip.fromLocation.country ? ", " + trip.fromLocation.country : ""}`
            : "";

          return (
            <div
              key={trip._id}
              className="flex-shrink-0  overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col"
              style={{
                scrollSnapAlign: "start",
                width: "calc(33.33% - 8px)",
                minWidth: 140,
              }}
            >
              {/* Image */}
              <div className="relative w-full h-44 bg-gradient-to-br from-teal-400 to-cyan-300 flex-shrink-0">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Organizer overlay */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[9px] flex-shrink-0"
                    style={{ backgroundColor: "#ff6b35" }}
                  >
                    {agencyInitials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-white text-[10px] font-semibold truncate drop-shadow">
                        {agencyName}
                      </span>
                      <FaCheckCircle className="w-2.5 h-2.5 text-green-400 flex-shrink-0" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-2.5 flex flex-col gap-1.5 flex-1">
                <h3 className="text-xs font-bold text-gray-800 line-clamp-1 leading-tight">
                  {title}
                </h3>

                {dateRange && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <FaCalendarAlt className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="truncate">{dateRange}</span>
                  </div>
                )}

                {toLocation && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <FaMapMarkerAlt className="w-2.5 h-2.5 flex-shrink-0" />
                    <span className="truncate">{toLocation}</span>
                  </div>
                )}

                {fromLocation && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <span className="text-[9px] text-gray-400 flex-shrink-0">From</span>
                    <span className="truncate">{fromLocation}</span>
                  </div>
                )}

                {/* View Trip button */}
                <Link href={ROUTES.TRIP_DETAILS_WITH_ID(trip._id)} className="mt-auto pt-1">
                  <button
                    className="w-full py-1.5 text-white text-[10px] font-semibold rounded-lg transition-colors"
                    style={{ backgroundColor: "#276074" }}
                  >
                    View Trip
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {trips.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`rounded-full transition-all duration-300 ${
              i === currentIndex ? "w-5 h-1.5 bg-[#1d4350]" : "w-1.5 h-1.5 bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Prev / Next */}
      
    </div>
  );
}   