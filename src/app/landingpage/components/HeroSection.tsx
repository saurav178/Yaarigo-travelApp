// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import toast from "react-hot-toast";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { format } from "date-fns";

// export default function HeroSection() {
//   const [fromCity, setFromCity] = useState("");
//   const [toCity, setToCity] = useState("");

//   const [fromSuggestions, setFromSuggestions] = useState<CityOption[]>([]);
//   const [toSuggestions, setToSuggestions] = useState<CityOption[]>([]);

//   const [showFromDropdown, setShowFromDropdown] = useState(false);
//   const [showToDropdown, setShowToDropdown] = useState(false);

//   const [selectedDate, setSelectedDate] = useState<Date | undefined>();
//   const [showCalendar, setShowCalendar] = useState(false);

//   const [fromPlaceId, setFromPlaceId] = useState<string | null>(null);
//   const [toPlaceId, setToPlaceId] = useState<string | null>(null);

//   // 🔥 AbortController refs for canceling previous requests
//   const fromAbortControllerRef = useRef<AbortController | null>(null);
//   const toAbortControllerRef = useRef<AbortController | null>(null);

//   const router = useRouter();

//   interface CityOption {
//     mainText: string;
//     fullText: string;
//   }
//   interface PlacePrediction {
//   description: string;
//   place_id: string;
//   structured_formatting: {
//     main_text: string;
//     secondary_text?: string;
//   };
// }

//   const popularCities: CityOption[] = [
//     { mainText: "Delhi", fullText: "Delhi, India" },
//     { mainText: "Mumbai", fullText: "Mumbai, India"},
//     { mainText: "Bangalore", fullText: "Bangalore, India"},
//     { mainText: "Hyderabad", fullText: "Hyderabad, India"},
//     { mainText: "Chennai", fullText: "Chennai, India"},
//   ];

//   /* ===============================
//      AUTOCOMPLETE FETCH WITH ABORT
//      ✅ Fetches on EVERY keystroke
//      ✅ Cancels previous request
//      ✅ 400ms debounce
//   =============================== */
//   const fetchSuggestions = async (value: string, type: "from" | "to") => {
//     // 🔥 Don't fetch if less than 2 characters
//     if (value.length < 2) {
//       if (type === "from") {
//         setFromSuggestions([]);
//         setShowFromDropdown(false);
//       } else {
//         setToSuggestions([]);
//         setShowToDropdown(false);
//       }
//       return;
//     }

//     try {
//       // 🔥 Cancel previous request for this type
//       if (type === "from" && fromAbortControllerRef.current) {
//         fromAbortControllerRef.current.abort();
//       }
//       if (type === "to" && toAbortControllerRef.current) {
//         toAbortControllerRef.current.abort();
//       }

//       // 🔥 Create new AbortController
//       const controller = new AbortController();
//       if (type === "from") {
//         fromAbortControllerRef.current = controller;
//       } else {
//         toAbortControllerRef.current = controller;
//       }

//       const res = await fetch(`/api/location?input=${value}`, {
//         signal: controller.signal, // 🔥 Attach abort signal
//       });

//       const data = await res.json();

//       // 🔥 Don't update if request was aborted
//       if (controller.signal.aborted) return;

//       if (data.predictions) {
//         const cities = data.predictions.map((item: PlacePrediction) => ({
//           mainText: item.structured_formatting.main_text,
//           fullText: item.description,
//           placeId: item.place_id,
//         }));

//         if (type === "from") {
//           setFromSuggestions(cities);
//           setShowFromDropdown(true);
//         } else {
//           setToSuggestions(cities);
//           setShowToDropdown(true);
//         }
//       }
//     } catch (error) {
//       // 🔥 Ignore abort errors
//       if (error instanceof DOMException && error.name === "AbortError") {
//         return;
//       }

//       // Handle other errors
//       if (type === "from") {
//         setFromSuggestions([]);
//         setShowFromDropdown(false);
//       } else {
//         setToSuggestions([]);
//         setShowToDropdown(false);
//       }
//     }
//   };

//   // Close drop down on outside click
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const target = event.target as HTMLElement;

//       if (!target.closest("#fromWrapper")) {
//         setShowFromDropdown(false);
//       }

//       if (!target.closest("#toWrapper")) {
//         setShowToDropdown(false);
//       }
//       if (!target.closest("#dateWrapper")) {
//         setShowCalendar(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   /* ===============================
//      FROM CITY DEBOUNCE
//      ✅ 400ms debounce
//      ✅ Fetches on every keystroke after delay
//      ✅ Cancels previous request
//   =============================== */
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       fetchSuggestions(fromCity, "from");
//     }, 400);

