import React from "react";
import Image from "next/image";
import { pastTrips } from "../data/profileData";

export default function PastTripsTab() {
  return (
    <section className="w-full max-w-5xl mx-auto  px-4">
      {/* Scrollable Container */}
      <div className="flex flex-col gap-6 max-h-[800px] overflow-y-auto pr-2 scroll-smooth">
        {pastTrips.map((trip, index) => (
          <div
            key={trip.id}
            className="flex items-center justify-between border border-gray-300  shadow-sm hover:shadow-md transition-all duration-300 bg-white p-4"
          >
            {/* Left Image */}
            <div className="w-full md:w-1/3">
              <img
                src={trip.image}
                alt={trip.title}
                className=" object-cover w-full h-[180px]"
              />
            </div>

            {/* Right Details */}
            <div className="flex flex-col flex-1 px-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                {trip.title}
              </h3>

              <div className="flex items-center text-sm text-gray-600 gap-5 mb-2">
                <span className="flex items-center gap-1">
                  <Image
                    src="/location.png"
                    alt="Location"
                    width={16}
                    height={16}
                  />{" "}
                  {trip.location}
                </span>
                <span className="flex items-center gap-1">
                  <Image
                    src="/calender.png"
                    alt="Calendar"
                    width={16}
                    height={16}
                  />{" "}
                  {trip.date}
                </span>
                <span className="flex items-center gap-1">
                  <Image
                    src="/join-icon.png"
                    alt="Joined"
                    width={16}
                    height={16}
                  />{" "}
                  {trip.travelers}
                </span>
              </div>

              {/* Travelers Joined */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex -space-x-2">
                  {trip.avatars.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="traveler"
                      className="w-6 h-6 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">
                  {trip.travelers} travelers joined
                </p>
              </div>

              {/* Button */}
              <button className="w-fit border border-[#1D4350] text-[#1D4350] text-sm font-medium px-4 py-2  hover:bg-[#1D4350]/10 hover:scale-105 transition-all duration-200">
                View trip details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}