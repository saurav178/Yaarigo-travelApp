// Similar

"use client";

import { useState } from "react";
import Image from "next/image";

import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaHeart,
  FaShieldAlt,
  FaFlag,
  FaExclamationTriangle,
  FaWallet,
} from "react-icons/fa";

import { GoDotFill } from "react-icons/go";
import { PiMedalDuotone } from "react-icons/pi";

import type { SimilarTrip } from "../types/types";
import { SIMILAR_TRIPS_DEMO } from "../data/data";
import dots from "../../../../public/searchpageimg/Line 1.png";
import TripImg from "../../../../public/searchpageimg/view_trips.png";
import Join from "../../../../public/searchpageimg/join_trips.png";
import Profile from "../../../../public/searchpageimg/view_profile.png";

type Props = {
  trips?: SimilarTrip[];
};

export default function Similar({ trips = SIMILAR_TRIPS_DEMO }: Props) {
  const [likedTrips, setLikedTrips] = useState<number[]>([]);
  const toggleLike = (id: number) =>
    setLikedTrips((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "Travel Enthusiast":
        return {
          bg: "bg-blue-100 text-blue-800",
          avatarBg: "bg-blue-500 text-white",
        };
      case "Featured Trip Leader":
        return {
          bg: "bg-yellow-100 text-yellow-800",
          avatarBg: "bg-yellow-500 text-white",
        };
      case "Featured Trip Agency":
        return {
          bg: "bg-orange-100 text-orange-800",
          avatarBg: "bg-orange-500 text-white",
        };
      default:
        return {
          bg: "bg-gray-100 text-gray-800",
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
    <main className="flex flex-col items-center w-[949px] flex-1">
      <div className="w-[99%] max-w-5xl flex flex-col gap-3">
        {trips.map((trip) => {
          const catStyle = getCategoryStyle(trip.host.category);

          return (
            <div
              key={trip.id}
              className="flex justify-center w-full bg-gray-50 py-2"
            >
              <div className="bg-white  shadow-sm border border-gray-200 flex flex-col sm:flex-row overflow-hidden h-80">
                {/* Left Image */}
                <div className="relative flex shrink-0 w-full sm:w-64 md:w-72 h-[180px] sm:h-auto">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                    unoptimized={false}
                  />

                  {/* Match Badge */}
                  <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                    {trip.host.match}% Match
                  </div>

                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(trip.id)}
                    className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition ${
                      likedTrips.includes(trip.id)
                        ? "text-rose-500"
                        : "text-white"
                    }`}
                  >
                    <FaHeart size={18} />
                  </button>
                </div>

                {/* Right Content */}
                <div className="flex-1 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 leading-tight mb-1">
                        {trip.title}
                      </h2>
                      <p className="text-gray-600 text-sm  line-clamp-2 mb-2">
                        {trip.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 mb-1">
                      <span className="flex gap-2 items-center bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                        <FaExclamationTriangle /> {trip.spotsLeft} spots left
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2  mb-1">
                    {trip.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className=" flex-wrap items-center gap-3 text-sm text-gray-600 ">
                    <div className="flex items-center gap-1">
                      <GoDotFill className="text-black" /> {trip.from}
                    </div>

                    <Image
                      src={dots}
                      alt="dot"
                      className="ml-1.5 -mt-3"
                      width={0}
                      height={0}
                    />
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-gray-400" /> {trip.to}
                    </div>
                  </div>

                  <div className="flex items-center gap-16 mt-1 text-sm text-gray-600 mb-2">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <div>{trip.date}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaWallet />
                      <div>{trip.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2  text-sm text-gray-600">
                    <FaFlag /> <span>25 Trips Completed</span>
                  </div>

                  <hr className="my-3 mt-3" />

                  {/* Host Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 relative">
                      <div
                        className={`relative w-12 h-12 flex items-center justify-center rounded-full font-semibold text-sm border ${catStyle.avatarBg}`}
                      >
                        {getInitials(trip.host.name)}

                        {trip.host.category !== "Travel Enthusiast" && (
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                            <PiMedalDuotone
                              className={`${
                                trip.host.category === "Featured Trip Leader"
                                  ? "text-yellow-500"
                                  : "text-orange-500"
                              }`}
                              size={12}
                            />
                          </div>
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {trip.host.name}, {trip.host.age}{" "}
                          {trip.host.verified && (
                            <FaCheckCircle className="inline text-sky-500 ml-1" />
                          )}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <div
                            className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-md font-medium ${catStyle.bg}`}
                          >
                            {trip.host.category}
                          </div>
                          <span
                            className={getSafeScoreStyle(trip.host.safeScore)}
                          >
                            <FaShieldAlt /> {trip.host.safeScore}% Safe
                          </span>
                        </div>

                        <p className="text-xs text-gray-600 mt-1">
                          {trip.host.location} • ⭐ {trip.host.rating}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="bg-[#1D4350] text-white text-xs px-1 py-1 rounded-md hover:bg-[#1D4350] flex items-center justify-center h-8 w-27">
                        <Image
                          src={TripImg}
                          alt="View Trip Icon"
                          width={10}
                          height={10}
                          className="mr-1 filter brightness-0 invert"
                        />{" "}
                        View Trip
                      </button>
                      <button className="bg-[#1D4350] text-white text-xs px-1 py-1 rounded-md hover:bg-[#1D4350] flex items-center justify-center h-8 w-27">
                        <Image
                          src={Join}
                          alt="Join Trip Icon"
                          width={20}
                          height={20}
                          className="mr-1 filter brightness-0 invert"
                        />{" "}
                        Join Trip
                      </button>
                      <button className="bg-[#1D4350] text-white text-xs px-1 py-1 rounded-md hover:bg-[#1D4350] flex items-center justify-center h-8 w-27">
                        <Image
                          src={Profile}
                          alt="View Profile Icon"
                          width={12}
                          height={12}
                          className="mr-1 filter brightness-0 invert"
                        />{" "}
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
