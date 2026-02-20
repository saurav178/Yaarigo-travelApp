import { MapPin } from "lucide-react";
import { ItineraryItem } from "./types";

interface ItineraryCardProps {
  itinerary: ItineraryItem[];
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  if (itinerary.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#276074]" />
        Detailed Itinerary
      </h2>
      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <div
            key={index}
            className="border-l-2 border-[#276074]/20 pl-4 pb-1 last:pb-0 relative"
          >
            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#276074]" />
            <p className="text-xs font-bold text-[#276074] uppercase mb-1">
              Day {index + 1}
            </p>
            <h3 className="font-semibold text-gray-800 text-sm">
              {day.dayTitle}
            </h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              {day.summary}
            </p>
            {day.activities && day.activities.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {day.activities.map((activity, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800"
                  >
                    {activity.name || activity.title}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}