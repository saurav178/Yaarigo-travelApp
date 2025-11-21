

<<<<<<< HEAD
"use client";

import { useEffect, useRef, useState } from "react";
=======
// "use client";

// import { useEffect, useRef, useState } from "react";

// interface DayPlan {
//   title: string;
//   activities: string[];
//   image: string;
// }

// const DetailedItinerary = () => {
//   const itinerary: DayPlan[] = [
//     {
//       title: "Panaji",
//       image:
//         "https://asoulwindow.com/wp-content/uploads/2019/11/rocks-at-palolem-patnem-beach-south-goa-india-21.jpg",
//       activities: [
//         "Arrival & hotel check-in",
//         "Evening beach walk",
//         "Dinner by the sea",
//       ],
//     },
//     {
//       title: "Baga Beach",
//       image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPZZbcJXz08d0H3ikrnYg2C1_ZYw2t0Pg7Aw&s",
//       activities: ["Water sports", "Shopping", "Beach shack lunch"],
//     },
//     {
//       title: "Old Goa",
//       image:
//         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZIxl7RkH7ANBO7fW4y4CDLr4FjZq4-KscBA&s",
//       activities: [
//         "Visit Basilica of Bom Jesus",
//         "Explore old churches",
//         "Local market stroll",
//       ],
//     },
//   ];

//   const [activeStep, setActiveStep] = useState(1);
//   const [imageSrc, setImageSrc] = useState("/placeholder.png");

//   const stepRefs = useRef<HTMLDivElement[]>([]);
//   const [lineTop, setLineTop] = useState(0);
//   const [lineHeight, setLineHeight] = useState(0);

//   useEffect(() => {
//     setImageSrc(itinerary[0].image);
//   }, []);

//   useEffect(() => {
//     if (stepRefs.current[0]) {
//       const active = stepRefs.current[activeStep - 1].offsetTop;
//       setLineTop(active + 16);
//       setLineHeight(40);
//     }
//   }, [activeStep]);

//   return (
//     <section className="py-10 bg-white my-6 shadow-lg hover:shadow-2xl transition-all duration-300">
//       <div className="max-w-6xl mx-auto px-6">
//         <h2 className="text-xl font-bold mb-6">Detailed Itinerary</h2>

//         <div className="grid md:grid-cols-2 gap-12 items-start relative">
//           {/* TIMELINE */}
//           <div className="relative mt-6 md:mt-12">
//             <div
//               className="absolute left-[18px] w-[3px] bg-gray transition-all duration-500"
//               style={{ top: lineTop, height: lineHeight }}
//             />
//             <div className="flex flex-col gap-12 ml-05 relative">
//               {itinerary.map((day, index) => (
//                 <div
//                   key={index}
//                   ref={(el) => {
//                     if (el) stepRefs.current[index] = el;
//                   }}
//                   className="relative"
//                 >
//                   {index < itinerary.length - 1 && (
//                     <div
//                       className="absolute left-[15px] top-8 w-[2px] bg-red-500"
//                       style={{ height: "190px", marginLeft: "10px" }} 
//                     ></div>
//                   )}

//                   <Button
//                     onClick={() => {
//                       setActiveStep(index + 1);
//                       setImageSrc(day.image);
//                     }}
//                     className="flex items-start gap-4 text-left w-full "
//                   >
//                     {/* Step circle */}
//                     <div
//                       className={`w-8 h-8 flex items-center justify-center transition-all duration-300
//             ${activeStep === index + 1 ? "bg-red-500 text-white" : "bg-red-500 text-white"}
//           `}
//                     >
//                       {index + 1}
//                     </div>

//                     {/* Card */}
//                     <div className="bg-white shadow-sm border p-4 w-full">
//                       <h3 className="text-lg font-semibold text-gray-900">
//                         Day {index + 1}: {day.title}
//                       </h3>

//                       <ul className="list-disc list-inside text-sm text-gray-700 mt-1">
//                         {day.activities.map((activity, i) => (
//                           <li key={i}>{activity}</li>
//                         ))}
//                       </ul>
//                     </div>
//                   </Button>
//                 </div>
//               ))}
//             </div>

//           </div>

//           {/* IMAGE SECTION */}
//           <div className="flex justify-center mt-14">
//             <img
//               src={imageSrc}
//               alt="Day Image"
//               className="w-[350px] h-[350px] object-cover shadow-md transition-all duration-500" // Custom border radius removed
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DetailedItinerary;

"use client";

import { useEffect, useRef, useState } from "react";
import RoundButton from "./RoundButton";
>>>>>>> 63e90ead738cf5ea157132bf932819acaa4b2043

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

<<<<<<< HEAD
  return (
    <section className="py-10 bg-white rounded-lg my-6 shadow-lg hover:shadow-2xl transition-all duration-300">
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
          {/* Steps */}
<div className="flex flex-col gap-12 ml-12 relative">
  {itinerary.map((day, index) => (
    <div
      key={index}
      ref={(el) => {
        if (el) stepRefs.current[index] = el;
      }}
      className="relative"
    >
      {/* CONNECTOR LINE: dot ke center se next dot ke center tak */}
      {index < itinerary.length - 1 && (
        <div
          className="absolute left-[15px] top-8 w-[2px] bg-red-500"
          style={{ height: "190px" , marginLeft:"10px" }} // line length (adjust anytime)
        ></div>
      )}

      <button
        onClick={() => {
          setActiveStep(index + 1);
          setImageSrc(day.image);
        }}
        className="flex items-start gap-4 text-left w-full "
      >
        {/* Step circle */}
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300
            ${activeStep === index + 1 ? "bg-red-500 text-white" : "bg-red-500 text-white"}
          `}
        >
          {index + 1}
        </div>

        {/* Card */}
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
=======
  const handleStepClick = (index: number) => {
    setActiveStep(index + 1);
    setImageSrc(itinerary[index].image);
  };

  return (
    <section className="py-10 bg-white my-6 shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl font-bold mb-6">Detailed Itinerary</h2>

       <div className="grid md:grid-cols-2 gap-12 items-start relative">
  {/* TIMELINE */}
  <div className="relative mt-6 md:mt-10">
    {/* Active step line */}
    <div
      className="absolute left-4 w-[3px] bg-gray-300 transition-all duration-500"
      style={{ top: lineTop, height: lineHeight }}
    />

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
                top: "50%", // start from middle of the circle
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
                Day {index + 1}: {day.title}
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
  <div className="flex justify-center mt-14">
    <img
      src={imageSrc}
      alt="Day Image"
      className="w-[350px] h-[350px] object-cover shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105"
    />
  </div>
</div>

>>>>>>> 63e90ead738cf5ea157132bf932819acaa4b2043
      </div>
    </section>
  );
};

<<<<<<< HEAD
export default DetailedItinerary;
=======
export default DetailedItinerary;
>>>>>>> 63e90ead738cf5ea157132bf932819acaa4b2043
