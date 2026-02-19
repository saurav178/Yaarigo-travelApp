"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  XCircle,
} from "lucide-react";
import Loader from "@/components/Loader/Loader";
import axios from "axios";
import { API_ENDPOINTS, APP_ROUTES } from "@/utils/constants";
import { Package, Plan, Traveller, StaticAddOn } from "./types";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import TravellersSection from "./components/TravellersSection";
import ItinerarySection from "./components/ItinerarySection";
import InclusionsSection from "./components/InclusionsSection";
import CancellationPolicySection from "./components/CancellationPolicySection";
import BookingCard from "./components/BookingCard";


function ViewPackageContent() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");

  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedDays, setExpandedDays] = useState<number[]>([0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [isTravellerModalOpen, setIsTravellerModalOpen] = useState(false);
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [currentTraveller, setCurrentTraveller] = useState<Traveller>({
    id: "",
    name: "",
    email: "",
    contact: "",
    gender: "",
    age: "",
  });

  useEffect(() => {
    const fetchPackage = async () => {
      if (!packageId) {
        setError("Package ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${API_ENDPOINTS.PACKAGES}/${packageId}`,
        );
        setPkg(response.data);
        if (response.data.plans && response.data.plans.length > 0) {
          setSelectedPlan(response.data.plans[0]);
        }
        setError(null);
      } catch (error: unknown) {
        console.error("Error fetching package:", error);
        const err = error as { response?: { data?: { message?: string } } };
        setError(
          err.response?.data?.message || "Failed to load package details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [packageId]);

  const toggleDay = (index: number) => {
    setExpandedDays((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleAddTraveller = () => {
    if (currentTraveller.name && currentTraveller.email) {
      setTravellers([...travellers, { ...currentTraveller, id: Date.now().toString() }]);
      setIsTravellerModalOpen(false);
      setCurrentTraveller({ id: "", name: "", email: "", contact: "", gender: "", age: "" });
    }
  };

  // Show loader
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  // Show error
  if (error || !pkg) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error || "Package not found"}</p>
          <Link
            href={APP_ROUTES.SEARCH_TRIP}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#276074] text-white rounded-lg hover:opacity-90"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </Link>
        </div>
      </div>
    );
  }

  // ---------------- ADD ONS DATA ----------------
  const ADD_ONS: StaticAddOn[] = [
    {
      id: "porter",
      title: "Private Porter",
      desc: "Personal assistant for carrying luggage",
      price: 150,
      tag: "Recommended",
    },
    {
      id: "gear",
      title: "Extreme Gear Kit",
      desc: "Boots, jacket & thermal liner",
      price: 85,
      tag: "Per Person",
    },
    {
      id: "insurance",
      title: "Premium Insurance",
      desc: "High-altitude evacuation & cover",
      price: 115,
      tag: "Essential",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      {/* Hero Section */}
      <HeroSection pkg={pkg} selectedPlan={selectedPlan} />

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <AboutSection pkg={pkg} selectedPlan={selectedPlan} />
            
            {/* Add Travellers Section */}
            <TravellersSection
              isTravellerModalOpen={isTravellerModalOpen}
              setIsTravellerModalOpen={setIsTravellerModalOpen}
              travellers={travellers}
              setTravellers={setTravellers}
              currentTraveller={currentTraveller}
              setCurrentTraveller={setCurrentTraveller}
              handleAddTraveller={handleAddTraveller}
            />

            {/* Itinerary */}
            <ItinerarySection
              pkg={pkg}
              expandedDays={expandedDays}
              toggleDay={toggleDay}
            />

            {/* Inclusions & Exclusions */}
            <InclusionsSection
              pkg={pkg}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              selectedAddOns={selectedAddOns}
              toggleAddOn={toggleAddOn}
              addOnsData={ADD_ONS}
            />

            {/* Cancellation Policy */}
            {selectedPlan?.cancellationPolicy &&
              selectedPlan.cancellationPolicy.length > 0 && (
                <CancellationPolicySection selectedPlan={selectedPlan} />
              )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <BookingCard
              pkg={pkg}
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              selectedAddOns={selectedAddOns}
              addOnsData={ADD_ONS}
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <Loader />
    </div>
  );
}

export default function ViewPackagePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ViewPackageContent />
    </Suspense>
  );
}
