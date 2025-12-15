// Similar Traveler

"use client";

import { useState } from "react";
import Image from "next/image";

import {
  FaUser,
  FaStar,
  FaCheckCircle,
  FaCalendar,
  FaHeart,
  FaShieldAlt,
  FaFlag,
  FaExclamationTriangle,
  FaWallet,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { GoDotFill } from "react-icons/go";
import { PiMedalDuotone } from "react-icons/pi";

import type { SimilarTrip } from "../../searchtrip/types/types";
import { SIMILAR_TRIPS_DEMO } from "../../searchtrip/data/data";
import dots from "../../../../public/searchpageimg/Line 1.png";
import TripImg from "../../../../public/searchpageimg/view_trips.png";
import Join from "../../../../public/searchpageimg/join_trips.png";
import Profile from "../../../../public/searchpageimg/view_profile.png";

type Props = {
  trips?: SimilarTrip[];
};

export default function Similar({ trips = SIMILAR_TRIPS_DEMO }: Props) {
  const [likedTrips, setLikedTrips] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const toggleLike = (id: number) =>
    setLikedTrips((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % trips.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + trips.length) % trips.length);
  };

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

  const trip = trips[currentIndex];
  const catStyle = getCategoryStyle(trip.host.category);

  return (
    <div className="border-r border-gray-300 shadow-lg ml-2 ">
      <main className="flex flex-col items-center w-full flex-1 px-4 mt-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 mt-6 ml-10 self-start">Similar Travelers</h2>
        <div className="relative w-full max-w-6xl flex self-start ml-12">
        <button
          onClick={prevCard}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
        >
          <FaChevronLeft size={20} />
        </button>
        <div className="relative w-full max-w-5xl bg-gray-50 py-2">
          <button
            onClick={nextCard}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
          >
            <FaChevronRight size={20} />
          </button>
          <div className="bg-white shadow-sm border border-gray-200 flex flex-col sm:flex-row h-auto sm:h-80 hover:shadow-[0_12px_20px_-6px_rgba(0,0,0,0.25)] transition-shadow duration-300 mb-4">
            {/* Left Image */}
            <div className="relative flex shrink-0 w-full sm:w-80 md:w-96 h-[180px] sm:h-auto">
              <div className="relative w-full h-full overflow-hidden group">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized={false}
                />
              </div>

              {/* Like Button */}
              <button
                onClick={() => toggleLike(trip.id)}
                className={`absolute top-3 right-3 w-8 h-8 cursor-pointer flex items-center justify-center rounded-full transition ${
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
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {trip.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    <span className="font-bold">{trip.host.match}%</span>{" "}
                    Match
                  </span>

                  <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                    <FaExclamationTriangle /> {trip.spotsLeft} spots left
                  </span>
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
                ))}
              </div>

              <div className="flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-white border-2 border-gray-400 inline-block mr-1"></span>{" "}
                  {trip.from}
                </div>
                <Image
                  src={dots}
                  alt="dot"
                  className="ml-1.5 -mt-1"
                  width={0}
                  height={0}
                />
                <div className="flex items-center -mt-2 -ml-1.5">
                  <GoDotFill className="text-black text-lg w-6 h-6 mr-1" />
                  {trip.to}
                </div>
              </div>

              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 mb-1">
                <div className="flex items-center gap-2">
                  <FaCalendar className="text-gray-600" />
                  <div>{trip.date}</div>
                </div>

                <div className="flex items-center gap-2">
                  <FaWallet />
                  <div>{trip.price}</div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaFlag /> <span>25 Trips Completed</span>
                </div>
              </div>

              <hr className="my-3" />

              {/* Host Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 relative">
                  <div
                    className={`relative w-12 h-12 flex items-center justify-center rounded-full font-semibold text-lg border ${catStyle.avatarBg}`}
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
                    <p className="text-sm font-semibold text-gray-900 flex">
                      {trip.host.name}, {trip.host.age}{" "}
                      {trip.host.verified && (
                        <FaCheckCircle className="inline text-green-500 ml-1 w-4 h-4" />
                      )}
                    </p>

                    <div className="flex gap-2">
                      <p className="text-xs text-gray-600 mt-1 flex items-center">
                        {trip.host.location} •
                        <FaStar className="text-yellow-500 w-3 h-3 ml-1 mr-1" />
                        {trip.host.rating}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <div
                        className={`flex items-center gap-1 text-xs px-1 py-0.5 rounded-md font-medium ${catStyle.bg}`}
                      >
                        <FaUser />
                        {trip.host.category}
                      </div>
                      <span
                        className={getSafeScoreStyle(trip.host.safeScore)}
                      >
                        <FaShieldAlt /> {trip.host.safeScore}% Safe
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="bg-[#1D4350] text-white text-xs px-2 py-1 cursor-pointer hover:bg-[#173844] flex items-center justify-center h-8 w-20">
                    <Image
                      src={TripImg}
                      alt="View Trip Icon"
                      width={10}
                      height={10}
                      className="mr-1 filter brightness-0 invert"
                    />{" "}
                    View Trip
                  </button>
                  <button className="bg-[#1D4350] text-white text-xs px-2 py-1 cursor-pointer hover:bg-[#173844] flex items-center justify-center h-8 w-24">
                    <Image
                      src={Join}
                      alt="Join Trip Icon"
                      width={15}
                      height={15}
                      className="mr-1 filter brightness-0 invert"
                    />{" "}
                    Join Trip
                  </button>
                  <button className="bg-[#1D4350] text-white text-xs px-2 py-1 cursor-pointer hover:bg-[#173844] flex items-center justify-center h-8 w-24">
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
      </div>
    </main>
    </div>
  );
}