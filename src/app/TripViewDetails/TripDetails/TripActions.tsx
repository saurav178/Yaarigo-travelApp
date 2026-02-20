"use client";

interface Trip {
  startDate?: string;
  endDate?: string;
  totalSeats?: number;       // maximum travelers
  bookedSeats?: number;      // already joined travelers
  partnerPreferences?: {
    budget?: {
      min?: number;
      max?: number;
    };
  };
}

interface TripActionsProps {
  trip?: Trip;
}

export default function TripActions({ trip }: TripActionsProps) {
  if (!trip) {
    // If trip data hasn't loaded yet
    return (
      <div className="p-6 bg-white w-full shadow-lg mt-2 text-center text-gray-500">
        Loading trip details...
      </div>
    );
  }

  const handleJoinTrip = async () => {
    try {
      alert("Joined trip successfully! (dummy response)");
    } catch {
      alert("Error joining trip.");
    }
  };

  const handleChat = async () => {
    try {
      alert("Chat started with organizer! (dummy response)");
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

  // Budget display with defaults
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
          <span>{trip.startDate ?? "-"}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-gray-500">End Date:</span>
          <span>{trip.endDate ?? "-"}</span>
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