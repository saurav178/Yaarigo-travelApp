// packages/page

import React from "react";
import Sidebar from "../packages/components/Sidebar";
import NewPackage from "../packages/components/NewPackage";
import PopularList from "../packages/components/PopularList";
import FeaturedCard from "../packages/components/FeaturedCard"; // discrete props version
import RecommendedGrid from "../packages/components/RecommendedGrid";
import { featured } from "./lib/data";
import { SectionTitle } from "./lib/ui";

export default function Page() {
  return (
    <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 p-4 lg:grid-cols-[16rem_1fr] mt-20">
      <Sidebar />

      <main className="space-y-4">
        {/* Row 1: New package + popular */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <NewPackage />
          </div>
          <div className="lg:col-span-4">
            <PopularList />
          </div>
        </div>

        {/* Row 2: Featured + recommended */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <SectionTitle title="Featured Packages" />

            {featured.map((f) => (
              <FeaturedCard
                key={f.id}
                image={f.image}
                title={f.title}
                rating={f.rating ?? 4.8} // fallback if rating missing
                price={f.price}
                days={f.days}
                nights={f.nights}
                location={f.location}
                accommodation={
                  f.title === "Venice Dreams"
                    ? "Stay in a charming boutique hotel along the Grand Canal"
                    : "Luxury lodge with scenic views"
                }
                includedMeals={
                  f.title === "Venice Dreams"
                    ? "Daily breakfast and one traditional Venetian dinner"
                    : "All meals included with local specialties"
                }
                extras={
                  f.title === "Venice Dreams"
                    ? "Free airport transfers and a complimentary welcome drink"
                    : "Guided tour and welcome hamper"
                }
                activities={
                  f.title === "Venice Dreams"
                    ? [
                        "Gondola ride through the canals",
                        "Guided tour of St. Mark’s Basilica and Doge’s Palace",
                        "Visit to the Murano glass-blowing factory",
                        "Leisure time for exploring local markets and cafes",
                      ]
                    : [
                        "City highlights tour",
                        "Local market visit",
                        "Cultural performance evening",
                        "Leisure time for cafes and shopping",
                      ]
                }
              />
            ))}
          </div>

          <div className="lg:col-span-4">
            <RecommendedGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
