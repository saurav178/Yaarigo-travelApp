
import React from "react";
import { Card, SectionTitle } from "../lib/ui";
import { recommended } from "../lib/data";
import { currency } from "../lib/ui";
import Image from "next/image";

export default function RecommendedGrid() {
  return (
    <Card>
      <div className="px-4 pb-4 pt-3">
        <SectionTitle title="Recommended Packages" />
        {/* Force two cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recommended.slice(0, 4).map((r) => (
            <div
              key={r.id}
              className="overflow-hidden  border border-neutral-200 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Image
                src={r.image}
                alt={r.title}
                height={150}
                width={150}
                className="h-36 w-full object-cover sm:h-40 lg:h-44"
              />
              <div className="space-y-1 p-3">
                <div className="truncate text-sm font-semibold text-neutral-900">
                  {r.title}
                </div>
                <div className="truncate text-xs text-neutral-600">
                  {r.location}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-semibold text-neutral-900">
                    {currency(r.price)}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {r.days}D / {r.nights}N
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