//     return () => {
//       clearTimeout(delay);
//       // 🔥 Cancel any pending request when user types again
//       if (fromAbortControllerRef.current) {
//         fromAbortControllerRef.current.abort();
//       }
//     };
//   }, [fromCity]);

//   /* ===============================
//      TO CITY DEBOUNCE
//      ✅ 400ms debounce
//      ✅ Fetches on every keystroke after delay
//      ✅ Cancels previous request
//   =============================== */
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       fetchSuggestions(toCity, "to");
//     }, 400);

//     return () => {
//       clearTimeout(delay);
//       // 🔥 Cancel any pending request when user types again
//       if (toAbortControllerRef.current) {
//         toAbortControllerRef.current.abort();
//       }
//     };
//   }, [toCity]);

//   /* ===============================
//      SEARCH NAVIGATION
//   =============================== */
//   const handleGoToTrip = () => {
//     // If nothing is selected
//     if (!fromPlaceId && !toPlaceId && !selectedDate) {
//       toast.error("Please select at least one search option");
//       return;
//     }

//     const query = new URLSearchParams();

//     if (fromPlaceId) {
//       query.append("fromCity", fromCity);
//       query.append("fromPlaceId", fromPlaceId);
//     }

//     if (toPlaceId) {
//       query.append("toCity", toCity);
//       query.append("toPlaceId", toPlaceId);
//     }

//     if (selectedDate) {
//       query.append("startDateFrom", selectedDate.toISOString());
//     }

//     router.push(`/searchtrip?${query.toString()}`);
//   };

//   // 🔥 Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (fromAbortControllerRef.current) {
//         fromAbortControllerRef.current.abort();
//       }
//       if (toAbortControllerRef.current) {
//         toAbortControllerRef.current.abort();
//       }
//     };
//   }, []);

//   return (
//     <section className="relative min-h-screen flex items-center justify-center">
//       <div className="absolute inset-0">
//         <Image
//           src="/images/travell-people.jpg"
//           alt="Hero background"
//           fill
//           priority
//           className="object-cover object-center"
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
//           <div className="mt-[20px] flex justify-center">
//             <div className="bg-white/75 backdrop-blur-md p-3 shadow-2xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
//               {/* ================= LOCATION INPUT ================= */}
//               <div id="fromWrapper" className="flex-1 min-w-[200px] relative">
//                 <label htmlFor="fromCity" className="sr-only">
//                   From City
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
//                     id="fromCity"
//                     name="fromCity"
//                     placeholder="From City"
//                     value={fromCity}
//                     onFocus={() => {
//                       setFromSuggestions(popularCities);
//                       setShowFromDropdown(true);
//                     }}
//                     onChange={(e) => {
//                       setFromCity(e.target.value);
//                       setFromPlaceId(null);
//                     }}
//                     className="bg-transparent outline-none placeholder-gray-600 text-gray-700 w-full font-medium"
//                     autoComplete="off"
//                   />
//                 </div>

//                 {showFromDropdown && (
//                   <div className="absolute top-full left-0 right-0 bg-white/85 backdrop-blur-md border-2 border-t-0 border-gray-200 shadow-xl max-h-64 overflow-y-auto z-50">
//                     {fromSuggestions.map((item) => (
//                       <div
//                         key={item.placeId}
//                         onMouseDown={() => {
//                           setFromCity(item.mainText);
//                           setFromPlaceId(item.placeId);
//                           setShowFromDropdown(false);
//                         }}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                       >
//                         {item.mainText}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div id="toWrapper" className="flex-1 min-w-[200px] relative">
//                 <label htmlFor="toCity" className="sr-only">
//                   To City
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
//                     id="toCity"
//                     name="toCity"
//                     placeholder="To City"
//                     value={toCity}
//                     onFocus={() => {
//                       setToSuggestions(popularCities);
//                       setShowToDropdown(true);
//                     }}
//                     onChange={(e) => {
//                       setToCity(e.target.value);
//                       setToPlaceId(null);
//                     }}
//                     className="bg-transparent outline-none placeholder-gray-600 text-gray-700 w-full font-medium"
//                     autoComplete="off"
//                   />
//                 </div>

//                 {showToDropdown && (
//                   <div className="absolute top-full left-0 right-0 bg-white/85 backdrop-blur-md border-2 border-t-0 border-gray-200 shadow-xl max-h-64 overflow-y-auto z-50">
//                     {toSuggestions.map((item) => (
//                       <div
//                         key={item.placeId}
//                         onMouseDown={() => {
//                           setToCity(item.mainText);
//                           setToPlaceId(item.placeId);
//                           setShowToDropdown(false);
//                         }}
//                         className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
//                       >
//                         {item.mainText}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* ================= DATE INPUT ================= */}
//               <div id="dateWrapper" className="flex-1 min-w-[200px] relative">
//                 <label htmlFor="date" className="sr-only">
//                   Date
//                 </label>

