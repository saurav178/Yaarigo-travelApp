"use client";
import React, { useState } from "react";
import UpcomingTripsTab from "./UpcomingTripsTab";
import PastTripsTab from "./PastTripsTab";
import ReviewsTab from "./ReviewsTab";
import TravelPhotosTab from "./TravelPhotosTab";

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("Upcoming Trips");

  return (
    <div className="w-full mr-4 md:flex-1">
      <div className="bg-gray-50 shadow-md">
        {/* Tabs Header */}
        <div className="flex  space-x-10 border-b border-gray-200 mb-6 px-8 bg-gray-200 mt-2">
          <button
            onClick={() => setActiveTab("Upcoming Trips")}
            className={`pb-2 text-sm font-medium transition-colors duration-200 mt-4 ${
              activeTab === "Upcoming Trips"
                ? "text-[#1D4350] border-b-2 border-[#1D4350]"
                : "text-gray-500 hover:text-[#1D4350]"
            }`}
          >
            Upcoming Trips
          </button>
          <button
            onClick={() => setActiveTab("Past Trips")}
            className={`pb-2 text-sm font-medium transition-colors duration-200 mt-4 ${
              activeTab === "Past Trips"
                ? "text-[#1D4350] border-b-2 border-[#1D4350]"
                : "text-gray-500 hover:text-[#1D4350]"
            }`}
          >
            Past Trips
          </button>
          <button
            onClick={() => setActiveTab("Reviews")}
            className={`pb-2 text-sm font-medium transition-colors duration-200 mt-4 ${
              activeTab === "Reviews"
                ? "text-[#1D4350] border-b-2 border-[#1D4350]"
                : "text-gray-500 hover:text-[#1D4350]"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("Travel Photos")}
            className={`pb-2 text-sm font-medium transition-colors duration-200 mt-4 ${
              activeTab === "Travel Photos"
                ? "text-[#1D4350] border-b-2 border-[#1D4350]"
                : "text-gray-500 hover:text-[#1D4350]"
            }`}
          >
            Travel Photos
          </button>
        </div>

        <div className="p-4">
          {activeTab === "Reviews" && <ReviewsTab />}
          {activeTab === "Upcoming Trips" && <UpcomingTripsTab />}
          {activeTab === "Past Trips" && <PastTripsTab />}
          {activeTab === "Travel Photos" && <TravelPhotosTab />}
        </div>
      </div>
    </div>
  );
}