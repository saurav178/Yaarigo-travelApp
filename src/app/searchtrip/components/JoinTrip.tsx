"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext"; 

interface JoinTripProps {
  tripId: string;
}

export default function JoinTrip({ tripId }: JoinTripProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleJoin = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      router.push("/login");
    } else {
      // Authenticated logic
      console.log("Joining trip:", tripId);
    }
  };

  return (
    <button
      onClick={handleJoin}
      // Exact CSS from your request
      className="py-2 text-white text-xs font-semibold cursor-pointer"
      style={{ backgroundColor: "#276074" }}
    >
      Join trip
    </button>
  );
}