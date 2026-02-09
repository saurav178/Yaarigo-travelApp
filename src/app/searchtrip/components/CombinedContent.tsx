// "use client";

// import { useEffect, useRef, useState } from "react";
// import TripCard from "./TripCard";
// import PackageCard from "./PackageCard";
// import { ApiPackage, ApiTrip } from "../types/types";

// type Props = {
//   trips: ApiTrip[];
//   packages: ApiPackage[];
//   loading: boolean;
// };

// /* ===============================
//    CONFIG
// ================================ */
// const TRIPS_PER_BLOCK = 2;
// const PACKAGES_PER_BLOCK = 4;
// const INITIAL_BLOCKS = 2;
// const LOAD_MORE_BLOCKS = 1;

// export default function CombinedContent({
//   trips,
//   packages,
//   loading,
// }: Props) {
//   const [visibleBlocks, setVisibleBlocks] =
//     useState(INITIAL_BLOCKS);

//   const loadMoreRef = useRef<HTMLDivElement | null>(null);

//   /* Reset on filter change */
//   useEffect(() => {
//     setVisibleBlocks(INITIAL_BLOCKS);
//   }, [trips, packages]);

//   const totalBlocks = Math.max(
//     Math.ceil(trips.length / TRIPS_PER_BLOCK),
//     Math.ceil(packages.length / PACKAGES_PER_BLOCK)
//   );

//   /* Lazy load blocks */
//   useEffect(() => {
//     if (loading) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (!entry.isIntersecting) return;
//         setVisibleBlocks((prev) =>
//           Math.min(prev + LOAD_MORE_BLOCKS, totalBlocks)
//         );
//       },
//       { threshold: 0.3 }
//     );

//     if (loadMoreRef.current) {
//       observer.observe(loadMoreRef.current);
//     }

//     return () => observer.disconnect();
//   }, [loading, totalBlocks]);

//   return (
//     <div className="space-y-14 overflow-x-hidden">
//       {Array.from({ length: visibleBlocks }).map((_, blockIndex) => {
//         const tripStart = blockIndex * TRIPS_PER_BLOCK;
//         const packageStart = blockIndex * PACKAGES_PER_BLOCK;

//         const tripSlice = trips.slice(
//           tripStart,
//           tripStart + TRIPS_PER_BLOCK
//         );

//         const packageSlice = packages.slice(
//           packageStart,
//           packageStart + PACKAGES_PER_BLOCK
//         );

//         return (
//           <div key={blockIndex} className="space-y-10">
//             {/* ===============================
//                 TRIPS (vertical)
//             ================================ */}
//             <div className="space-y-4">
//               {loading
//                 ? Array.from({ length: TRIPS_PER_BLOCK }).map((_, i) => (
//                     <TripCardSkeleton key={i} />
//                   ))
//                 : tripSlice.map((trip) => (
//                     <TripCard key={trip._id} trip={trip} />
//                   ))}
//             </div>

//             {/* ===============================
//                 PACKAGES (horizontal scroll)
//             ================================ */}
//             {packageSlice.length > 0 && (
//               <div>
//                 <div className="mb-4">
//                   <h3
//                     className="text-lg font-bold"
//                     style={{ color: "#1d4350" }}
//                   >
//                     Travel Packages
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     Explore curated travel packages
//                   </p>
//                 </div>

//                 <div className="relative">
//                   <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
//                     {loading
//                       ? Array.from({
//                           length: PACKAGES_PER_BLOCK,
//                         }).map((_, i) => (
//                           <PackageCardSkeleton key={i} />
//                         ))
//                       : packageSlice.map((pkg) => (
//                           <div
//                             key={pkg._id}
//                             className="flex-shrink-0 w-80"
//                           >
//                             <PackageCard pkg={pkg} />
//                           </div>
//                         ))}
//                   </div>

//                   {/* Fade indicator */}
//                   {!loading && packageSlice.length > 3 && (
//                     <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent" />
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}

//       {/* Lazy load trigger */}
//       {!loading && visibleBlocks < totalBlocks && (
//         <div ref={loadMoreRef} className="h-16" />
//       )}

//       {/* Hide scrollbar */}
//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           scrollbar-width: none;
//           -ms-overflow-style: none;
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ===============================
//    SKELETONS
// ================================ */

// function TripCardSkeleton() {
//   return (
//     <div className="bg-white shadow-md flex animate-pulse">
//       <div className="w-80 h-64 bg-gray-200" />
//       <div className="flex-1 p-4 space-y-3">
//         <div className="h-6 bg-gray-200 rounded w-3/4" />
//         <div className="h-4 bg-gray-200 rounded w-1/2" />
//         <div className="grid grid-cols-2 gap-3">
//           <div className="h-4 bg-gray-200 rounded" />
//           <div className="h-4 bg-gray-200 rounded" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function PackageCardSkeleton() {
//   return (
//     <div className="w-80 bg-white shadow-md rounded-lg animate-pulse flex-shrink-0">
//       <div className="h-40 bg-gray-200 rounded-t-lg" />
//       <div className="p-3 space-y-2">
//         <div className="h-5 bg-gray-200 rounded w-3/4" />
//         <div className="h-4 bg-gray-200 rounded w-1/2" />
//         <div className="h-8 bg-gray-200 rounded" />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import TripCard from "./TripCard";
import PackageCard from "./PackageCard";
import { ApiPackage, ApiTrip } from "../types/types";

