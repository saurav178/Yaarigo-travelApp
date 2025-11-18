

"use client";

import { useEffect, useRef, useState } from "react";

interface DayPlan {
  title: string;
  activities: string[];
  image: string;
}

const DetailedItinerary = () => {
  const itinerary: DayPlan[] = [
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

  const [activeStep, setActiveStep] = useState(1);
  const [imageSrc, setImageSrc] = useState("/placeholder.png");

  const stepRefs = useRef<HTMLDivElement[]>([]);
  const [lineTop, setLineTop] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    setImageSrc(itinerary[0].image);
  }, []);

  useEffect(() => {
    if (stepRefs.current[0]) {
      const active = stepRefs.current[activeStep - 1].offsetTop;
      setLineTop(active + 16);
      setLineHeight(40);
    }
  }, [activeStep]);

  return (
    <section className="py-10 bg-white rounded-lg my-6">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl font-bold mb-6">Detailed Itinerary</h2>

        <div className="grid md:grid-cols-2 gap-12 items-start relative">
          {/* TIMELINE */}
          <div className="relative mt-6 md:mt-12">
            {/* Main vertical line */}
            <div className="absolute left-5 top-0 h-full w-[2px] bg-gray-300 rounded-full" />

            {/* Moving blue indicator */}
            <div
              className="absolute left-[18px] w-[3px] bg-red rounded-full transition-all duration-500"
              style={{ top: lineTop, height: lineHeight }}
            />

            {/* Steps */}
            <div className="flex flex-col gap-8 ml-12 relative">
              {itinerary.map((day, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) stepRefs.current[index] = el;
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveStep(index + 1);
                      setImageSrc(day.image);
                    }}
                    className="flex items-start gap-4 text-left w-full "
                  >
                    {/* Step circle */}
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full  transition-all duration-300 ${
                        activeStep === index + 1
                          ? "bg-red-500 text-white border-none" // Changed to bg-red-500 and text-white
                          : "bg-red-500 text-white-600"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* White Card */}
                    <div className="bg-white shadow-sm border rounded-xl p-4 w-full">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Day {index + 1}: {day.title}
                      </h3>

                      <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
                        {day.activities.map((activity, i) => (
                          <li key={i}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE SECTION */}
        <div className="flex justify-center mt-14">
            <img
              src={imageSrc}
              alt="Day Image"
              className="w-[350px] h-[350px] object-cover shadow-md transition-all duration-500" // Custom border radius removed
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailedItinerary;