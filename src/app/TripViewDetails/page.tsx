"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import TripDetailsPage from "./TripDetails/TripDetailsPage";
import HeroSection from "./HeroSection";
import TripDetails from "./triphighlight/TripDetails";
import Loader from "@/components/Loader/Loader";

export default function Page() {
  const params = useParams();
  const rawTripId = params.tripId; // can be string | string[]

  // Ensure tripId is always string
  const [tripId, setTripId] = useState<string | null>(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (rawTripId) {
      const id = Array.isArray(rawTripId) ? rawTripId[0] : rawTripId;
      setTripId(id);
    }
  }, [rawTripId]);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!tripId) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        Invalid Trip ID
      </div>
    );
  }

  if (showLoader) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-visible mt-14">
      <HeroSection />
      {/* Pass tripId as string to TripDetailsPage */}
      <TripDetailsPage tripId={tripId} />
      <TripDetails />
    </div>
  );
}