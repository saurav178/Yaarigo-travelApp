"use client";
import { MapPin, Calendar, Users } from "lucide-react";

interface PastTripCardProps {
  trip: {
    id?: string;
    title: string;
    location: string;
    date: string;
    travelers: number;
    joined: number;
    image: string;
    travelerImages: string[];
  };
}

export default function PastTripCard({ trip }: PastTripCardProps) {
  return (
    <div
      className="flex flex-col md:flex-row items-center md:items-start bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 p-4 md:p-5"
    >
      <div className="w-full md:w-64 h-48 overflow-hidden">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{trip.title}</h3>

          <div className="flex items-center text-gray-600 text-sm mt-1 space-x-4">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {trip.location}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {trip.date}
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {trip.travelers}
            </div>
          </div>
        </div>

        <div className="flex items-center mt-3">
          <div className="flex -space-x-2">
            {trip.travelerImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Traveler ${i + 1}`}
                className="w-[30px] h-[30px] rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <p className="ml-3 text-sm text-gray-600">
            {trip.joined} travelers joined
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          <button className="border border-[#1D4350] text-[#1D4350] px-6 py-2.5 font-medium hover:bg-[#1D4350]/10 hover:scale-105 transition-all duration-200">
            View Trip Details
          </button>
        </div>
      </div>
    </div>
  );
}
