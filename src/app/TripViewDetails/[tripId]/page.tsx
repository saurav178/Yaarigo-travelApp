"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function TripDetailsPage() {
  const params = useParams();

  const tripId =
    typeof params?.tripId === "string"
      ? params.tripId
      : Array.isArray(params?.tripId)
      ? params.tripId[0]
      : undefined;

  const [tripData, setTripData] = useState<any>(null);
  const [leaderData, setLeaderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.dev.yaarigo.com/tpm-service/api/public";

  useEffect(() => {
    if (!tripId) return;

    const fetchTripData = async () => {
      try {
        setLoading(true);

        const tripRes = await fetch(`${BASE_URL}/trips/${tripId}`);
        if (!tripRes.ok) throw new Error("Trip not found");

        const tripJson = await tripRes.json();
        const trip = tripJson?.data || tripJson;

        setTripData(trip);

        if (trip?.leaderId) {
          const leaderRes = await fetch(`${BASE_URL}/leaders/${trip.leaderId}`);
          if (leaderRes.ok) {
            const leaderJson = await leaderRes.json();
            setLeaderData(leaderJson?.data || leaderJson);
          }
        }
      } catch (error) {
        console.error("API failed. Using fallback.", error);
        // Fallback data
        setTripData({
          title: "Goa Beach Adventure",
          description: "Relax and explore Goa.",
          from: "Mumbai",
          itinerary: [],
        });
        setLeaderData({
          name: "Courtney Henry",
          rating: 4.8,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTripData();
  }, [tripId]);

  if (loading) {
    return (
      <div className="p-10 text-center text-lg font-medium">
        Loading trip details...
      </div>
    );
  }

  if (!tripData) {
    return (
      <div className="p-10 text-center text-red-500">
        Trip not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <HeroSection trip={tripData} />

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          <TripOverview trip={tripData} />

          {/* Itinerary & Roadmap Side by Side */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <DetailedItinerary itinerary={tripData?.itinerary || []} />
            </div>
            <div className="md:w-1/2">
              <TripRoadmap itinerary={tripData?.itinerary || []} />
            </div>
          </div>

          {/* Safety and Cancellation */}
          <SafetyInformation trip={tripData} />
          <CancellationPolicy trip={tripData} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex flex-col gap-6">
          <TripActions trip={tripData} />
          {leaderData && <TripLeader leader={leaderData} />}

          <div className="space-y-6">
            <JoinedTravelers tripId={tripId!} />
            <ShareThisTrip trip={tripData} />
          </div>
        </div>
      </div>
    </div>
  );
}