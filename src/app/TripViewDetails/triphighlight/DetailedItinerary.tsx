"use client";

import { useEffect, useRef, useState } from "react";
import RoundButton from "./RoundButton";

interface DayPlan {
  _id: string;
  name: string;
  description: string;
  location?: string;
  startTime?: string;
}

interface DetailedItineraryProps {
  itinerary: DayPlan[];
}

const DetailedItinerary: React.FC<DetailedItineraryProps> = ({ itinerary }) => {
  const [activeStep, setActiveStep] = useState(1);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  const handleStepClick = (index: number) => {
    setActiveStep(index + 1);
  };

  if (!itinerary || itinerary.length === 0) return null;

  return (
    <section className="py-10 bg-white my-6 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl font-bold mb-6">Detailed Itinerary</h2>

        <div className="grid md:grid-cols-2 gap-12 items-start relative">
          {/* TIMELINE */}
          <div className="relative mt-6 md:mt-10">
            <div className="flex flex-col gap-12 ml-10 relative">
              {itinerary.map((day, index) => (
                <div
                  key={day._id}
                  ref={(el) => {
                    if (el) stepRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer z-10"
                  onClick={() => handleStepClick(index)}
                >
                  {/* Connecting line */}
                  {index < itinerary.length - 1 && (
                    <div
                      className="absolute left-6.25 bg-gray-300"
                      style={{
                        top: "50%",
                        width: "2px",
                        height: "190px",
                        transform: "translateY(0%)",
                      }}
                    ></div>
                  )}

                  <div className="flex items-start gap-4 text-left w-full">
                    <RoundButton
                      number={index + 1}
                      active={activeStep === index + 1}
                    />

                    <div className="bg-white shadow-lg p-4 w-full hover:shadow-2xl transition-shadow duration-300">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Day {index + 1}: {day.name}
                      </h3>

                      <p className="text-sm text-gray-700 mt-2">
                        {day.description}
                      </p>

                      {day.location && (
                        <p className="text-xs text-gray-500 mt-1">
                          📍 {day.location}
                        </p>
                      )}

                      {day.startTime && (
                        <p className="text-xs text-gray-500">
                          ⏰ {day.startTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Placeholder */}
          <div className="flex justify-center mt-14 items-center text-gray-400">
            Select a day to view details
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedItinerary;