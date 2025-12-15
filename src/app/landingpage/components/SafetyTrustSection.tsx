// "use client";

// import Image from "next/image";

// export default function SafetyTrustSection() {
//   const features = [
//     {
//       image: "/images/container1.png",
//       title: "Verified Profiles",
//       bgColor: "bg-blue-100",
//     },
//     {
//       image: "/images/container2.png",
//       title: "Safety Check-ins",
//       bgColor: "bg-orange-100",
//     },
//     {
//       image: "/images/container3.png",
//       title: "AI-Based Compatibility & Moderation",
//       bgColor: "bg-pink-100",
//     },
//     {
//       image: "/images/container4.png",
//       title: 'Emergency Assistance or "Travel Buddy" Mode',
//       bgColor: "bg-green-100",
//     },
//   ];

//   return (
//     <section className="bg-white py-20 px-6 md:px-16 group">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-3xl font-bold text-gray-900 inline-block relative cursor-default">
//           Safety & Trust
//           {/* Animated underline */}
//           <span
//             className="absolute bottom-[-8px] left-1/2 h-[4px] w-0 group-hover:w-[150%] transition-all duration-500 ease-out rounded-full"
//             style={{
//               backgroundImage: "linear-gradient(to right, #06b6d4, #1D4350)",
//               transform: "translateX(-50%)",
//             }}
//           ></span>
//         </h2>

//         <p className="text-gray-500 mt-2 text-sm md:text-base">
//           Experience travel like never before with features designed for
//           modern explorers.
//         </p>
//       </div>

//       <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
//         {/* Left: Icon Grid */}
//         <div className="grid grid-cols-2 gap-10 flex-1">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center text-center space-y-3 group"
//             >
//               <div
//                 className={`flex items-center justify-center w-20 h-20 rounded-full ${feature.bgColor} shadow-sm transition-all duration-300 group-hover:scale-110`}
//                 style={{
//                   boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.boxShadow =
//                     "0 25px 50px -12px rgba(0, 255, 255, 0.6), 0 15px 30px -10px rgba(59, 130, 246, 0.7), 0 10px 20px -5px rgba(6, 182, 212, 0.5)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.boxShadow =
//                     "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
//                 }}
//               >
//                 <Image
//                   src={feature.image}
//                   alt={feature.title}
//                   width={40}
//                   height={40}
//                   className="object-contain"
//                 />
//               </div>
//               <p className="text-gray-700 text-sm md:text-base font-medium leading-tight">
//                 {feature.title}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Right: Main image */}
//         <div className="w-[360px] h-[400px] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-md">
//           <img
//             src="/images/safety-trust1.png"
//             alt="Safety and Trust"
//             className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }










"use client";

import Image from "next/image";

export default function SafetyTrustSection() {
  const features = [
    {
      image: "/images/container1.png",
      title: "Verified Profiles",
      bgColor: "bg-blue-100",
    },
    {
      image: "/images/container2.png",
      title: "Safety Check-ins",
      bgColor: "bg-orange-100",
    },
    {
      image: "/images/container3.png",
      title: "AI-Based Compatibility & Moderation",
      bgColor: "bg-pink-100",
    },
    {
      image: "/images/container4.png",
      title: 'Emergency Assistance or "Travel Buddy" Mode',
      bgColor: "bg-green-100",
    },
  ];

  return (
    <section className="bg-white py-20 px-6 md:px-16 group">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-3xl font-bold text-gray-900 inline-block relative cursor-default">
          Safety & Trust
          {/* Animated underline */}
          <span
            className="absolute bottom-[-8px] left-1/2 h-[4px] w-0 group-hover:w-[150%] transition-all duration-500 ease-out rounded-full"
            style={{
              backgroundImage: "linear-gradient(to right, #06b6d4, #1D4350)",
              transform: "translateX(-50%)",
            }}
          ></span>
        </h2>

        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Experience travel like never before with features designed for
          modern explorers.
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left: Icon Grid */}
        <div className="grid grid-cols-2 gap-10 flex-1">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-3 group"
            >
              <div
                className={`flex items-center justify-center w-20 h-20 rounded-full ${feature.bgColor} shadow-sm transition-all duration-300 group-hover:scale-110`}
                style={{
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 25px 50px -12px rgba(0, 255, 255, 0.6), 0 15px 30px -10px rgba(59, 130, 246, 0.7), 0 10px 20px -5px rgba(6, 182, 212, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <p className="text-gray-700 text-sm md:text-base font-medium leading-tight">
                {feature.title}
              </p>
            </div>
          ))}
        </div>

        {/* Right: Main image - FIXED */}
        <div className="relative w-[360px] h-[400px] rounded-tl-[100px] rounded-br-[100px] overflow-hidden shadow-md">
          <Image
            src="/images/safety-trust1.png"
            alt="Safety and Trust"
            fill
            className="object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
      </div>
    </section>
  );
}