//                 <div
//                   onClick={() => setShowCalendar((prev) => !prev)}
//                   className="flex items-center border-2 border-gray-200
//                px-3 py-2.5 h-12 cursor-pointer
//                focus-within:border-[#008ECF] transition-colors"
//                 >
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

//                   <span className="text-gray-700 text-sm font-medium">
//                     {selectedDate ? format(selectedDate, "PPP") : "Select date"}
//                   </span>
//                 </div>

//                 {showCalendar && (
//                   <div
//                     className="absolute top-full mt-3
//   left-1/2 -translate-x-1/2
//   bg-white shadow-2xl border
//   z-50 p-3 w-[680px] max-w-[95vw]"
//                   >
//                     <DayPicker
//                       mode="single"
//                       selected={selectedDate}
//                       onSelect={(date) => {
//                         setSelectedDate(date);
//                         setShowCalendar(false);
//                       }}
//                       numberOfMonths={2}
//                       pagedNavigation
//                       disabled={{ before: new Date() }}
//                       className="text-xs"
//                       classNames={{
//                         months: "flex gap-2",
//                         month: "space-y-2",
//                         caption: "flex justify-between items-center mb-1",
//                         caption_label: "text-sm font-semibold",
//                         nav_button: "h-6 w-6",
//                         head_row: "flex",
//                         head_cell: "w-8 text-[11px] text-gray-500",
//                         row: "flex w-full mt-1",
//                         cell: "w-8 h-8 text-center p-0",
//                         day: "h-8 w-8 rounded-full hover:bg-gray-200 text-xs",
//                       }}
//                     />
//                   </div>
//                 )}
//               </div>

//               {/* ================= BUTTON ================= */}
//               <button
//                 type="button"
//                 onClick={handleGoToTrip}
//                 className="bg-[#1D4350] hover:bg-[#006DA3] text-white font-semibold px-6 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer h-12"
//               >
//                 Search Trips →
//               </button>
//             </div>
//           </div>

