// main page

"use client";

import { useEffect, useMemo, useState } from "react";

import Similar from "./components/Similar";
import { Flame } from "lucide-react";
import TripCard from "./components/TripsCard";
import LeaderTrips from "./components/LeaderTrips";
import AgencyCarousel from "./components/AgencyCarousel";
import Filters from "./components/Filters";
import Loader from "../../components/Loader/Loader";

import type { Trip, SimilarTrip, Leader, Agency } from "./types/types";
import { TRIPS_DEMO, SIMILAR_TRIPS_DEMO, LEADERS_DEMO, AGENCIES_DEMO } from "./data/data";

type ActiveFilter = "all" | "best" | "agency" | "leader";

/** convert chip string like "+ Beaches, + Culture" → ["beaches","culture"] */
const normalizeChipsToValues = (value: string): string[] => {
  if (!value || value === "All") return [];
  return value
    .split(",")
    .map((s) => s.trim().replace(/^\+ /, "").toLowerCase())
    .filter(Boolean);
};

export default function Page() {
  // Filter states (controlled by Filters component)
  const [query, setQuery] = useState("");
  const [age, setAge] = useState(18);
  const [duration, setDuration] = useState(5);
  const [budget, setBudget] = useState(15000);
  const [minRating, setMinRating] = useState(0);
  const [minSafeScore, setMinSafeScore] = useState(0);

  const [showLoader, setShowLoader] = useState(true);

  // from Interests / Trip type / Food preference chips
  const [interest, setInterest] = useState<string>("All");
  const [tripType, setTripType] = useState<string>("All");
  const [foodPref, setFoodPref] = useState<string>("All");

  // Has the user clicked "Apply Filter" yet?
  const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

  // Top row chips
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

  // helper for price parsing (from string like "₹1,500 / person...")
  const parsePrice = (price: string): number => {
    const digits = price.replace(/[^\d]/g, "");
    if (!digits) return 0;
    return Number(digits);
  };



  /* ------- FILTERED TRIPS (Best Match) ------- */
  const filteredTrips: Trip[] = useMemo(() => {
    // start from all trips
    let base = TRIPS_DEMO;

    // SEARCH (always active, even before Apply)
    if (query.trim()) {
      const q = query.toLowerCase();
      base = base.filter((trip) => {
        const inTitle = trip.title.toLowerCase().includes(q);
        const inFrom = trip.from.toLowerCase().includes(q);
        const inTo = trip.to.toLowerCase().includes(q);
        return inTitle || inFrom || inTo;
      });
    }

    // if filters haven't been applied yet → return search-only result
    if (!hasAppliedFilters) {
      return base;
    }

    // after Apply Filter → apply all other conditions
    return base.filter((trip) => {
      // rating
      if (minRating > 0 && trip.host.rating < minRating) return false;

      // safe score
      if (minSafeScore > 0 && trip.host.safeScore < minSafeScore)
        return false;

      // age slider (simple: keep hosts within ±5 years)
      if (Math.abs(trip.host.age - age) > 5) return false;

      // budget slider: price <= budget
      const numericPrice = parsePrice(trip.price);
      if (budget > 0 && numericPrice > budget) return false;

      // duration slider – example logic (can improve later)
      if (duration > 0 && trip.date.length < duration) {
        return false;
      }

      return true;
    });
  }, [
    query,
    hasAppliedFilters,
    minRating,
    minSafeScore,
    age,
    budget,
    duration,
  ]);

  /* ------- FILTERED LEADERS ------- */
  const filteredLeaders: Leader[] = useMemo(() => {
    let base = LEADERS_DEMO;

    // SEARCH always active
    if (query.trim()) {
      const q = query.toLowerCase();
      base = base.filter((leader) => {
        const inTitle = leader.title.toLowerCase().includes(q);
        const inFrom = leader.from.toLowerCase().includes(q);
        const inTo = leader.to.toLowerCase().includes(q);
        return inTitle || inFrom || inTo;
      });
    }

    if (!hasAppliedFilters) {
      return base;
    }

    return base.filter((leader) => {
      if (minRating > 0 && leader.host.rating < minRating) return false;
      if (minSafeScore > 0 && leader.host.safeScore < minSafeScore)
        return false;

      if (Math.abs(leader.host.age - age) > 5) return false;

      const numericPrice = parsePrice(leader.price);
      if (budget > 0 && numericPrice > budget) return false;

      return true;
    });
  }, [query, hasAppliedFilters, minRating, minSafeScore, age, budget]);

  /* ------- FILTERED AGENCIES ------- */
  const filteredAgencies: Agency[] = useMemo(() => {
    let base = AGENCIES_DEMO;

    // SEARCH always active
    if (query.trim()) {
      const q = query.toLowerCase();
      base = base.filter((agency) => {
        const inTitle = agency.title.toLowerCase().includes(q);
        const inFrom = agency.from.toLowerCase().includes(q);
        const inTo = agency.to.toLowerCase().includes(q);
        return inTitle || inFrom || inTo;
      });
    }

    if (!hasAppliedFilters) {
      return base;
    }

    return base.filter((agency) => {
      if (minRating > 0 && agency.host.rating < minRating) return false;
      if (minSafeScore > 0 && agency.host.safeScore < minSafeScore)
        return false;

      const numericPrice = parsePrice(agency.price);
      if (budget > 0 && numericPrice > budget) return false;

      return true;
    });
  }, [query, hasAppliedFilters, minRating, minSafeScore, budget]);

  /* ------- FILTERED SIMILAR TRIPS ------- */
  const filteredSimilarTrips: SimilarTrip[] = useMemo(() => {
    let base = SIMILAR_TRIPS_DEMO;

    // SEARCH always active (title / from / to)
    if (query.trim()) {
      const q = query.toLowerCase();
      base = base.filter((trip) => {
        const inTitle = trip.title.toLowerCase().includes(q);
        const inFrom = trip.from.toLowerCase().includes(q);
        const inTo = trip.to.toLowerCase().includes(q);
        return inTitle || inFrom || inTo;
      });
    }

    if (!hasAppliedFilters) {
      // only search filter applied
      return base;
    }

    const interestValues = normalizeChipsToValues(interest);
    const tripTypeValues = normalizeChipsToValues(tripType);
    const foodValues = normalizeChipsToValues(foodPref);

    return base.filter((trip) => {
      // ⭐ rating
      if (minRating > 0 && trip.host.rating < minRating) return false;

      // 🛡 safe score
      if (minSafeScore > 0 && trip.host.safeScore < minSafeScore)
        return false;

      // 👤 age
      if (Math.abs(trip.host.age - age) > 5) return false;

      // 💰 budget
      const numericPrice = parsePrice(trip.price);
      if (budget > 0 && numericPrice > budget) return false;

      // ❤️ Interest filter
      if (interestValues.length) {
        const tripInterests = (trip.interest ?? []).map((i) =>
          i.toLowerCase()
        );
        const hasAnyInterest = interestValues.some((v) =>
          tripInterests.includes(v)
        );
        if (!hasAnyInterest) return false;
      }

      // 👥 Trip type filter
      if (tripTypeValues.length) {
        const tripTypes = (trip.tripType ?? []).map((t) =>
          t.toLowerCase()
        );
        const hasAnyType = tripTypeValues.some((v) =>
          tripTypes.includes(v)
        );
        if (!hasAnyType) return false;
      }

      // 🍽 Food preference filter
      if (foodValues.length) {
        const tripFoods = (trip.foodPref ?? []).map((f) =>
          f.toLowerCase()
        );
        const hasAnyFood = foodValues.some((v) =>
          tripFoods.includes(v)
        );
        if (!hasAnyFood) return false;
      }

      return true;
    });
  }, [
    query,
    hasAppliedFilters,
    minRating,
    minSafeScore,
    age,
    budget,
    interest,
    tripType,
    foodPref,
  ]);

  // When user presses "Apply Filter" button in Filters
  const handleApplyFilters = () => {
    setHasAppliedFilters(true);
  };

  // When "Clear all filters" is pressed in Filters
  const handleClearFilters = () => {
    setHasAppliedFilters(false);
    // Filters will also reset states via setters it has
  };

  // Chip style helper
  const chipClass = (type: ActiveFilter) =>
    `px-3 py-1.5 rounded-full text-sm font-medium border transition cursor-pointer
     ${
       activeFilter === type
         ? "bg-[#1D4350] text-white border-[#0A4D4A]"
         : "bg-white text-gray-700 border-gray-200 hover:bg-[#E8F1F1]"
     }`;

     // Hide loader after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show loader if either loading data or 2-second timer is active
  if (showLoader) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 mt-11">
  <div className="w-full mx-auto grid grid-cols-12 gap-6">
    
    {/* LEFT: Filters Panel */}
    <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
      <div className="lg:sticky lg:top-21">
        <Filters
          query={query}
          setQuery={setQuery}
          age={age}
          setAge={setAge}
          duration={duration}
          setDuration={setDuration}
          budget={budget}
          setBudget={setBudget}
          minRating={minRating}
          setMinRating={setMinRating}
          minSafeScore={minSafeScore}
          setMinSafeScore={setMinSafeScore}
          interest={interest}
          setInterest={setInterest}
          tripType={tripType}
          setTripType={setTripType}
          foodPref={foodPref}
          setFoodPref={setFoodPref}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      </div>
    </aside>

    {/* RIGHT: Main Content */}
    <main className="col-span-12 lg:col-span-8 xl:col-span-9">

      {/* Top row: Trending + chips */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
        <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium cursor-pointer w-fit">
          <Flame className="w-4 h-4 text-orange-500" />
          <span>Trending</span>
        </div>

        <button
          onClick={() => setActiveFilter("all")}
          className={chipClass("all")}
          aria-pressed={activeFilter === "all"}
        >
          All
        </button>

        <button
          onClick={() => setActiveFilter("best")}
          className={chipClass("best")}
          aria-pressed={activeFilter === "best"}
        >
          Best Match
        </button>

        <button
          onClick={() => setActiveFilter("agency")}
          className={chipClass("agency")}
          aria-pressed={activeFilter === "agency"}
        >
          Featured Trip Agency
        </button>

        <button
          onClick={() => setActiveFilter("leader")}
          className={chipClass("leader")}
          aria-pressed={activeFilter === "leader"}
        >
          Featured Trip Leader
        </button>
      </div>

      {/* Best Match */}
      {(activeFilter === "all" || activeFilter === "best") &&
        filteredTrips.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Best Match</h3>
            <TripCard trips={filteredTrips} />
          </section>
        )}

      {/* Featured Trip Leaders */}
      {(activeFilter === "all" || activeFilter === "leader") &&
        filteredLeaders.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Featured Trip Leaders
            </h3>
            <LeaderTrips leaders={filteredLeaders} />
          </section>
        )}

      {/* Featured Travel Agencies */}
      {(activeFilter === "all" || activeFilter === "agency") &&
        filteredAgencies.length > 0 && (
          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-4">
              Featured Travel Agencies
            </h3>
            <AgencyCarousel agencies={filteredAgencies} />
          </section>
        )}

      {/* Similar Trips */}
      {filteredSimilarTrips.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Similar Trips</h3>
          <Similar trips={filteredSimilarTrips} />
        </div>
      )}

    </main>
  </div>
