// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import FilterSidebar from "./components/filters/FilterSidebar";
// import CombinedContent from "./components/CombinedContent";
// import { useCombinedFilters } from "./hooks/useCombinedFilters";
// import { useSearchData } from "./hooks/useSearchData";

// export default function SearchTripPage() {
//   const searchParams = useSearchParams();

//   /* ----------------------------------
//      1️⃣ INITIAL FILTERS FROM URL
//   ---------------------------------- */
//   const fromCity = searchParams.get("fromCity") || undefined;
//   const toCity = searchParams.get("toCity") || undefined;
//   const startDateFrom = searchParams.get("startDateFrom") || undefined;

//   /* ----------------------------------
//      2️⃣ DRAFT FILTERS (typing state)
//   ---------------------------------- */
//   const { filters: draftFilters, updateFilter } = useCombinedFilters({
//     fromCity,
//     toCity,
//     startDateFrom,
//   });

//   /* ----------------------------------
//      3️⃣ APPLIED FILTERS (API only)
//   ---------------------------------- */
//   const [appliedFilters, setAppliedFilters] = useState(draftFilters);

//   /* ----------------------------------
//      4️⃣ DEBOUNCE APPLY (KEY FIX)
//   ---------------------------------- */
//   useEffect(() => {
//     const t = setTimeout(() => {
//       setAppliedFilters(draftFilters);
//     }, 500);

//     return () => clearTimeout(t);
//   }, [draftFilters]);

//   /* ----------------------------------
//      5️⃣ FETCH DATA
//   ---------------------------------- */
//   // const {
//   //   trips,
//   //   packages,
//   //   loading,
//   //   error,
//   //   hasFetched,
//   // } = useSearchData(appliedFilters);

//   const { trips, packages, loading, error, hasFetched, loadMore, canLoadMore } =
//     useSearchData(appliedFilters);

//   /* ----------------------------------
//      6️⃣ REAL SERVER ERROR ONLY
//   ---------------------------------- */
//   if (error === "SERVER_ERROR") {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Something went wrong. Please try again later.
//       </div>
//     );
//   }

//   const noResults =
//     hasFetched && !loading && trips.length === 0 && packages.length === 0;

//   /* ----------------------------------
//      7️⃣ UI (NO PAGE BLINKING)
//   ---------------------------------- */
//  return (
//   <div className="min-h-screen px-4 md:px-10 pt-20">
//     <div className="grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto gap-6">

//       <aside className="lg:col-span-4">
//         <FilterSidebar filters={draftFilters} updateFilter={updateFilter} />
//       </aside>

//       <main className="lg:col-span-8">
//         {noResults ? (
//           <div className="text-center py-20 text-gray-500 text-lg">
//             No trips or packages found. Try adjusting filters.
//           </div>
//         ) : (
//           <CombinedContent
//             trips={trips}
//             packages={packages}
//             loading={loading}
//             loadMore={loadMore}
//             canLoadMore={canLoadMore}
//           />
//         )}
//       </main>

//     </div>
//   </div>
// );

// }

// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// import SearchTripSection from "./components/SearchSection";
// import FilterSidebar from "./components/filters/FilterSidebar";
// import CombinedContent from "./components/CombinedContent";
// import { useCombinedFilters } from "./hooks/useCombinedFilters";
// import { useSearchData } from "./hooks/useSearchData";

// export default function SearchTripPage() {
//   const searchParams = useSearchParams();

//   /* ----------------------------------
//      1️⃣ INITIAL FILTERS FROM URL
//   ---------------------------------- */
//   const fromCity = searchParams.get("fromCity") || undefined;
//   const toCity = searchParams.get("toCity") || undefined;
//   const startDateFrom = searchParams.get("startDateFrom") || undefined;

//   /* ----------------------------------
//      2️⃣ DRAFT FILTERS (typing state)
//   ---------------------------------- */
//   const { filters: draftFilters, updateFilter } = useCombinedFilters({
//     fromCity,
//     toCity,
//     startDateFrom,
//   });

//   /* ----------------------------------
//      3️⃣ APPLIED FILTERS (API only)
//   ---------------------------------- */
//   const [appliedFilters, setAppliedFilters] = useState(draftFilters);

//   /* ----------------------------------
//      4️⃣ DEBOUNCE APPLY
//   ---------------------------------- */
//   useEffect(() => {
//     const t = setTimeout(() => {
//       setAppliedFilters(draftFilters);
//     }, 500);

