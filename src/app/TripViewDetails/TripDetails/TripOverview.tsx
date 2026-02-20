"use client";

import {
  CalendarDays,
  Wallet,
  Users,
  Users2,
  Car,
  Globe,
  Handshake,
  Utensils,
  Clock,
} from "lucide-react";

interface TripProps {
  trip: any;
}

export default function TripOverview({ trip }: TripProps) {
  // Set safe defaults for optional fields
  const languages = trip.languages || [];
  const groupSize = trip.groupSize || "N/A";
  const tripStyle = trip.tripStyle || "N/A";
  const travelStyle = trip.travelStyle || "N/A";
  const duration = trip.duration || "N/A";
  const splitCost = trip.splitCost ?? false;
  const lookingFor = trip.lookingFor || "N/A";
  const foodPreference = trip.foodPreference || "N/A";

  return (
    <div className="p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Title & Description */}
      <h2 className="text-lg font-semibold mb-2">{trip.title || "Trip Title"}</h2>
      <p className="text-sm text-gray-600 mb-6">{trip.description || "Trip description not available."}</p>

      {/* Top Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-sm justify-center">
        <div className="bg-gray-100 p-3 flex flex-col justify-between max-w-45 mx-auto">
          <div className="flex items-center gap-2 text-black">
            <img src="/icon/ic_baseline-route.png" alt="route icon" className="w-5 h-5 object-contain" />
            <p className="text-gray-700 font-semibold">Route</p>
          </div>
          <p className="font-medium mt-2 text-gray-800">{trip.from || "N/A"}</p>
        </div>

        <div className="bg-gray-100 p-3 flex flex-col justify-between max-w-45 mx-auto">
          <div className="flex items-center gap-2 text-black">
            <CalendarDays size={18} strokeWidth={2.5} />
            <p className="text-gray-700 font-semibold">Dates</p>
          </div>
          <p className="font-medium mt-2 text-gray-800">
            {trip.startDate || "N/A"} - {trip.endDate || "N/A"}
          </p>
        </div>

        <div className="bg-gray-100 p-3 flex flex-col justify-between max-w-45 mx-auto">
          <div className="flex items-center gap-2 text-black">
            <img src="/icon/iconoir_wallet-solid.png" alt="budget icon" className="w-5 h-5 object-contain" />
            <p className="text-gray-700 font-semibold">Budget</p>
          </div>
          <p className="font-medium mt-2 text-gray-800">₹{trip.budget ?? "N/A"} / person</p>
        </div>

        <div className="bg-gray-100 p-3 flex flex-col justify-between shadow-sm max-w-45 mx-auto">
          <div className="flex items-center gap-2 text-black">
            <img src="/icon/ix_user-management-filled.png" alt="travelers icon" className="w-5 h-5 object-contain" />
            <p className="text-gray-700 font-semibold">Travelers</p>
          </div>
          <p className="font-medium mt-2 text-gray-800">
            {trip.joinedTravelers ?? 0} / {trip.maxTravelers ?? 0} joined
          </p>
        </div>
      </div>

      {/* Bottom Section Info */}
      <div className="grid grid-cols-2 gap-6 text-sm ml-10">
        <div className="flex items-start gap-3">
          <img src="/icon/ix_user-management-filled.png" alt="travelers icon" className="w-5 h-5 object-contain" />
          <div>
            <p className="text-gray-500">Group Size</p>
            <p className="font-semibold">{groupSize}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Car size={18} strokeWidth={2.5} />
          <div>
            <p className="text-gray-500">Trip Style</p>
            <p className="font-semibold">{tripStyle}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <img src="/icon/ix_car-filled.png" alt="travelers icon" className="w-5 h-5 object-contain" />
          <div>
            <p className="text-gray-500">Travel Style</p>
            <p className="font-semibold">{travelStyle}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <CalendarDays size={18} strokeWidth={2.5} />
          <div>
            <p className="text-gray-500">Duration</p>
            <p className="font-semibold">{duration}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Globe size={18} strokeWidth={2.5} />
          <div>
            <p className="text-gray-500">Language</p>
            <p className="font-semibold">{languages.length > 0 ? languages.join(", ") : "N/A"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Wallet size={18} strokeWidth={2.5} />
          <div>
            <p className="text-gray-500">Split Costs</p>
            <p className="font-semibold">{splitCost ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <img src="/icon/ic_baseline-transgender.png" alt="travelers icon" className="w-5 h-5 object-contain" />
          <div>
            <p className="text-gray-500">Looking For</p>
            <p className="font-semibold">{lookingFor}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <img src="/icon/ic_baseline-no-meals.png" alt="travelers icon" className="w-5 h-5 object-contain" />
          <div>
            <p className="text-gray-500">Food Preference</p>
            <p className="font-semibold">{foodPreference}</p>
          </div>
        </div>
      </div>
    </div>
  );
}