"use client";

import JoinedTravelers from "./JoinedTravelers";
import TripRoadmap from "./TripRoadmap";
import SafetyInformation from "./SafetyInformation";
import ShareThisTrip from "./ShareThisTrip";
import CancellationPolicy from "./CancellationPolicy";
import { TRIPS_DEMO } from "@/app/searchtrip/data/data";
import TripsCard from "@/app/searchtrip/components/TripCard";

const TripDetails = () => {
  return (
    <div className="bg-gray-50 min-h-screen px-5 sm:px-10 py-10">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="lg:col-span-2 flex flex-col gap-6 -mt-10">
          <SafetyInformation />
          <CancellationPolicy />
        </div>

        {/* Right Section */}
        <div className="flex flex-col gap-6 -mt-140">
          <JoinedTravelers />
          <TripRoadmap />
          <ShareThisTrip />
        </div>
      </div>

      {/* Featured Travel Agencies */}
      <div className="w-full mt-12 px-4">
        <h2 className="text-xl font-semibold mb-4">Featured Travel Agencies</h2>
        <div className="flex space-x-4 overflow-x-auto pb-3">
          {TRIPS_DEMO.map((trip) => (
            <div key={trip.id} className="flex-shrink-0 min-w-[300px]">
              <TripsCard trips={[trip]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
