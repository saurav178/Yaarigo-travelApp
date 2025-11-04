// "use client";

// import { useCallback, useMemo, useState } from "react";
// import TripCard from "@/src/app/searchtrip/components/TripsCard";
// import HorizontalCarousel from "@/src/app/searchtrip/components/HorizontalCarousel";
// import Filters from "@/src/app/searchtrip/components/Filters";
// import type { Leader, Similar, Trip } from "@/src/app/searchtrip/types/types";
// import { SAMPLE_DATA_01 } from "./data/bestmatch";
// import { AGENCIES } from "@/src/app/searchtrip/data/agencies";
// import AgencyCarousel from "@/src/app/searchtrip/components/AgencyCarousel";
// import RecommendationsCarousel from "@/src/app/searchtrip/components/RecommendationsCarousel";
// import AIHeader from "./components/AIHeader";

// import { SAMPLE_DATA_02 } from "./data/similartrips";
// import { SAMPLE_DATA_03 } from "./data/leadertrips";
// import SimilarTrips from "@/src/app/searchtrip/components/TripsCard";
// import LeaderTrips from "@/src/app/searchtrip/components/TripsCard";

// /** DEBUG flag (stable identity: defined outside component) */
// const DEBUG = false;

// /** Union type for items we filter */
// type Item = Trip | Similar | Leader;

// export default function Page() {
//   const [query, setQuery] = useState("Simla, Himachal Pradesh, India");
//   const [age, setAge] = useState(18);
//   const [duration, setDuration] = useState(5); // treated as max days
//   const [budget, setBudget] = useState(15000); // user's maximum budget

//   const trips = SAMPLE_DATA_01;
//   const trip1 = SAMPLE_DATA_02;
//   const trip2 = SAMPLE_DATA_03;

//   // -------------------------
//   // Small typed helpers to access properties on unknown union members
//   // -------------------------
//   const getStringProp = (obj: unknown, prop: string): string | undefined => {
//     if (obj && typeof obj === "object" && prop in obj) {
//       const v = (obj as Record<string, unknown>)[prop];
//       return typeof v === "string" ? v : undefined;
//     }
//     return undefined;
//   };

//   const getNumberProp = (obj: unknown, prop: string): number | undefined => {
//     if (obj && typeof obj === "object" && prop in obj) {
//       const v = (obj as Record<string, unknown>)[prop];
//       return typeof v === "number" ? v : undefined;
//     }
//     return undefined;
//   };

//   // -------------------------
//   // Memoized parsing helpers (useCallback so identities are stable)
//   // -------------------------
//   const parseNumbersFromString = useCallback((s: string | null | undefined): number[] => {
//     if (!s && s !== "") return [];
//     const str = String(s);

//     let normalized = str
//       .replace(/\u00A0/g, " ")
//       .replace(/,/g, "")
//       .replace(/₹/g, "")
//       .trim()
//       .toLowerCase();

//     normalized = normalized.replace(/(\d+(?:\.\d+)?)\s*k\b/g, (_m, n) => String(Number(n) * 1000));

//     const matches = normalized.match(/(\d+(?:\.\d+)?)/g);
//     if (!matches) return [];
//     return matches.map((m) => Number(m)).filter((n) => Number.isFinite(n));
//   }, []);

//   const tripPriceRange = useCallback(
//     (p: unknown): { min?: number; max?: number } | null => {
//       if (p == null) return null;
//       if (typeof p === "number") return { min: p, max: p };
//       if (typeof p === "string") {
//         const nums = parseNumbersFromString(p);
//         if (nums.length === 0) return null;
//         if (nums.length === 1) return { min: nums[0], max: nums[0] };
//         return { min: Math.min(...nums), max: Math.max(...nums) };
//       }
//       return null;
//     },
//     [parseNumbersFromString]
//   );

//   const toNumberSafe = useCallback((v: unknown): number => {
//     if (typeof v === "number" && Number.isFinite(v)) return v;
//     if (typeof v === "string") {
//       const cleaned = v.replace(/[^\d.]/g, "");
//       const n = Number(cleaned);
//       return Number.isFinite(n) ? n : 0;
//     }
//     return 0;
//   }, []);

//   const tripDaysValue = useCallback(
//     (item: Item): number | null => {
//       const rawNumber = getNumberProp(item, "days") ?? getNumberProp(item, "duration");
//       if (rawNumber != null) return rawNumber;

//       const rawString = getStringProp(item, "days") ?? getStringProp(item, "duration");
//       if (rawString != null) {
//         const nums = parseNumbersFromString(rawString);
//         if (nums.length === 0) return null;
//         return Math.min(...nums);
//       }

//       return null;
//     },
//     [parseNumbersFromString]
//   );

