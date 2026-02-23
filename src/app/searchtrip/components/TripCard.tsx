"use client";

import Image from "next/image";
import Link from "next/link"; 
import {
  FaHeart,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFlag,
  FaCheckCircle,
} from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { useState } from "react";
import { ApiTrip } from "../types/types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";

/* ================= TYPES ================= */

type TripCardProps = {
  trip: ApiTrip;
};

/* ================= COMPONENT ================= */

export default function TripCard({ trip }: TripCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  // Extract trip data
  const title = trip.title || "Untitled Trip";

  const fromLocation = trip.fromLocation
    ? `${trip.fromLocation.city}${trip.fromLocation.country ? ", " + trip.fromLocation.country : ""}`
    : "N/A";

  const toLocation = trip.toLocation
    ? `${trip.toLocation.city}${trip.toLocation.country ? ", " + trip.toLocation.country : ""}`
    : "N/A";

  const startDate = trip.startDate;
  const endDate = trip.endDate;

  const minBudget = 10000;
  const maxBudget = 50000;

  const tripsCompleted = 30;
  const matchPercentage = "90%";
  const spotsLeft = 1;

  // Agency info
  const agencyName = "Trip Agency";
  const agencyRating = 4.5;
  const isVerified = true;
  const isFeatured = false;
  const safetyScore = "85%";
  const agencyInitials = agencyName.substring(0, 2).toUpperCase();

  // Image
  const imageUrl = trip.ogImage || trip.coverImage;

  // Date formatting
  const formatDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const dateRange =
    startDate && endDate
      ? `${formatDate(startDate)} - ${formatDate(endDate)}`
      : "Date TBD";

  const router = useRouter();
  return (
    <div className="bg-white shadow-sm transition-all duration-300 overflow-hidden flex border border-[#e1e1e1]">
      {/* Image Section */}
      <div className="relative w-80 h-66 bg-linear-to-br from-teal-400 to-blue-500 shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-3 left-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <FaHeart
            className={`w-4 h-4 ${
              isFavorite ? "text-red-500" : "text-gray-300"
            }`}
          />
        </button>

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <span
            className="px-2.5 py-1 text-xs font-bold text-white rounded-full shadow-md"
            style={{ backgroundColor: "#16a34a" }}
          >
            {matchPercentage} Match
          </span>
          <span
            className="px-2.5 py-1 text-xs font-bold text-white rounded-full shadow-md"
            style={{ backgroundColor: "#dc2626" }}
          >
            🔥 {spotsLeft} spots left
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        <h3
          className="font-bold text-lg mb-1 line-clamp-1"
          style={{ color: "#1d4350" }}
        >
          {title}
        </h3>

        <p className="text-xs text-gray-500 mb-3 line-clamp-1">
          {trip.description || "Explore amazing destinations"}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3 text-xs">
          <div className="flex items-center gap-1.5 text-gray-600">
            <HiLocationMarker className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">From: {fromLocation}</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-600">
            <FaMapMarkerAlt className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">To: {toLocation}</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-600 col-span-2">
            <FaCalendarAlt className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{dateRange}</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-600">
            <FaMoneyBillWave className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">
              ₹{minBudget.toLocaleString()} - ₹{maxBudget.toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-600">
            <FaFlag className="w-3.5 h-3.5 text-gray-400" />
            <span className="truncate">{tripsCompleted} Trips Completed</span>
          </div>
        </div>

        <div className="border-t border-gray-200 my-2"></div>

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "#ff6b35" }}
            >
              {agencyInitials}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4
                  className="font-semibold text-xs truncate"
                  style={{ color: "#276074" }}
                >
                  {agencyName}
                </h4>
                {isVerified && (
                  <FaCheckCircle className="w-3.5 h-3.5 text-green-500" />
                )}
              </div>
              <div className="text-xs text-gray-500">⭐ {agencyRating}</div>
            </div>
          </div>

          <div className="flex gap-1.5">
            {isFeatured && (
              <span
                className="px-2 py-0.5 text-xs rounded"
                style={{ backgroundColor: "#fff7ed", color: "#c2410c" }}
              >
                🏆 Featured
              </span>
            )}
            <span
              className="px-2 py-0.5 text-xs rounded"
              style={{ backgroundColor: "#d1fae5", color: "#065f46" }}
            >
              🛡️ {safetyScore} Safe
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-auto">
     <Link href={ROUTES.TRIP_DETAILS_WITH_ID(trip._id)}>
  <button
    className="py-2 text-white text-xs font-semibold w-full cursor-pointer"
    style={{ backgroundColor: "#276074" }}
  >
    View Trip
  </button>
</Link>
          <button
            className="py-2 text-white text-xs font-semibold cursor-pointer"
            style={{ backgroundColor: "#276074" }}
          >
            Join Trip
          </button>
          <button
            onClick={() => router.push("/profile")}
            className="py-2 text-white text-xs font-semibold cursor-pointer"
            style={{ backgroundColor: "#276074" }}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