//     return () => clearTimeout(t);
//   }, [draftFilters]);

//   /* ----------------------------------
//      5️⃣ FETCH DATA
//   ---------------------------------- */
//   const { trips, packages, loading, error, hasFetched, loadMore, canLoadMore } =
//     useSearchData(appliedFilters);

//   /* ----------------------------------
//      6️⃣ REAL SERVER ERROR ONLY
//   ---------------------------------- */
//   if (error === "SERVER_ERROR") {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-gray-500">
//         Something went wrong. Please try again later.
//       </div>
//     );
//   }

//   const noResults =
//     hasFetched && !loading && trips.length === 0 && packages.length === 0;

//   /* ----------------------------------
//      7️⃣ UI
//   ---------------------------------- */
//   return (
//     <div className="min-h-screen">
//       {/* 🔥 Sticky Search Section */}
//       <div className="sticky top-0 z-50 bg-white shadow-md">
//         <SearchTripSection filters={draftFilters} updateFilter={updateFilter} />
//       </div>

//       {/* Page Content */}
//       <div className="px-4 md:px-10 pt-6">
//         <div className="grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto gap-6">
//           <aside className="lg:col-span-3">
//             <FilterSidebar filters={draftFilters} updateFilter={updateFilter} />
//           </aside>

//           <main className="lg:col-span-9">
//             {noResults ? (
//               <div className="text-center py-20 text-gray-500 text-lg">
//                 No trips or packages found. Try adjusting filters.
//               </div>
//             ) : (
//               <CombinedContent
//                 trips={trips}
//                 packages={packages}
//                 loading={loading}
//                 loadMore={loadMore}
//                 canLoadMore={canLoadMore}
//               />
//             )}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import SearchTripSection from "./components/SearchSection";
import FilterSidebar from "./components/filters/FilterSidebar";
import CombinedContent from "./components/CombinedContent";
import { useCombinedFilters } from "./hooks/useCombinedFilters";
import { useSearchData } from "./hooks/useSearchData";
import stringify from "fast-json-stable-stringify";

export default function SearchTripPage() {
  const searchParams = useSearchParams();
  const [isTyping, setIsTyping] = useState(false);

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
     3️⃣ APPLIED FILTERS - MEMOIZED
  ---------------------------------- */
  const [appliedFilters, setAppliedFilters] = useState(draftFilters);

  /* ----------------------------------
     4️⃣ DEBOUNCE APPLY - 500ms with typing indicator
  ---------------------------------- */
  useEffect(() => {
    setIsTyping(true);
    const t = setTimeout(() => {
      setAppliedFilters(draftFilters);
      setIsTyping(false);
    }, 500); // 🔥 500ms is the sweet spot

    return () => {
      clearTimeout(t);
      setIsTyping(false);
    };
  }, [draftFilters]);

  /* ----------------------------------
     5️⃣ MEMOIZE FILTERS WITH STABLE STRINGIFY
  ---------------------------------- */
  const stableFilters = useMemo(
    () => appliedFilters,
    [
      stringify(appliedFilters), // 🔥 Only changes when values actually change
    ],
  );

  /* ----------------------------------
     6️⃣ FETCH DATA WITH STABLE FILTERS
  ---------------------------------- */
  const { trips, packages, loading, error, hasFetched, loadMore, canLoadMore } =
    useSearchData(stableFilters);

  /* ----------------------------------
     7️⃣ REAL SERVER ERROR ONLY
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
     8️⃣ UI
  ---------------------------------- */
  return (
    <div className="min-h-screen pt-16">
      {/* 🔥 Sticky Search Section with typing indicator */}
      {/* <div className="sticky top-0 z-50 bg-white shadow-md">
        <SearchTripSection 
          filters={draftFilters} 
          updateFilter={updateFilter} 
        />
        {isTyping && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse" />
        )}
      </div> */}

      <div className="sticky top-18 z-40 bg-white shadow-md">
        <SearchTripSection filters={draftFilters} updateFilter={updateFilter} />

        {isTyping && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse" />
        )}
      </div>

      {/* Page Content */}
      <div className="px-4 md:px-10 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto gap-6">
          <aside className="lg:col-span-3">
            <FilterSidebar filters={draftFilters} updateFilter={updateFilter} />
          </aside>

          <main className="lg:col-span-9">
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
    </div>
  );
}
