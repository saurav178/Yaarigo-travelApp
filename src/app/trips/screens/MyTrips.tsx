"use client";

import { useState, useMemo } from "react";
import TripsList from "./TripsList";
import { myTrips } from "../data/TripsData";
import NewTripForm from "./NewTripForm";

export default function MyTrips() {
  const [activeStatus, setActiveStatus] = useState("Upcoming");
  const [activeFilter, setActiveFilter] = useState("All Destinations");
  const [showForm, setShowForm] = useState(false);

  const filteredTrips = useMemo(() => {
    return myTrips.filter((trip) => {
      const statusMatch = trip.status === activeStatus;
      const regionMatch =
        activeFilter === "All Destinations"
          ? true
          : trip.region === activeFilter;
      return statusMatch && regionMatch;
    });
  }, [activeStatus, activeFilter]);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Heading + New Trip Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800"></h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
        >
          + New Trip
        </button>
      </div>

      {/* Tabs for Status */}
     <div className="flex space-x-6 border-b pb-2 mb-6 text-sm font-medium">
  {["Upcoming", "In Progress", "Completed"].map((tab) => (
    <span
      key={tab}
      onClick={() => setActiveStatus(tab)}
      className={`cursor-pointer pb-2 ${
        activeStatus === tab
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-600 hover:text-blue-600"
      }`}
    >
      {tab}
    </span>
  ))}
</div>


      {/* Filters for Destination */}
      <div className="flex gap-3 mb-6 text-sm">
        {["All Destinations", "Europe", "Asia"].map((filter) => (
          <span
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-1 rounded-full font-medium cursor-pointer ${
              activeFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {filter}
          </span>
        ))}
      </div>

      {/* Trips List */}
      <TripsList trips={filteredTrips} />

      {/* New Trip Form Modal */}
    {showForm && (
  <div
    className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    onClick={() => setShowForm(false)} // backdrop click to close
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg w-[500px] relative"
      onClick={(e) => e.stopPropagation()} // stop click from closing inside modal
    >
      <NewTripForm onClose={() => setShowForm(false)} />
    </div>
  </div>
)}

    </div>
  );
}