//           <p className="mt-6 text-white/85 text-sm drop-shadow-2xl max-w-2xl mx-auto font-medium">
//             100k+ Verified Travelers ★ 98% Safety Rating ★ AI-Powered Matching
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function HeroSection() {
  const [toCity, setToCity] = useState("");
  const [toSuggestions, setToSuggestions] = useState<CityOption[]>([]);
  const [showToDropdown, setShowToDropdown] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  // AbortController refs for canceling previous requests
  const toAbortControllerRef = useRef<AbortController | null>(null);

  const router = useRouter();

  interface CityOption {
    mainText: string;
    fullText: string;
  }

  interface PlacePrediction {
    description: string;
    place_id: string;
    structured_formatting: {
      main_text: string;
      secondary_text?: string;
    };
  }

  // Popular cities for dropdown
  const popularCities: CityOption[] = [
    { mainText: "Delhi", fullText: "Delhi, India" },
    { mainText: "Mumbai", fullText: "Mumbai, India" },
    { mainText: "Bangalore", fullText: "Bangalore, India" },
    { mainText: "Hyderabad", fullText: "Hyderabad, India" },
    { mainText: "Chennai", fullText: "Chennai, India" },
    { mainText: "Kolkata", fullText: "Kolkata, India" },
    { mainText: "Pune", fullText: "Pune, India" },
    { mainText: "Jaipur", fullText: "Jaipur, India" },
  ];

  /* ===============================
     AUTOCOMPLETE FETCH WITH ABORT
  =============================== */
  const fetchSuggestions = async (value: string) => {
    if (value.length < 2) {
      setToSuggestions([]);
      setShowToDropdown(false);
      return;
    }

    try {
      if (toAbortControllerRef.current) {
        toAbortControllerRef.current.abort();
      }

      const controller = new AbortController();
      toAbortControllerRef.current = controller;

      const res = await fetch(`/api/location?input=${value}`, {
        signal: controller.signal,
      });

      const data = await res.json();

      if (controller.signal.aborted) return;

      if (data.predictions) {
        const cities = data.predictions.map((item: PlacePrediction) => ({
          mainText: item.structured_formatting.main_text,
          fullText: item.description,
        }));

        setToSuggestions(cities);
        setShowToDropdown(true);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      setToSuggestions([]);
      setShowToDropdown(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest("#toWrapper")) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===============================
     TO CITY DEBOUNCE
  =============================== */
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSuggestions(toCity);
    }, 400);

    return () => {
      clearTimeout(delay);
      if (toAbortControllerRef.current) {
        toAbortControllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toCity]);

  /* ===============================
     SEARCH NAVIGATION - ALWAYS REDIRECT
  =============================== */
  const handleGoToTrip = () => {
    const query = new URLSearchParams();

    // Only append toCity if it has a value
    if (toCity && toCity.trim() !== "") {
      query.append("toCity", toCity);
    }

    // if (selectedDate) {
    //   query.append("startDateFrom", selectedDate.toISOString());
    // }

    router.push(`/searchtrip?${query.toString()}`);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (toAbortControllerRef.current) {
        toAbortControllerRef.current.abort();
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-visible">
      <div className="absolute inset-0">
        <Image
          src="/images/travell-people.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative container max-w-4xl px-4 z-10 text-center overflow-visible">
        <div className="py-28 sm:py-32 overflow-visible">
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

          {/* Search card - Simplified with only To City and Date */}
          <div className="mt-[20px] flex justify-center">
            <div className="bg-white/75 backdrop-blur-md p-3 shadow-2xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-center overflow-visible">
              {/* ================= TO CITY INPUT ================= */}
              <div id="toWrapper" className="flex-1 min-w-[500px] relative">
                <label htmlFor="toCity" className="sr-only">
                  Destination City
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
                    id="toCity"
                    name="toCity"
                    placeholder="Where do you want to go?"
                    value={toCity}
                    onFocus={() => {
                      setToSuggestions(popularCities);
                      setShowToDropdown(true);
                    }}
                    onChange={(e) => {
                      setToCity(e.target.value);
                    }}
                    className="bg-transparent outline-none placeholder-gray-600 text-gray-700 w-full font-medium"
                    autoComplete="off"
                  />
                </div>

                {showToDropdown && (
                  <div className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md border-2 border-t-0 border-gray-200 shadow-xl max-h-48 overflow-y-auto z-50">
                    {toSuggestions.map((item, index) => (
                      <div
                        key={index}
                        onMouseDown={() => {
                          setToCity(item.mainText);
                          setShowToDropdown(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      >
                        <span className="font-medium">{item.mainText}</span>
                        <span className="text-xs text-gray-500 ml-2">
                          {item.fullText}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ================= DATE INPUT ================= */}
              {/* <div id="dateWrapper" className="flex-1 min-w-[200px] relative">
                <label htmlFor="date" className="sr-only">
                  Date
                </label>

                <div
                  onClick={() => setShowCalendar((prev) => !prev)}
                  className="flex items-center border-2 border-gray-200 
               px-3 py-2.5 h-12 cursor-pointer 
               focus-within:border-[#008ECF] transition-colors"
                >
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

                  <span className="text-gray-700 text-sm font-medium">
                    {selectedDate ? format(selectedDate, "PPP") : "Select date (optional)"}
                  </span>
                </div>

                {showCalendar && (
                  <div
                    className="absolute top-full mt-3 
  left-1/2 -translate-x-1/2
  bg-white shadow-2xl border
  z-50 p-3 w-[680px] max-w-[95vw]"
                  >
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }}
                      numberOfMonths={2}
                      pagedNavigation
                      disabled={{ before: new Date() }}
                      className="text-xs"
                      classNames={{
                        months: "flex gap-2",
                        month: "space-y-2",
                        caption: "flex justify-between items-center mb-1",
                        caption_label: "text-sm font-semibold",
                        nav_button: "h-6 w-6",
                        head_row: "flex",
                        head_cell: "w-8 text-[11px] text-gray-500",
                        row: "flex w-full mt-1",
                        cell: "w-8 h-8 text-center p-0",
                        day: "h-8 w-8 rounded-full hover:bg-gray-200 text-xs",
                      }}
                    />
                  </div>
                )}
              </div> */}

              {/* ================= SEARCH BUTTON ================= */}
              <button
                type="button"
                onClick={handleGoToTrip}
                className="bg-[#1D4350] hover:bg-[#006DA3] text-white font-semibold px-8 py-2.5 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer h-12 whitespace-nowrap"
              >
                Search Trips →
              </button>
            </div>
          </div>
          <p className="mt-6 text-white/85 text-sm drop-shadow-2xl max-w-2xl mx-auto font-medium">
            100k+ Verified Travelers ★ 98% Safety Rating ★ AI-Powered Matching
          </p>
        </div>
      </div>
    </section>
  );
}
