"use client";

import LandingPage from "./landing-page/LandingPage";
import TripDetailsPage from "./TripDetails/TripDetailsPage";
import HeroSection from "./HeroSection";
import TripDetails from "./triphighlight/TripDetails";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-visible">
      <LandingPage />
       <HeroSection />
      <TripDetailsPage/>
      <TripDetails/>
    </div>
  );
}
