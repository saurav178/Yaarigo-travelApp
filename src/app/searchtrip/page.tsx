"use client";

import { useMemo } from "react";
import FilterSidebar from "./components/filters/FilterSidebar";
import CombinedContent from "./components/CombinedContent";
import { useCombinedFilters } from "./hooks/useCombinedFilters";
import { useSearchData } from "./hooks/useSearchData";
import { mapApiTripToTrip } from "./lib/mappers/mapApiTripToTrip";
import { mapApiPackageToDisplay } from "./lib/mappers/mapApiPackageToDisplay";
import Loader from "@/components/Loader/Loader";

export default function SearchTripPage() {
  const { filters, updateFilter, resetFilters } = useCombinedFilters();
  const { rawTrips, rawPackages, loading, error } = useSearchData();

 const trips = useMemo(() => rawTrips, [rawTrips]);
const packages = useMemo(() => rawPackages, [rawPackages]);


  // ✅ Filtered Trips
  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      if (filters.keyword && !trip.title?.toLowerCase().includes(filters.keyword.toLowerCase()))
        return false;

      if (filters.fromCity && trip.fromCity !== filters.fromCity)
        return false;

      if (filters.toCity && trip.toCity !== filters.toCity)
        return false;

      if (filters.minPrice && trip.price < filters.minPrice)
        return false;

      if (filters.maxPrice && trip.price > filters.maxPrice)
        return false;

      if (filters.travelMode && trip.travelMode !== filters.travelMode)
        return false;

      return true;
    });
  }, [trips, filters]);

  // ✅ Filtered Packages
  const filteredPackages = useMemo(() => {
    return packages.filter(pkg => {
      if (filters.keyword && !pkg.title?.toLowerCase().includes(filters.keyword.toLowerCase()))
        return false;

      if (filters.category && pkg.category !== filters.category)
        return false;

      if (filters.minDays && pkg.days < filters.minDays)
        return false;

      if (filters.maxDays && pkg.days > filters.maxDays)
        return false;

      if (filters.minPrice && pkg.price < filters.minPrice)
        return false;

      if (filters.maxPrice && pkg.price > filters.maxPrice)
        return false;

      return true;
    });
  }, [packages, filters]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-6 md:px-10 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

        <aside className="lg:col-span-3">
          <FilterSidebar
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
            trips={trips}
            packages={packages}
          />
        </aside>

        <main className="lg:col-span-9 pt-12">
          {filteredTrips.length === 0 && filteredPackages.length === 0 ? (
            <div className="text-center py-20 text-gray-500 text-lg">
              No trips or packages found. Try adjusting filters.
            </div>
          ) : (
            <CombinedContent
              trips={filteredTrips}
              packages={filteredPackages}
            />
          )}
        </main>
      </div>
    </div>
  );
}
