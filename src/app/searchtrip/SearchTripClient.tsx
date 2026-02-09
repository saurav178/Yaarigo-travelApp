"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import FilterSidebar from "./components/filters/FilterSidebar";
import CombinedContent from "./components/CombinedContent";
import { useCombinedFilters } from "./hooks/useCombinedFilters";
import { useSearchData } from "./hooks/useSearchData";

export default function SearchTripPage() {
  const searchParams = useSearchParams();

  /* ----------------------------------
     1️⃣ INITIAL FILTERS FROM URL
  ---------------------------------- */
  const fromCity = searchParams.get("fromCity") || undefined;
  const toCity = searchParams.get("toCity") || undefined;
  const startDateFrom =
    searchParams.get("startDateFrom") || undefined;

  /* ----------------------------------
     2️⃣ DRAFT FILTERS (typing state)
  ---------------------------------- */
  const { filters: draftFilters, updateFilter } =
    useCombinedFilters({
      fromCity,
      toCity,
      startDateFrom,
    });

  /* ----------------------------------
     3️⃣ APPLIED FILTERS (API only)
  ---------------------------------- */
  const [appliedFilters, setAppliedFilters] =
    useState(draftFilters);

  /* ----------------------------------
     4️⃣ DEBOUNCE APPLY (KEY FIX)
  ---------------------------------- */
  useEffect(() => {
    const t = setTimeout(() => {
      setAppliedFilters(draftFilters);
    }, 500);

    return () => clearTimeout(t);
  }, [draftFilters]);

  /* ----------------------------------
     5️⃣ FETCH DATA
  ---------------------------------- */
  const {
    trips,
    packages,
    loading,
    error,
    hasFetched,
  } = useSearchData(appliedFilters);

  /* ----------------------------------
     6️⃣ REAL SERVER ERROR ONLY
  ---------------------------------- */
  if (error === "SERVER_ERROR") {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Something went wrong. Please try again later.
      </div>
    );
  }

  const noResults =
    hasFetched &&
    !loading &&
    trips.length === 0 &&
    packages.length === 0;

  /* ----------------------------------
     7️⃣ UI (NO PAGE BLINKING)
  ---------------------------------- */
  return (
    <div className="min-h-screen px-4 py-6 md:px-10 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <FilterSidebar
            filters={draftFilters}
            updateFilter={updateFilter}
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
              loading={loading}
            />
          )}
        </main>
      </div>
    </div>
  );
}
