import { useState } from "react";
import { Calendar, Heart, Share2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axiosClient from "@/lib/axios-client";
import { Package, Plan, Traveller } from "../types";
import { API_ENDPOINTS_CONFIG } from "@/utils/apiConfig";
import { APP_CONSTANTS } from "@/utils/appConstants";

interface BookingCardProps {
  pkg: Package;
  selectedPlan: Plan | null;
  setSelectedPlan: (plan: Plan | null) => void;
  isFavorite: boolean;
  setIsFavorite: (isFavorite: boolean) => void;
  travellers: Traveller[];
}

export default function BookingCard({
  pkg,
  selectedPlan,
  setSelectedPlan,
  isFavorite,
  setIsFavorite,
  travellers,
}: BookingCardProps) {
  const router = useRouter();
  const [travelDate, setTravelDate] = useState("");
  const [isBooking, setIsBooking] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const currencySymbol =
    selectedPlan?.currency === "INR" ? "₹" : selectedPlan?.currency || "₹";
  const originalPrice = selectedPlan?.pricePerPerson || 0;
  const discountedPrice = selectedPlan?.discountedPrice || originalPrice;
  const discount =
    originalPrice > discountedPrice
      ? Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
      : 0;
  const gstAmount = Math.round(discountedPrice * APP_CONSTANTS.GST_RATE);
  const finalTotal = discountedPrice + gstAmount;

  const handleBookNow = async () => {
    if (!selectedPlan) return;
    if (!travelDate) {
      setShowValidationModal(true);
      return;
    }

    setIsBooking(true);
    try {
      // Parallel execution: Fire both createCart and getTraveller requests simultaneously
      const [cartResponse, profilesResponse] = await Promise.all([
        axiosClient.post(
          API_ENDPOINTS_CONFIG.BOOKING.CREATE_CART,
          {
            packageId: pkg._id,
            planId: selectedPlan._id,
            organizationId: APP_CONSTANTS.ORGANIZATION_ID,
            travelDate: travelDate,
          }
        ),
        axiosClient.get(API_ENDPOINTS_CONFIG.BOOKING.TRAVELER_PROFILES)
      ]);

      const cartId = cartResponse.data?.data?.id || cartResponse.data?.id;
      
      // Get existing traveller profiles from the parallel request
      const existingProfiles = profilesResponse.data?.data || profilesResponse.data || [];

      // Get pricing data from cart response
      const cartData = cartResponse.data?.data || cartResponse.data || {};
      
      // Build complete cart pricing object for PaymentSummaryCard
      const cartPricing = {
        baseAmount: cartData.baseAmount || cartData.basePrice || selectedPlan.discountedPrice,
        planPricePerPerson: selectedPlan.discountedPrice.toString(),
        addonAmount: 0,
        taxAmount: cartData.taxAmount || cartData.gstAmount || Math.round(selectedPlan.discountedPrice * APP_CONSTANTS.GST_RATE),
        totalAmount: cartData.totalAmount || cartData.totalPrice || (selectedPlan.discountedPrice + Math.round(selectedPlan.discountedPrice * APP_CONSTANTS.GST_RATE)),
        payableNow: cartData.payableNow || Math.round((selectedPlan.discountedPrice + Math.round(selectedPlan.discountedPrice * APP_CONSTANTS.GST_RATE)) * APP_CONSTANTS.ADVANCE_PAYMENT_PERCENTAGE),
        taxComponents: cartData.taxComponents || [
          {
            code: 'GST',
            name: 'Goods and Services Tax',
            percentage: APP_CONSTANTS.GST_RATE * 100,
            amount: Math.round(selectedPlan.discountedPrice * APP_CONSTANTS.GST_RATE)
          }
        ],
        paymentTerms: cartData.paymentTerms || selectedPlan.paymentTerms || [
          {
            trigger: 'ON_BOOKING',
            percentage: APP_CONSTANTS.ADVANCE_PAYMENT_PERCENTAGE * 100
          }
        ]
      };

    const params = new URLSearchParams();
    params.set("packageTitle", pkg.title);
    params.set("packageId", pkg._id || "");
    params.set("planName", selectedPlan.name);
    params.set("planPrice", cartPricing.baseAmount.toString());
    params.set("currency", cartData.currency || selectedPlan.currency || "INR");
    params.set("cartBasePrice", cartPricing.baseAmount.toString());
    params.set("cartTotalPrice", cartPricing.totalAmount.toString());
    params.set("cartGstAmount", cartPricing.taxAmount.toString());
    params.set("cartOriginalPrice", cartData.originalPrice || selectedPlan.pricePerPerson || selectedPlan.discountedPrice);
    
    // Pass the full cart pricing object for detailed display
    params.set("cartPricing", JSON.stringify(cartPricing));
    
    if (pkg.fromLocation) params.set("fromLocation", pkg.fromLocation.city || "");
    if (pkg.toLocation) params.set("toLocation", pkg.toLocation.city || "");
    params.set("totalDays", pkg.totalDays?.toString() || "0");
    params.set("totalNights", pkg.totalNights?.toString() || "0");
    params.set("travelDate", travelDate);

    if (cartId) params.set("cartId", cartId);

    // Pass existing traveller profiles to bookPackage page
    if (existingProfiles.length > 0) {
      params.set("existingProfiles", JSON.stringify(existingProfiles));
    }

    if (travellers && travellers.length > 0) {
      params.set("travellersData", JSON.stringify(travellers));
    }

    if (pkg.itineraryTemplate) {
      params.set("itineraryData", JSON.stringify(pkg.itineraryTemplate));
    }

    if (selectedPlan.cancellationPolicy) {
      params.set("cancellationPolicy", JSON.stringify(selectedPlan.cancellationPolicy));
    }

    const planData = {
      name: selectedPlan.name,
      category: selectedPlan.category,
      description: selectedPlan.description,
      inclusions: selectedPlan.inclusions,
      exclusions: selectedPlan.exclusions,
      minPeople: selectedPlan.minPeople,
      maxPeople: selectedPlan.maxPeople,
      totalSlots: selectedPlan.totalSlots,
      bookedSlots: selectedPlan.bookedSlots,
    };
    params.set("planData", JSON.stringify(planData));

    router.push(`/bookPackage?${params.toString()}`);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to initiate booking. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-[#276074]/20 sticky top-24 ring-4 ring-[#276074]/5"
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

      {/* Validation Message */}
      {showValidationModal && (
        <motion.div
          className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex">
            <div className="flex-shrink-0">
              <Calendar className="h-5 w-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                Please select a travel date to proceed.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      
      {/* Travel Date Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Travel Date
        </label>
        <input
          type="date"
          value={travelDate}
          onChange={(e) => {
            const newDate = e.target.value;
            setTravelDate(newDate);
            if (newDate) setShowValidationModal(false);
          }}
          className={`w-full p-2 border ${showValidationModal ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-[#276074]"} rounded-lg focus:ring-2 focus:border-transparent`}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* Price Breakdown */}
      <div className="mb-4 pt-3 border-t border-dashed border-gray-200">
          <div className="text-base font-bold text-gray-800 mb-3">
            Price Breakdown
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Base Price (1 Person)</span>
            <span>
              {currencySymbol}
              {discountedPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>GST ({APP_CONSTANTS.GST_RATE * 100}%)</span>
            <span>
              {currencySymbol}
              {gstAmount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-end mt-4 pt-4 border-t-2 border-gray-200">
            <span className="text-xl font-extrabold text-gray-800">
              Total Amount
            </span>
            <div className="text-right">
              <span className="text-4xl font-black text-[#1d4350] block leading-none">
                {currencySymbol}
                {finalTotal.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500 font-bold mt-1 block">
                Inclusive of all taxes
              </span>
            </div>
          </div>
        </div>

      {/* Slots Available */}
      <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
        <Calendar className="w-5 h-5 text-[#276074]" />
        <div>
          <p className="text-sm font-medium text-gray-800">
            {(selectedPlan?.totalSlots || 0) - (selectedPlan?.bookedSlots || 0)}{" "}
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
          Min {selectedPlan?.minPeople} - Max {selectedPlan?.maxPeople} people
        </span>
      </div>

      {/* CTA Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleBookNow}
          disabled={isBooking}
          className="w-full py-3 px-4 bg-[#276074] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBooking ? "Processing..." : "Book Now"}
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
        <div className="mt-6 pt-4 border-t border-gray-200 bg-yellow-50/80 p-4 rounded-xl border border-yellow-100">
          <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
            <span className="text-xl"></span> Payment Terms
          </h4>
          <div className="space-y-2">
            {selectedPlan.paymentTerms.map((term, index) => (
              <p
                key={term._id || index}
                className="text-sm font-medium text-gray-700 flex items-start gap-2"
              >
                <span className="text-yellow-600 mt-0.5">●</span>
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
  );
}