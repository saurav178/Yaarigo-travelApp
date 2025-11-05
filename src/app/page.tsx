"use client";

import LandingPage from "./landing-page/LandingPage";
import HeroSection from "./HeroSection";

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-visible">
      <LandingPage />
       <HeroSection />
    </div>
  );
}