</div>
  );
}

// // main page

// "use client";

// import { useEffect, useMemo, useState, useCallback, useTransition, useDeferredValue } from "react";

// import Similar from "./components/Similar";
// import { Flame } from "lucide-react";
// import TripCard from "./components/TripsCard";
// import LeaderTrips from "./components/LeaderTrips";
// import AgencyCarousel from "./components/AgencyCarousel";
// import Filters from "./components/Filters";
// import Loader from "../../components/Loader/Loader";

// import type { Trip, SimilarTrip, Leader, Agency } from "./types/types";
// import { TRIPS_DEMO, SIMILAR_TRIPS_DEMO, LEADERS_DEMO, AGENCIES_DEMO } from "./data/data";

// type ActiveFilter = "all" | "best" | "agency" | "leader";

// /** parse price like "₹1,500 / person" -> 1500 */
// const parsePrice = (price: string): number => {
//   const digits = price.replace(/[^\d]/g, "");
//   return digits ? Number(digits) : 0;
// };

// /** convert chip string like "+ Beaches, + Culture" → ["beaches","culture"] */
// const chipsToValues = (value: string): string[] => {
//   if (!value || value === "All") return [];
//   return value
//     .split(",")
//     .map((s) => s.trim().replace(/^\+ /, "").toLowerCase())
//     .filter(Boolean);
// };

