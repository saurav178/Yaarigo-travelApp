"use client";

import { useState } from "react";
import HeroSection from "./HeroSection";
import KeyFeaturesSection from "./KeyFeaturesSection";
import WhyChooseSection from "./WhyChooseSection";
import HowItWorksSection from "./HowItWorksSection";
import SafetyTrustSection from "./SafetyTrustSection";
import CommunitySection from "./CommunitySection"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <main className="flex flex-col">
      {/* ================= Hero Section ================= */}
      <HeroSection />

      {/* ================= Key Features Section ================= */}
      <KeyFeaturesSection 
        isVisible={isVisible} 
        setIsVisible={setIsVisible} 
      />

      {/* ================= Why Choose Travio Section ================= */}
      <WhyChooseSection 
        isVisible={isVisible} 
        setIsVisible={setIsVisible} 
      />

      {/* ================= How it Works Section ================= */}
      <HowItWorksSection 
        isVisible={isVisible} 
        setIsVisible={setIsVisible} 
      />

      {/* ================= Safety & Trust Section ================= */}
      <SafetyTrustSection />

      {/* ================= Join Our Global Community Section ================= */}
      <CommunitySection 
        isVisible={isVisible} 
        setIsVisible={setIsVisible} 
      />
    </main>
  );
}