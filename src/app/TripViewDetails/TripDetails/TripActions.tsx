"use client";

interface Trip {
  budget: number | string;
  startDate: string;
  endDate: string;
  duration: string;
  maxTravelers: number;
  joinedTravelers: number;
}

interface TripActionsProps {
  trip: Trip;
}

export default function TripActions({ trip }: TripActionsProps) {
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

  return (
    <div className="p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300 mt-2">
      {/* 💡 Added flex + justify-between here */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">₹{trip.budget}</h3>
        <p className="text-sm text-gray-500">per person</p>
      </div>

      <div className="text-sm space-y-2 mb-4">
        <p className="flex justify-between">
          <span className="text-gray-500">Start Date:</span>
          <span>{trip.startDate}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-gray-500">End Date:</span>
          <span>{trip.endDate}</span>
        </p>

        <p className="flex justify-between">
          <span className="text-gray-500">Duration:</span>
          <span>{trip.duration}</span>
        </p>

        <p className="flex justify-between text-green-600 font-medium">
          <span>Remaining Spots:</span>
          <span>{trip.maxTravelers - trip.joinedTravelers}</span>
        </p>
      </div>

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