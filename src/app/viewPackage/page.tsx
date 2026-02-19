"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Heart,
  Share2,
  ChevronDown,
  ChevronUp,
  Hotel,
  Car,
  Utensils,
} from "lucide-react";
import Loader from "@/components/Loader/Loader";
import axios from "axios";
import { API_ENDPOINTS, APP_ROUTES } from "@/utils/constants";
import { motion } from "framer-motion";

// Types based on the API response
interface Location {
  name: string;
  city: string;
  country: string;
  lat?: number;
  lng?: number;
}

interface AddOn {
  _id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  active: boolean;
}

interface PaymentTerm {
  percentage: number;
  trigger: string;
  beforeDays?: number;
  _id: string;
}

interface CancellationPolicy {
  beforeDays: number;
  refundPercentage: number;
  _id: string;
}

interface Plan {
  name: string;
  category: string;
  description: string;
  pricePerPerson: number;
  discountedPrice: number;
  currency: string;
  minPeople: number;
  maxPeople: number;
  totalSlots: number;
  bookedSlots: number;
  paymentTerms: PaymentTerm[];
  refundType: string;
  cancellationPolicy: CancellationPolicy[];
  inclusions: string[];
  exclusions: string[];
  components: any[];
  active: boolean;
  _id: string;
}

interface ItineraryDay {
  dayTitle: string;
  summary: string;
  activities: any[];
  blocks: any[];
  _id: string;
}

