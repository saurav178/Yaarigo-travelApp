"use client";

import { useState } from "react";
import JoinTripModal from "./JoinTripModal";

interface JoinTripProps {
  tripId: string;
}

export default function JoinTrip({ tripId }: JoinTripProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tripData, setTripData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  // This represents the person currently trying to join
  // In a real app, this comes from your session/auth context
  const currentUser = {
    _id: "user_123_joining",
    name: "Current User"
  };

  const handleJoinClick = async () => {
    setIsLoading(true);
    try {
      // Fetching the specific trip details from your TPM service
      const BASE_API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${BASE_API}/trips/${tripId}`);
      const data = await response.json();

      if (data) {
        // We set the data which includes trip details + creator/owner info
        setTripData(data);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error("Error fetching trip/owner details:", error);
      alert("Could not load trip details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleJoinClick}
        disabled={isLoading}
        className="py-2 px-4 text-white text-xs font-semibold cursor-pointer rounded disabled:opacity-50 transition-all"
        style={{ backgroundColor: "#276074" }}
      >
        {isLoading ? "Fetching Details..." : "Join trip"}
      </button>

      {isModalOpen && tripData && (
        <JoinTripModal 
          trip={tripData} 
          user={currentUser} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
}