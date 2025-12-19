import Image from "next/image";
import { recentTrips } from "../data";

export default function RecentTrips() {
  return (
    <div className="pb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Trips</h2>
        <button className="text-[#1DA69B] hover:text-[#1D4350] font-semibold transition-colors">
          View All →
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentTrips.map((trip) => (
          <div
            key={trip.id}
            className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            {/* Trip Image with Hover Zoom */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={trip.image}
                alt={trip.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${trip.gradient} opacity-40`}
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm ${trip.status.color} shadow-lg`}
                >
                 {trip.status.label}
                </span>
              </div>

              {/* Trip Title on Image */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  {trip.title}
                </h3>
              </div>
            </div>

            {/* Card Bottom */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {trip.dates}
              </p>
              <button
                className={`w-full py-3 px-4 font-semibold transition-all duration-300 ${trip.buttonStyle}`}
              >
                {trip.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}