// /** util to derive and cache search/price fields once */
// function hydrateTrips<T extends Trip | Leader | Agency | SimilarTrip>(items: T[]) {
//   return items.map((item) => {
//     const durationCount = Array.isArray((item as Trip).date) ? (item as Trip).date.length : 0;
//     return {
//       ...item,
//       __lcTitle: item.title.toLowerCase(),
//       __lcFrom: item.from.toLowerCase(),
//       __lcTo: item.to.toLowerCase(),
//       __price: parsePrice(item.price),
//       __durationCount: durationCount, // only meaningful for Trip
//     };
//   });
// }

// export default function Page() {
//   // Filter states (controlled by Filters component)
//   const [query, setQuery] = useState("");
//   const [age, setAge] = useState(18);
//   const [duration, setDuration] = useState(5);
//   const [budget, setBudget] = useState(15000);
//   const [minRating, setMinRating] = useState(0);
//   const [minSafeScore, setMinSafeScore] = useState(0);

//   const [showLoader, setShowLoader] = useState(true);

//   // from Interests / Trip type / Food preference chips
//   const [interest, setInterest] = useState<string>("All");
//   const [tripType, setTripType] = useState<string>("All");
//   const [foodPref, setFoodPref] = useState<string>("All");

//   // Has the user clicked "Apply Filter" yet?
//   const [hasAppliedFilters, setHasAppliedFilters] = useState(false);

