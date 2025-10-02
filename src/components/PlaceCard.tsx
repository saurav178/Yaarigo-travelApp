"use client";

import { MapPin } from "lucide-react";

interface PlaceCardProps {
  name: string;
  address: string;
  photoRef?: string; // Google photo reference or undefined
}

// Map place names to local images
const imageMap: Record<string, string> = {
  "Cozy Inn": "/images/places/cozy-inn.jpg",
  "Delicious Bites": "/images/places/delicious-bites.jpg",
  "Speedy Rides": "/images/places/speedy-rides.jpg",
  "Wellness Clinic": "/images/places/wellness-clinic.jpg",
  "Money Exchange": "/images/places/money-exchange.jpg",
  // Add more mappings here if needed
};

export default function PlaceCard({ name, address, photoRef }: PlaceCardProps) {
  // Use Google photo if available, otherwise use local image
  const localImage = imageMap[name] || "/images/places/default.jpg"; // fallback
  const photoUrl = photoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    : localImage;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden w-64">
      <img src={photoUrl} alt={name} className="w-full h-32 object-cover" />
      <div className="p-3">
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="w-4 h-4 text-blue-500" />
          {address}
        </p>
      </div>
    </div>
  );
}
