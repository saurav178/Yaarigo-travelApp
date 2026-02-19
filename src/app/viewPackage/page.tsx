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
} from "lucide-react";
import Loader from "@/components/Loader/Loader";
import axios from "axios";
import { API_ENDPOINTS, APP_ROUTES } from "@/utils/constants";

// Types based on the API response
interface Location {
  name: string;
  city: string;
  country: string;
  lat?: number;
  lng?: number;
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
          `${API_ENDPOINTS.PACKAGES}/${packageId}`
        );
        setPkg(response.data);
        if (response.data.plans && response.data.plans.length > 0) {
          setSelectedPlan(response.data.plans[0]);
        }
        setError(null);
      } catch (err: any) {
        console.error("Error fetching package:", err);
        setError(err.response?.data?.message || "Failed to load package details");
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [packageId]);

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

  const currencySymbol = selectedPlan?.currency === "INR" ? "₹" : selectedPlan?.currency || "₹";
  const originalPrice = selectedPlan?.pricePerPerson || 0;
  const discountedPrice = selectedPlan?.discountedPrice || originalPrice;
  const discount = originalPrice > discountedPrice
    ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-80 md:h-96">
        <Image
          src={pkg.coverImage || "/placeholder.jpg"}
          alt={pkg.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-20 left-4 md:left-10">
          <Link
            href={APP_ROUTES.SEARCH_TRIP}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Title and Location */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              {pkg.fromLocation?.city} → {pkg.toLocation?.city}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {pkg.title}
            </h1>
            <div className="flex items-center gap-4 text-white/80">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                <span className="text-sm">4.5 (128 reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{pkg.totalDays} Days / {pkg.totalNights} Nights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-[#276074] mb-1">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">Duration</span>
                </div>
                <p className="text-gray-600">{pkg.totalDays} Days</p>
                <p className="text-gray-500 text-sm">{pkg.totalNights} Nights</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-[#276074] mb-1">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">From</span>
                </div>
                <p className="text-gray-600">{pkg.fromLocation?.city}</p>
                <p className="text-gray-500 text-sm">{pkg.fromLocation?.country}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-[#276074] mb-1">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">To</span>
                </div>
                <p className="text-gray-600">{pkg.toLocation?.city}</p>
                <p className="text-gray-500 text-sm">{pkg.toLocation?.country}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 text-[#276074] mb-1">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">Group Size</span>
                </div>
                <p className="text-gray-600">
                  {selectedPlan?.minPeople}-{selectedPlan?.maxPeople} People
                </p>
                <p className="text-gray-500 text-sm">{selectedPlan?.totalSlots} slots</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About This Trip</h2>
              <p className="text-gray-600 leading-relaxed">
                {pkg.description || pkg.shortSummary || "No description available"}
              </p>
            </div>

            {/* Itinerary */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Itinerary</h2>
              {pkg.itineraryTemplate && pkg.itineraryTemplate.length > 0 ? (
                <div className="space-y-4">
                  {pkg.itineraryTemplate.map((day, index) => (
                    <div key={day._id || index} className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-[#276074] mb-2">
                        {day.dayTitle}
                      </h3>
                      <p className="text-gray-600">{day.summary}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Itinerary details will be shared soon.</p>
              )}
            </div>

            {/* Inclusions & Exclusions */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Inclusions
                  </h3>
                  {selectedPlan?.inclusions && selectedPlan.inclusions.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedPlan.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No inclusions specified</p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Exclusions
                  </h3>
                  {selectedPlan?.exclusions && selectedPlan.exclusions.length > 0 ? (
                    <ul className="space-y-2">
                      {selectedPlan.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No exclusions specified</p>
                  )}
                </div>
              </div>
            </div>

            {/* Cancellation Policy */}
            {selectedPlan?.cancellationPolicy && selectedPlan.cancellationPolicy.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Cancellation Policy</h2>
                <div className="space-y-2">
                  {selectedPlan.cancellationPolicy.map((policy, index) => (
                    <div key={policy._id || index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-gray-600">
                        {policy.beforeDays === 0 ? "Before departure" : `${policy.beforeDays} days before`}
                      </span>
                      <span className="font-semibold text-green-600">
                        {policy.refundPercentage}% Refund
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
              {/* Plan Selector */}
              {pkg.plans && pkg.plans.length > 1 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Plan
                  </label>
                  <select
                    value={selectedPlan?._id || ""}
                    onChange={(e) => {
                      const plan = pkg.plans.find((p) => p._id === e.target.value);
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
                      {currencySymbol}{originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-3xl font-bold text-[#1d4350]">
                    {currencySymbol}{discountedPrice.toLocaleString()}
                  </span>
                </div>
                {discount > 0 && (
                  <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                    {discount}% OFF
                  </span>
                )}
                <p className="text-sm text-gray-500 mt-1">per person</p>
              </div>

              {/* Slots Available */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                <Calendar className="w-5 h-5 text-[#276074]" />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {(selectedPlan?.totalSlots || 0) - (selectedPlan?.bookedSlots || 0)} slots left
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedPlan?.totalSlots || 0} total, {selectedPlan?.bookedSlots || 0} booked
                  </p>
                </div>
              </div>

              {/* Group Size */}
              <div className="flex items-center gap-2 mb-4 text-gray-600">
                <Users className="w-5 h-5" />
                <span>Min {selectedPlan?.minPeople} - Max {selectedPlan?.maxPeople} people</span>
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
                  <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
                  Save
                </button>
                <button className="flex-1 py-2 px-4 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>

              {/* Payment Terms */}
              {selectedPlan?.paymentTerms && selectedPlan.paymentTerms.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-800 mb-2">Payment Terms</h4>
                  <div className="space-y-1">
                    {selectedPlan.paymentTerms.map((term, index) => (
                      <p key={term._id || index} className="text-sm text-gray-600">
                        {term.percentage}% {term.trigger === "ON_BOOKING" ? "on booking" : `before ${term.beforeDays} days`}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
