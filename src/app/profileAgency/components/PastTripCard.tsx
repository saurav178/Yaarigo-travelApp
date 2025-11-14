"use client";
import { MapPin, Calendar, Users } from "lucide-react";

interface PastTripCardProps {
  trip: {
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
    <div className="bg-white rounded-xl shadow-sm border border-black overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <img
          src={trip.image}
          alt={trip.title}
          className="w-full sm:w-64 h-48 object-cover"
        />
        <div className="flex-1 p-5">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{trip.title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
            <div className="flex items-center gap-1.5">
  <MapPin className="w-4 h-4" />
  <span>{trip.location}</span>
</div>
<div className="flex items-center gap-1.5">
  <Calendar className="w-4 h-4" />
  <span>{trip.date}</span>
</div>
<div className="flex items-center gap-1.5">
  <Users className="w-4 h-4" />
  <span>{trip.travelers}</span>
</div>

          </div>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex -space-x-2">
              {trip.travelerImages.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Traveler ${i + 1}`}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {trip.joined} travelers joined
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
