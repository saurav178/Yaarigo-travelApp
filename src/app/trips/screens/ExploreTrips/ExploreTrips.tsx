"use client";
import { useState } from "react";
import { Filter } from "lucide-react";
import { exploreTrips } from "../../data/TripsData";
import TripCard from "./TripCard";
import Pagination from "./Pagination"; // new pagination component

export default function ExploreTrips() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const tripsPerPage = 8; // trips per page

  // Handle checkbox change
  const handleCheckboxChange = (setState, values, value) => {
    if (values.includes(value)) {
      setState(values.filter((v) => v !== value));
    } else {
      setState([...values, value]);
    }
  };

  // Filter trips
  const filteredTrips = exploreTrips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(search.toLowerCase()) ||
      trip.description.toLowerCase().includes(search.toLowerCase());

    const matchesSeason =
      selectedSeasons.length === 0 || selectedSeasons.includes(trip.season);

    const matchesAvailability =
      selectedAvailability.length === 0 ||
      selectedAvailability.includes(trip.availability);

    const matchesRating =
      selectedRatings.length === 0 || selectedRatings.includes(trip.rating);

    return matchesSearch && matchesSeason && matchesAvailability && matchesRating;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTrips.length / tripsPerPage);
  const indexOfLast = currentPage * tripsPerPage;
  const indexOfFirst = indexOfLast - tripsPerPage;
  const currentTrips = filteredTrips.slice(indexOfFirst, indexOfLast);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-500">Explore Trips</h2>

      {/* Search + Filter */}
      <div className="flex items-center justify-end mb-6 relative gap-4">
        <input
          type="text"
          placeholder="Search trips..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-blue-500 rounded-3xl px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-blue-50"
        />

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          <Filter className="w-5 h-5" />
        </button>

        {/* Dropdown Filters */}
        {showFilters && (
          <div className="absolute top-12 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl p-5 w-80 z-50">
            {/* Header + Clear */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-blue-600 text-lg">Filters</h4>
              <button
                onClick={() => {
                  setSelectedSeasons([]);
                  setSelectedAvailability([]);
                  setSelectedRatings([]);
                }}
                className="text-sm text-red-500 hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-64 overflow-y-auto pr-2">
              {/* Season */}
             {/* Season */}
<div className="mb-4">
  <h5 className="font-semibold text-gray-700 mb-2">Best Time to Visit</h5>
  <div className="flex flex-col gap-2">
    {[
      { label: "Best Time to Visit" },
      { label: "Okay to Visit" },
      { label: "Too Crowded" },
    ].map((s) => (
      <label
        key={s.label}
        className={`flex items-center gap-2 text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-lg ${s.color}`}
      >
        <input
          type="checkbox"
          checked={selectedSeasons.includes(s.label)}
          onChange={() =>
            handleCheckboxChange(setSelectedSeasons, selectedSeasons, s.label)
          }
          className="accent-blue-500 w-4 h-4"
        />
        {s.label}
      </label>
    ))}
  </div>
</div>

              {/* Availability */}
              <div className="mb-4">
                <h5 className="font-semibold text-gray-700 mb-2">Availability</h5>
                <div className="flex flex-col gap-2">
                  {["Available", "Limited", "Fully Booked"].map((a) => (
                    <label
                      key={a}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        checked={selectedAvailability.includes(a)}
                        onChange={() =>
                          handleCheckboxChange(
                            setSelectedAvailability,
                            selectedAvailability,
                            a
                          )
                        }
                        className="accent-blue-500 w-4 h-4"
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h5 className="font-semibold text-gray-700 mb-2">Rating</h5>
                <div className="flex flex-col gap-2">
                  {[5, 4, 3, 2, 1].map((r) => (
                    <label
                      key={r}
                      className="flex items-center gap-2 text-sm cursor-pointer hover:bg-blue-50 px-2 py-1 rounded-lg"
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
            </div>
          </div>
        )}
      </div>

      {/* Trips Grid */}
      {currentTrips.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
