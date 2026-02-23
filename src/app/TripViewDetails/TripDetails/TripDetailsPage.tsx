"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import TripOverview from "./TripOverview";
import TripActions from "./TripActions";
import TripLeader from "./TripLeader";
import DetailedItinerary from "../triphighlight/DetailedItinerary";
import TripHighlights from "../triphighlight/TripHighlights";

// ===== Interfaces =====
interface ItineraryItem {
  location?: string;
  activities?: string[];
}

interface TripData {
  tripId: number;
  title: string;
  description: string;
  itinerary?: ItineraryItem[];
  from?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
  maxTravelers?: number;
  joinedTravelers?: number;
  groupSize?: string;
  tripStyle?: string;
  travelStyle?: string;
  duration?: string;
  languages?: string[];
  splitCost?: boolean;
  lookingFor?: string;
  foodPreference?: string;
  leaderId?: number;
}

interface LeaderData {
  leaderId: number;
  fullName: string;
  rating: number;
  reviews?: number;
  description?: string;
  photo?: string;
}

export default function TripDetailsPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("id"); // /TripViewDetails?id=101

  const [tripData, setTripData] = useState<TripData | null>(null);
  const [leaderData, setLeaderData] = useState<LeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.dev.yaarigo.com/tpm-service/api/public";

  useEffect(() => {
    if (!tripId) {
      setError("Trip ID not provided.");
      setLoading(false);
      return;
    }

    const fetchTripData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch Trip
        const tripRes = await fetch(`${BASE_URL}/trips/${tripId}`);
        if (!tripRes.ok) throw new Error("Failed to fetch trip data");
        const tripJson: TripData = await tripRes.json();
        setTripData(tripJson);

        // Fetch Leader if leaderId exists
        if (tripJson?.leaderId) {
          const leaderRes = await fetch(`${BASE_URL}/leaders/${tripJson.leaderId}`);
          if (leaderRes.ok) {
            const leaderJson: LeaderData = await leaderRes.json();
            setLeaderData(leaderJson);
          }
        }
      } catch (err: any) {
        console.error("Error fetching trip or leader data:", err);
        setError(err.message || "Failed to load trip details");
        setTripData(null);
        setLeaderData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripId, BASE_URL]);

  if (loading) {
    return <div className="p-10 text-center text-lg font-medium">Loading trip details...</div>;
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Trip not found."}
      </div>
    );
  }

  if (!tripData) return null; // Safeguard

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-6">
          <TripOverview trip={tripData} />
          {/* Conditionally render TripHighlights only if tripId exists */}
          {tripData.tripId ? <TripHighlights tripId={tripData.tripId.toString()} /> : null}
          <DetailedItinerary itinerary={tripData.itinerary || []} />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 -mt-1">
          <TripActions trip={tripData} />
          {leaderData ? <TripLeader leader={leaderData} /> : null}
        </div>
      </div>
    </div>
  );
}