"use client";

import { useState } from "react";
import { FaTimes } from "react-icons/fa";

type TagInputProps = {
  label: string;
  placeholder: string;
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
};

export default function TagInput({
  label,
  placeholder,
  tags,
  onAddTag,
  onRemoveTag,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = inputValue.trim();
      if (tag && !tags.includes(tag)) {
        onAddTag(tag);
        setInputValue("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onRemoveTag(tagToRemove);
  };

  return (
    <div className="mt-3">
      <label className="block text-xs font-medium text-gray-500 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-1 bg-[#1D4350] text-white text-xs rounded-full"
          >
            {tag}
            <button
              onClick={() => handleRemoveTag(tag)}
              className="hover:bg-white/20 rounded-full p-0.5 cursor-pointer"
            >
              <FaTimes size={8} />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1D4350] focus:border-transparent text-sm"
      />
    </div>
  );
}
