// LeaderTrips

"use client";

import { useState } from "react";
import Image from "next/image";

import { GoDotFill } from "react-icons/go";

import {
  FaExclamationTriangle,
  FaUser,
  FaHeart,
  FaCheckCircle,
  FaShieldAlt,
  FaWallet,
  FaFlag,
  FaCalendarAlt,
  // FaMapMarkerAlt,
} from "react-icons/fa";
import { PiMedalDuotone } from "react-icons/pi";

import type { Leader } from "../types/types";
import { LEADERS_DEMO } from "../data/data";
import dots from "../../../../public/searchpageimg/Line 1.png";
import TripImg from "../../../../public/searchpageimg/view_trips.png";
import Join from "../../../../public/searchpageimg/join_trips.png";
import Profile from "../../../../public/searchpageimg/view_profile.png";

type Props = { leaders?: Leader[] };

export default function LeaderTrips({ leaders = LEADERS_DEMO }: Props) {
  const [liked, setLiked] = useState<number[]>([]);

  const toggleLike = (id: number) =>
    setLiked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((s) => s[0] ?? "")
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
      return "bg-red-100 text-red-700 border border-red-300 px-1 py-[2px] rounded-md flex items-center gap-1 text-xs";
    if (score < 75)
      return "bg-yellow-100 text-yellow-800 border border-yellow-300 px-1 py-[2px] rounded-md flex items-center gap-1 text-xs";
    return "bg-green-100 text-green-700 border border-green-300 px-1 py-[2px] rounded-md flex items-center gap-1 text-xs";
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {leaders.map((trip) => {
        const catStyle = getCategoryStyle(trip.host.category);
        return (
          <div
            key={trip.id}
            className="bg-white shadow-sm border border-gray-200 flex flex-col sm:flex-row overflow-hidden h-80 w-[949px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative w-full sm:w-64 md:w-72 aspect-4/3 sm:aspect-auto">
              <Image
                src={trip.image}
                alt={trip.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-104"
                fill
                style={{ objectFit: "cover" }}
              />
              {/* <div className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
                {trip.host.match}% Match
              </div> */}
              <button
                onClick={() => toggleLike(trip.id)}
                className={`absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full ${
                  liked.includes(trip.id) ? "text-rose-500" : "text-white"
                }`}
              >
                <FaHeart size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {trip.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                    {trip.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    <span className="font-bold">{trip.host.match}%</span> Match
                  </span>

                  <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                    <FaExclamationTriangle /> {trip.spotsLeft} spots left
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2  mb-3">
                {trip.tags.map((t) => (
                  <span
                    key={t}
                    className="bg-blue-100 text-blue-500 text-xs px-2 py-0.5 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className=" flex-wrap items-center gap-3 text-sm text-gray-600 ">
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
                <div className="flex items-center -mt-2 -ml-1.5  ">
                  <GoDotFill className="text-black text-lg w-6 h-6 mr-1" />
                  {trip.to}
                </div>
              </div>

              <div className="flex items-center gap-8 text-sm text-gray-600 mb-3 mt-1">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt /> {trip.date}
                </div>
                <div className="flex items-center gap-2">
                  <FaWallet /> {trip.price}
                </div>
                <div className="flex items-center gap-2  text-sm text-gray-600">
                <FaFlag /> <span>30 Trips Completed</span>
              </div>
              </div>

              

              <hr className="my-3 -mt-0.5" />

              {/* Host + actions */}
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3 relative">
                  {/* Avatar */}
                  <div
                    className={`relative w-15 h-15 -ml-2.5 flex items-center justify-center rounded-full font-semibold text-2xl border ${catStyle.avatarBg}`}
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

                  {/* Right side */}
                  <div className="flex flex-col">
                    <p className="text-md font-semibold text-gray-900  items-center gap-1 flex">
                      {trip.host.name}, {trip.host.age}
                      {trip.host.verified && (
                        // <FaCheckCircle className="text-sky-500" />
                        
                            <FaCheckCircle className="inline text-green-500 ml-1 w-5 h-5" />
                          
                      )}
                    </p>

                    <p className="text-xs text-gray-600 mt-1">
                      {trip.host.location} • ⭐ {trip.host.rating}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className={`flex items-center gap-1 text-xs px-1 py-0.5 rounded-md font-small ${catStyle.bg}`}
                      >
                        <FaUser />
                        {trip.host.category}
                      </span>

                      <span className={getSafeScoreStyle(trip.host.safeScore)}>
                        <FaShieldAlt /> {trip.host.safeScore}% Safe
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="bg-[#1D4350] text-white text-xs px-1 py-1 cursor-pointer hover:bg-[#173844] flex items-center justify-center h-8 w-26">
                    <Image
                      src={TripImg}
                      alt="View Trip Icon"
                      width={10}
                      height={10}
                      className="mr-1 filter brightness-0 invert"
                    />{" "}
                    View Trip
                  </button>
                  <button className="bg-[#1D4350] text-white text-xs px-1 py-1 cursor-pointer  hover:bg-[#173844] flex items-center justify-center h-8 w-26">
                    <Image
                      src={Join}
                      alt="Join Trip Icon"
                      width={20}
                      height={20}
                      className="mr-1 filter brightness-0 invert"
                    />{" "}
                    Join Trip
                  </button>
                  <button className="bg-[#1D4350] text-white text-xs px-1 py-1 cursor-pointer  hover:bg-[#173844] flex items-center justify-center h-8 w-27">
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
        );
      })}
    </div>
  );
}
