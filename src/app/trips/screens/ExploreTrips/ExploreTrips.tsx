"use client";
import { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";
import { exploreTrips } from "../../data/TripsData";
import TripCard from "./TripCard";
import Pagination from "./Pagination";

const parsePrice = (priceStr: string) => Number(priceStr.replace(/[₹$,]/g, "").trim());

export default function ExploreTrips() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"low-high" | "high-low">("low-high");
  const [currentPage, setCurrentPage] = useState(1);

  const filterRef = useRef<HTMLDivElement>(null);
  const tripsPerPage = 8;

  const handleCheckboxChange = <T,>(setState: (v: T[]) => void, values: T[], value: T) => {
    if (values.includes(value)) {
      setState(values.filter((v) => v !== value));
    } else {
      setState([...values, value]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const priceRanges = ["0-1000", "1000-2000", "2000-3000", "3000-4000"];

  const filteredTrips = exploreTrips
    .filter((trip) => {
      const priceNum = parsePrice(trip.price);
      const matchesPrice =
        selectedPriceRanges.length === 0 ||
        selectedPriceRanges.some((range) => {
          const [min, max] = range.split("-").map(Number);
          return priceNum >= min && priceNum <= max;
        });
      const matchesSearch =
        trip.title.toLowerCase().includes(search.toLowerCase()) ||
        trip.description.toLowerCase().includes(search.toLowerCase());
      const matchesSeason =
        selectedSeasons.length === 0 || selectedSeasons.includes(trip.season);
      const matchesAvailability =
        selectedAvailability.length === 0 || selectedAvailability.includes(trip.availability);
      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(trip.rating);
      const matchesDestination =
        selectedDestinations.length === 0 || selectedDestinations.includes(trip.destination);

      return (
        matchesSearch &&
        matchesSeason &&
        matchesAvailability &&
        matchesRating &&
        matchesDestination &&
        matchesPrice
      );
    })
    .sort((a, b) => {
      const priceA = parsePrice(a.price);
      const priceB = parsePrice(b.price);
      return sortOrder === "low-high" ? priceA - priceB : priceB - priceA;
    });

  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
  const indexOfLast = currentPage * tripsPerPage;
  const indexOfFirst = indexOfLast - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirst, indexOfLast);

  const uniqueDestinations = Array.from(new Set(exploreTrips.map((t) => t.destination)));

  return (
    <div className="p-4 md:p-6 mt-10 relative">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 relative">
        <h2 className="text-2xl font-bold text-blue-500"></h2>

        <div className="flex items-center gap-2 relative">
          <input
            type="text"
            placeholder="Search trips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-blue-500 rounded-3xl px-3 py-1 w-36 md:w-40 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50 text-black"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
          >
            <Filter className="w-5 h-5 text-black" />
          </button>

        
          {showFilters && (
            <div
              ref={filterRef}
              className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-5 w-80 z-50 max-h-[70vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-black text-lg">Filters</h4>
                <button
                  onClick={() => {
                    setSelectedSeasons([]);
                    setSelectedAvailability([]);
                    setSelectedRatings([]);
                    setSelectedDestinations([]);
                    setSelectedPriceRanges([]);
                  }}
                  className="text-sm text-red-500 hover:underline"
                >
                  Clear All
                </button>
              </div>

              {/* Season */}
              <div className="mb-4">
                <h5 className="font-semibold text-black mb-2">Best Time to Visit</h5>
                <div className="flex flex-col gap-2">
                  {["Best Time to Visit", "Okay to Visit", "Too Crowded"].map((s) => (
                    <label
                      key={s}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-lg text-black"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSeasons.includes(s)}
                        onChange={() =>
                          handleCheckboxChange(setSelectedSeasons, selectedSeasons, s)
                        }
                        className="accent-blue-500 w-4 h-4"
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <h5 className="font-semibold text-black mb-2">Availability</h5>
                <div className="flex flex-col gap-2">
                  {["Available", "Limited", "Fully Booked"].map((a) => (
                    <label
                      key={a}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-lg text-black"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAvailability.includes(a)}
                        onChange={() =>
                          handleCheckboxChange(setSelectedAvailability, selectedAvailability, a)
                        }
                        className="accent-blue-500 w-4 h-4"
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </div>

              {/* Ratings */}
              <div className="mb-4">
                <h5 className="font-semibold text-black mb-2">Rating</h5>
                <div className="flex flex-col gap-2">
                  {[5, 4, 3, 2, 1].map((r) => (
                    <label
                      key={r}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-lg text-black"
                    >
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(r)}
                        onChange={() =>
                          handleCheckboxChange(setSelectedRatings, selectedRatings, r)
                        }
                        className="accent-blue-500 w-4 h-4"
                      />
                      {r} ⭐ & up
                    </label>
                  ))}
                </div>
              </div>

              {/* Destination */}
              <div className="mb-4">
                <h5 className="font-semibold text-black mb-2">Destination</h5>
                <select
                  multiple
                  value={selectedDestinations}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setSelectedDestinations(selected);
                  }}
                  className="w-full border-2 border-blue-500 rounded-lg p-2 text-black text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                  size={Math.min(uniqueDestinations.length, 5)}
                >
                  {uniqueDestinations.map((destination) => (
                    <option key={destination} value={destination} className="text-black">
                      {destination}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <h5 className="font-semibold text-black mb-2">Price Range</h5>
                <div className="flex flex-col gap-2">
                  {priceRanges.map((range) => (
                    <label
                      key={range}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-lg text-black"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPriceRanges.includes(range)}
                        onChange={() =>
                          handleCheckboxChange(setSelectedPriceRanges, selectedPriceRanges, range)
                        }
                        className="accent-blue-500 w-4 h-4"
                      />
                      ₹{range.replace("-", " - ₹")}
                    </label>
                  ))}
                </div>

                {/* Sort */}
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "low-high" | "high-low")}
                  className="border border-blue-500 rounded-lg px-2 py-1 text-sm text-black focus:outline-none focus:ring-1 focus:ring-blue-300 w-full mt-2"
                >
                  <option value="low-high" className="text-black">
                    Low to High
                  </option>
                  <option value="high-low" className="text-black">
                    High to Low
                  </option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trips Grid */}
      {currentTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-1">
          {currentTrips.map((trip, idx) => (
            <TripCard key={idx} trip={trip} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center mt-10">
          No trips found. Try adjusting filters or search.
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
