// "use client";
// import { useEffect, useState, useMemo } from "react";
// import { useSearchParams } from "next/navigation";
// import SearchTripSection from "./components/SearchSection";
// import FilterSidebar from "./components/filters/FilterSidebar";
// import CombinedContent from "./components/CombinedContent";
// import { useCombinedFilters } from "./hooks/useCombinedFilters";
// import { useSearchData } from "./hooks/useSearchData";
// import stringify from "fast-json-stable-stringify";
// import Loader from "@/components/Loader/Loader";

// export default function SearchTripPage() {
//   const searchParams = useSearchParams();
//   const [isTyping, setIsTyping] = useState(false);
//   const [showLoader, setShowLoader] = useState(true);
//   const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
//   const [availableTripStyles, setAvailableTripStyles] = useState<string[]>([]);

//   // 🔥 Move this effect to the top - it's fine
//   useEffect(() => {
//     const timer = setTimeout(() => setShowLoader(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

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
//      3️⃣ APPLIED FILTERS - MEMOIZED
//   ---------------------------------- */
//   const [appliedFilters, setAppliedFilters] = useState(draftFilters);

//   /* ----------------------------------
//      4️⃣ DEBOUNCE APPLY - 500ms with typing indicator
//   ---------------------------------- */
//   useEffect(() => {
//     setIsTyping(true);
//     const t = setTimeout(() => {
//       setAppliedFilters(draftFilters);
//       setIsTyping(false);
//     }, 500);

//     return () => {
//       clearTimeout(t);
//       setIsTyping(false);
//     };
//   }, [draftFilters]);

//   /* ----------------------------------
//      5️⃣ MEMOIZE FILTERS WITH STABLE STRINGIFY
//   ---------------------------------- */
//   const stableFilters = useMemo(
//     () => appliedFilters,
//     [stringify(appliedFilters)],
//   );

//   /* ----------------------------------
//      6️⃣ FETCH DATA WITH STABLE FILTERS
//   ---------------------------------- */
//   const { trips, packages, loading, error, hasFetched, loadMore, canLoadMore } =
//     useSearchData(stableFilters);

//   useEffect(() => {
//     if (trips.length > 0) {
//       // Extract unique languages from trips
//       const languagesSet = new Set<string>();
//       const tripStylesSet = new Set<string>();

//       trips.forEach((trip: any) => {
//         if (trip.partnerPreferences?.languages?.length) {
//           trip.partnerPreferences.languages.forEach((lang: string) => {
//             languagesSet.add(lang);
//           });
//         }
//         if (trip.partnerPreferences?.tripStyles?.length) {
//           trip.partnerPreferences.tripStyles.forEach((style: string) => {
//             tripStylesSet.add(style);
//           });
//         }
//       });

//       setAvailableLanguages(Array.from(languagesSet).sort());
//       setAvailableTripStyles(Array.from(tripStylesSet).sort());
//     }
//   }, [trips]);

//   /* ----------------------------------
//      7️⃣ REAL SERVER ERROR ONLY
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

//   // 🔥 Show loader AFTER all hooks, but before the main return
//   if (showLoader) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center bg-white">
//         <Loader />
//       </div>
//     );
//   }

//   /* ----------------------------------
//      8️⃣ UI
//   ---------------------------------- */
//   return (
//     <div className="min-h-screen pt-16">
//       <div className="sticky top-18 z-40 bg-white shadow-md">
//         <SearchTripSection filters={draftFilters} updateFilter={updateFilter} />

//         {isTyping && (
//           <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse" />
//         )}
//       </div>

//       {/* Page Content */}
//       <div className="px-4 md:px-10 pt-6">
//         <div className="grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto gap-6">
//           <aside className="lg:col-span-3">
//             <FilterSidebar
//               filters={draftFilters}
//               updateFilter={updateFilter}
//               availableLanguages={availableLanguages}
//             />
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
import Loader from "@/components/Loader/Loader";
import { ApiTrip } from "./types/types";

export default function SearchTripPage() {
  const searchParams = useSearchParams();
  const [isTyping, setIsTyping] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);

  // 🔥 Move this effect to the top - it's fine
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

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
    gender: "Any",
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
    }, 500);

    return () => {
      clearTimeout(t);
      setIsTyping(false);
    };
  }, [draftFilters]);

  /* ----------------------------------
     5️⃣ MEMOIZE FILTERS WITH STABLE STRINGIFY
  ---------------------------------- */
  // 🔥 FIXED: Proper useMemo dependency
  const appliedFiltersKey = useMemo(
    () => stringify(appliedFilters),
    [appliedFilters],
  );

  const stableFilters = useMemo(
    () => appliedFilters,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appliedFiltersKey], // Use the stringified key as dependency
  );

  /* ----------------------------------
     6️⃣ FETCH DATA WITH STABLE FILTERS
  ---------------------------------- */
  const { trips, packages, loading, error, hasFetched, loadMore, canLoadMore } =
    useSearchData(stableFilters);

  useEffect(() => {
    if (trips.length > 0 || packages.length > 0) {
      // Extract unique languages from trips and packages
      const languagesSet = new Set<string>();

      trips.forEach((trip: ApiTrip) => {
        if (trip.partnerPreferences?.languages?.length) {
          trip.partnerPreferences.languages.forEach((lang: string) => {
            languagesSet.add(lang);
          });
        }
      });

      packages.forEach((pkg: any) => {
        if (pkg.partnerPreferences?.languages?.length) {
          pkg.partnerPreferences.languages.forEach((lang: string) => {
            languagesSet.add(lang);
          });
        }
      });

      setAvailableLanguages(Array.from(languagesSet).sort());
    }
  }, [trips, packages]);

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
    <div className="min-h-screen pt-16 ">
      <div className="sticky top-18 z-40 bg-white shadow-md">
        <SearchTripSection filters={draftFilters} updateFilter={updateFilter} />

        {isTyping && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 animate-pulse" />
        )}
      </div>

      {/* Page Content */}
      <div className="px-4 md:px-10 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 max-w-7xl mx-auto gap-6">
          <div className="lg:col-span-3">
            <div className="sticky top-52 z-30 max-h-[calc(100vh-14rem)] overflow-y-auto overscroll-contain [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <FilterSidebar
                filters={draftFilters}
                updateFilter={updateFilter}
                availableLanguages={availableLanguages}
              />
            </div>
          </div>

          {/* <div className="lg:col-span-9 max-h-170 overflow-y-auto scrollbar-hide"> */}
          <div className="lg:col-span-9">
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
          </div>
        </div>
      </div>
    </div>
  );
}
