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
      // Notification message as discussed in the meeting
      alert("Currently you are not logged in, first login");
      
      // Redirect to login after the user acknowledges the notification
      router.push("/login");
    } else {
      // Authenticated logic - This is where the Kafka/Socket flow starts
      console.log("Joining trip:", tripId);
      alert(`Successfully requested for joining this Trip ${tripId}`);
    }
  };

  return (
    <button
      onClick={handleJoin}
      // Exact CSS preserved from your request
      className="py-2 text-white text-xs font-semibold cursor-pointer"
      style={{ backgroundColor: "#276074" }}
    >
      Join trip
    </button>
  );
}