//   // Top row chips
//   const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
//   const [isPending, startTransition] = useTransition();

//   // Derive and cache data once
//   const tripsHydrated = useMemo(() => hydrateTrips(TRIPS_DEMO), []);
//   const leadersHydrated = useMemo(() => hydrateTrips(LEADERS_DEMO), []);
//   const agenciesHydrated = useMemo(() => hydrateTrips(AGENCIES_DEMO), []);
//   const similarTripsHydrated = useMemo(() => hydrateTrips(SIMILAR_TRIPS_DEMO), []);

//   // Defer expensive filtering while user is typing
//   const deferredQuery = useDeferredValue(query);

//   // Normalize chip selections once
//   const interestValues = useMemo(() => chipsToValues(interest), [interest]);
//   const tripTypeValues = useMemo(() => chipsToValues(tripType), [tripType]);
//   const foodValues = useMemo(() => chipsToValues(foodPref), [foodPref]);

//   /* ------- FILTERED TRIPS (Best Match) ------- */
//   const filteredTrips = useMemo(() => {
//     const q = deferredQuery.trim().toLowerCase();
//     let base = tripsHydrated;

//     if (q) {
//       base = base.filter((t) => t.__lcTitle.includes(q) || t.__lcFrom.includes(q) || t.__lcTo.includes(q));
//     }

//     if (!hasAppliedFilters) return base;

//     return base.filter((t) => {
//       if (minRating > 0 && t.host.rating < minRating) return false;
//       if (minSafeScore > 0 && t.host.safeScore < minSafeScore) return false;
//       if (Math.abs(t.host.age - age) > 5) return false;
//       if (budget > 0 && t.__price > budget) return false;
//       if (duration > 0 && t.__durationCount < duration) return false;
//       return true;
//     });
//   }, [
//     tripsHydrated,
//     deferredQuery,
//     hasAppliedFilters,
//     minRating,
//     minSafeScore,
//     age,
//     budget,
//     duration,
//   ]);

