
// components/FeatureCard.tsx
import React from "react";
import type { FeaturedPackage } from "../lib/types";
import { currency } from "../lib/ui";
import Image from "next/image";

// Accept all fields except `id` since the card doesn't render it
type FeatureCardProps = Omit<FeaturedPackage, "id">;

export default function FeatureCard({
  image,
  title,
  rating,
  price,
  days,
  nights,
  location,
  accommodation,
  includedMeals,
  extras,
  activities,
}: FeatureCardProps) {
  return (
    <div className="border border-neutral-200 bg-white shadow-sm">
      <div className="grid gap-4 p-3 sm:p-4 lg:grid-cols-12 lg:gap-6 items-stretch">
        {/* Left: Image fills full card height */}
        <div className="lg:col-span-4 relative flex">
          <div className="relative w-full overflow-hidden flex-1">
            <Image
              src={image}
              alt={title}
              height={150}
                  width={150}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {/* Gradient overlay for better visual balance */}
            <div className="absolute inset-0 bg gradient-to-t from-black/10 via-transparent to-transparent" />
            {/* Rating badge */}
            <div className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-neutral-800 shadow">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-yellow-400" aria-hidden="true">
                <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              {rating.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                  <span className="inline-flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M7 2v2H5v2H3v14h18V6h-2V4h-2V2H7zm10 4V4H7v2H5v2h14V6h-2zM5 20V8h14v12H5z" />
                    </svg>
                    {days} Days / {nights} Nights
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                      <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                    </svg>
                    {location}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">{currency(price)}</div>
                <div className="text-xs text-neutral-500">per person</div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-3 h-px w-full bg-neutral-200" />

            {/* Two-column spec section */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                    Accommodation
                  </div>
                  <p className="mt-1 text-sm text-neutral-800">{accommodation}</p>
                </div>

                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                    Included Meals
                  </div>
                  <p className="mt-1 text-sm text-neutral-800">{includedMeals}</p>
                </div>

                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                    Extras
                  </div>
                  <p className="mt-1 text-sm text-neutral-800">{extras}</p>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
                  Activities
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-800">
                  {activities.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
