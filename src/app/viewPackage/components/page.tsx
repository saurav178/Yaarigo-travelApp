"use client";

import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Check, CreditCard, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface StaticAddOn {
  id: string;
  title: string;
  desc: string;
  price: number;
}

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const packageTitle = searchParams.get("packageTitle") || "Package Title";
  const planName = searchParams.get("planName") || "Selected Plan";
  const planPrice = parseFloat(searchParams.get("planPrice") || "0");
  const currency = searchParams.get("currency") || "INR";
  const currencySymbol = currency === "INR" ? "₹" : currency;

  const addOnsDataStr = searchParams.get("addOnsData");
  let selectedAddOns: StaticAddOn[] = [];
  try {
    if (addOnsDataStr) {
      selectedAddOns = JSON.parse(addOnsDataStr);
    }
  } catch (e) {
    console.error("Failed to parse add-ons data", e);
  }

  const addOnsTotal = selectedAddOns.reduce(
    (acc, addon) => acc + addon.price,
    0,
  );
  const GST_RATE = 0.18;
  const gstAmount = Math.round((planPrice + addOnsTotal) * GST_RATE);
  const finalTotal = planPrice + addOnsTotal + gstAmount;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Package
          </button>
          <h1 className="text-3xl font-bold text-gray-900">
            Confirm Your Booking
          </h1>
          <p className="text-gray-500 mt-1">
            Review your package details and proceed to payment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Package & Plan Details */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Package Details
              </h2>
              <div className="flex flex-col gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Package
                  </span>
                  <p className="text-lg font-bold text-gray-800 mt-1">
                    {packageTitle}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Selected Plan
                  </span>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-lg font-bold text-blue-900">
                      {planName}
                    </p>
                    <p className="text-lg font-bold text-blue-900">
                      {currencySymbol}
                      {planPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Add-ons */}
            {selectedAddOns.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Selected Add-ons
                </h2>
                <div className="space-y-3">
                  {selectedAddOns.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-full">
                          <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {addon.title}
                          </p>
                          <p className="text-xs text-gray-500">{addon.desc}</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-700">
                        +{currencySymbol}
                        {addon.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-8"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Payment Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Base Price</span>
                  <span className="font-medium">
                    {currencySymbol}
                    {planPrice.toLocaleString()}
                  </span>
                </div>
                {selectedAddOns.length > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Add-ons Total</span>
                    <span className="font-medium">
                      {currencySymbol}
                      {addOnsTotal.toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>GST (18%)</span>
                  <span className="font-medium">
                    {currencySymbol}
                    {gstAmount.toLocaleString()}
                  </span>
                </div>
                <div className="h-px bg-gray-200 my-2"></div>
                <div className="flex justify-between text-lg font-bold text-[#1d4350]">
                  <span>Total Amount</span>
                  <span>
                    {currencySymbol}
                    {finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button className="w-full py-4 bg-[#276074] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-md flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Confirm & Pay {currencySymbol}
                {finalTotal.toLocaleString()}
              </button>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Safe & Secure Payment</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BookPackagePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}