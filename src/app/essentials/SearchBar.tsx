"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder }: SearchBarProps) {
  return (
    <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 shadow-sm">
      <Search className="w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder={placeholder ?? "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent outline-none px-2 text-gray-700"
      />
    </div>
  );
}
