import React from "react";
import { Card, Button } from "../lib/ui";
import { hero, thumbs } from "../lib/data";
import Image from "next/image";

export default function NewPackage() {
  const perks = [
    {
      title: "All-inclusive",
      desc: "Daily gourmet meals, drinks, and activities included",
    },
    {
      title: "Luxury Accommodation",
      desc: "Overwater villas with private plunge pools",
    },
    {
      title: "Spa Treatments",
      desc: "Rejuvenating massages and wellness therapies",
    },
    {
      title: "Water Sports",
      desc: "Snorkeling, paddle-boarding, and diving gear",
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-neutral-800">
          New Package
        </h3>
        <Button className="bg-[#1D4350] text-white text-xs px-3 py-2 hover:bg-[#173844] cursor-pointer">
          + Add Package
        </Button>
      </div>

      <Card>
        <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-12">
          {/* Left: hero image with overlay thumbnails */}
          <div className="lg:col-span-4 relative">
            <div className="relative h-full overflow-hidden ">
              {/* Hero image fills full height */}
              <Image
                src={hero.image}
                alt={hero.title}
                height={150}
                  width={150}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />

              {/* Subtle bottom gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg gradient-to-t from-black/30 to-transparent rounded-b-xl" />

              {/* Three smaller thumbnails with light gap */}
              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1 sm:gap-4">
                {thumbs.slice(0, 3).map((t, i) => (
                  <Image
                    key={i}
                    src={t}
                    height={150}
                  width={150}
                    alt="thumb"
                    className="h-8 w-13 sm:h-9 sm:w-14 lg:h-10 lg:w-14  border border-white/80 object-cover shadow-md shadow-black/20 hover:scale-105 transition-transform duration-200"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Middle: title, description, price/duration */}

          <div className="lg:col-span-5 relative flex flex-col h-full">
            <div className="mb-2">
              <h2 className="text-2xl font-semibold text-neutral-900">
                {hero.title}
              </h2>

              <div className="mt-1 flex items-center gap-2 text-sm text-neutral-600">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-neutral-100">
                  📍
                </span>
                <span>{hero.location}</span>
              </div>

              <p className="mt-3 text-sm leading-6 text-neutral-700">
                Escape to a tropical haven where pristine beaches, lush
                greenery, and luxurious accommodations await. Perfect for those
                looking to unwind and experience the ultimate relaxation.
              </p>

              {/* Price and Duration same row */}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <div className="text-xs uppercase text-neutral-500">
                    Price
                  </div>
                  <div className="text-3xl font-bold text-neutral-900">
                    ${hero.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-neutral-500">per person</div>
                </div>

                <div>
                  <div className="text-xs uppercase text-neutral-500">
                    Duration
                  </div>
                  <div className="text-base font-semibold text-neutral-900">
                    {hero.days} Days / {hero.nights} Nights
                  </div>
                </div>
              </div>
            </div>

            {/* Sharp-corner full-width button fixed to bottom */}
            <Button className="mt-auto w-full rounded-none bg-[#1D4350] text-white text-xs px-3 py-2 hover:bg-[#173844] cursor-pointer">
              Edit Detail
            </Button>
          </div>

          {/* Right: feature list */}
          <div className="lg:col-span-3">
            <div className="">
              {perks.map((p, idx) => (
                <div
                  key={p.title}
                  className={`flex items-start gap-3 ${
                    idx !== 0 ? "mt-4" : ""
                  }`}
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700">
                    ✓
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">
                      {p.title}
                    </div>
                    <div className="text-xs text-neutral-600">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