type Props = {
  trips: ApiTrip[];
  packages: ApiPackage[];
  loading: boolean;
};

/* ===============================
   CONFIG
================================ */
const INITIAL_TRIPS = 10; // First load: 10 trips
const LOAD_MORE_TRIPS = 10; // Each scroll: +10 trips
const PACKAGES_PER_BLOCK = 4; // Show 4 packages with each block of 2 trips

export default function CombinedContent({ trips, packages, loading }: Props) {
  const [visibleTripsCount, setVisibleTripsCount] = useState(INITIAL_TRIPS);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  /* Reset when data changes */
  useEffect(() => {
    setVisibleTripsCount(INITIAL_TRIPS);
  }, [trips, packages]);

  // Get only the visible trips
  const visibleTrips = trips.slice(0, visibleTripsCount);

  // Calculate how many blocks we need (2 trips per block)
  const totalBlocks = Math.ceil(visibleTripsCount / 2);

  /* Intersection Observer for infinite scroll */
  useEffect(() => {
    if (loading || visibleTripsCount >= trips.length) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleTripsCount((prev) => {
            const newValue = Math.min(prev + LOAD_MORE_TRIPS, trips.length);
            return newValue;
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px", // Trigger 100px before reaching the bottom
      },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [loading, visibleTripsCount, trips.length]);

  return (
    <div className="space-y-14 overflow-x-hidden">
      {/* Render trips in blocks of 2 with packages after each block */}
      {Array.from({ length: totalBlocks }).map((_, blockIndex) => {
        const tripStart = blockIndex * 2;
        const tripSlice = visibleTrips.slice(tripStart, tripStart + 2);

        // For packages: show 4 packages after each block of 2 trips
        const packageStart = blockIndex * PACKAGES_PER_BLOCK;
        const packageSlice = packages.slice(
          packageStart,
          packageStart + PACKAGES_PER_BLOCK,
        );

        return (
          <div key={blockIndex} className="space-y-10">
            {/* ===============================
                TRIPS BLOCK (2 trips)
            ================================ */}
            <div className="space-y-4">
              {loading && blockIndex === totalBlocks - 1
                ? Array.from({ length: 2 }).map((_, i) => (
                    <TripCardSkeleton
                      key={`trip-skeleton-${blockIndex}-${i}`}
                    />
                  ))
                : tripSlice.map((trip) => (
                    <TripCard key={trip._id} trip={trip} />
                  ))}
            </div>

            {/* ===============================
                PACKAGES (after each block of 2 trips)
                Only show if there are packages
            ================================ */}
            {packageSlice.length > 0 && (
              <div>
                <div className="mb-4">
                  <h3
                    className="text-lg font-bold"
                    style={{ color: "#1d4350" }}
                  >
                    Travel Packages
                  </h3>
                  <p className="text-sm text-gray-500">
                    Explore curated travel packages
                  </p>
                </div>

                <div className="relative">
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {loading && blockIndex === totalBlocks - 1
                      ? Array.from({ length: PACKAGES_PER_BLOCK }).map(
                          (_, i) => (
                            <PackageCardSkeleton
                              key={`package-skeleton-${blockIndex}-${i}`}
                            />
                          ),
                        )
                      : packageSlice.map((pkg) => (
                          <div key={pkg._id} className="flex-shrink-0 w-80">
                            <PackageCard pkg={pkg} />
                          </div>
                        ))}
                  </div>

                  {/* Fade indicator */}
                  {!loading && packageSlice.length >= 4 && (
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent" />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Loading indicator when fetching more data */}
      {loading && visibleTripsCount < trips.length && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-500">Loading more trips...</p>
        </div>
      )}

      {/* Invisible trigger for lazy loading - only show if there are more trips */}
      {!loading && visibleTripsCount < trips.length && (
        <div
          ref={loadMoreRef}
          className="h-20 opacity-0 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* End of results */}
      {!loading && visibleTripsCount >= trips.length && trips.length > 0 && (
        <div className="text-center py-8 border-t">
          <p className="text-gray-500">You&apos;ve seen all trips!</p>
        </div>
      )}

      {/* No results */}
      {!loading && trips.length === 0 && packages.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No trips or packages found</p>
        </div>
      )}

      {/* Progress indicator */}
      {trips.length > 0 && (
        <div className="sticky bottom-4 left-0 right-0 flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border">
            <span className="text-sm text-gray-600">
              Showing {visibleTripsCount} of {trips.length} trips
            </span>
          </div>
        </div>
      )}

      {/* Hide scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `}</style>
    </div>
  );
}

/* ===============================
   SKELETONS
================================ */

function TripCardSkeleton() {
  return (
    <div className="bg-white shadow-md flex animate-pulse">
      <div className="w-80 h-64 bg-gray-200" />
      <div className="flex-1 p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

function PackageCardSkeleton() {
  return (
    <div className="w-80 bg-white shadow-md rounded-lg animate-pulse flex-shrink-0">
      <div className="h-40 bg-gray-200 rounded-t-lg" />
      <div className="p-3 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        <div className="h-8 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
