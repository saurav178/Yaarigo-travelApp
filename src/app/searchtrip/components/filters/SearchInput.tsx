"use client";

import { Search, Mic } from "lucide-react";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onVoiceSearch?: () => void;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  onVoiceSearch,
}: SearchInputProps) {
  const handleVoiceSearch = () => {
    if (onVoiceSearch) {
      onVoiceSearch();
    } else {
      alert("Voice search demo — replace with real voice input if needed.");
    }
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search input"
        className="w-full pl-9 pr-10 py-3 border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1D4350]"
      />
      <button
        type="button"
        onClick={handleVoiceSearch}
        aria-label="Voice Search"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 rounded-full text-gray-400 hover:text-[#1D4350] hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1D4350]"
      >
        <Mic className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
}
