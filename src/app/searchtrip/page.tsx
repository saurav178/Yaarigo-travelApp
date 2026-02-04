"use client";

import FilterSidebar from "./components/filters/FilterSidebar";
import CombinedContent from "./components/CombinedContent";
import { useCombinedFilters } from "./hooks/useCombinedFilters";
import { useSearchData } from "./hooks/useSearchData";
import Loader from "@/components/Loader/Loader";

export default function SearchTripPage() {
  const { filters, updateFilter, resetFilters } = useCombinedFilters();

  // ✅ PASS FILTERS
  const { trips, packages, loading, error } = useSearchData(filters);

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

  const noResults =
    trips.length === 0 && packages.length === 0;

  return (
    <div className="min-h-screen px-4 py-6 md:px-10 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">

        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <FilterSidebar
            filters={filters}
            updateFilter={updateFilter}
            resetFilters={resetFilters}
          />
        </aside>

        {/* Content */}
        <main className="lg:col-span-9 pt-12">
          {noResults ? (
            <div className="text-center py-20 text-gray-500 text-lg">
              No trips or packages found. Try adjusting filters.
            </div>
          ) : (
            <CombinedContent
              trips={trips}
              packages={packages}
            />
          )}
        </main>
      </div>
    </div>
  );
}
