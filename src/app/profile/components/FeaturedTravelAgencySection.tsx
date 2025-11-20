"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import { tripLeaders } from "../data/profileData";

export default function FeaturedTravelAgencySection() {
  const [imageIndexes, setImageIndexes] = useState(
    new Array(tripLeaders.length).fill(0)
  );

  const nextImage = (index: number, length: number) => {
    const updated = [...imageIndexes];
    updated[index] = (updated[index] + 1) % length;
    setImageIndexes(updated);
  };

  const prevImage = (index: number, length: number) => {
    const updated = [...imageIndexes];
    updated[index] = updated[index] === 0 ? length - 1 : updated[index] - 1;
    setImageIndexes(updated);
  };

  return (
    <section className="w-full max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-[#121212]">
        Featured Travel Agency
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tripLeaders.slice(1).map((trip, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            {/* Image Section */}
            <div className="relative">
              <img
                src={trip.images[imageIndexes[index]]}
                alt={trip.title}
                className="w-full h-36 object-cover transition-all duration-500"
              />

              {/* Verified Badge */}
              {trip.verified && (
                <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Verified
                </div>
              )}

              {/* Arrows */}
              <button
                onClick={() => prevImage(index, trip.images.length)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-1.5 rounded-full shadow"
              >
                <FaChevronLeft size={14} />
              </button>
              <button
                onClick={() => nextImage(index, trip.images.length)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/70 hover:bg-white text-gray-800 p-1.5 rounded-full shadow"
              >
                <FaChevronRight size={14} />
              </button>
            </div>

            {/* Content */}
            <div className="p-2">
              {/* Title and Rating */}
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={trip.profileImg}
                  alt="Profile"
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {trip.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <FaStar className="text-yellow-400" />
                    <span>{trip.rating}</span>
                    <span className="bg-yellow-100 text-yellow-700 text-xs font-medium px-2 py-0.5 rounded-full">
                      {trip.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 leading-relaxed mb-3">
                {trip.description}
              </p>

              {/* Stats */}
              <div className="flex justify-between text-center text-sm mb-3">
                <div>
                  <p className="text-red-500 font-semibold">{trip.trips}+</p>
                  <p className="text-gray-500">Trips</p>
                </div>
                <div>
                  <p className="text-red-500 font-semibold">
                    {trip.travelers}+
                  </p>
                  <p className="text-gray-500">Travelers</p>
                </div>
                <div>
                  <p className="text-red-500 font-semibold">{trip.years}+</p>
                  <p className="text-gray-500">Years</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {trip.tags.slice(0, 2).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-red-50 text-red-500 text-xs font-medium px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {trip.tags.length > 2 && (
                  <span className="text-red-500 text-xs font-bold">...</span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-red-400 hover:bg-red-500 text-white text-sm font-medium py-2 hover:scale-105 transition-all duration-200">
                  View Profile
                </button>
                <button className="flex-1 border border-red-400 text-red-500 hover:bg-red-50 text-sm font-medium py-2 hover:scale-105 transition-all duration-200">
                  {trip.trips > 10 ? "3 trips" : "2 trips"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}