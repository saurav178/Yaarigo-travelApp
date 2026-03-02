"use client";

import { CalendarDays } from "lucide-react";

interface TripProps {
  trip: any; // You can replace 'any' with the exact Trip type from your API if available
}

export default function TripOverview({ trip }: TripProps) {
  if (!trip) return null;

  // ---------- Extract Real API Data Safely ----------
  const fromCity = trip?.fromLocation?.city || "N/A";
  const toCity = trip?.toLocation?.city || "N/A";

  const startDate = trip?.startDate
    ? new Date(trip.startDate).toLocaleDateString()
    : "N/A";

  const endDate = trip?.endDate
    ? new Date(trip.endDate).toLocaleDateString()
    : "N/A";

  const budgetMin = trip?.partnerPreferences?.budget?.min;
  const budgetMax = trip?.partnerPreferences?.budget?.max;

  const totalSeats = trip?.totalSeats ?? 0;
  const bookedSeats = trip?.bookedSeats ?? 0;

  const groupSize = totalSeats || "N/A";

  const tripStyle =
    trip?.partnerPreferences?.tripStyles?.length > 0
      ? trip.partnerPreferences.tripStyles.join(", ")
      : "N/A";

  const travelStyle = trip?.partnerPreferences?.travelMode ?? "N/A";

  const languages = trip?.partnerPreferences?.languages ?? [];

  const splitCost = trip?.partnerPreferences?.costPreference === "SHARE";

  const lookingFor = trip?.partnerPreferences?.genderPreference ?? "ANY";

  const foodPreference = trip?.partnerPreferences?.foodPreference ?? "N/A";

  const duration =
    trip?.startDate && trip?.endDate
      ? Math.ceil(
          (new Date(trip.endDate).getTime() -
            new Date(trip.startDate).getTime()) /
            (1000 * 60 * 60 * 24)
        ) + " days"
      : "N/A";

  // ---------- UI ----------
  return (
    <div className="p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Title & Description */}
      <h2 className="text-lg font-semibold mb-2">{trip?.title}</h2>
      <p className="text-sm text-gray-600 mb-6">{trip?.description}</p>

      {/* Top Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6 text-sm justify-center">
        {/* Route */}
        <div className="bg-gray-100 p-3 flex flex-col justify-between max-w-45 mx-auto">
          <div className="flex items-center gap-2">
            <img
              src="/icon/ic_baseline-route.png"
              alt="route"
              className="w-5 h-5"
            />
            <p className="font-semibold">Route</p>
          </div>
          <p className="font-medium mt-2">
            {fromCity} → {toCity}
          </p>
        </div>

        {/* Dates */}
        <div className="bg-gray-100 p-3 flex flex-col justify-between max-w-45 mx-auto">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} strokeWidth={2.5} />
            <p className="font-semibold">Dates</p>
          </div>
          <p className="font-medium mt-2">
            {startDate} - {endDate}
          </p>
        </div>

        {/* Budget */}
        <div className="bg-gray-100 p-3 flex flex-col justify-between max-w-45 mx-auto">
          <div className="flex items-center gap-2">
            <img
              src="/icon/iconoir_wallet-solid.png"
              alt="budget"
              className="w-5 h-5"
            />
            <p className="font-semibold">Budget</p>
          </div>
          <p className="font-medium mt-2">
            {budgetMin != null && budgetMax != null
              ? `₹${budgetMin} - ₹${budgetMax}`
              : "N/A"}
          </p>
        </div>

        {/* Travelers */}
        <div className="bg-gray-100 p-3 flex flex-col justify-between max-w-45 mx-auto">
          <div className="flex items-center gap-2">
            <img
              src="/icon/ix_user-management-filled.png"
              alt="travelers"
              className="w-5 h-5"
            />
            <p className="font-semibold">Travelers</p>
          </div>
          <p className="font-medium mt-2">
            {bookedSeats} / {totalSeats}
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-center text-sm mt-2">
        {/* Container for 2 columns */}
        <div className="flex gap-12 w-full max-w-3xl">
          {/* LEFT COLUMN */}
          <div className="flex-1 flex flex-col gap-4 ml-12">
            <Info label="Group Size" value={groupSize} />
            <Info label="Trip Style" value={tripStyle} />
            <Info label="Travel Mode" value={travelStyle} />
            <Info label="Duration" value={duration} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex-1 flex flex-col gap-4 translate-x-4">
            <Info
              label="Languages"
              value={languages.length > 0 ? languages.join(", ") : "N/A"}
            />
            <Info label="Split Costs" value={splitCost ? "Yes" : "No"} />
            <Info label="Preferred Gender" value={lookingFor} />
            <Info label="Food Preference" value={foodPreference} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Reusable Info Component ----------
function Info({
  label,
  value,
  icon,
}: {
  label: string;
  value: any;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      {icon && icon}
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="font-semibold">{value ?? "N/A"}</p>
      </div>
    </div>
  );
}