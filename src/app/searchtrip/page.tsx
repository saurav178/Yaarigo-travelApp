"use client";

import { useState, useEffect } from "react";
import { Flame } from "lucide-react";

// Components
import Similar from "./components/Similar";
import TripCard from "./components/TripsCard";
import LeaderTrips from "./components/LeaderTrips";
import AgencyCarousel from "./components/AgencyCarousel";
import Filters from "./components/Filters";
import Package from "./components/Package";
import CombinedContent from "./components/CombinedContent";
import Loader from "../../components/Loader/Loader";

// Hooks
import { useTripsData } from "./hooks/useTripsData";
import { useFilters } from "./hooks/useFilters";

// Types
type ActiveFilter = "all" | "best" | "agency" | "leader";

export default function Page() {
  // Fetch data using custom hook
  const { trips, leaders, agencies, packages, similarTrips, loading } = useTripsData();
  
  // Manage filters using custom hook
  const {
    query,
    setQuery,
    age,
    setAge,
    duration,
    setDuration,
    budget,
    setBudget,
    minRating,
    setMinRating,
    minSafeScore,
    setMinSafeScore,
    selectedTripStyles,
    setSelectedTripStyles,
    priceMin,
    setPriceMin,
    priceMax,
    setPriceMax,
    selectedFromLocation,
    setSelectedFromLocation,
    selectedToLocation,
    setSelectedToLocation,
    selectedTravelMode,
    setSelectedTravelMode,
    hasAppliedFilters,
    filteredTrips,
    filteredLeaders,
    filteredAgencies,
    filteredSimilarTrips,
    handleApplyFilters,
    handleClearFilters,
  } = useFilters(trips, leaders, agencies, similarTrips);

  // UI state
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [showLoader, setShowLoader] = useState(true);

  // Chip style helper
  const chipClass = (type: ActiveFilter) =>
    `px-3 py-1.5 rounded-full text-sm font-medium border transition cursor-pointer
     ${
       activeFilter === type
         ? "bg-[#1D4350] text-white border-[#0A4D4A]"
         : "bg-white text-gray-700 border-gray-200 hover:bg-[#E8F1F1]"
     }`;

  // Hide loader after data loads
  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowLoader(false), 500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Show loader
  if (showLoader || loading) {
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
              // Basic filters
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
              
              // Combined filters
              selectedTripStyles={selectedTripStyles}
              setSelectedTripStyles={setSelectedTripStyles}
              priceMin={priceMin}
              setPriceMin={setPriceMin}
              priceMax={priceMax}
              setPriceMax={setPriceMax}
              selectedFromLocation={selectedFromLocation}
              setSelectedFromLocation={setSelectedFromLocation}
              selectedToLocation={selectedToLocation}
              setSelectedToLocation={setSelectedToLocation}
              selectedTravelMode={selectedTravelMode}
              setSelectedTravelMode={setSelectedTravelMode}
              
              // Actions
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
            (filteredTrips.length > 0 || packages.length > 0) && (
              <section className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Best Match</h3>
                <CombinedContent trips={filteredTrips} packages={packages} />
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