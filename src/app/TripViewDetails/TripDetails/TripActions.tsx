"use client";

import { TripData } from "../api";

interface TripActionsProps {
  trip?: TripData;
}

export default function TripActions({ trip }: TripActionsProps) {
  if (!trip) {
    // While API data is loading
    return (
      <div className="p-6 bg-white w-full shadow-lg mt-2 text-center text-gray-500">
        Loading trip details...
      </div>
    );
  }

  const handleJoinTrip = async () => {
    try {
      // TODO: Replace with actual API call to join trip
      alert("Join trip action triggered");
    } catch {
      alert("Failed to join trip.");
    }
  };

  const handleChat = async () => {
    try {
      // TODO: Replace with actual chat initiation
      alert("Chat with organizer triggered");
    } catch {
      alert("Failed to start chat.");
    }
  };

  // Remaining spots calculation
  const remainingSpots = (trip.totalSeats ?? 0) - (trip.bookedSeats ?? 0);

  // Duration calculation in days
  const start = trip.startDate ? new Date(trip.startDate) : null;
  const end = trip.endDate ? new Date(trip.endDate) : null;
  const durationDays =
    start && end
      ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  // Budget display
  const minBudget = trip.partnerPreferences?.budget?.min ?? 0;
  const maxBudget = trip.partnerPreferences?.budget?.max ?? 0;

  return (
    <div className="p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300 mt-2">
      {/* Budget */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">
          ₹{minBudget} - ₹{maxBudget}
        </h3>
        <p className="text-sm text-gray-500">per person</p>
      </div>

      {/* Trip details */}
      <div className="text-sm space-y-2 mb-4">
        <p className="flex justify-between">
          <span className="text-gray-500">Start Date:</span>
          <span>{trip.startDate ? new Date(trip.startDate).toLocaleDateString() : "-"}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-gray-500">End Date:</span>
          <span>{trip.endDate ? new Date(trip.endDate).toLocaleDateString() : "-"}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-gray-500">Duration:</span>
          <span>{durationDays} days</span>
        </p>

        <p className="flex justify-between text-green-600 font-medium">
          <span>Remaining Spots:</span>
          <span>{remainingSpots}</span>
        </p>
      </div>

      {/* Action buttons */}
      <button
        onClick={handleJoinTrip}
        className="w-full bg-[#1D4350] text-white font-medium py-2 mb-4 cursor-pointer hover:bg-[#16333b] transition-colors duration-300"
      >
        Join this trip
      </button>

      <button
        onClick={handleChat}
        className="w-full bg-[#1D4350] text-white font-medium py-2 mb-4 cursor-pointer hover:bg-[#16333b] transition-colors duration-300"
      >
        Chat with Organizer
      </button>
    </div>
  );
}