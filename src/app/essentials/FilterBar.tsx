"use client";

interface FilterBarProps {
  categories: { name: string; key: string }[];
  active: string | null;
  onSelect: (val: string) => void;
}

export default function FilterBar({ categories, active, onSelect }: FilterBarProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c.key}
          onClick={() => onSelect(c.key)}
          className={`px-4 py-2 rounded-lg text-sm shadow-sm ${
            active === c.key
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
