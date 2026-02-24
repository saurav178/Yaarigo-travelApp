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
      const t = setTimeout(() => {
        setShowSkeleton(false);
      }, 800);

      return () => clearTimeout(t);
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
     LAYOUT LOGIC
     2 trips per block
  ================================ */
  const totalBlocks = Math.ceil(trips.length / 2);

  return (
    <div className="space-y-14 ">
      {Array.from({ length: totalBlocks }).map((_, blockIndex) => {
        const tripStart = blockIndex * 2;
        const tripSlice = trips.slice(tripStart, tripStart + 2);

        const packageStart = blockIndex * PACKAGES_PER_BLOCK;
        const packageSlice = packages.slice(
          packageStart,
          packageStart + PACKAGES_PER_BLOCK,
        );

        return (
          <div key={blockIndex} className="space-y-10">
            {/* ===============================
                TRIPS (2 per block)
            ================================ */}
            <div className="space-y-4">
              {tripSlice.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
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
                    {packageSlice.map((pkg) => (
                      <div key={pkg._id} className="w-80 flex-shrink-0">
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
      {!canLoadMore && trips.length > 0 && (
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
  );
}

/* ===============================
   SKELETONS
================================ */
function PackageCardSkeleton() {
  return (
    <div>
      <div className="mb-4">
        <div className="h-6 bg-gray-200 rounded w-40 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-56 animate-pulse" />
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="w-80 flex-shrink-0 bg-white shadow-md p-4 space-y-3 animate-pulse"
          >
            <div className="h-40 bg-gray-200 rounded" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}

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