//   // -------------------------
//   // makePredicate: typed, stable via useCallback
//   // -------------------------
//   const makePredicate = useCallback(
//     (qRaw: string, ageMax: number, daysMax: number, budgetMaxRaw: unknown) =>
//       (t: Item): boolean => {
//         // Query (name/location/from/to)
//         const q = (qRaw ?? "").trim().toLowerCase();
//         if (q) {
//           const name = getStringProp(t, "name") ?? "";
//           const location = getStringProp(t, "location") ?? "";
//           const from = getStringProp(t, "from") ?? "";
//           const to = getStringProp(t, "to") ?? "";
//           const hay = `${name} ${location} ${from} ${to}`.toLowerCase();
//           if (!hay.includes(q)) return false;
//         }

//         // Age
//         const itemAge = getNumberProp(t, "age");
//         if (typeof itemAge === "number") {
//           if (itemAge > ageMax) return false;
//         }

//         // Days/duration
//         const days = tripDaysValue(t);
//         if (days !== null) {
//           if (days > daysMax) return false;
//         }

//         // Budget
//         const budgetMax = toNumberSafe(budgetMaxRaw);
//         if (budgetMax > 0) {
//           const pr = tripPriceRange((t as unknown as Record<string, unknown>)["price"]);
//           if (pr) {
//             const tripMinPrice = pr.min ?? pr.max ?? 0;
//             if (tripMinPrice > budgetMax) return false;
//           }
//           // if pr is null (no price info) we keep the trip (preserve previous behavior)
//         }

//         return true;
//       },
//     [tripDaysValue, toNumberSafe, tripPriceRange]
//   );

//   // -------------------------
//   // Filtered arrays (use stable dependencies)
//   // -------------------------
//   const filtered = useMemo(() => {
//     const predicate = makePredicate(query, age, duration, budget);

//     if (DEBUG) {
//       console.debug("Filtering with:", { query, age, duration, budget });
//       trips.forEach((t) => {
//         const rawPrice = (t as unknown as Record<string, unknown>)["price"];
//         const pr = tripPriceRange(rawPrice);
//         if (pr) {
//           console.debug("Trip price parse:", (t as unknown as Record<string, unknown>)["id"], getStringProp(t, "name"), "=>", pr);
//         } else {
//           console.debug("Trip price parse: none for", (t as unknown as Record<string, unknown>)["id"], getStringProp(t, "name"), "raw:", rawPrice);
//         }
//       });
//     }

//     return trips.filter(predicate);
//   }, [query, trips, age, duration, budget, makePredicate, tripPriceRange]);

//   const filtered1 = useMemo(() => {
//     const predicate = makePredicate(query, age, duration, budget);
//     return trip1.filter(predicate);
//   }, [query, trip1, age, duration, budget, makePredicate, tripPriceRange]);

//   const filtered2 = useMemo(() => {
//     const predicate = makePredicate(query, age, duration, budget);
//     return trip2.filter(predicate);
//   }, [query, trip2, age, duration, budget, makePredicate, tripPriceRange]);

//   // -------------------------
//   // Render (unchanged layout and components)
//   // -------------------------
//   return (
//     <div className="min-h-screen p-6 md:p-10 mt-11">
//       <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
//         <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
//           <div className="sticky top-6">
//             <Filters
//               query={query}
//               setQuery={setQuery}
//               age={age}
//               setAge={setAge}
//               duration={duration}
//               setDuration={setDuration}
//               budget={budget}
//               setBudget={setBudget}
//             />
//           </div>
//         </aside>

//         <main className="col-span-12 lg:col-span-8 xl:col-span-9">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h1 className="text-xl font-bold">Results for {query || "Anywhere"}</h1>
//               <p className="text-sm text-gray-500">Discover travel companions for your next adventure</p>
//             </div>
//             <div className="text-sm text-gray-500">{filtered.length} Results</div>
//           </div>

//           <section className="mb-8">
//             <h3 className="text-lg font-semibold mb-12">Best Match</h3>
//             <HorizontalCarousel
//               items={filtered.sort((a, b) => (b.match ?? 0) - (a.match ?? 0))}
//               visible={3}
//               renderItem={(t) => <TripCard trip={t as Trip} compact />}
//             />
//           </section>

//           <section className="mb-8">
//             <h3 className="text-lg font-semibold mb-12">Featured Trip Leaders</h3>
//             <HorizontalCarousel items={filtered2} visible={3} renderItem={(t) => <LeaderTrips trip={t as Leader} compact />} />
//           </section>

//           <main className="p-6 bg-gray-50 min-h-screen -mt-6">
//             <div className="max-w-7xl mx-auto">
//               <AIHeader count={3} />
//               <RecommendationsCarousel />
//             </div>
//           </main>

//           <main className="p-8 bg-gray-50 min-h-screen -mt-16">
//             <AgencyCarousel agencies={AGENCIES} />
//           </main>

