"use client";

import { useEffect, useState } from "react";
import { MapPin, Heart } from "lucide-react";
import { fetchAllData } from "../lib/api";
import type { CombinedFilterPayload } from "../types/combinedFilters";

interface PackageProps {
  filters?: Partial<CombinedFilterPayload>;
}

export default function Package({ filters = {} }: PackageProps) {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllData();
        setPackages(response.packages || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="mb-8">
      <div className="relative mb-4">
        {/* Decorative background elements */}
        <div className="absolute -top-2 -left-2 w-24 h-24 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-1 right-10 w-16 h-16 bg-purple-400/20 rounded-full blur-2xl"></div>

        {/* Header content */}
        <div className="relative flex items-center gap-3">
          {/* Accent line */}
          <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>

          {/* Title with gradient */}
          <h3 className="text-lg font-bold bg-gradient-to-r from-gray-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
            Available Trip Packages
          </h3>

          {/* Decorative badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-blue-700">New</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {packages.map((pkg, index) => {
          const lowestPrice = getLowestPrice(pkg.plans);
          const planCategories = getPlanCategories(pkg.plans);

          return (
            <div
              key={pkg.id || index}
              className="group flex-shrink-0 w-80 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 relative"
            >
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="p-4">
                {/* Title */}
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1 pr-2">
                    {pkg.title || "Trip Package"}
                  </h2>
                  <button className="text-gray-300 hover:text-red-500 hover:scale-110 transition-all duration-200 flex-shrink-0">
                    <Heart className="w-5 h-5 group-hover:fill-red-100" />
                  </button>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {pkg.tags?.slice(0, 3).map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full shadow-sm hover:shadow-md transition-shadow"
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
                      className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold rounded-lg border border-purple-200"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Route Information */}
                <div className="mb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-2.5 rounded-lg border border-green-100 hover:border-green-200 transition-colors">
                      <div className="text-xs text-gray-500 font-medium mb-1">From</div>
                      <div className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-green-500 fill-green-100 mr-1.5 flex-shrink-0" />
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {pkg.from || "Delhi"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-red-50 to-pink-50 p-2.5 rounded-lg border border-red-100 hover:border-red-200 transition-colors">
                      <div className="text-xs text-gray-500 font-medium mb-1">To</div>
                      <div className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-red-500 fill-red-100 mr-1.5 flex-shrink-0" />
                        <span className="text-sm font-semibold text-gray-900 truncate">
                          {pkg.to || "Delhi"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Stats */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div className="text-sm">
                    <span className="font-bold text-gray-700 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                      {pkg.totalDays || 2}D/{pkg.totalNights || 1}N
                    </span>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    {lowestPrice}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}