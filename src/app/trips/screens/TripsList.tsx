"use client";

import { memo } from "react";
import Image from "next/image";

function TripsListComponent({ trips }: { trips: any[] }) {
  return (
    <div className="space-y-6 mt-6">
      {trips.length > 0 ? (
        trips.map((trip, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white p-4 rounded-lg shadow-md"
          >
            {/* Left Info */}
            <div className="flex-1 pr-6 pt-4">
              <p className="text-sm text-blue-500 font-medium">{trip.status}</p>
              <h3 className="text-lg font-semibold">{trip.title}</h3>
              <p className="text-sm text-blue-600 font-medium">
                {trip.days} days · {trip.cities} cities
              </p>
            </div>

            {/* Right Image */}
            <div className="mt-5 md:mt-0 w-full md:w-[280px] relative">
              <div className="relative w-full h-[150px] rounded-md overflow-hidden">
                <Image
                  src={trip.images?.[0] || "/placeholder.jpg"}
                  alt={trip.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No trips found.</p>
      )}
    </div>
  );
}

export default memo(TripsListComponent);
