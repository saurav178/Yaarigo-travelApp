// AgencyCard

"use client";

import { useState } from "react";
// import { FcBusiness } from "react-icons/fc";
import { ImUsers } from "react-icons/im";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import Image from "next/image";
import Trip from "../../../../public/searchpageimg/view_trips.png";
import Profile from "../../../../public/searchpageimg/view_profile.png";
import { FaUserGroup } from "react-icons/fa6";
import {
  FaCheckCircle,
  // FaBriefcase,
  FaSuitcase,
  FaHeart,
  FaStar,
  FaShieldAlt,
  FaFlag,
  FaExclamationTriangle,
} from "react-icons/fa";
import { PiMedalDuotone } from "react-icons/pi";

import type { Agency } from "../types/types";

export default function AgencyCard({ agency }: { agency: Agency }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked((prev) => !prev);
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
          bg: "bg-blue-100 text-blue-800 border-blue-300",
          avatarBg: "bg-blue-500 text-white",
        };
      case "Featured Trip Leader":
        return {
          bg: "bg-yellow-100 text-yellow-800 border-yellow-300",
          avatarBg: "bg-yellow-500 text-white",
        };
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

  const catStyle = getCategoryStyle(agency.host.category);

  const router = useRouter();

  const handleProfAgency = () => {
    router.push(ROUTES.VIEW_PROFILE);
  };

  return (
    <div className="bg-white shadow-sm border border-gray-200 flex flex-col sm:flex-row overflow-hidden h-80 w-full hover:shadow-[0_12px_20px_-6px_rgba(0,0,0,0.25)] transition-shadow duration-300 ">
      {/* Left Image Section */}
      <div className="relative flex shrink-0 w-full sm:w-64 md:w-72 h-[180px] sm:h-auto">
        <div className="relative w-full h-full overflow-hidden group">
          <Image
            src={agency.image}
            alt={agency.title}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            unoptimized={false}
          />
        </div>

        {/* {agency.verified && (
          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Verified
          </span>
        )} */}

        <button
          onClick={toggleLike}
          aria-pressed={liked}
          className={`absolute top-3 right-3 w-8 h-8 flex cursor-pointer items-center justify-center rounded-full transition ${
            liked ? "text-rose-500" : "text-white"
          }`}
        >
          <FaHeart size={18} />
        </button>
      </div>

      {/* Right Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h2
                id={`agency-${agency.id}-heading`}
                className="text-lg font-semibold text-gray-900 leading-tight mb-2"
              >
                {agency.title}
              </h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2 mb-1">
                {agency.description}
              </p>
            </div>

            {agency.spotsLeft > 0 && (
              <div className="flex items-center gap-1">
                {agency.verified && (
                  <span className=" bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Verified
                  </span>
                )}

                <span className="flex gap-2 items-center bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                  <FaExclamationTriangle /> {agency.spotsLeft} spots left
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2 mb-1">
            {agency.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-500 text-xs font-medium px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className=" flex-wrap gap-8 text-sm text-gray-600 mb-4 ">
            <div className="flex items-center gap-3 mt-3">
              <ImUsers />
              <span>
                <strong>{agency.stats.travelersEnrolled}</strong> travelers
                enrolled
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <FaFlag className="text-gray-600" />{" "}
              <span>
                <strong>{agency.stats.tripsCompleted}</strong> trips completed
              </span>
            </div>

            {/* <div className="flex items-center gap-2 mt-2">
              <FcBusiness />
              <span>
                <strong>{agency.stats.yearsInBusiness}</strong> years in
                business
              </span>
            </div> */}
            <div className="flex items-center gap-2 mt-2">
  <FaSuitcase className="text-gray-600" />
  <span>
    <strong>{agency.stats.yearsInBusiness}</strong> years in business
  </span>
</div>


{/* 
            <div className="flex items-center gap-2 mt-2">
  <FaBriefcase className="text-black" />
  <span>
    <strong>{agency.stats.yearsInBusiness}</strong> years in business
  </span>
</div> */}
          </div>

          <hr className="my-3 " />
        </div>

        {/* Host Info & Actions */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-3">
            <div
              className={`relative w-15 h-15 flex items-center justify-center rounded-full font-semibold text-2xl border ${catStyle.avatarBg}`}
            >
              {getInitials(agency.host.name)}

              {agency.host.category !== "Travel Enthusiast" && (
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow">
                  <PiMedalDuotone
                    className={`${
                      agency.host.category === "Featured Trip Leader"
                        ? "text-yellow-500"
                        : "text-orange-500"
                    }`}
                    size={12}
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <p className="text-md font-semibold text-gray-900 flex">
                {agency.host.name}, {agency.host.age}{" "}
                {agency.host.verified && (
                  // <FaCheckCircle className="inline text-sky-500 ml-1" />

                  <FaCheckCircle className="inline text-green-500 ml-1 w-5 h-5" />
                )}
              </p>
              {/* <p className="text-xs text-gray-600 mt-1">
                {agency.host.location} • ⭐ {agency.host.rating}
              </p> */}

              <p className="text-xs text-gray-600 mt-1 flex items-center  ">
                {agency.host.location} •
                <FaStar className="text-yellow-500 w-3.5 h-3.5 ml-1 mr-1.5" />
                {agency.host.rating}
              </p>
              <div className="flex items-center gap-2 mt-1 -ml-0.5">
                <div
                  className={`flex items-center  text-xs px-1 py-0.5 rounded-md font-medium gap-1  ${catStyle.bg}`}
                >
                  <div className=" ">
                    {" "}
                    <FaUserGroup />
                  </div>
                  <div className="">{agency.host.category}</div>
                </div>
                <span className={getSafeScoreStyle(agency.host.safeScore)}>
                  <FaShieldAlt /> {agency.host.safeScore}% Safe
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-5 mb-4 ">
            <button className="bg-[#1D4350] text-white text-xs  px-1 py-1  cursor-pointer hover:bg-[#173844] flex items-center justify-center h-8 w-35">
              <Image
                src={Trip}
                alt="View Trip Icon"
                width={10}
                height={10}
                className="mr-1 filter brightness-0 invert"
              />{" "}
              Browse Trips
            </button>

            <button
              onClick={handleProfAgency}
              className="bg-[#1D4350] text-white text-xs px-1 py-1  cursor-pointer hover:bg-[#173844] flex items-center justify-center h-8 w-35"
            >
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
}
