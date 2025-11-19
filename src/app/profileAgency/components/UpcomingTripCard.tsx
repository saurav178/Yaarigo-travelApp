import React from "react";
import Image from "next/image";
import { upcomingTrips } from "../data/upcomingTrips";

export default function UpcomingTripsTab() {
  return (
    <section className="w-full max-w-5xl mx-auto mt-4 px-4">
      <div className="flex flex-col gap-6 max-h-[800px]">
        {upcomingTrips.map((trip) => (
          <div
            key={trip.id}
            className="flex flex-col md:flex-row items-center md:items-start
            bg-white border border-gray-200 shadow-sm hover:shadow-md
            transition-shadow duration-300 p-4 md:p-5"
          >
            {/* Trip Image */}
            <div className="w-full md:w-64 h-48 overflow-hidden">
              <img
                src={trip.image}
                alt={trip.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Trip Details */}
            <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">
                  {trip.title}
                </h3>

                <div className="flex items-center text-gray-600 text-sm mt-1 space-x-4">
                  <div className="flex items-center">
                    <Image src="/location.png" width={16} height={16} alt="loc" className="mr-1" />
                    {trip.location}
                  </div>
                  <div className="flex items-center">
                    <Image src="/calender.png" width={16} height={16} alt="cal" className="mr-1" />
                    {trip.date}
                  </div>
                  <div className="flex items-center">
                    <Image src="/join-icon.png" width={16} height={16} alt="join" className="mr-1" />
                    3/6 joined
                  </div>
                </div>
              </div>

              {/* Avatars */}
              <div className="flex items-center mt-3">
                <div className="flex -space-x-2">
                  {trip.avatars.map((avatar, i) => (
                    <Image
                      key={i}
                      src={avatar}
                      alt={`Traveler ${i + 1}`}
                      width={30}
                      height={30}
                      className="rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <p className="ml-3 text-sm text-gray-600">3/6 joined</p>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-5">
                <button className="bg-[#1D4350] text-white px-6 py-2.5 font-medium hover:bg-[#0f2a35] hover:scale-105 transition-all duration-200">
                  Join Trip
                </button>
                <button className="border border-[#1D4350] text-[#1D4350] px-6 py-2.5 font-medium hover:bg-[#1D4350]/10 hover:scale-105 transition-all duration-200">
                  View trip details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



