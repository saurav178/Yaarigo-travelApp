// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function HeroSection() {
//   const [location, setLocation] = useState("");
//   const [date, setDate] = useState("");
//   const router = useRouter();

//   const handleGoToTrip = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (!location || !date) {
//       alert("Please select both location and date!");
//       return;
//     }

//     const query = new URLSearchParams({ location, date }).toString();
//     router.push(`/searchtrip?${query}`);
//   };

//   return (
//     <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
//       <div className="absolute inset-0">
//         <img
//           src="/images/travell-people.jpg"
//           alt="Hero background"
//           className="w-full h-full object-cover object-center"
//         />
//       </div>

//       <div className="relative container max-w-4xl px-4 z-10 text-center">
//         <div className="py-28 sm:py-32">
//           <p className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-1 text-xs mb-6 mx-auto text-white border border-white/20">
//             <span className="text-xs">★</span> Join 50,000+ Travel Enthusiasts
//           </p>

//           <h1 className="text-white/95 font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-2xl">
//             Meet
//             <span className="mx-2 inline-block w-3 h-3 bg-white/90 rounded-full shadow-lg"></span>
//             Match
//             <span className="mx-2 inline-block w-3 h-3 bg-white/90 rounded-full shadow-lg"></span>
//             Travel
//             <span className="mx-2 inline-block w-3 h-3 bg-white/90 rounded-full shadow-lg"></span>
//           </h1>

//           <p className="mt-4 text-white/85 text-lg drop-shadow-2xl max-w-2xl mx-auto font-medium">
//             Connect with like-minded travelers, personalize your <br />
//             journey, and explore the world safely with AI-powered matches.
//           </p>

//           {/* Search card */}
//           <div className="mt-10 flex justify-center">
//             <div className="bg-white/75 backdrop-blur-md p-3 shadow-2xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
//               {/* Location Input */}
//               <div className="flex-1 min-w-[200px]">
//                 <label htmlFor="location" className="sr-only">
//                   Location
//                 </label>
//                 <div className="flex items-center border-2 border-gray-200 px-3 py-2.5 focus-within:border-[#008ECF] transition-colors h-12">
//                   <svg
//                     className="w-5 h-5 mr-2 text-[#1D4350]"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   <input
//                     id="location"
//                     name="location"
//                     placeholder="Simla"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     className="bg-transparent outline-none placeholder-gray-600 text-gray-700 w-full font-medium"
//                   />
//                 </div>
//               </div>

//               {/* Date Input */}
//               <div className="flex-1 min-w-[200px]">
//                 <label htmlFor="date" className="sr-only">
//                   Date
//                 </label>
//                 <div className="flex items-center border-2 border-gray-200 px-3 py-2.5 focus-within:border-[#008ECF] transition-colors h-12 relative">
//                   <svg
//                     className="w-5 h-5 mr-2 text-[#1D4350]"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                     />
//                   </svg>
//                   <input
//                     id="date"
//                     name="date"
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     className="w-full bg-transparent outline-none text-gray-700 text-sm font-medium cursor-pointer
//                       [&::-webkit-calendar-picker-indicator]:opacity-0
//                       [&::-webkit-calendar-picker-indicator]:absolute
//                       [&::-webkit-calendar-picker-indicator]:inset-0
//                       [&::-webkit-calendar-picker-indicator]:w-full
//                       [&::-webkit-calendar-picker-indicator]:h-full"
//                     placeholder="Select date"
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="button"
//                 onClick={handleGoToTrip}
//                 className="bg-[#1D4350] hover:bg-[#006DA3] text-white font-semibold px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer h-12"
//               >
//                 Find Trips →
//               </button>
//             </div>
//           </div>

//           {/* Stats Line Below */}
//           <p className="mt-6 text-white/85 text-sm drop-shadow-2xl max-w-2xl mx-auto font-medium">
//             100k+ Verified Travelers ★ 98% Safety Rating ★ AI-Powered Matching
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }








"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleGoToTrip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!location || !date) {
      alert("Please select both location and date!");
      return;
    }

    const query = new URLSearchParams({ location, date }).toString();
    router.push(`/searchtrip?${query}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/travell-people.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative container max-w-4xl px-4 z-10 text-center">
        <div className="py-28 sm:py-32">
          <p className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-1 text-xs mb-6 mx-auto text-white border border-white/20">
            <span className="text-xs">★</span> Join 50,000+ Travel Enthusiasts
          </p>

          <h1 className="text-white/95 font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight drop-shadow-2xl">
            Meet
            <span className="mx-2 inline-block w-3 h-3 bg-white/90 rounded-full shadow-lg"></span>
            Match
            <span className="mx-2 inline-block w-3 h-3 bg-white/90 rounded-full shadow-lg"></span>
            Travel
            <span className="mx-2 inline-block w-3 h-3 bg-white/90 rounded-full shadow-lg"></span>
          </h1>

          <p className="mt-4 text-white/85 text-lg drop-shadow-2xl max-w-2xl mx-auto font-medium">
            Connect with like-minded travelers, personalize your <br />
            journey, and explore the world safely with AI-powered matches.
          </p>

          {/* Search card */}
          <div className="mt-10 flex justify-center">
            <div className="bg-white/75 backdrop-blur-md p-3 shadow-2xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
              {/* Location Input */}
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="location" className="sr-only">
                  Location
                </label>
                <div className="flex items-center border-2 border-gray-200 px-3 py-2.5 focus-within:border-[#008ECF] transition-colors h-12">
                  <svg
                    className="w-5 h-5 mr-2 text-[#1D4350]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input
                    id="location"
                    name="location"
                    placeholder="Simla"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="bg-transparent outline-none placeholder-gray-600 text-gray-700 w-full font-medium"
                  />
                </div>
              </div>

              {/* Date Input */}
              <div className="flex-1 min-w-[200px]">
                <label htmlFor="date" className="sr-only">
                  Date
                </label>
                <div className="flex items-center border-2 border-gray-200 px-3 py-2.5 focus-within:border-[#008ECF] transition-colors h-12 relative">
                  <svg
                    className="w-5 h-5 mr-2 text-[#1D4350]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent outline-none text-gray-700 text-sm font-medium cursor-pointer
                      [&::-webkit-calendar-picker-indicator]:opacity-0
                      [&::-webkit-calendar-picker-indicator]:absolute
                      [&::-webkit-calendar-picker-indicator]:inset-0
                      [&::-webkit-calendar-picker-indicator]:w-full
                      [&::-webkit-calendar-picker-indicator]:h-full"
                    placeholder="Select date"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleGoToTrip}
                className="bg-[#1D4350] hover:bg-[#006DA3] text-white font-semibold px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer h-12"
              >
                Find Trips →
              </button>
            </div>
          </div>

          {/* Stats Line Below */}
          <p className="mt-6 text-white/85 text-sm drop-shadow-2xl max-w-2xl mx-auto font-medium">
            100k+ Verified Travelers ★ 98% Safety Rating ★ AI-Powered Matching
          </p>
        </div>
      </div>
    </section>
  );
}