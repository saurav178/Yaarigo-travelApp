"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function Step3() {
  const travelStyles = ["Solo", "Friends", "Family", "Couple", "Group"];
  const languages = [
    "Chinese",
    "Spanish",
    "Hindi",
    "English",
    "Portuguese",
    "Arabic",
  ];

  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedLang, setSelectedLang] = useState<string[]>([]);

  const router = useRouter();

  const toggleSelect = (item: string, list: string[], setList: (list: string[]) => void, max: number = 100) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      if (list.length < max) setList([...list, item]);
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center bg-white">
      {/* Back button */}
      <div onClick={() => router.back()} className="w-full max-w-2xl mb-4 flex items-center mt-26 gap-2 cursor-pointer">
        <ArrowLeft size={20} />
        <span className="text-gray-700 text-sm">Back</span>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl h-2 bg-blue-400 rounded-full overflow-hidden mb-4">
        <div className="bg-[#1D4350] h-full w-3/4 rounded-full"></div>
      </div>

      {/* Step label */}
      <p className="text-sm text-gray-500 mb-6 text-left w-full max-w-2xl">Step 4 of 5</p>

      {/* Main card */}
      <div className="w-full max-w-2xl p-8 shadow-lg shadow-gray-300">

        {/* Travel Style */}
        <h2 className="text-lg font-semibold mb-1">Your Travel Style</h2>
        <p className="text-gray-500 text-sm mb-4">
          Select your preferred travel styles 
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {travelStyles.map((style) => (
            <button
              key={style}
              onClick={() =>
                toggleSelect(style, selectedStyles, setSelectedStyles, 5)
              }
              className={`px-4 py-1 rounded-full border text-sm transition hover:bg-[#1D4350] hover:text-white hover:border-[#1D4350]
                ${
                  selectedStyles.includes(style)
                    ? "bg-[#1D4350] text-white border-[#1D4350]"
                    : "border-[#1D4350] text-[#1D4350]"
                }
              `}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Language Spoken */}
        <h2 className="text-lg font-semibold mb-1">Language Spoken</h2>
        <p className="text-gray-500 text-sm mb-4">Select at least one language</p>

        <div className="flex flex-wrap gap-3 mb-8">
          {languages.map((lang, index) => (
            <button
              key={index}
              onClick={() =>
                toggleSelect(lang, selectedLang, setSelectedLang)
              }
              className={`px-4 py-1 rounded-full border text-sm transition hover:bg-[#1D4350] hover:text-white hover:border-[#1D4350]
                ${
                  selectedLang.includes(lang)
                    ? "bg-[#1D4350] text-white border-[#1D4350]"
                    : "border-[#1D4350] text-[#1D4350]"
                }
              `}
            >
              {lang}
            </button>
          ))}
        </div>

      </div>

      {/* Complete Setup Button */}
      <button
        onClick={() => router.push('/profilesetup/travelinterest')}
        className="bg-[#1D4350] text-white py-2 px-4 text-sm font-medium hover:bg-[#1D4350] transition mt-4"
      >
        Continue
      </button>
    </div>
  );
}
