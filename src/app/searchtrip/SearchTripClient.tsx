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
  const startDateFrom = searchParams.get("startDateFrom") || undefined;

  /* ----------------------------------
     2️⃣ DRAFT FILTERS (typing state)
  ---------------------------------- */
  const { filters: draftFilters, updateFilter } = useCombinedFilters({
    fromCity,
    toCity,
    startDateFrom,
  });

  /* ----------------------------------
     3️⃣ APPLIED FILTERS (API only)
  ---------------------------------- */
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

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
  // const {
  //   trips,
  //   packages,
  //   loading,
  //   error,
  //   hasFetched,
  // } = useSearchData(appliedFilters);

  const { trips, packages, loading, error, hasFetched, loadMore, canLoadMore } =
    useSearchData(appliedFilters);

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
    hasFetched && !loading && trips.length === 0 && packages.length === 0;

  /* ----------------------------------
     7️⃣ UI (NO PAGE BLINKING)
  ---------------------------------- */
 return (
  <div className="min-h-screen px-4 md:px-10 pt-20">
    <div className="grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto gap-6">

      <aside className="lg:col-span-4">
        <FilterSidebar filters={draftFilters} updateFilter={updateFilter} />
      </aside>

      <main className="lg:col-span-8">
        {noResults ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            No trips or packages found. Try adjusting filters.
          </div>
        ) : (
          <CombinedContent
            trips={trips}
            packages={packages}
            loading={loading}
            loadMore={loadMore}
            canLoadMore={canLoadMore}
          />
        )}
      </main>

    </div>
  </div>
);

}
