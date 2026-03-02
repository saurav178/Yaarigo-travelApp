"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import TripDetailsPage from "./TripDetails/TripDetailsPage";
import HeroSection from "./HeroSection";
import TripDetails from "./triphighlight/TripDetails";
import Loader from "@/components/Loader/Loader";

import { fetchTripById, TripData } from "./api";

export default function Page() {
  const params = useParams();

  // ✅ Directly compute string tripId
  const tripId =
    typeof params.tripId === "string"
      ? params.tripId
      : Array.isArray(params.tripId)
      ? params.tripId[0]
      : null;

  const [trip, setTrip] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!tripId) return;

    const loadTrip = async () => {
      try {
        setLoading(true);
        const data = await fetchTripById(tripId);
        setTrip(data);
      } catch (err) {
        console.error("Error fetching trip:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadTrip();
  }, [tripId]);

  if (!tripId) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Invalid Trip ID
      </div>
    );
  }

  if (loading || !trip) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Failed to load trip details.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-visible mt-14">
      <HeroSection trip={trip} />

      {/* Now tripId is guaranteed string */}
  <TripDetailsPage />

      <TripDetails trip={trip} tripId={tripId} />
    </div>
  );
}