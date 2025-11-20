
// main page

"use client";

import { useMemo, useState } from "react";

import Similar from "./components/Similar";
import { Flame } from "lucide-react";
import TripCard from "./components/TripsCard";
import LeaderTrips from "./components/LeaderTrips";
import AgencyCarousel from "./components/AgencyCarousel";
import Filters from "./components/Filters";

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

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10 mt-11">
  <div className="w-full mx-auto grid grid-cols-12 gap-6">
    
    {/* LEFT: Filters Panel */}
    <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
      <div className="lg:sticky lg:top-6 ">
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