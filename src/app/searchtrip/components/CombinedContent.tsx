// "use client";

// import { useState, useEffect } from "react";
// import TripCard from "./TripCard";
// import PackageCard from "./PackageCard";

// type Trip = {
//   _id: string;
//   // other fields
// };

// type Package = {
//   _id: string;
//   // other fields
// };

// type Props = {
//   trips: Trip[];
//   packages: Package[];
// };

// export default function CombinedContent({ trips, packages }: Props) {
//   const TRIPS_PER_BLOCK = 2;
//   const PACKAGES_PER_BLOCK = 4;

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // show skeleton for 1 sec
//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   const blocks = Math.ceil(trips.length / TRIPS_PER_BLOCK);

//   return (
//     <div className="space-y-10">
//       {Array.from({ length: blocks }).map((_, blockIndex) => {
//         const tripStart = blockIndex * TRIPS_PER_BLOCK;
//         const packageStart = blockIndex * PACKAGES_PER_BLOCK;

//         const tripSlice = trips.slice(tripStart, tripStart + TRIPS_PER_BLOCK);
//         const packageSlice = packages.slice(
//           packageStart,
//           packageStart + PACKAGES_PER_BLOCK
//         );

//         return (
//           <div key={`block-${blockIndex}`} className="space-y-6">
//             {/* 🔹 Trips */}
//             <div className="space-y-6">
//               {loading
//                 ? Array.from({ length: TRIPS_PER_BLOCK }).map((_, idx) => (
//                     <div
//                       key={idx}
//                       className="h-48 bg-gray-200 animate-pulse rounded-xl"
//                     />
//                   ))
//                 : tripSlice.map((trip) => <TripCard key={trip._id} trip={trip} />)}
//             </div>

//             {/* 🔹 Packages – horizontal scroll */}
//             {packageSlice.length > 0 && (
//               <div className="relative">
//                 <div className="flex gap-6 overflow-x-auto max-w-full pb-2 scrollbar-hide">
//                   {loading
//                     ? Array.from({ length: PACKAGES_PER_BLOCK }).map((_, idx) => (
//                         <div
//                           key={idx}
//                           className="min-w-[280px] h-40 bg-gray-200 animate-pulse rounded-xl flex-shrink-0"
//                         />
//                       ))
//                     : packageSlice.map((pkg) => (
//                         <div key={pkg._id} className="min-w-[280px] flex-shrink-0">
//                           <PackageCard pkg={pkg} />
//                         </div>
//                       ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }


  "use client";

  import { useState, useEffect } from "react";
  import TripCard from "./TripCard";
  import PackageCard from "./PackageCard";
  import { ApiPackage, ApiTrip } from "../types/types";

  // type Trip = {
  //   _id: string;
  //   // other fields
  // };

  // type Package = {
  //   _id: string;
  //   // other fields
  // };

 type Props = {
  trips: ApiTrip[];
  packages: ApiPackage[];
};

  export default function CombinedContent({ trips, packages }: Props) {
    const TRIPS_PER_BLOCK = 2;
    const PACKAGES_PER_BLOCK = 4;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // show skeleton for 1 sec
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }, []);

    const blocks = Math.max(
  Math.ceil(trips.length / TRIPS_PER_BLOCK),
  Math.ceil(packages.length / PACKAGES_PER_BLOCK)
);

    return (
      <div className="space-y-10">
        {Array.from({ length: blocks }).map((_, blockIndex) => {
          const tripStart = blockIndex * TRIPS_PER_BLOCK;
          const packageStart = blockIndex * PACKAGES_PER_BLOCK;

          const tripSlice = trips.slice(tripStart, tripStart + TRIPS_PER_BLOCK);
          const packageSlice = packages.slice(
            packageStart,
            packageStart + PACKAGES_PER_BLOCK
          );

          return (
            <div key={`block-${blockIndex}`} className="space-y-6">
              {/* 🔹 Trips Section */}
              <div className="space-y-4">
                {loading
                  ? Array.from({ length: TRIPS_PER_BLOCK }).map((_, idx) => (
                      <TripCardSkeleton key={`trip-skeleton-${idx}`} />
                    ))
                  : tripSlice.map((trip) => <TripCard key={trip._id} trip={trip} />)}
              </div>

              {/* 🔹 Packages Section – horizontal scroll */}
              {packageSlice.length > 0 && (
                <div>
                  {/* Section Header */}
                  <div className="mb-4">
                    <h3 className="text-lg font-bold" style={{ color: '#1d4350' }}>
                      Travel Packages
                    </h3>
                    <p className="text-sm text-gray-500">
                      Explore curated travel packages
                    </p>
                  </div>

                  {/* Horizontal Scrollable Container */}
                  <div className="relative">
                    <div 
                      className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
                      style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                      }}
                    >
                      {loading
                        ? Array.from({ length: PACKAGES_PER_BLOCK }).map((_, idx) => (
                            <PackageCardSkeleton key={`package-skeleton-${idx}`} />
                          ))
                        : packageSlice.map((pkgs) => (
                            <div key={pkgs._id} className="flex-shrink-0">
                              <PackageCard pkg={pkgs} />
                            </div>
                          ))}
                    </div>

                    {/* Scroll Indicators (Optional) */}
                    {!loading && packageSlice.length > 3 && (
                      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Empty State */}
        {!loading && trips.length === 0 && packages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg 
                className="mx-auto h-16 w-16" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={1.5} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              No trips or packages found
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Try adjusting your filters to see more results
            </p>
            <button 
              className="px-6 py-2 text-white rounded hover:opacity-90 transition"
              style={{ backgroundColor: '#1d4350' }}
              onClick={() => window.location.reload()}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Custom CSS for hiding scrollbar */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    );
  }

  // Trip Card Skeleton Loader
  function TripCardSkeleton() {
    return (
      <div className="bg-white shadow-md overflow-hidden flex animate-pulse">
        {/* Image Skeleton */}
        <div className="w-80 h-64 bg-gray-200 flex-shrink-0" />
        
        {/* Content Skeleton */}
        <div className="flex-1 p-4 flex flex-col">
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
          
          {/* Subtitle */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
          
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded" />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-2" />

          {/* Agency Section */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-1" />
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-2 mt-auto">
            <div className="h-8 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded" />
            <div className="h-8 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Package Card Skeleton Loader
  function PackageCardSkeleton() {
    return (
      <div className="bg-white shadow-md overflow-hidden w-80 flex-shrink-0 rounded-lg animate-pulse">
        {/* Image Skeleton */}
        <div className="h-40 bg-gray-200" />
        
        {/* Content Skeleton */}
        <div className="p-3">
          {/* Title */}
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          
          {/* Rating */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
          
          {/* Location */}
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          
          {/* Duration & Group */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="h-6 bg-gray-200 rounded" />
            <div className="h-6 bg-gray-200 rounded" />
          </div>
          
          {/* Price */}
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-2" />
          
          {/* Button */}
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }