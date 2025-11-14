"use client";
import { Star } from "lucide-react";

interface AgencyCardProps {
  image: string;
  name: string;
  rating?: number;
  trips?: number;
}

export default function AgencyCard({ image, name, rating = 4.5, trips = 5 }: AgencyCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg hover:shadow-sm transition-shadow duration-200 cursor-pointer">
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1">
        <div className="font-semibold text-sm text-gray-900">{name}</div>
        <div className="flex items-center gap-2 text-xs text-gray-600 mt-0.5">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{rating}</span>
          </div>
          <span>•</span>
          <span>{trips} Trips</span>
        </div>
      </div>
    </div>
  );
}
