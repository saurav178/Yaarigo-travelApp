import { ChevronDown, ChevronUp, Hotel, Car, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { Package } from "../types";

interface ItinerarySectionProps {
  pkg: Package;
  expandedDays: number[];
  toggleDay: (index: number) => void;
}

export default function ItinerarySection({ pkg, expandedDays, toggleDay }: ItinerarySectionProps) {
  return (
    <motion.div
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Itinerary
      </h2>

      {pkg.itineraryTemplate && pkg.itineraryTemplate.length > 0 ? (
        <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
          {pkg.itineraryTemplate.map((day, index) => {
            const isExpanded = expandedDays.includes(index);

            return (
              <div key={day._id || index} className="relative pl-8">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                    isExpanded
                      ? "bg-[#276074] border-[#276074]"
                      : "bg-white border-gray-300"
                  }`}
                />

                {/* Card */}
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
                  {/* Header */}
                  <button
                    onClick={() => toggleDay(index)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
                  >
                    <div>
                      <span className="text-xs font-bold text-[#276074] uppercase tracking-wider">
                        Day {index + 1}
                      </span>
                      <h3 className="font-semibold text-gray-800 mt-1">
                        {day.dayTitle?.replace(/Day \d+/, "").trim() ||
                          `Day ${index + 1} Itinerary`}
                      </h3>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-4 border-t border-gray-100">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                          <Hotel className="w-3.5 h-3.5" />
                          Hotel
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                          <Car className="w-3.5 h-3.5" />
                          Transfer
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-medium">
                          <Utensils className="w-3.5 h-3.5" />
                          Meals
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {day.summary ||
                          "No detailed summary available for this day."}
                      </p>

                      {/* Activities */}
                      {day.activities && day.activities.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-800">
                            Activities
                          </h4>
                          <ul className="space-y-2">
                            {day.activities.map(
                              (activity, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded"
                                >
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#276074] flex-shrink-0" />
                                  <span>
                                    {activity.name ||
                                      activity.title ||
                                      "Activity"}
                                  </span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 italic">
          Itinerary details coming soon.
        </p>
      )}
    </motion.div>
  );
}