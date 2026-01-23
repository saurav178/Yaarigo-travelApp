// "use client";

// import { useEffect, useState } from "react";

// export default function Package() {
//   const [packages, setPackages] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           "https://api.business.travio.cepialabs.com/api/packages/search"
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const result = await response.json();

//         // 🔴 Adjust this based on console output
//         setPackages(result.data);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="py-16 bg-white">
//       <h1 className="text-xl font-bold text-center mb-8">Packages</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
//         {packages.map((pkg) => (
//           <div
//             key={pkg.id}
//             className="border rounded-lg p-4 shadow hover:shadow-md transition"
//           >
//             <h2 className="font-semibold text-lg">
//               {pkg.title ?? "No title"}
//             </h2>
//             <h2 className="font-semibold text-lg">
//               {pkg.totalDays ?? "No title"}
//             </h2>
//             <h2 className="font-semibold text-lg">
//               {pkg.totalNights ?? "No title"}
//             </h2>

//             <p className="text-sm text-gray-600 mt-1">
//               📍 {pkg.location ?? "N/A"}
//             </p>

//             <p className="mt-2 text-sm">
//               ⏱ {pkg.duration ?? "N/A"}
//             </p>

//             <p className="mt-3 font-bold text-blue-600">
//               ₹{pkg.price ?? "--"}
//             </p>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { MapPin, Heart } from "lucide-react";
import { filterPackages } from "../lib/filterUtils";
import type { CombinedFilterPayload } from "../types/combinedFilters";

interface PackageProps {
  filters?: Partial<CombinedFilterPayload>;
}

export default function Package({ filters = {} }: PackageProps) {
  const [packages, setPackages] = useState<any[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.business.travio.cepialabs.com/api/packages/search",
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setPackages(result.data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply filters when packages or filters change
  useEffect(() => {
    if (packages.length === 0) {
      setFilteredPackages([]);
      return;
    }

    let filtered = [...packages];

    // Apply filter criteria
    const filterCriteria = {
      priceRange: filters.priceRange,
      tripStyles: filters.tripStyles,
      fromLocation: filters.fromLocation,
      toLocation: filters.toLocation,
      totalDays: filters.totalDays,
      totalNights: filters.totalNights,
      category: filters.category,
      creatorType: filters.creatorType,
    };

    filtered = filterPackages(filtered, filterCriteria);
    setFilteredPackages(filtered);
  }, [packages, filters]);

  const getLowestPrice = (plans: any[]) => {
    if (!plans || plans.length === 0) return "Price on request";
    const prices = plans
      .map((p) => p.discountedPrice || p.pricePerPerson)
      .filter(Boolean);
    if (prices.length === 0) return "Price on request";
    return `₹${Math.min(...prices).toLocaleString()}`;
  };

  const getPlanCategories = (plans: any[]) => {
    if (!plans || plans.length === 0) return [];
    const categories = plans
      .map((p) => p.category || p.name.split(" ")[0])
      .filter(Boolean);
    return [...new Set(categories)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg text-gray-600">Loading packages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!packages || packages.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg text-gray-600">No packages available</div>
      </div>
    );
  }

  if (filteredPackages.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-lg text-gray-600">No packages match your filters</div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">Available Trip Packages</h3>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {filteredPackages.map((pkg, index) => {
          const lowestPrice = getLowestPrice(pkg.plans);
          const planCategories = getPlanCategories(pkg.plans);

          return (
            <div
              key={pkg.id || index}
              className="flex-shrink-0 w-80 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-200"
            >
              <div className="p-4">
                {/* Title */}
                <h2 className="text-lg font-bold text-gray-900 mb-2">
                  {pkg.title || "Trip Package"}
                </h2>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pkg.tags?.slice(0, 3).map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Plan Categories */}
                <div className="flex gap-2 mb-3">
                  {planCategories.slice(0, 2).map((category: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded border border-gray-200"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Route Information */}
                <div className="mb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">From</div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {pkg.from || "Delhi"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">To</div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {pkg.to || "Delhi"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{pkg.totalDays || 2}D/{pkg.totalNights || 1}N</span>
                    <span className="mx-2">•</span>
                    <span className="font-bold text-blue-600">{lowestPrice}</span>
                  </div>
                  <button className="p-1.5 hover:bg-gray-100 rounded transition">
                    <Heart className="w-4 h-4 text-gray-400" />
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
