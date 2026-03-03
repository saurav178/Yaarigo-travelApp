"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

import HeroSection from "../HeroSection";
import TripOverview from "../TripDetails/TripOverview";
import TripActions from "../TripDetails/TripActions";
import TripLeader from "../TripDetails/TripLeader";
import DetailedItinerary from "../triphighlight/DetailedItinerary";
import TripRoadmap from "../triphighlight/TripRoadmap";
import JoinedTravelers from "../triphighlight/JoinedTravelers";
import SafetyInformation from "../triphighlight/SafetyInformation";
import ShareThisTrip from "../triphighlight/ShareThisTrip";
import CancellationPolicy from "../triphighlight/CancellationPolicy";

import {
  fetchTripById,
  fetchLeaderById,
  TripData,
  LeaderData,
} from "../api";

export default function TripDetailsPage() {
  const params = useParams();

  // 1. Optimized tripId extraction (Build-Safe)
  // Check both 'tripId' and 'tripid' in case of folder naming mismatches
  const tripId = useMemo(() => {
    const rawId = params?.tripId || params?.tripid;
    if (Array.isArray(rawId)) return rawId[0];
    return rawId as string | undefined;
  }, [params]);

  const [tripData, setTripData] = useState<TripData | null>(null);
  const [leaderData, setLeaderData] = useState<LeaderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripId) return;

    const loadTripDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const trip = await fetchTripById(tripId);
        if (!trip) {
          setError("Trip not found.");
          return;
        }
        setTripData(trip);

        // Fetch Leader using optional chaining and fallback
        const creatorId = trip.createdBy || trip.leaderId;
        if (creatorId) {
          try {
            const leader = await fetchLeaderById(creatorId);
            setLeaderData(leader);
          } catch {
            setLeaderData(null);
          }
        }
      } catch (err) {
        console.error("Failed to fetch trip details", err);
        setError("Unable to load trip details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTripDetails();
  }, [tripId]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-medium">
        Loading trip details...
      </div>
    );
  }

  if (error || !tripData) {
    return (
      <div className="p-10 text-center text-red-500">
        {error || "Trip not found."}
      </div>
    );
  }

  // 2. Safe Itinerary Normalization (Prevents build crash on missing location names)
  const itineraryForDisplay =
    tripData.itinerary?.map((day) => ({
      ...day,
      location:
        typeof day.location === "string"
          ? day.location
          : (day.location as any)?.name || "Unknown location",
    })) || [];

  // 3. Strict Safety Props (Ensures non-null values for the component)
  const safetyProps = {
    safetyRating: tripData.partnerPreferences?.safetyRating ?? 0,
    safetyInfo: tripData.partnerPreferences?.safetyInfo ?? "Information not available",
    verifiedTravelers: !!tripData.partnerPreferences?.verifiedTravelers,
  };

  const cancellationPolicy = tripData.commitments?.cancellationPolicy;

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection trip={tripData} />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TripOverview trip={tripData} />

          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <DetailedItinerary itinerary={itineraryForDisplay} />
            </div>
            <div className="md:w-1/2">
              <TripRoadmap itinerary={itineraryForDisplay} />
            </div>
          </div>

          <SafetyInformation trip={safetyProps} />

          <CancellationPolicy
            trip={{
              cancellationPolicy: cancellationPolicy,
            }}
          />
        </div>

        <div className="flex flex-col gap-6">
          <TripActions trip={tripData} />

          {leaderData && <TripLeader leader={leaderData} />}

          <div className="space-y-6">
            {/* tripId is verified as string here for the build */}
            {tripId && <JoinedTravelers tripId={tripId} />}
            <ShareThisTrip trip={tripData} />
          </div>
        </div>
      </div>
    </div>
  );
}