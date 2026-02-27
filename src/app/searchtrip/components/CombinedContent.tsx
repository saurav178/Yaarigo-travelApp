"use client";

import { useEffect, useRef, useState } from "react";
import TripCard from "./TripCard";
import PackageCard from "./PackageCard";
import { ApiPackage, ApiTrip } from "../types/types";

type Props = {
  trips: ApiTrip[];
  packages: ApiPackage[];
  loading: boolean;
  loadMore: () => void;
  canLoadMore: boolean;
};
const PACKAGES_PER_BLOCK = 4; // 4 packages after each 2 trips

const shimmerStyle = `
  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }
  
  .shimmer {
    background: linear-gradient(
      90deg,
      #f0f0f0 0%,
      #e0e0e0 20%,
      #f0f0f0 40%,
      #f0f0f0 100%
    );
    background-size: 1000px 100%;
    animation: shimmer 2s infinite;
  }
`;

export default function CombinedContent({
  trips,
  packages,
  loading,
  loadMore,
  canLoadMore,
}: Props) {
  const [showSkeleton, setShowSkeleton] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (loading) {
      setShowSkeleton(true);
    } else {
      // Hide skeleton immediately when loading completes
      setShowSkeleton(false);
    }
  }, [loading]);
  /* ===============================
     INFINITE SCROLL (SERVER PAGINATION)
  ================================ */
  useEffect(() => {
    if (loading || !canLoadMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore(); // ✅ triggers page +1 API call
        }
      },
      {
        rootMargin: "200px",
      },
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [loading, canLoadMore, loadMore]);

  /* ===============================
     LAYOUT LOGIC - SORT BY RECENT
     2 trips per block
  ================================ */
  // Sort trips by creation date (newest first)
  const sortedTrips = [...trips].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA; // Newest first
  });

  // Sort packages by creation date (newest first)
  const sortedPackages = [...packages].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0).getTime();
    const dateB = new Date(b.createdAt || 0).getTime();
    return dateB - dateA; // Newest first
  });

  const totalBlocks = Math.ceil(sortedTrips.length / 2);

  return (
    <>
      <style>{shimmerStyle}</style>
      <div className="space-y-14 ">
      {Array.from({ length: totalBlocks }).map((_, blockIndex) => {
        const tripStart = blockIndex * 2;
        const tripSlice = sortedTrips.slice(tripStart, tripStart + 2);

        const packageStart = blockIndex * PACKAGES_PER_BLOCK;
        const packageSlice = sortedPackages.slice(
          packageStart,
          packageStart + PACKAGES_PER_BLOCK,
        );

        return (
          <div key={blockIndex} className="space-y-10">
            {/* ===============================
                TRIPS (2 per block)
            ================================ */}
            <div className="space-y-4">
              {tripSlice.map((trip, tripIndex) => (
                <TripCard key={`${blockIndex}-${tripIndex}`} trip={trip} />
              ))}
            </div>

            {/* ===============================
                PACKAGES
            ================================ */}
            {packageSlice.length > 0 && (
              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[#1d4350]">
                    Travel Packages
                  </h3>
                  <p className="text-sm text-gray-500">
                    Explore curated travel packages
                  </p>
                </div>

                <div className="relative">
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {packageSlice.map((pkg, pkgIndex) => (
                      <div key={`${blockIndex}-pkg-${pkgIndex}`} className="w-80 flex-shrink-0">
                        <PackageCard pkg={pkg} />
                      </div>
                    ))}
                  </div>

                  {/* Fade indicator */}
                  {packageSlice.length >= 4 && (
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent" />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* ===============================
          LOADING (NEXT PAGE)
      ================================ */}
      {showSkeleton && (
        <div className="py-8 space-y-10">
          <TripCardSkeleton />
          <PackageCardSkeleton />
        </div>
      )}

      {/* ===============================
          INFINITE SCROLL TRIGGER
      ================================ */}
      {canLoadMore && (
        <div ref={loadMoreRef} className="h-20 opacity-0" aria-hidden="true" />
      )}

      {/* ===============================
          END STATE
      ================================ */}
      {!canLoadMore && sortedTrips.length > 0 && (
        <div className="text-center py-8 border-t">
          <p className="text-gray-500">You&apos;ve seen all trips!</p>
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
    </>
  );
}

/* ===============================
   SKELETONS
================================ */
function PackageCardSkeleton() {
  return (
    <div>
      <div className="mb-4">
        <div className="h-6 rounded w-40 mb-2 shimmer" />
        <div className="h-4 rounded w-56 shimmer" />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-80 flex-shrink-0 bg-white shadow-md p-4 space-y-3"
          >
            <div className="h-40 rounded shimmer" />
            <div className="h-4 rounded w-3/4 shimmer" />
            <div className="h-4 rounded w-1/2 shimmer" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TripCardSkeleton() {
  return (
    <div className="bg-white shadow-md flex">
      <div className="w-80 h-64 shimmer rounded" />
      <div className="flex-1 p-4 space-y-3">
        <div className="h-6 rounded w-3/4 shimmer" />
        <div className="h-4 rounded w-1/2 shimmer" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-4 rounded shimmer" />
          <div className="h-4 rounded shimmer" />
        </div>
      </div>
    </div>
  );
}
