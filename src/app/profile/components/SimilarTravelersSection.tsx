"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaCheckCircle,
  FaCircle,
  FaRegCircle,
  FaRupeeSign,
} from "react-icons/fa";
import { travelers } from "../data/profileData";

export default function SimilarTravelersSection() {
  const [currentImage, setCurrentImage] = useState(
    new Array(travelers.length).fill(0)
  );

  const handleNext = (index: number, total: number) => {
    const updated = [...currentImage];
    updated[index] = (updated[index] + 1) % total;
    setCurrentImage(updated);
  };

  const handlePrev = (index: number, total: number) => {
    const updated = [...currentImage];
    updated[index] = updated[index] === 0 ? total - 1 : updated[index] - 1;
    setCurrentImage(updated);
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-[#121212]">
        Similar Travelers
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {travelers.slice(0, 3).map((t, index) => (
          <div
            key={index}
            className="min-w-[80px] bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {/* Image Section with Arrows */}
            <div className="relative">
              <img
                src={t.images[currentImage[index]]}
                alt={t.name}
                className="w-full h-32 object-cover transition-all duration-500 ease-in-out blur-md"
              />

              {/* Match Badge */}
              <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-normal px-2 py-1 rounded-full shadow-sm">
                {t.match}% Match
              </div>

              {/* Spots Badge */}
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-normal px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                <Image
                  src="/ic_round-warning-amber.png"
                  alt="Warning"
                  width={14}
                  height={14}
                  className="filter invert"
                />
                {t.spots} spots left
              </div>

              {/* Left Arrow */}
              <button
                onClick={() => handlePrev(index, t.images.length)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-1.5 rounded-full shadow"
              >
                <FaChevronLeft size={14} />
              </button>

              {/* Right Arrow */}
              <button
                onClick={() => handleNext(index, t.images.length)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-1.5 rounded-full shadow"
              >
                <FaChevronRight size={14} />
              </button>

              {/* Traveler Info */}
              <div className="absolute bottom-2 left-3 text-white drop-shadow-md">
                <h3 className="text-sm font-normal flex items-center gap-1">
                  {t.name},<span className="font-bold text-2xl">{t.age}</span>{" "}
                  <Image
                    src="/ic_baseline-check-circle-outline.png"
                    alt="Verified"
                    width={16}
                    height={16}
                    className="[filter:invert(0)_sepia(1)_saturate(5)_hue-rotate(100deg)]"
                  />
                </h3>
                <p className="text-xs">{t.location}</p>
              </div>

              {/* Rating Badge */}
              <div className="absolute bottom-2 right-20 bg-white text-black text-xs font-normal px-2 py-1 rounded-full shadow-sm flex items-center gap-1 mr-2">
                <FaStar className="text-yellow-400" /> 4.1
              </div>

              {/* Match Badge */}
              <div className="absolute bottom-2 right-2 bg-green-500 text-white text-xs font-normal px-2 py-1 rounded-full shadow-sm flex items-center gap-1">
                <FaCheckCircle className="text-white" /> 88%
              </div>
            </div>

            {/* Card Body */}
            <div className="p-2">
              {/* Locations */}
              <div className="text-xs text-gray-600 space-y-1 mb-3">
                <div className="flex items-center gap-2">
                  <FaCircle className="text-black text-xs" />
                  <span>{t.from}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-px h-4 border-l-2 border-dotted border-black"></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaRegCircle className="text-black text-xs" />
                  <span>{t.to}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="flex items-center gap-2">
                    <Image
                      src="/calender.png"
                      alt="Calendar"
                      width={16}
                      height={16}
                    />{" "}
                    {t.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaRupeeSign className="text-gray-400" /> {t.price}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {t.tags.slice(0, 3).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-red-50 text-red-500 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {t.tags.length > 3 && (
                  <span className="text-red-500 text-xs font-bold">...</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mb-3">
                <button className="flex items-center justify-center gap-2 flex-1 border border-red-400 text-red-500 text-sm font-medium py-1.5 hover:bg-red-50 hover:scale-105 transition-all duration-200">
                  <Image
                    src="/view-profile.png"
                    alt="View Profile"
                    width={20}
                    height={20}
                    className="[filter:invert(0%)_sepia(100%)_saturate(7500%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)]"
                  />{" "}
                  View Profile
                </button>
                <button className="flex items-center justify-center gap-2 flex-1 border border-red-400 text-red-500 text-sm font-medium py-1.5 hover:bg-red-50 hover:scale-105 transition-all duration-200">
                  <Image
                    src="/view-trip.png"
                    alt="View Trip"
                    width={24}
                    height={24}
                    className="[filter:invert(0%)_sepia(100%)_saturate(7500%)_hue-rotate(0deg)_brightness(100%)_contrast(100%)]"
                  />{" "}
                  View Trip
                </button>
              </div>

              {/* Join Trip */}
              <button className="w-full bg-red-400 hover:bg-red-500 text-white text-sm font-semibold py-2 flex items-center justify-center gap-2 hover:scale-105 transition-all duration-200">
                <Image
                  src="/join-trip.png"
                  alt="Join Trip"
                  width={20}
                  height={20}
                  className="filter invert"
                />{" "}
                Join Trip
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
