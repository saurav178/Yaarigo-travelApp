"use client";

import { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Check, 
  ChevronDown, 
  ChevronUp,
  Car,
  Hotel,
  Utensils,
  Camera,
  Plane,
  Ship,
  Mountain,
  Palmtree,
  Activity
} from "lucide-react";
import { ItineraryItem } from "./types";

interface ItineraryCardProps {
  itinerary: ItineraryItem[];
}

// Helper function to get icon based on block type
const getBlockIcon = (type?: string) => {
  const typeLower = type?.toLowerCase() || "";
  
  if (typeLower.includes("transport") || typeLower.includes("car") || typeLower.includes("bus")) {
    return <Car className="w-4 h-4" />;
  }
  if (typeLower.includes("flight") || typeLower.includes("plane") || typeLower.includes("air")) {
    return <Plane className="w-4 h-4" />;
  }
  if (typeLower.includes("boat") || typeLower.includes("ship") || typeLower.includes("cruise")) {
    return <Ship className="w-4 h-4" />;
  }
  if (typeLower.includes("hotel") || typeLower.includes("accommodation") || typeLower.includes("stay")) {
    return <Hotel className="w-4 h-4" />;
  }
  if (typeLower.includes("meal") || typeLower.includes("food") || typeLower.includes("dinner") || typeLower.includes("lunch") || typeLower.includes("breakfast")) {
    return <Utensils className="w-4 h-4" />;
  }
  if (typeLower.includes("sightsee") || typeLower.includes("tour") || typeLower.includes("visit")) {
    return <Camera className="w-4 h-4" />;
  }
  if (typeLower.includes("adventure") || typeLower.includes("trek") || typeLower.includes("hike")) {
    return <Mountain className="w-4 h-4" />;
  }
  if (typeLower.includes("beach") || typeLower.includes("relax") || typeLower.includes("leisure")) {
    return <Palmtree className="w-4 h-4" />;
  }
  if (typeLower.includes("activity") || typeLower.includes("event")) {
    return <Activity className="w-4 h-4" />;
  }
  
  // Default icon
  return <MapPin className="w-4 h-4" />;
};

// Helper to get background color for block type
const getBlockColor = (type?: string): string => {
  const typeLower = type?.toLowerCase() || "";
  
  if (typeLower.includes("transport") || typeLower.includes("car") || typeLower.includes("bus") || typeLower.includes("flight") || typeLower.includes("plane")) {
    return "bg-blue-50 text-blue-700 border-blue-200";
  }
  if (typeLower.includes("hotel") || typeLower.includes("accommodation") || typeLower.includes("stay")) {
    return "bg-purple-50 text-purple-700 border-purple-200";
  }
  if (typeLower.includes("meal") || typeLower.includes("food") || typeLower.includes("dinner") || typeLower.includes("lunch") || typeLower.includes("breakfast")) {
    return "bg-orange-50 text-orange-700 border-orange-200";
  }
  if (typeLower.includes("sightsee") || typeLower.includes("tour") || typeLower.includes("visit")) {
    return "bg-green-50 text-green-700 border-green-200";
  }
  if (typeLower.includes("adventure") || typeLower.includes("trek") || typeLower.includes("hike")) {
    return "bg-red-50 text-red-700 border-red-200";
  }
  if (typeLower.includes("beach") || typeLower.includes("relax") || typeLower.includes("leisure")) {
    return "bg-teal-50 text-teal-700 border-teal-200";
  }
  
  return "bg-gray-50 text-gray-700 border-gray-200";
};

interface DaySectionProps {
  day: ItineraryItem;
  dayIndex: number;
}

function DaySection({ day, dayIndex }: DaySectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const activities = day.activities || [];
  const blocks = day.blocks || [];

  return (
    <div className="relative">
      {/* Timeline indicator */}
      <div className="absolute left-0 top-6 z-10 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[#276074] text-white flex items-center justify-center text-sm font-bold shadow-md">
          {dayIndex + 1}
        </div>
        {/* Connecting line */}
        {dayIndex < (dayIndex + 1) && (
          <div className="w-0.5 h-full bg-[#276074]/20 absolute top-8" />
        )}
      </div>

      {/* Day Content */}
      <div className="ml-10">
        {/* Day Header - Always visible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-start justify-between gap-4 p-4 bg-gradient-to-r from-[#276074]/5 to-transparent rounded-xl hover:from-[#276074]/10 transition-all duration-200 group"
        >
          <div className="text-left">
            <p className="text-xs font-bold text-[#276074] uppercase tracking-wide mb-1">
              Day {dayIndex + 1}
            </p>
            <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#276074] transition-colors">
              {day.dayTitle}
            </h3>
            {day.summary && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {day.summary}
              </p>
            )}
          </div>
          <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 text-gray-400 group-hover:text-[#276074] transition-colors">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </button>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="mt-2 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-300">
            {/* Activities Section */}
            {activities.length > 0 && (
              <div className="ml-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#276074]" />
                  Activities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activities.map((activity, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-2 p-2.5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">
                        {activity.name || activity.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blocks Section */}
            {blocks.length > 0 && (
              <div className="ml-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#276074]" />
                  Itinerary Details
                </h4>
                <div className="space-y-3">
                  {blocks.map((block, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                    >
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border ${getBlockColor(block.type)}`}>
                        {getBlockIcon(block.type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-semibold text-gray-900 text-sm">
                            {block.title || "Untitled"}
                          </h5>
                          {block.time && (
                            <span className="flex items-center gap-1 text-xs text-gray-500 whitespace-nowrap">
                              <Clock className="w-3 h-3" />
                              {block.time}
                            </span>
                          )}
                        </div>
                        
                        {block.location && (
                          <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3 flex-shrink-0" />
                            <span className="truncate">{block.location}</span>
                          </div>
                        )}
                        
                        {block.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {block.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state for expanded day with no content */}
            {activities.length === 0 && blocks.length === 0 && day.summary && (
              <div className="ml-2 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                <p className="text-sm text-gray-500 text-center">
                  No additional details for this day
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ItineraryCard({ itinerary }: ItineraryCardProps) {
  if (itinerary.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
        <MapPin className="w-5 h-5 text-[#276074]" />
        Detailed Itinerary
      </h2>
      
      <div className="relative">
        {itinerary.map((day, index) => (
          <DaySection 
            key={index} 
            day={day} 
            dayIndex={index} 
          />
        ))}
      </div>
    </div>
  );
}