//   /* ------- FILTERED LEADERS ------- */
//   const filteredLeaders = useMemo(() => {
//     const q = deferredQuery.trim().toLowerCase();
//     let base = leadersHydrated;

//     if (q) {
//       base = base.filter((l) => l.__lcTitle.includes(q) || l.__lcFrom.includes(q) || l.__lcTo.includes(q));
//     }

//     if (!hasAppliedFilters) return base;

//     return base.filter((l) => {
//       if (minRating > 0 && l.host.rating < minRating) return false;
//       if (minSafeScore > 0 && l.host.safeScore < minSafeScore) return false;
//       if (Math.abs(l.host.age - age) > 5) return false;
//       if (budget > 0 && l.__price > budget) return false;
//       return true;
//     });
//   }, [leadersHydrated, deferredQuery, hasAppliedFilters, minRating, minSafeScore, age, budget]);

//   /* ------- FILTERED AGENCIES ------- */
//   const filteredAgencies = useMemo(() => {
//     const q = deferredQuery.trim().toLowerCase();
//     let base = agenciesHydrated;

//     if (q) {
//       base = base.filter((a) => a.__lcTitle.includes(q) || a.__lcFrom.includes(q) || a.__lcTo.includes(q));
//     }

//     if (!hasAppliedFilters) return base;

//     return base.filter((a) => {
//       if (minRating > 0 && a.host.rating < minRating) return false;
//       if (minSafeScore > 0 && a.host.safeScore < minSafeScore) return false;
//       if (budget > 0 && a.__price > budget) return false;
//       return true;
//     });
//   }, [agenciesHydrated, deferredQuery, hasAppliedFilters, minRating, minSafeScore, budget]);

//   /* ------- FILTERED SIMILAR TRIPS ------- */

//   const filteredSimilarTrips = useMemo(() => {
//     const q = deferredQuery.trim().toLowerCase();
//     let base = similarTripsHydrated;

//     if (q) {
//       base = base.filter((t) => t.__lcTitle.includes(q) || t.__lcFrom.includes(q) || t.__lcTo.includes(q));
//     }

//     if (!hasAppliedFilters) return base;

//     return base.filter((t) => {
//       if (minRating > 0 && t.host.rating < minRating) return false;
//       if (minSafeScore > 0 && t.host.safeScore < minSafeScore) return false;
//       if (Math.abs(t.host.age - age) > 5) return false;
//       if (budget > 0 && t.__price > budget) return false;

//       if (interestValues.length) {
//         const tripInterests = (t.interest ?? []).map((i) => i.toLowerCase());
//         if (!interestValues.some((v) => tripInterests.includes(v))) return false;
//       }
//       if (tripTypeValues.length) {
//         const tripTypes = (t.tripType ?? []).map((tp) => tp.toLowerCase());
//         if (!tripTypeValues.some((v) => tripTypes.includes(v))) return false;
//       }
//       if (foodValues.length) {
//         const foods = (t.foodPref ?? []).map((f) => f.toLowerCase());
//         if (!foodValues.some((v) => foods.includes(v))) return false;
//       }
//       return true;
//     });
//   }, [
//     similarTripsHydrated,
//     deferredQuery,
//     hasAppliedFilters,
//     minRating,
//     minSafeScore,
//     age,
//     budget,
//     interestValues,
//     tripTypeValues,
//     foodValues,
//   ]);

//   // Actions
//   const handleApplyFilters = useCallback(() => {
//     setHasAppliedFilters(true);
//   }, []);

//   const handleClearFilters = useCallback(() => {
//     setHasAppliedFilters(false);
//     // Filters component should reset its own local UI states via the setters we pass.
//   }, []);

//   const setActiveFilterDeferred = useCallback((type: ActiveFilter) => {
//     startTransition(() => {
//       setActiveFilter(type);
//     });
//   }, []);

