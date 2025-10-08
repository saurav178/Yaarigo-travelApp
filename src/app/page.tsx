"use client";

import { useState } from "react";
import TravellerCard from "@/app/community/TravellerCard";
import SectionTitle from "@/app/community/SectionTitle";
import TripCard from "@/app/community/TripCard";
import EventCard from "@/app/community/EventCard";
import Dropdown from "@/app/community/Dropdown";
import DropdownFilters from "@/app/community/DropdownFilters";

import {
  travellers as travellersData,
  Traveller,
} from "@/app/community/data/travellers";
import { trips } from "@/app/community/data/trips";
import { events } from "@/app/community/data/events";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Filters {
  gender: "Male" | "Female" | "";
  minSafety: string;
  minCompatibility: string;
  minRating: string;
  dateRange: { startDate: string; endDate: string };
  destination: string;
}

export default function Home() {
  const [shortlist, setShortlist] = useState<Traveller[]>([]);
  const [activeCardId, setActiveCardId] = useState<number | null>(null);

  const [filters, setFilters] = useState<Filters>({
    gender: "",
    minSafety: "",
    minCompatibility: "",
    minRating: "",
    dateRange: { startDate: "", endDate: "" },
    destination: "",
  });

  const handleInterested = (t: Traveller) => {
    if (!shortlist.find((s) => s.id === t.id)) {
      setShortlist([...shortlist, t]);
    }
  };

  const handleDismiss = (id: number) => {
    setShortlist(shortlist.filter((s) => s.id !== id));
    if (activeCardId === id) setActiveCardId(null);
  };

  // ✅ Filter travellers with rating support
  const filteredTravellers = travellersData.filter((t) => {
    const genderMatch = filters.gender
      ? t.genderPreference === filters.gender
      : true;

    const safetyMatch = filters.minSafety
      ? t.safety >= parseInt(filters.minSafety)
      : true;

    const compatibilityMatch = filters.minCompatibility
      ? t.compatibility >= parseInt(filters.minCompatibility)
      : true;

    const ratingMatch = filters.minRating
      ? t.rating >= parseFloat(filters.minRating)
      : true;

    const destinationMatch = filters.destination
      ? t.Destination.toLowerCase().includes(filters.destination.toLowerCase())
      : true;

    let dateMatch = true;
    if (
      filters.dateRange.startDate &&
      filters.dateRange.endDate &&
      t.startDate &&
      t.endDate
    ) {
      const parseDate = (d: string) => parseInt(d.replace("/", ""));
      const filterStartNum = parseDate(filters.dateRange.startDate);
      const filterEndNum = parseDate(filters.dateRange.endDate);
      const travStartNum = parseDate(t.startDate);
      const travEndNum = parseDate(t.endDate);

      dateMatch = travStartNum <= filterEndNum && travEndNum >= filterStartNum;
    }

    return (
      genderMatch &&
      safetyMatch &&
      compatibilityMatch &&
      ratingMatch &&
      dateMatch &&
      destinationMatch
    );
  });

  return (
    <main className="pt-24 px-8 py-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[#3B82F6] tracking-wide">
          Find your people, Plan your adventures
        </h1>
      </div>

      {/* Filters Dropdown */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 pb-2 space-y-3 md:space-y-0">
        <h2 className="text-lg font-semibold">Connect with Fellow Travellers</h2>

        <Dropdown
          trigger={
            <button className="px-4 py-2 border rounded-lg bg-blue-400 text-white shadow-sm hover:bg-blue-600">
              Set as Preference
            </button>
          }
        >
          <DropdownFilters
            filters={filters}
            handleApplyFilters={(newFilters) => setFilters(newFilters)}
          />
        </Dropdown>
      </div>

      {/* Traveller Cards Slider */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={() => {
            const container = document.getElementById("traveller-slider");
            if (container)
              container.scrollBy({ left: -320, behavior: "smooth" });
          }}
          className="absolute top-1/2 -left-2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Slider Container */}
        <div
          id="traveller-slider"
          className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth py-2 px-2"
        >
          {filteredTravellers.map((t) => (
            <div key={t.id} className="flex-shrink-0 w-[300px] relative">
              <TravellerCard
                travellers={[]}
                {...t}
                isActive={activeCardId === t.id}
                onToggle={(id) =>
                  setActiveCardId(activeCardId === id ? null : id)
                }
                onDismiss={() => handleDismiss(t.id)}
                onInterested={() => handleInterested(t)}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => {
            const container = document.getElementById("traveller-slider");
            if (container)
              container.scrollBy({ left: 320, behavior: "smooth" });
          }}
          className="absolute top-1/2 -right-2 -translate-y-1/2 p-2 rounded-full bg-white shadow hover:bg-gray-100 transition opacity-0 group-hover:opacity-100 z-10"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Sponsored Trips */}
      <div className="mt-10">
        <SectionTitle title="Sponsored Trips" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {trips.slice(0, 8).map((trip) => (
            <TripCard key={trip.id} {...trip} />
          ))}
        </div>
      </div>

      {/* Community Events */}
      <div className="mt-10">
        <SectionTitle title="Community Events" />
        <div className="flex gap-14 overflow-x-auto pb-3">
          {events.map((e) => (
            <EventCard key={e.id} {...e} />
          ))}
        </div>
      </div>
    </main>
  );
}
