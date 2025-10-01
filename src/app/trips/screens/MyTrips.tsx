"use client";

import { useState, useMemo } from "react";
import TripsList from "./TripsList";
import { myTrips } from "../data/TripsData";
import NewTripForm from "./NewTripForm"; // We'll create this next

export default function MyTrips() {
  const [activeStatus, setActiveStatus] = useState("Upcoming");
  const [activeFilter, setActiveFilter] = useState("All Destinations");
  const [showForm, setShowForm] = useState(false); // toggle form

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
    <div className="mx-auto p-6">
      {/* Heading + New Trip Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">My Trips</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-300 transition"
        >
          New Trip
        </button>
      </div>

      {/* Tabs for Status */}
      <div className="flex space-x-6 border-b pb-2 mb-6 text-sm font-medium">
        {["Upcoming", "In Progress", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveStatus(tab)}
            className={`pb-2 ${
              activeStatus === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            {tab}
          </button>
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
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {filter}
          </span>
        ))}
      </div>

      {/* Trips List */}
      <TripsList trips={filteredTrips} />

      {/* New Trip Form Modal */}
      {showForm && <NewTripForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
