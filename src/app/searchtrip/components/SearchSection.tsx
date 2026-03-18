"use client";

import { useState, useEffect, useCallback } from "react";
import { CombinedFilters } from "../types/combinedFilters";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { API_ENDPOINTS } from "@/utils/constants";

interface CityOption {
  mainText: string;
  fullText: string;
  placeId: string;
}

interface SearchSectionProps {
  filters: CombinedFilters;
  updateFilter: <K extends keyof CombinedFilters>(
    key: K,
    value: CombinedFilters[K],
  ) => void;
}

interface PlacePrediction {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text?: string;
  };
}

export default function SearchSection({
  filters,
  updateFilter,
}: SearchSectionProps) {
  const fromCity = filters.fromCity || "";
  const toCity = filters.toCity || "";
  const selectedDate = filters.startDateFrom
    ? new Date(filters.startDateFrom)
    : undefined;

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [fromSuggestions, setFromSuggestions] = useState<CityOption[]>([]);
  const [toSuggestions, setToSuggestions] = useState<CityOption[]>([]);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showRoomsDropdown, setShowRoomsDropdown] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const popularCities: CityOption[] = [
    { mainText: "Delhi", fullText: "Delhi, India", placeId: "delhi_1" },
    { mainText: "Mumbai", fullText: "Mumbai, India", placeId: "mumbai_2" },
    {
      mainText: "Bangalore",
      fullText: "Bangalore, India",
      placeId: "bangalore_3",
    },
    {
      mainText: "Hyderabad",
      fullText: "Hyderabad, India",
      placeId: "hyderabad_4",
    },
    { mainText: "Chennai", fullText: "Chennai, India", placeId: "chennai_5" },
    { mainText: "Goa", fullText: "Goa, India", placeId: "goa_6" },
  ];

  const fetchSuggestions = useCallback(
    async (value: string, type: "from" | "to") => {
      try {
        const res = await fetch(
          `${API_ENDPOINTS.LOCATION_SEARCH}?input=${value}`,
        );
        const data = await res.json();
        if (!data?.predictions) return;
        const cities: CityOption[] = data.predictions.map(
          (item: PlacePrediction) => ({
            mainText: item.structured_formatting.main_text,
            fullText: item.description,
            placeId: item.place_id,
          }),
        );
        if (type === "from") setFromSuggestions(cities);
        else setToSuggestions(cities);
      } catch {
        if (type === "from") setFromSuggestions([]);
        else setToSuggestions([]);
      }
    },
    [],
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      if (fromCity.length > 2) fetchSuggestions(fromCity, "from");
      else setFromSuggestions([]);
    }, 400);
    return () => clearTimeout(delay);
  }, [fromCity, fetchSuggestions]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (toCity.length > 2) fetchSuggestions(toCity, "to");
      else setToSuggestions([]);
    }, 400);
    return () => clearTimeout(delay);
  }, [toCity, fetchSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#fromWrapper")) {
        setShowFromDropdown(false);
      }
      if (!target.closest("#toWrapper")) {
        setShowToDropdown(false);
      }
      if (!target.closest("#dateWrapper")) {
        setShowCalendar(false);
      }
      if (!target.closest("#roomsWrapper")) {
        setShowRoomsDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFromFocus = () => {
    setFromSuggestions(popularCities);
    setShowFromDropdown(true);
    setActiveDropdown("from");
  };

  const handleToFocus = () => {
    setToSuggestions(popularCities);
    setShowToDropdown(true);
    setActiveDropdown("to");
  };

  const handleDateClick = () => {
    setShowCalendar((prev) => !prev);
    setActiveDropdown((prev) => (prev === "date" ? null : "date"));
  };

  const handleRoomsClick = () => {
    setShowRoomsDropdown((prev) => !prev);
    setActiveDropdown((prev) => (prev === "rooms" ? null : "rooms"));
  };

  const CityDropdown = ({
    suggestions,
    onSelect,
  }: {
    suggestions: CityOption[];
    onSelect: (city: CityOption) => void;
  }) => (
    <div className="absolute top-[calc(100%+8px)] left-0 w-72 bg-white rounded-xl shadow-2xl z-50 overflow-hidden border border-gray-100">
      <div className="px-3 pt-3 pb-1">
        <p className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">
          Popular Cities
        </p>
      </div>
      {suggestions.map((city) => (
        <button
          key={city.placeId}
          onMouseDown={(e) => {
            e.preventDefault(); // prevent input blur before selection
            onSelect(city);
          }}
          className="w-full text-left px-4 py-2.5 hover:bg-blue-50 transition-colors flex items-center gap-3 group"
        >
          <span className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-3.5 h-3.5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </span>
          <div>
            <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600">
              {city.mainText}
            </p>
            <p className="text-[11px] text-gray-400">{city.fullText}</p>
          </div>
        </button>
      ))}
    </div>
  );

  const formatDate = (date: Date | undefined): string =>
    date ? format(date, "EEE, d MMM yyyy") : "Select date";

  const getGuestsText = (): string => {
    const parts: string[] = [];
    if (adults > 0) parts.push(`${adults} Adult${adults > 1 ? "s" : ""}`);
    if (children > 0)
      parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
    return parts.length ? parts.join(", ") : "Select guests";
  };

  return (
    <div className="w-full bg-[#1a434e] py-4 px-6 flex justify-center border-b border-white/5 shadow-lg">
      <div className="w-full max-w-7xl flex items-center bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 shadow-2xl relative">
        {/* FROM */}
        <div
          id="fromWrapper"
          className="flex-[1.2] px-5 py-2 border-r border-white/10 group relative"
        >
          <label className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.1em] text-blue-300 uppercase mb-0.5 opacity-80">
            <span className="w-1 h-1 rounded-full bg-blue-400"></span> From
          </label>
          <input
            value={fromCity}
            onFocus={handleFromFocus}
            onChange={(e) =>
              updateFilter("fromCity", e.target.value || undefined)
            }
            placeholder="City"
            className="bg-transparent text-white text-[15px] font-medium placeholder:text-white/30 focus:outline-none w-full"
          />

          {showFromDropdown && fromSuggestions.length > 0 && (
            <CityDropdown
              suggestions={fromSuggestions}
              onSelect={(city) => {
                updateFilter("fromCity", city.fullText);
                setShowFromDropdown(false);
              }}
            />
          )}
        </div>

        {/* TO */}
        <div
          id="toWrapper"
          className="flex-[1.2] px-5 py-2 border-r border-white/10 group relative"
        >
          <label className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.1em] text-blue-300 uppercase mb-0.5 opacity-80">
            <span className="w-1 h-1 rounded-full bg-blue-400"></span> To
          </label>
          <input
            value={toCity}
            onFocus={handleToFocus}
            onChange={(e) =>
              updateFilter("toCity", e.target.value || undefined)
            }
            placeholder="Destination"
            className="bg-transparent text-white text-[15px] font-medium placeholder:text-white/30 focus:outline-none w-full"
          />

          {showToDropdown && toSuggestions.length > 0 && (
            <CityDropdown
              suggestions={toSuggestions}
              onSelect={(city) => {
                updateFilter("toCity", city.fullText);
                setShowToDropdown(false);
              }}
            />
          )}
        </div>

        {/* DATE */}
        <div
          id="dateWrapper"
          className="flex-1 px-5 py-2 border-r border-white/10 group cursor-pointer relative"
          onClick={handleDateClick}
        >
          <label className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.1em] text-blue-300 uppercase mb-0.5 opacity-80">
            <span className="w-1 h-1 rounded-full bg-blue-400"></span> Date
          </label>
          <div className="flex items-center justify-between">
            <span className="text-white text-[15px] font-medium truncate">
              {formatDate(selectedDate)}
            </span>
            <svg
              className="w-3.5 h-3.5 text-white/20 group-hover:text-blue-400 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
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
                  updateFilter("startDateFrom", date?.toISOString());
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
        </div>

        {/* TRAVELLERS */}
        <div className="flex-1 px-5 py-2 group relative">
          <label className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.1em] text-blue-300 uppercase mb-0.5 opacity-80">
            <span className="w-1 h-1 rounded-full bg-blue-400"></span>{" "}
            Travellers
          </label>
          <div className="flex items-center justify-between">
            <span className="text-white text-[15px] font-medium">
              1 Traveller
            </span>
            <svg
              className="w-8 h-8 text-white/40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 10l5-5 5 5H7z" />
              <path d="M7 14l5 5 5-5H7z" />
            </svg>
          </div>
        </div>

        {/* SEARCH BUTTON */}
        {/* <button className="h-[48px] px-8 ml-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-xl flex items-center gap-3 transition-all active:scale-95 shadow-lg group">
          <div className="flex flex-col items-start">
            <span className="text-[14px] font-bold italic tracking-tight leading-none">
              SEARCH
            </span>
            <span className="text-[7px] font-bold opacity-60 uppercase tracking-tighter">
              Find match
            </span>
          </div>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button> */}

        <button className="h-[40px] px-10 ml-2 bg-gradient-to-b from-[#90C2FF] to-[#75A6FF] hover:from-[#75A6FF] hover:to-[#5E91FF] text-white rounded-[14px] flex items-center justify-center transition-all active:scale-95 shadow-[0_4px_15px_rgba(117,166,255,0.3)] group">
          <span className="text-[14px] font-black tracking-tighter uppercase">
            SEARCH
          </span>
        </button>
      </div>
    </div>
  );
}
