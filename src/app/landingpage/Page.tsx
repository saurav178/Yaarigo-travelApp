"use client";

import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import KeyFeaturesSection from "./components/KeyFeaturesSection";
import WhyChooseSection from "./components/WhyChooseSection";
import HowItWorksSection from "./components/HowItWorksSection";
import SafetyTrustSection from "./components/SafetyTrustSection";
import CommunitySection from "./components/CommunitySection";
import Loader from "@/components/Loader/Loader";
import AuthModal from "@/components/Modal/AuthModal"; 

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
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
    <>
      <main className="flex flex-col">
        {/* ================= Hero Section ================= */}
        <HeroSection />

        {/* ================= Key Features Section ================= */}
        <KeyFeaturesSection isVisible={isVisible} setIsVisible={setIsVisible} />

        {/* ================= Why Choose Travio Section ================= */}
        <WhyChooseSection isVisible={isVisible} setIsVisible={setIsVisible} />

        {/* ================= How it Works Section ================= */}
        <HowItWorksSection isVisible={isVisible} setIsVisible={setIsVisible} />

        {/* ================= Safety & Trust Section ================= */}
        <SafetyTrustSection />

        {/* ================= Join Our Global Community Section ================= */}
        <CommunitySection isVisible={isVisible} setIsVisible={setIsVisible} />
      </main>

      {/* ================= Auth Modal ================= */}
      <AuthModal />
    </>
  );
}