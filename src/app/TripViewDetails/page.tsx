"use client";

import TripDetailsPage from "./TripDetails/TripDetailsPage";
import HeroSection from "./HeroSection";
import TripDetails from "./triphighlight/TripDetails";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";

export default function Page() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show loader if either loading data or 2-second timer is active
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
      <TripDetailsPage />
      <TripDetails />
    </div>
  );
}
