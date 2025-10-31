// app/page.tsx
"use client";

import { useMemo, useState } from "react";
import TripCard from "@/src/app/trip/components/TripsCard";
import HorizontalCarousel from "@/src/app/trip/components/HorizontalCarousel";
import Filters from "@/src/app/trip/components/Filters";
import type { Trip } from "@/src/app/trip/types/types";

import { SAMPLE_DATA_01 } from "./data/bestmatch";

import { AGENCIES } from "@/src/app/trip/data/agencies";
import AgencyCarousel from "@/src/app/trip/components/AgencyCarousel";
import RecommendationsCarousel from "@/src/app/trip/components/RecommendationsCarousel";
import AIHeader from "./components/AIHeader";


export default function Page() {
  const [query, setQuery] = useState("Simla, Himachal Pradesh, India");
  const [age, setAge] = useState(18);
  const [duration, setDuration] = useState(5);
  const [budget, setBudget] = useState(15000);

  // sample trips
  
  const trips = SAMPLE_DATA_01;

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
              items={filtered}
              visible={3}
              renderItem={(t) => <TripCard trip={t as Trip} compact />}
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
              items={filtered}
              visible={3}
              renderItem={(t) => <TripCard trip={t as Trip} compact />}
            />
          </section>
        </main>
      </div>
    </div>
  );
}
