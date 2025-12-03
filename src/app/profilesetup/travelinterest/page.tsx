"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Step3Interests() {
  const interests = [
    "Photography",
    "Hiking",
    "Local Food",
    "Music",
    "Cycling",
    "Museums",
    "Nightlife",
    "Wellness",
    "Socializing",
    "Beaches"
  ];

  const router = useRouter();

  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (item: string) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item));
    } else {
      setSelected([...selected, item]);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center mt-28 bg-white">
      {/* Back button */}
      <button onClick={() => router.back()} className="mb-4 mr-160 text-[#1D4350]">← Back</button>

      {/* Progress bar */}
      <div className="w-full max-w-2xl h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
        <div className="bg-[#1D4350] h-full w-full rounded-full"></div>
      </div>

      {/* Step label */}
      <p className="w-full max-w-2xl text-left text-sm text-gray-500 mb-6">Step 5 of 5</p>

      {/* Main card */}
      <div className="w-full mt-4 max-w-2xl p-8 shadow-lg">

        {/* Interests */}
        <h2 className="text-lg font-semibold mb-1">Your Interests</h2>
        <p className="text-gray-500 text-sm mb-4">
          What do you enjoy doing while traveling?
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {interests.map((item) => (
            <button
              key={item}
              onClick={() => toggleSelect(item)}
              className={`px-4 py-1 rounded-full border text-sm transition hover:bg-[#1D4350] hover:text-white hover:border-[#1D4350]
                ${
                  selected.includes(item)
                    ? "bg-[#1D4350] text-white border-[#1D4350]"
                    : "border-[#1D4350] text-[#1D4350]"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>

      </div>

      {/* Complete Setup Button */}
      <button className="bg-[#1D4350] text-white mt-6 py-2 px-4 text-sm font-medium hover:bg-[#1D4350] hover:scale-105 hover:shadow-md transition ">
        Complete setup
      </button>
    </div>
  );
}
