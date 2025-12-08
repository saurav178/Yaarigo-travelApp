
// packages/components/PopularList

import React from "react";
import { Card, SectionTitle, Rating } from "../lib/ui";
import { popular } from "../lib/data";
import { currency } from "../lib/ui";
import Image from "next/image";

export default function PopularList() {
  const items = popular ?? [];

  return (
    <div className="space-y-2 mt-2">
      {/* Section title moved outside the card */}
      <SectionTitle title="Popular Packages" />

      <Card>
        {items.length === 0 ? (
          <div className="p-3 text-sm text-neutral-500  cursor-pointer ">No popular packages.</div>
        ) : (
          <ul className="divide-y divide-neutral-200">
            {items.map((p) => (
              <li
                key={p.id}
                className="flex items-center gap-3 p-3 hover:bg-neutral-50"
              >
                <Image
                  src={p.image}
                  alt={p.title}
                  height={150}
                  width={150}
                  className="h-12 w-16  object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-neutral-800">
                    {p.title}
                  </div>
                  <div className="truncate text-xs text-neutral-600">
                    {p.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-neutral-900">
                    {currency(p.price)}
                  </div>
                  <Rating rating={p.rating} reviews={p.reviews} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