//   // Chip style helper
//   const chipClass = useCallback(
//     (type: ActiveFilter) =>
//       `px-3 py-1.5 rounded-full text-sm font-medium border transition cursor-pointer
//        ${activeFilter === type ? "bg-[#1D4350] text-white border-[#0A4D4A]" : "bg-white text-gray-700 border-gray-200 hover:bg-[#E8F1F1]"}
//        ${isPending ? "opacity-80" : ""}`,
//     [activeFilter, isPending]
//   );

//   // Hide loader after 2 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => setShowLoader(false), 2000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (showLoader) {
//     return (
//       <div className="w-full h-screen flex items-center justify-center bg-white">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen p-4 sm:p-6 md:p-10 mt-11">
//       <div className="w-full mx-auto grid grid-cols-12 gap-6">
//         {/* LEFT: Filters Panel */}
//         <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
//           <div className="lg:sticky lg:top-21">
//             <Filters
//               query={query}
//               setQuery={setQuery}
//               age={age}
//               setAge={setAge}
//               duration={duration}
//               setDuration={setDuration}
//               budget={budget}
//               setBudget={setBudget}
//               minRating={minRating}
//               setMinRating={setMinRating}
//               minSafeScore={minSafeScore}
//               setMinSafeScore={setMinSafeScore}
//               interest={interest}
//               setInterest={setInterest}
//               tripType={tripType}
//               setTripType={setTripType}
//               foodPref={foodPref}
//               setFoodPref={setFoodPref}
//               onApply={handleApplyFilters}
//               onClear={handleClearFilters}
//             />
//           </div>
//         </aside>

//         {/* RIGHT: Main Content */}
//         <main className="col-span-12 lg:col-span-8 xl:col-span-9">
//           {/* Top row: Trending + chips */}
//           <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
//             <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full font-medium cursor-pointer w-fit">
//               <Flame className="w-4 h-4 text-orange-500" />
//               <span>Trending</span>
//             </div>

//             <button onClick={() => setActiveFilterDeferred("all")} className={chipClass("all")} aria-pressed={activeFilter === "all"}>
//               All
//             </button>
//             <button onClick={() => setActiveFilterDeferred("best")} className={chipClass("best")} aria-pressed={activeFilter === "best"}>
//               Best Match
//             </button>
//             <button onClick={() => setActiveFilterDeferred("agency")} className={chipClass("agency")} aria-pressed={activeFilter === "agency"}>
//               Featured Trip Agency
//             </button>
//             <button onClick={() => setActiveFilterDeferred("leader")} className={chipClass("leader")} aria-pressed={activeFilter === "leader"}>
//               Featured Trip Leader
//             </button>
//           </div>

//           {/* Best Match */}
//           {(activeFilter === "all" || activeFilter === "best") && filteredTrips.length > 0 && (
//             <section className="mb-8">
//               <h3 className="text-lg font-semibold mb-4">Best Match</h3>
//               <TripCard trips={filteredTrips as Trip[]} />
//             </section>
//           )}

//           {/* Featured Trip Leaders */}
//           {(activeFilter === "all" || activeFilter === "leader") && filteredLeaders.length > 0 && (
//             <section className="mb-8">
//               <h3 className="text-lg font-semibold mb-4">Featured Trip Leaders</h3>
//               <LeaderTrips leaders={filteredLeaders as Leader[]} />
//             </section>
//           )}

//           {/* Featured Travel Agencies */}
//           {(activeFilter === "all" || activeFilter === "agency") && filteredAgencies.length > 0 && (
//             <section className="mb-8">
//               <h3 className="text-lg font-semibold mb-4">Featured Travel Agencies</h3>
//               <AgencyCarousel agencies={filteredAgencies as Agency[]} />
//             </section>
//           )}

//           {/* Similar Trips */}
//           {filteredSimilarTrips.length > 0 && (
//             <div>
//               <h3 className="text-lg font-semibold mb-4">Similar Trips</h3>
//               <Similar trips={filteredSimilarTrips as SimilarTrip[]} />
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// }
