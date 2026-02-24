"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import TripOverview from "./TripOverview";
import TripActions from "./TripActions";
import TripLeader from "./TripLeader";
import DetailedItinerary from "../triphighlight/DetailedItinerary";
import TripHighlights from "../triphighlight/TripHighlights";
import CancellationPolicy from "../triphighlight/CancellationPolicy";
import SafetyInformation from "../triphighlight/SafetyInformation";

import {
  fetchTripById,
  fetchLeaderById,
  TripData,
  LeaderData,
} from "../api";

export default function TripDetailsPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("id"); // /TripViewDetails?id=123

  const [tripData, setTripData] = useState<TripData | null>(null);
  const [leaderData, setLeaderData] = useState<LeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) {
      setError("Trip ID not provided.");
      setLoading(false);
      return;
    }

    const loadTripDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // ✅ Fetch trip using API helper
        const trip = await fetchTripById(tripId);
        setTripData(trip);

        // ✅ Fetch leader if createdBy exists
        if (trip?.createdBy) {
          try {
            const leader = await fetchLeaderById(trip.createdBy);
            setLeaderData(leader);
          } catch {
            // Leader not found → ignore
            setLeaderData(null);
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

    loadTripDetails();
  }, [tripId]);

  if (loading)
    return (
      <div className="p-10 text-center text-lg font-medium">
        Loading trip details...
      </div>
    );

  if (error)
    return (
      <div className="p-10 text-center text-red-500">
        {error}
      </div>
    );

  if (!tripData) return null; // Safeguard

  // Normalize itinerary locations
  const itineraryForDisplay =
    tripData.itinerary?.map((day) => ({
      ...day,
      location:
        typeof day.location === "string"
          ? day.location
          : day.location?.name || "Unknown location",
    })) || [];

  // Safety props from backend
  const safetyProps = {
    safetyRating: tripData.partnerPreferences?.safetyRating,
    safetyInfo: tripData.partnerPreferences?.safetyInfo,
    verifiedTravelers: tripData.partnerPreferences?.verifiedTravelers,
  };

  // Cancellation policy - use undefined instead of null for type safety
  const cancellationPolicy =
    tripData.commitments?.cancellationPolicy || undefined;

  return (
    <div className="bg-gray-50 min-h-screen p-10">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <TripOverview trip={tripData} />
          <SafetyInformation trip={safetyProps} />
          <CancellationPolicy
            trip={{ cancellationPolicy }}
          />
          <DetailedItinerary itinerary={itineraryForDisplay} />
          {tripData._id && <TripHighlights tripId={tripData._id} />}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex flex-col gap-6 -mt-1">
          <TripActions trip={tripData} />
          {leaderData && <TripLeader leader={leaderData} />}
        </div>
      </div>
    </div>
  );
}