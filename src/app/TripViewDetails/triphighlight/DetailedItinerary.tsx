"use client";

import { useState } from "react";
import RoundButton from "./RoundButton";

interface DayPlan {
  _id?: string;
  dayTitle?: string;
  summary?: string;
  activities?: string[];
  location?: string | { [key: string]: any };
  startTime?: string;
}

interface DetailedItineraryProps {
  itinerary?: DayPlan[];
}

const DetailedItinerary: React.FC<DetailedItineraryProps> = ({ itinerary = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Helper to safely extract strings from object or string
  const formatValue = (val: any) => {
    if (!val) return "";
    if (typeof val === "string") return val;
    if (typeof val === "object") return Object.values(val).join(", ");
    return "";
  };

  if (!itinerary || itinerary.length === 0) {
    return (
      <section className="bg-white p-6 rounded-lg shadow-md h-full">
        <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>
        <p className="text-gray-500">No itinerary available for this trip.</p>
      </section>
    );
  }

  const activeDay = itinerary[activeIndex];

  const getTitle = (day: DayPlan, index: number) =>
    formatValue(day.dayTitle) || `Day ${index + 1}`;
  const getDescription = (day: DayPlan) =>
    formatValue(day.summary) || "No description available.";
  const getLocation = (day: DayPlan) => formatValue(day.location);
  const getStartTime = (day: DayPlan) => formatValue(day.startTime);

  const visibleDaysCount = 3;
  const visibleDays = itinerary.slice(0, visibleDaysCount);
  const hiddenDays = itinerary.slice(visibleDaysCount);

  return (
    <section className="bg-white p-6 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-bold mb-6">Detailed Itinerary</h2>

      <div className="flex flex-col gap-6">
        {/* Timeline */}
        <div className="flex flex-col gap-4">
          {visibleDays.map((day, index) => (
            <div
              key={day._id || index}
              className="flex items-start gap-4 cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <RoundButton number={index + 1} active={activeIndex === index} />

              <div
                className={`p-4 w-full rounded-lg transition-all ${
                  activeIndex === index ? "bg-blue-50 shadow-xl" : "bg-white shadow-md"
                }`}
              >
                <h3 className="font-semibold text-gray-900">{getTitle(day, index)}</h3>
                <p className="text-xs text-gray-500 mt-1">{getDescription(day)}</p>
                {day.location && <p className="text-xs text-gray-400 mt-1">{getLocation(day)}</p>}
                {day.startTime && <p className="text-xs text-gray-400 mt-1">{getStartTime(day)}</p>}
              </div>
            </div>
          ))}

          {/* Dropdown for more days */}
          {hiddenDays.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-white border px-3 py-1 rounded-md shadow hover:bg-gray-100 text-sm"
              >
                More Days ▾
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white border rounded-md shadow-lg z-20">
                  {hiddenDays.map((day, idx) => {
                    const actualIndex = visibleDaysCount + idx;
                    return (
                      <div
                        key={day._id || actualIndex}
                        className="p-3 hover:bg-gray-100 cursor-pointer rounded-md"
                        onClick={() => {
                          setActiveIndex(actualIndex);
                          setDropdownOpen(false);
                        }}
                      >
                        <p className="font-medium">{getTitle(day, actualIndex)}</p>
                        <p className="text-xs text-gray-500">{getDescription(day)}</p>
                        {day.location && <p className="text-xs text-gray-400">{getLocation(day)}</p>}
                        {day.startTime && <p className="text-xs text-gray-400">{getStartTime(day)}</p>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Day Details */}
        <div className="bg-gray-50 p-4 rounded-md shadow-md">
          <h3 className="text-lg font-semibold mb-2">{getTitle(activeDay, activeIndex)}</h3>
          <p className="text-sm text-gray-700 mb-2">{getDescription(activeDay)}</p>
          {activeDay.location && <p className="text-xs text-gray-500 mb-1">{getLocation(activeDay)}</p>}
          {activeDay.startTime && <p className="text-xs text-gray-500 mb-3">{getStartTime(activeDay)}</p>}

          {activeDay.activities && activeDay.activities.length > 0 ? (
            <div>
              <h4 className="font-semibold mb-1">Activities</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                {activeDay.activities.map((act, idx) => (
                  <li key={idx}>{formatValue(act)}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No activities listed.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailedItinerary;