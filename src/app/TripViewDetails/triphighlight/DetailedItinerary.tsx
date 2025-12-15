"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import RoundButton from "./RoundButton";

interface DayPlan {
  title?: string;
  location?: string;
  activities: string[];
  image?: string;
}

interface DetailedItineraryProps {
  itinerary?: DayPlan[];
}

const DetailedItinerary = ({
  itinerary: propItinerary,
}: DetailedItineraryProps) => {
  // Default/fallback itinerary
  const defaultItinerary: DayPlan[] = [
    {
      title: "Panaji",
      image:
        "https://asoulwindow.com/wp-content/uploads/2019/11/rocks-at-palolem-patnem-beach-south-goa-india-21.jpg",
      activities: [
        "Arrival & hotel check-in",
        "Evening beach walk",
        "Dinner by the sea",
      ],
    },
    {
      title: "Baga Beach",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPZZbcJXz08d0H3ikrnYg2C1_ZYw2t0Pg7Aw&s",
      activities: ["Water sports", "Shopping", "Beach shack lunch"],
    },
    {
      title: "Old Goa",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZIxl7RkH7ANBO7fW4y4CDLr4FjZq4-KscBA&s",
      activities: [
        "Visit Basilica of Bom Jesus",
        "Explore old churches",
        "Local market stroll",
      ],
    },
  ];

  // Use prop itinerary if provided, otherwise use default
  const itinerary =
    propItinerary && propItinerary.length > 0
      ? propItinerary
      : defaultItinerary;

  const [activeStep, setActiveStep] = useState(1);
  const [imageSrc, setImageSrc] = useState("/placeholder.png");

  const stepRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (itinerary[0]?.image) {
      setImageSrc(itinerary[0].image);
    }
  }, [itinerary]);

  const handleStepClick = (index: number) => {
    setActiveStep(index + 1);
    if (itinerary[index]?.image) {
      setImageSrc(itinerary[index].image);
    }
  };

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
                  key={index}
                  ref={(el) => {
                    if (el) stepRefs.current[index] = el;
                  }}
                  className="relative cursor-pointer z-10"
                  onClick={() => handleStepClick(index)}
                >
                  {/* Connecting line starting from circle center */}
                  {index < itinerary.length - 1 && (
                    <div
                      className="absolute left-[25px] bg-gray-300"
                      style={{
                        top: "50%",
                        width: "2px",
                        height: "190px",
                        transform: "translateY(0%)",
                      }}
                    ></div>
                  )}

                  <div className="flex items-start gap-4 text-left w-full">
                    {/* Circle button */}
                    <RoundButton
                      number={index + 1}
                      active={activeStep === index + 1}
                    />

                    {/* Card */}
                    <div className="bg-white shadow-lg p-4 w-full hover:shadow-2xl transition-shadow duration-300">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Day {index + 1}:{" "}
                        {day.title || day.location || "Destination"}
                      </h3>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {day.activities.map((activity, i) => (
                          <li key={i}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE SECTION */}
          <div className="relative flex justify-center mt-14 overflow-hidden w-[350px] h-[350px]">
            <Image
              src={imageSrc}
              alt="Day Image"
              fill
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedItinerary;