//           <section className="mb-8">
//             <h3 className="text-lg font-semibold mb-12 -mt-10">Similar Trips</h3>
//             <HorizontalCarousel items={filtered1} visible={3} renderItem={(t) => <SimilarTrips trip={t as Similar} compact />} />
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }

// app/page.tsx
"use client";

import { useCallback, useMemo, useState } from "react";
import TripCard from "@/src/app/searchtrip/components/TripsCard";
import HorizontalCarousel from "@/src/app/searchtrip/components/HorizontalCarousel";
import Filters from "@/src/app/searchtrip/components/Filters";
import type { Leader, Similar, Trip } from "@/src/app/searchtrip/types/types";
import { SAMPLE_DATA_01 } from "./data/bestmatch";
import { AGENCIES } from "@/src/app/searchtrip/data/agencies";
import AgencyCarousel from "@/src/app/searchtrip/components/AgencyCarousel";
import RecommendationsCarousel from "@/src/app/searchtrip/components/RecommendationsCarousel";
import AIHeader from "./components/AIHeader";

import { SAMPLE_DATA_02 } from "./data/similartrips";
import { SAMPLE_DATA_03 } from "./data/leadertrips";
import SimilarTrips from "@/src/app/searchtrip/components/TripsCard";
import LeaderTrips from "@/src/app/searchtrip/components/TripsCard";

/** DEBUG flag (toggle for console diagnostics) */
const DEBUG = false;

/** Union type for items we filter */
type Item = Trip | Similar | Leader;

// -------------------------
// Top-level stable helpers (no hooks) — move outside component to avoid hook deps
// -------------------------

/**
 * Normalizes and extracts numbers from a price/duration string.
 */
function parseNumbersFromString(s: string | null | undefined): number[] {
  if (!s && s !== "") return [];
  const str = String(s);

  let normalized = str
    .replace(/\u00A0/g, " ")
    .replace(/,/g, "")
    .replace(/₹/g, "")
    .trim()
    .toLowerCase();

  // convert "15k" -> "15000"
  normalized = normalized.replace(/(\d+(?:\.\d+)?)\s*k\b/g, (_m, n) =>
    String(Number(n) * 1000)
  );

  const matches = normalized.match(/(\d+(?:\.\d+)?)/g);
  if (!matches) return [];
  return matches.map((m) => Number(m)).filter((n) => Number.isFinite(n));
}

/**
 * Given trip.price (number|string) return {min,max} or null if none found.
 */
function tripPriceRange(p: unknown): { min?: number; max?: number } | null {
  if (p == null) return null;
  if (typeof p === "number") return { min: p, max: p };
  if (typeof p === "string") {
    const nums = parseNumbersFromString(p);
    if (nums.length === 0) return null;
    if (nums.length === 1) return { min: nums[0], max: nums[0] };
    return { min: Math.min(...nums), max: Math.max(...nums) };
  }
  return null;
}

/** Safely convert incoming budget prop to a number */
function toNumberSafe(v: unknown): number {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (typeof v === "string") {
    const cleaned = v.replace(/[^\d.]/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

/** Typed accessors for unknown union members */
function getStringProp(obj: unknown, prop: string): string | undefined {
  if (obj && typeof obj === "object" && prop in obj) {
    const v = (obj as Record<string, unknown>)[prop];
    return typeof v === "string" ? v : undefined;
  }
  return undefined;
}
function getNumberProp(obj: unknown, prop: string): number | undefined {
  if (obj && typeof obj === "object" && prop in obj) {
    const v = (obj as Record<string, unknown>)[prop];
    return typeof v === "number" ? v : undefined;
  }
  return undefined;
}

/** Representative trip days (returns smallest number found if range provided) */
function tripDaysValueStatic(item: Item): number | null {
  const rawNumber =
    getNumberProp(item, "days") ?? getNumberProp(item, "duration");
  if (rawNumber != null) return rawNumber;

  const rawString =
    getStringProp(item, "days") ?? getStringProp(item, "duration");
  if (rawString != null) {
    const nums = parseNumbersFromString(rawString);
    if (nums.length === 0) return null;
    return Math.min(...nums);
  }
  return null;
}

// -------------------------
// Component
// -------------------------

export default function Page() {
  const [query, setQuery] = useState("Simla, Himachal Pradesh, India");
  const [age, setAge] = useState(18);
  const [duration, setDuration] = useState(5); // treated as max days
  const [budget, setBudget] = useState(15000); // user's maximum budget

  // sample trips
  const trips = SAMPLE_DATA_01;
  const trip1 = SAMPLE_DATA_02;
  const trip2 = SAMPLE_DATA_03;

  // Memoized helper that uses top-level stable helpers
  const tripDaysValue = useCallback((item: Item): number | null => {
    return tripDaysValueStatic(item);
  }, []);

  // makePredicate is stable (no changing deps) because it relies on top-level helpers
  const makePredicate = useCallback(
    (qRaw: string, ageMax: number, daysMax: number, budgetMaxRaw: unknown) =>
      (t: Item): boolean => {
        // Query
        const q = (qRaw ?? "").trim().toLowerCase();
        if (q) {
          const name = getStringProp(t, "name") ?? "";
          const location = getStringProp(t, "location") ?? "";
          const from = getStringProp(t, "from") ?? "";
          const to = getStringProp(t, "to") ?? "";
          const hay = `${name} ${location} ${from} ${to}`.toLowerCase();
          if (!hay.includes(q)) return false;
        }

        // Age
        const itemAge = getNumberProp(t, "age");
        if (typeof itemAge === "number") {
          if (itemAge > ageMax) return false;
        }

        // Days
        const days = tripDaysValue(t);
        if (days !== null) {
          if (days > daysMax) return false;
        }

        // Budget
        const budgetMax = toNumberSafe(budgetMaxRaw);
        if (budgetMax > 0) {
          const rawPrice = (t as unknown as Record<string, unknown>)["price"];
          const pr = tripPriceRange(rawPrice);
          if (pr) {
            const tripMinPrice = pr.min ?? pr.max ?? 0;
            if (tripMinPrice > budgetMax) return false;
          }
          // keep items with no price info (original behavior)
        }

        return true;
      },
    [tripDaysValue]
  );

  // Filtered arrays: makePredicate is stable; helpers are top-level — eslint won't complain
  const filtered = useMemo(() => {
    const predicate = makePredicate(query, age, duration, budget);

    if (DEBUG) {
      console.debug("Filtering with:", { query, age, duration, budget });
      trips.forEach((t) => {
        const rawPrice = (t as unknown as Record<string, unknown>)["price"];
        const pr = tripPriceRange(rawPrice);
        if (pr) {
          console.debug(
            "Trip price parse:",
            (t as unknown as Record<string, unknown>)["id"],
            getStringProp(t, "name"),
            "=>",
            pr
          );
        } else {
          console.debug(
            "Trip price parse: none for",
            (t as unknown as Record<string, unknown>)["id"],
            getStringProp(t, "name"),
            "raw:",
            rawPrice
          );
        }
      });
    }

    return trips.filter(predicate);
    // NOTE: helpers (tripPriceRange, parseNumbersFromString) are top-level stable functions,
    // and makePredicate is useCallback with empty deps — so including makePredicate is fine.
  }, [query, trips, age, duration, budget, makePredicate]);

  const filtered1 = useMemo(() => {
    const predicate = makePredicate(query, age, duration, budget);
    return trip1.filter(predicate);
  }, [query, trip1, age, duration, budget, makePredicate]);

  const filtered2 = useMemo(() => {
    const predicate = makePredicate(query, age, duration, budget);
    return trip2.filter(predicate);
  }, [query, trip2, age, duration, budget, makePredicate]);

  // -------------------------
  // Render (unchanged layout and components)
  // -------------------------
  return (
    <div className="min-h-screen p-6 md:p-10 mt-11">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
          <div className="sticky top-6">
            <Filters
              query={query}
              setQuery={setQuery}
              age={age}
              setAge={setAge}
              duration={duration}
              setDuration={setDuration}
              budget={budget}
              setBudget={setBudget}
            />
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-8 xl:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">
                Results for {query || "Anywhere"}
              </h1>
              <p className="text-sm text-gray-500">
                Discover travel companions for your next adventure
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {filtered.length} Results
            </div>
          </div>

          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-12">Best Match</h3>
            <HorizontalCarousel
              items={filtered.sort((a, b) => (b.match ?? 0) - (a.match ?? 0))}
              visible={3}
              renderItem={(t) => <TripCard trip={t as Trip} compact />}
            />
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-12">
              Featured Trip Leaders
            </h3>
            <HorizontalCarousel
              items={filtered2}
              visible={3}
              renderItem={(t) => <LeaderTrips trip={t as Leader} compact />}
            />
          </section>

          <main className="p-6 bg-gray-50 min-h-screen -mt-6">
            <div className="max-w-7xl mx-auto">
              <AIHeader count={3} />
              <RecommendationsCarousel />
            </div>
          </main>

          <main className="p-8 bg-gray-50 min-h-screen -mt-16">
            {Array.isArray(AGENCIES) && AGENCIES.length > 0 ? (
              <AgencyCarousel agencies={AGENCIES} />
            ) : (
              <div className="p-6 text-sm text-gray-500">
                No agencies available.
              </div>
            )}
          </main>

          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-12 -mt-10">
              Similar Trips
            </h3>
            <HorizontalCarousel
              items={filtered1}
              visible={3}
              renderItem={(t) => <SimilarTrips trip={t as Similar} compact />}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
