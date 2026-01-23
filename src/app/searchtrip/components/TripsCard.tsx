// // TripCard

"use client";

import { useState } from "react";
import Image from "next/image";
import TripImg from "../../../../public/searchpageimg/view_trips.png";
import Profile from "../../../../public/searchpageimg/view_profile.png";
import Join from "../../../../public/searchpageimg/join_trips.png";
import dots from "../../../../public/searchpageimg/Line 1.png";

import {
  FaUser,
  FaStar,
  FaCalendar,
  FaCheckCircle,
  FaShieldAlt,
  FaFlag,
  FaExclamationTriangle,
  FaWallet,
  FaHeart,
} from "react-icons/fa";
import { PiMedalDuotone } from "react-icons/pi";
import { GoDotFill } from "react-icons/go";
import { useRouter } from "next/navigation";
import { ROUTES } from "../../../lib/routes";

import type { Trip } from "../types/types";
import { TRIPS_DEMO } from "../data/data";

type TripCardProps = {
  trips?: Trip[];
  compact?: boolean;
};

export default function TripCard({ trips = TRIPS_DEMO }: TripCardProps) {
  const [likedTrips, setLikedTrips] = useState<number[]>([]);
  const router = useRouter();

  const handleViewTrips = () => {
    router.push(ROUTES.TRIP_DETAILS);
  };

  const handleViewProfile = () => {
    router.push(ROUTES.USER_PROFILE);
  };

  const toggleLike = (id: number) => {
    setLikedTrips((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id],
    );
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "Travel Enthusiast":
        return {
          bg: "bg-blue-100 text-blue-800 border-blue-300",
          avatarBg: "bg-blue-500 text-white",
        };
      case "Featured Trip Leader":
        return {
          bg: "bg-yellow-100 text-yellow-800 border-yellow-300",
          avatarBg: "bg-yellow-500 text-white",
        };
      case "Trip Agency":
      case "Featured Trip Agency":
        return {
          bg: "bg-orange-100 text-orange-800 border-orange-300",
          avatarBg: "bg-orange-500 text-white",
        };
      default:
        return {
          bg: "bg-gray-100 text-gray-800 border-gray-300",
          avatarBg: "bg-gray-500 text-white",
        };
    }
  };

  const getSafeScoreStyle = (score: number) => {
    if (score < 50)
      return "bg-red-100 text-red-700 border border-red-300 px-2 py-[2px] rounded-md flex items-center gap-1 text-xs";
    if (score < 75)
      return "bg-yellow-100 text-yellow-800 border border-yellow-300 px-2 py-[2px] rounded-md flex items-center gap-1 text-xs";
    return "bg-green-100 text-green-700 border border-green-300 px-2 py-[2px] rounded-md flex items-center gap-1 text-xs";
  };

  return (
    <main className="w-full flex justify-center px-3 lg:px-0">
      <div className="w-full  mx-auto flex flex-col gap-3">
        {trips.map((trip, index) => {
          const catStyle = getCategoryStyle(trip.host.category);
          return (
            <article
              key={`${trip.id}-${index}`}
              className="bg-white shadow-sm border border-gray-200 flex flex-col sm:flex-row overflow-hidden  transition-shadow duration-300 hover:shadow-[0_12px_20px_-6px_rgba(0,0,0,0.25)]  lg:h-80 w-full"
            >
              {/* Image */}
              <div className="relative flex shrink-0 w-full sm:w-64 md:w-72 h-44 sm:h-auto lg:h-auto">
                <div className="relative w-full h-full overflow-hidden group">
                  {trip.image?.trim() ? (
                    <Image
                      src={trip.image}
                      alt={trip.title || "Trip image"}
                      width={640}
                      height={360}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <Image
                      src="/fallback.jpg"
                      alt="Fallback image"
                      width={640}
                      height={360}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* <button
                  onClick={() => toggleLike(trip.id)}
                  className={`absolute top-3 right-3 w-9 h-9  cursor-pointer flex items-center justify-center rounded-full shadow-md transition-all ring-0 focus:outline-none ${
                    likedTrips.includes(trip.id)
                      ? "text-rose-500 bg-white/90"
                      : "text-white bg-black/30"
                  }`}
                  aria-label={likedTrips.includes(trip.id) ? "Unlike" : "Like"}
                >
                  <FaHeart size={16} />
                </button> */}

                <button
                  onClick={() => toggleLike(trip.id)}
                  className={`absolute top-3 right-3 w-9 h-9 cursor-pointer flex items-center justify-center rounded-full shadow-md transition-all ring-0 focus:outline-none ${
                    likedTrips.includes(trip.id)
                      ? "text-rose-500 bg-white/90"
                      : "text-white bg-black/30"
                  }`}
                  aria-label={
                    likedTrips.includes(trip.id)
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  <FaHeart size={16} aria-hidden="true" focusable="false" />
                </button>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4 flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight mb-1 truncate">
                      {trip.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-1">
                      {trip.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start">
                    {/* <span className="flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                      <span className="font-bold">{trip.host.match}%</span>{" "}
                      Match
                    </span> */}

                    <span className="flex items-center gap-1 bg-green-700 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                      <span className="font-bold">{trip.host.match}%</span>{" "}
                      Match
                    </span>

                    <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                      <FaExclamationTriangle /> {trip.spotsLeft} spots left
                    </span>

                    {/* <span className="flex items-center gap-1 bg-red-700 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                      <FaExclamationTriangle /> {trip.spotsLeft} spots left
                    </span> */}
                  </div>
                </div>

                {/* Tags */}

                <div className="flex flex-wrap gap-2 mt-2 mb-3">
                  {trip.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-500 text-xs font-medium px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>

                    // <span
                    //   key={tag}
                    //   className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-md"
                    // >
                    //   {tag}
                    // </span>
                  ))}
                </div>

                <div className="flex flex-col items-start gap-2 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white border-2 border-gray-400 inline-block" />
                    <span className="truncate">{trip.from}</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Image
                      src={dots}
                      alt="dot"
                      width={0}
                      height={0}
                      className="my-1 ml-1.5 -mt-3 -mb-5"
                    />
                  </div>

                  <div className="flex items-center gap-1 -mt-2 -ml-1">
                    <GoDotFill className="text-black text-base w-5 h-5" />
                    <span className="truncate">{trip.to}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-15 mt-2 text-sm text-gray-600 mb-5">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <FaCalendar className="text-gray-600" />
                    <div className="truncate">{trip.date}</div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <FaWallet />
                    <div className="truncate">{trip.price}</div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <FaFlag />
                    <span>30 Trips Completed</span>
                  </div>
                </div>

                <hr className="my-2 mt-2" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`relative flex items-center justify-center text-xl sm:text-2xl rounded-full font-semibold border ${catStyle.avatarBg} w-12 h-12 sm:w-14 sm:h-14 shrink-0`}
                    >
                      {/* <div
                      className={`relative flex items-center justify-center text-white text-lg sm:text-2xl rounded-full font-semibold border ${
                        catStyle.avatarBg || "bg-blue-700"
                      } w-10 h-10 sm:w-14 sm:h-14 shrink-0`}
                    > */}
                      <span className="select-none truncate">
                        {trip.host.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </span>

                      {trip.host.category !== "Travel Enthusiast" && (
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                          <PiMedalDuotone
                            className={
                              trip.host.category === "Featured Trip Leader"
                                ? "text-yellow-500"
                                : "text-orange-500"
                            }
                            size={12}
                          />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm sm:text-md font-semibold text-gray-900 flex items-center gap-1 truncate">
                        <span className="truncate">
                          {trip.host.name}, {trip.host.age}
                        </span>
                        {trip.host.verified && (
                          <FaCheckCircle className="inline text-green-500 ml-1 w-4 h-4" />
                        )}
                      </p>

                      <div className="flex gap-2 items-center">
                        <p className="text-xs text-gray-600 mt-1 flex items-center truncate">
                          {trip.host.location} •
                          <FaStar className="text-yellow-500 w-3.5 h-3.5 ml-1 mr-1.5" />
                          {trip.host.rating}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-1 -ml-0.5 flex-wrap">
                        <div
                          className={`flex items-center gap-1 text-xs px-1 py-0.5 rounded-md font-medium ${catStyle.bg}`}
                        >
                          <FaUser />
                          <span className="truncate">{trip.host.category}</span>
                        </div>
                        <div>
                          <span
                            className={getSafeScoreStyle(trip.host.safeScore)}
                          >
                            <FaShieldAlt /> {trip.host.safeScore}% Safe
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-2 flex-wrap">
                    <button
                      onClick={handleViewTrips}
                      className="bg-[#1D4350] text-white text-xs px-3 py-2 hover:bg-[#173844] cursor-pointer flex items-center justify-center h-8 w-26  "
                    >
                      <Image
                        src={TripImg}
                        alt="View Trip Icon"
                        width={10}
                        height={10}
                        className="mr-1 filter brightness-0 invert"
                      />
                      <span className="truncate">View Trip</span>
                    </button>

                    <button className="bg-[#1D4350] text-white text-xs px-3 py-2 hover:bg-[#173844] cursor-pointer flex items-center justify-center h-8 w-26  ">
                      <Image
                        src={Join}
                        alt="Join Trip Icon"
                        width={10}
                        height={10}
                        className="mr-1 filter brightness-0 invert"
                      />
                      <span className="truncate">Join Trip</span>
                    </button>

                    <button
                      onClick={handleViewProfile}
                      className="bg-[#1D4350] text-white text-xs px-3 py-2 hover:bg-[#173844] cursor-pointer flex items-center justify-center h-8 w-26 "
                    >
                      <Image
                        src={Profile}
                        alt="View Profile Icon"
                        width={10}
                        height={10}
                        className="mr-1 filter brightness-0 invert"
                      />
                      <span className="truncate">View Profile</span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