interface Package {
  _id: string;
  title: string;
  description: string;
  shortSummary: string;
  totalDays: number;
  totalNights: number;
  tripStyles: string[];
  createdBy: string;
  creatorType: string;
  organizationId: string;
  fromLocation: Location;
  toLocation: Location;
  categories: string[];
  resale: {
    allowResale: boolean;
    agentOverrides: any[];
  };
  gallery: string[];
  videos: string[];
  seoKeywords: string[];
  status: string;
  active: boolean;
  itineraryTemplate: ItineraryDay[];
  plans: Plan[];
  addOns?: AddOn[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  coverImage: string;
  seoDescription: string;
  seoTitle: string;
  slug: string;
}

export default function ViewPackagePage() {
  const searchParams = useSearchParams();
  const packageId = searchParams.get("packageId");

  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedDays, setExpandedDays] = useState<number[]>([0]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

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
      } catch (err: any) {
        console.error("Error fetching package:", err);
        setError(
          err.response?.data?.message || "Failed to load package details",
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
  const ADD_ONS = [
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

// ---------------- ADD ONS COMPONENT ----------------
const AddOnsSection = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Package Add-Ons</h3>

      <div className="grid md:grid-cols-3 gap-4">
        {ADD_ONS.map((addon) => {
          const isSelected = selectedAddOns.includes(addon.id);

          return (
            <div
              key={addon.id}
              onClick={() => toggleAddOn(addon.id)}
              className={`p-5 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? "border-blue-500 ring-2 ring-blue-500/20 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex justify-between mb-2">
                <span className="text-xs text-gray-500">{addon.tag}</span>
                {isSelected && (
                  <span className="text-blue-600 font-bold text-lg">✓</span>
                )}
              </div>

              <h4 className="font-semibold text-gray-800">{addon.title}</h4>
              <p className="text-sm text-gray-500 mb-3">{addon.desc}</p>

              <div className="font-bold text-[#1d4350]">+₹{addon.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


  const currencySymbol =
    selectedPlan?.currency === "INR" ? "₹" : selectedPlan?.currency || "₹";
  const originalPrice = selectedPlan?.pricePerPerson || 0;
  const discountedPrice = selectedPlan?.discountedPrice || originalPrice;
  const discount =
    originalPrice > discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;

  const addOnsTotal = ADD_ONS.filter(addon => selectedAddOns.includes(addon.id)).reduce((acc, addon) => acc + addon.price, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px]">
        <Image
          src={pkg.coverImage || "/placeholder.jpg"}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-8 z-10">
          <Link
            href={APP_ROUTES.SEARCH_TRIP}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40 transition-all duration-300 border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Title and Location */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-[1600px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 text-white/90 text-base font-medium mb-3">
                <MapPin className="w-5 h-5 text-[#276074]" />
                {pkg.fromLocation?.city} → {pkg.toLocation?.city}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                {pkg.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/90">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.5</span>
                  <span className="text-sm opacity-80">(128 reviews)</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">
                    {pkg.totalDays} Days / {pkg.totalNights} Nights
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                About this package
              </h2>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-[#276074] mb-1">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">Duration</span>
                  </div>
                  <p className="text-gray-800 font-medium text-lg">
                    {pkg.totalDays} Days
                  </p>
                  <p className="text-gray-500 text-sm">
                    {pkg.totalNights} Nights
                  </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-[#276074] mb-1">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">From</span>
                  </div>
                  <p className="text-gray-800 font-medium text-lg">
                    {pkg.fromLocation?.city}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {pkg.fromLocation?.country}
                  </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-[#276074] mb-1">
                    <MapPin className="w-5 h-5" />
                    <span className="font-semibold">To</span>
                  </div>
                  <p className="text-gray-800 font-medium text-lg">
                    {pkg.toLocation?.city}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {pkg.toLocation?.country}
                  </p>
                </div>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 text-[#276074] mb-1">
                    <Users className="w-5 h-5" />
                    <span className="font-semibold">Group Size</span>
                  </div>
                  <p className="text-gray-800 font-medium text-lg">
                    {selectedPlan?.minPeople}-{selectedPlan?.maxPeople} People
                  </p>
                  <p className="text-gray-500 text-sm">
                    {selectedPlan?.totalSlots} slots
                  </p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                {pkg.description ||
                  pkg.shortSummary ||
                  "No description available"}
              </p>
            </motion.div>

            {/* Itinerary */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Itinerary
              </h2>

              {pkg.itineraryTemplate && pkg.itineraryTemplate.length > 0 ? (
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                  {pkg.itineraryTemplate.map((day, index) => {
                    const isExpanded = expandedDays.includes(index);

                    return (
                      <div key={day._id || index} className="relative pl-8">
                        {/* Timeline Dot */}
                        <div
                          className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                            isExpanded
                              ? "bg-[#276074] border-[#276074]"
                              : "bg-white border-gray-300"
                          }`}
                        />

                        {/* Card */}
                        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                          {/* Header */}
                          <button
                            onClick={() => toggleDay(index)}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                          >
                            <div>
                              <span className="text-xs font-bold text-[#276074] uppercase tracking-wider">
                                Day {index + 1}
                              </span>
                              <h3 className="font-semibold text-gray-800 mt-1">
                                {day.dayTitle?.replace(/Day \d+/, "").trim() ||
                                  `Day ${index + 1} Itinerary`}
                              </h3>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                          </button>

                          {/* Expanded Content */}
                          {isExpanded && (
                            <div className="p-4 border-t border-gray-100">
                              {/* Badges */}
                              <div className="flex flex-wrap gap-3 mb-4">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                  <Hotel className="w-3.5 h-3.5" />
                                  Hotel
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                                  <Car className="w-3.5 h-3.5" />
                                  Transfer
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
                                  <Utensils className="w-3.5 h-3.5" />
                                  Meals
                                </div>
                              </div>

                              {/* Summary */}
                              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {day.summary ||
                                  "No detailed summary available for this day."}
                              </p>

                              {/* Activities */}
                              {day.activities && day.activities.length > 0 && (
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-gray-800">
                                    Activities
                                  </h4>
                                  <ul className="space-y-2">
                                    {day.activities.map(
                                      (activity: any, i: number) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded"
                                        >
                                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#276074] flex-shrink-0" />
                                          <span>
                                            {activity.name ||
                                              activity.title ||
                                              "Activity"}
                                          </span>
                                        </li>
                                      ),
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Itinerary details coming soon.
                </p>
              )}
            </motion.div>

            {/* Inclusions & Exclusions */}
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">What's Included</h2>

              {/* ---------------- PLAN SELECTION ---------------- */}
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Choose Package Plan
                </h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {pkg.plans.map((plan) => {
                    const isSelected = selectedPlan?._id === plan._id;
                    const planCurrency = plan.currency === "INR" ? "₹" : plan.currency;

                    return (
                      <div
                        key={plan._id}
                        onClick={() => setSelectedPlan(plan)}
                        className={`p-5 rounded-xl border cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#276074] ring-2 ring-[#276074]/20 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-gray-800">{plan.name}</h4>

                          {isSelected && (
                            <span className="text-xs bg-[#276074] text-white px-2 py-0.5 rounded">
                              Selected
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 mb-3">{plan.category}</p>

                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                          {plan.description}
                        </p>

                        <div className="text-xl font-bold text-[#1d4350]">
                          {planCurrency}
                          {plan.discountedPrice.toLocaleString()}
                          <span className="text-xs text-gray-500 font-normal">
                            {" "}
                            / person
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ---------------- INCLUSION EXCLUSION ---------------- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Inclusions */}
                <div className="bg-green-50/60 p-6 rounded-2xl border border-green-100">
                  <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                    <div className="p-1.5 bg-green-100 rounded-full">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    What's Included
                  </h3>
                  <ul className="space-y-3">
                    {selectedPlan?.inclusions?.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-red-50/60 p-6 rounded-2xl border border-red-100">
                  <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2">
                    <div className="p-1.5 bg-red-100 rounded-full">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                    What's Excluded
                  </h3>
                  <ul className="space-y-3">
                    {selectedPlan?.exclusions?.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-700 text-sm">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ---------------- ADD ONS ---------------- */}
              <AddOnsSection />
            </motion.div>
            {/* Cancellation Policy */}
            {selectedPlan?.cancellationPolicy &&
              selectedPlan.cancellationPolicy.length > 0 && (
                <motion.div
                  className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-gray-800">
                    Package Cancellation Policy
                  </h2>

                  {/* Find best policy (highest refund window) */}
                  {(() => {
                    const sorted = [...selectedPlan.cancellationPolicy].sort(
                      (a, b) => b.beforeDays - a.beforeDays,
                    );
                    const first = sorted[0];

                    return (
                      <>
                        <p className="text-green-600 mt-1 font-medium">
                          Cancellation Possible till {first.beforeDays} days
                          before*
                        </p>
                        <p className="text-gray-500 text-sm">
                          After that Package is{" "}
                          <span className="font-semibold">Non-Refundable.</span>
                        </p>

                        {/* Timeline */}
                        <div className="relative mt-8">
                          <div className="h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-300 to-orange-300" />

                          {/* Left check */}
                          <div className="absolute -top-3 left-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-sm">
                            ✓
                          </div>

                          {/* Right cross */}
                          <div className="absolute -top-3 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 text-white text-sm">
                            ✕
                          </div>
                        </div>

                        {/* Labels */}
                        <div className="flex justify-between mt-6">
                          <div>
                            <p className="text-teal-700 font-semibold">
                              Till {first.beforeDays} days before
                            </p>
                            <p className="text-sm text-gray-500">
                              {first.refundPercentage === 100
                                ? "₹0 Cancellation Fee"
                                : `${first.refundPercentage}% Refund`}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-orange-600 font-semibold">
                              After {first.beforeDays} days
                            </p>
                            <p className="text-sm text-gray-500">
                              Non Refundable
                            </p>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="bg-gray-100 rounded-lg p-5 mt-6">
                          <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex gap-2">
                              <span className="text-green-600 mt-1">●</span>
                              These are non-refundable amounts as per the
                              current components attached. In the case of
                              component change/modifications, the policy will
                              change accordingly.
                            </li>

                            <li className="flex gap-2">
                              <span className="text-green-600 mt-1">●</span>
                              Please note, TCS once collected cannot be refunded
                              in case of any cancellation / modification.
                            </li>

                            <li className="flex gap-2">
                              <span className="text-green-600 mt-1">●</span>
                              Cancellation charges shown is exclusive of all
                              taxes and taxes will be added as per applicable.
                            </li>
                          </ul>
                        </div>
                      </>
                    );
                  })()}
                </motion.div>
              )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 sticky top-24"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Plan Selector */}
              {pkg.plans && pkg.plans.length > 1 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Plan
                  </label>
                  <select
                    value={selectedPlan?._id || ""}
                    onChange={(e) => {
                      const plan = pkg.plans.find(
                        (p) => p._id === e.target.value,
                      );
                      setSelectedPlan(plan || null);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#276074] focus:border-transparent"
                  >
                    {pkg.plans.map((plan) => (
                      <option key={plan._id} value={plan._id}>
                        {plan.name} - {plan.category}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Price */}
              <div className="mb-4">
                <p className="text-sm text-gray-500">Starting from</p>
                <div className="flex items-baseline gap-2">
                  {discount > 0 && (
                    <span className="text-lg text-gray-400 line-through">
                      {currencySymbol}
                      {originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-[#1d4350]">
                    {currencySymbol}
                    {discountedPrice.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                    {discount}% OFF
                  </span>
                )}
                <p className="text-sm text-gray-500 mt-1">per person</p>
              </div>

              {/* Add-ons Breakdown */}
              {selectedAddOns.length > 0 && (
                <div className="mb-4 pt-3 border-t border-dashed border-gray-200">
                  <div className="text-sm font-medium text-gray-700 mb-2">Price Breakdown</div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Base Price (1 Person)</span>
                    <span>{currencySymbol}{discountedPrice.toLocaleString()}</span>
                  </div>
                  {ADD_ONS.filter(a => selectedAddOns.includes(a.id)).map(addon => (
                    <div key={addon.id} className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{addon.title}</span>
                      <span>{currencySymbol}{addon.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-[#1d4350] mt-2 pt-2 border-t border-gray-200">
                    <span>Total Estimate</span>
                    <span>{currencySymbol}{(discountedPrice + addOnsTotal).toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Slots Available */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-[#276074]" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {(selectedPlan?.totalSlots || 0) -
                      (selectedPlan?.bookedSlots || 0)}{" "}
                    slots left
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedPlan?.totalSlots || 0} total,{" "}
                    {selectedPlan?.bookedSlots || 0} booked
                  </p>
                </div>
              </div>

              {/* Group Size */}
              <div className="flex items-center gap-2 mb-4 text-gray-600">
                <Users className="w-5 h-5" />
                <span>
                  Min {selectedPlan?.minPeople} - Max {selectedPlan?.maxPeople}{" "}
                  people
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button className="w-full py-3 px-4 bg-[#276074] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
                  Book Now
                </button>
                <button className="w-full py-3 px-4 border-2 border-[#276074] text-[#276074] font-semibold rounded-lg hover:bg-[#276074] hover:text-white transition-colors">
                  Join Trip
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 py-2 px-4 rounded-lg border flex items-center justify-center gap-2 ${
                    isFavorite
                      ? "border-red-500 text-red-500 bg-red-50"
                      : "border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                  />
                  Save
                </button>
                <button className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Payment Terms */}
              {selectedPlan?.paymentTerms &&
                selectedPlan.paymentTerms.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Payment Terms
                    </h4>
                    <div className="space-y-1">
                      {selectedPlan.paymentTerms.map((term, index) => (
                        <p
                          key={term._id || index}
                          className="text-sm text-gray-600"
                        >
                          {term.percentage}%{" "}
                          {term.trigger === "ON_BOOKING"
                            ? "on booking"
                            : `before ${term.beforeDays} days`}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
