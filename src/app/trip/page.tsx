// app/page.tsx
"use client";

import { useMemo, useState } from "react";
import TripCard from "@/app/trip/components/TripsCard";
import HorizontalCarousel from "@/app/trip/components/HorizontalCarousel";
import Filters from "@/app/trip/components/Filters";
import type { Leader, Similar, Trip } from "@/app/trip/types/types";
import { SAMPLE_DATA_01 } from "./data/bestmatch";
import { AGENCIES } from "@/app/trip/data/agencies";
import AgencyCarousel from "@/app/trip/components/AgencyCarousel";
import RecommendationsCarousel from "@/app/trip/components/RecommendationsCarousel";
import AIHeader from "./components/AIHeader";

import { SAMPLE_DATA_02 } from "./data/similartrips";
import { SAMPLE_DATA_03 } from "./data/leadertrips";
import SimilarTrips from "@/app/trip/components/TripsCard";
import LeaderTrips from "@/app/trip/components/TripsCard";

export default function Page() {
  const [query, setQuery] = useState("Simla, Himachal Pradesh, India");
  const [age, setAge] = useState(18);
  const [duration, setDuration] = useState(5);
  const [budget, setBudget] = useState(15000);

  // sample trips
  
  const trips = SAMPLE_DATA_01;
  const trip1 = SAMPLE_DATA_02;
  const trip2 = SAMPLE_DATA_03;


  const filtered = useMemo(() => {
    if (!query) return trips;
    const q = query.toLowerCase();
    return trips.filter(
      (t) =>
        (t.from ?? "").toLowerCase().includes(q) ||
        (t.location ?? "").toLowerCase().includes(q) ||
        (t.name ?? "").toLowerCase().includes(q)
    );
  }, [query, trips]);
  
   const filtered1 = useMemo(() => {
    if (!query) return trip1;
    const q = query.toLowerCase();
    return trip1.filter(
      (t) =>
        (t.from ?? "").toLowerCase().includes(q) ||
        (t.location ?? "").toLowerCase().includes(q) ||
        (t.name ?? "").toLowerCase().includes(q)
    );
  }, [query, trip1]);

   const filtered2 = useMemo(() => {
    if (!query) return trip2;
    const q = query.toLowerCase();
    return trip2.filter(
      (t) =>
        (t.from ?? "").toLowerCase().includes(q) ||
        (t.location ?? "").toLowerCase().includes(q) ||
        (t.name ?? "").toLowerCase().includes(q)
    );
  }, [query, trip2]);

  return (
    <div className="min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
          <div className="sticky top-6">
            <Filters
              query={query}
              setQuery={setQuery}
              age={age}
              setAge={setAge}
              duration={duration}
              setDuration={setDuration}
              budget={budget}
              setBudget={setBudget}
            />
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-8 xl:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">
                Results for {query || "Anywhere"}
              </h1>
              <p className="text-sm text-gray-500">
                Discover travel companions for your next adventure
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {filtered.length} Results
            </div>
          </div>

          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-12">Best Match</h3>
            <HorizontalCarousel
              items={filtered.sort((a, b) => (b.match ?? 0) - (a.match ?? 0))}
              visible={3}
              renderItem={(t) => <TripCard trip={t as Trip} compact />}
            />
          </section>

          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-12">
              Featured Trip Leaders
            </h3>
            <HorizontalCarousel
              items={filtered2}
              visible={3}
              renderItem={(t) => <LeaderTrips trip={t as Leader} compact />}
            />
          </section>
          <main className="p-6 bg-gray-50 min-h-screen -mt-6">
      <div className="max-w-7xl mx-auto">
        <AIHeader count={3} />
        <RecommendationsCarousel />
      </div>
    </main>

       <main className="p-8 bg-gray-50 min-h-screen -mt-16">
                <AgencyCarousel agencies={AGENCIES} />
                

              </main>

          <section className="mb-8">
            <h3 className="text-lg font-semibold mb-12 -mt-10">Similar Trips</h3>
            <HorizontalCarousel
              items={filtered1}
              visible={3}
              renderItem={(t) => <SimilarTrips trip={t as Similar} compact />}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
