"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";
// import { format } from "date-fns";

export default function HeroSection() {
  const [toCity, setToCity] = useState("");
  const [toSuggestions, setToSuggestions] = useState<CityOption[]>([]);
  const [showToDropdown, setShowToDropdown] = useState(false);
  // const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  // const [showCalendar, setShowCalendar] = useState(false);

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
      // if (!target.closest("#dateWrapper")) {
      //   setShowCalendar(false);
      // }
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

          {/* Search card - Full width minimal style */}
          <div className="mt-[20px] w-full max-w-2xl mx-auto">
            <div className="flex items-stretch shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
              {/* ================= TO CITY INPUT ================= */}
              <div id="toWrapper" className="flex-1 relative group">
                <div className="flex items-center h-[60px] bg-white/95 px-5 gap-3 border-2 border-transparent focus-within:border-[#008ECF] transition-all duration-300">
                  {/* Search icon */}
                  <svg
                    className="w-[18px] h-[18px] text-gray-400 group-focus-within:text-[#008ECF] shrink-0 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path strokeLinecap="round" d="m21 21-4.35-4.35" />
                  </svg>

                  <input
                    id="toCity"
                    name="toCity"
                    placeholder="Where do you want to go."
                    value={toCity}
                    onFocus={() => {
                      setToSuggestions(popularCities);
                      setShowToDropdown(true);
                    }}
                    onChange={(e) => setToCity(e.target.value)}
                    className="bg-transparent outline-none placeholder-gray-450 text-gray-800 w-full text-[15px] font-medium tracking-[-0.01em]"
                    autoComplete="off"
                  />

                  {/* Clear button */}
                  {toCity && (
                    <button
                      onMouseDown={() => {
                        setToCity("");
                        setToSuggestions(popularCities);
                      }}
                      className="text-gray-300 hover:text-gray-500 transition-colors shrink-0"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Dropdown */}
                {showToDropdown && (
                  <div className="absolute top-full left-0 w-full bg-white/95 border border-gray-100 shadow-[0_16px_40px_rgba(0,0,0,0.12)] max-h-48 z-50 overflow-hidden">
                    {/* <div className="px-5 py-2 border-b border-gray-50">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-semibold">
                        Popular Destinations
                      </span>
                    </div> */}
                    <div className="max-h-[220px] overflow-y-auto">
                      {toSuggestions.map((item, index) => (
                        <div
                          key={index}
                          onMouseDown={() => {
                            setToCity(item.mainText);
                            setShowToDropdown(false);
                          }}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-[#F0F9FF] cursor-pointer transition-colors duration-150 border-b border-gray-50 last:border-0 group/item"
                        >
                          {/* <div className="w-7 h-7 rounded-full bg-[#EBF7FF] flex items-center justify-center shrink-0">
                            <svg
                              className="w-3.5 h-3.5 text-[#008ECF]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div> */}
                          <div className="flex flex-col min-w-0">
                            <span className="text-sm font-semibold text-gray-800 leading-tight">
                              {item.mainText}
                            </span>
                            <span className="text-xs text-gray-400 truncate leading-tight">
                              {item.fullText}
                            </span>
                          </div>
                          <svg
                            className="w-3.5 h-3.5 text-gray-300 ml-auto shrink-0 group-hover/item:text-[#008ECF] transition-colors"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ================= SEARCH BUTTON ================= */}
              <button
                type="button"
                onClick={handleGoToTrip}
                className="bg-[#1D4350] hover:bg-[#006DA3] text-white font-semibold px-8 h-[60px] whitespace-nowrap transition-all duration-200 cursor-pointer text-sm tracking-wide shrink-0 group/btn"
              >
                <span className="flex items-center gap-2">
                  Discover Journeys
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
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
