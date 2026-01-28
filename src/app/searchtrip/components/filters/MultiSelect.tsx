"use client";

type MultiSelectProps = {
  options: readonly string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  allLabel?: string;
  columns?: number;
};

export default function MultiSelect({
  options,
  selectedValues,
  onChange,
  allLabel = "+ All",
  columns = 2,
}: MultiSelectProps) {
  const isAllSelected = selectedValues.length === 0 || selectedValues.includes(allLabel);

  const toggleOption = (option: string) => {
    if (option === allLabel) {
      const isAllOnly = selectedValues.length === 0 || (selectedValues.length === 1 && selectedValues[0] === allLabel);
      onChange(isAllOnly ? [] : [allLabel]);
    } else {
      let next = selectedValues.filter((x) => x !== allLabel);
      if (next.includes(option)) {
        next = next.filter((x) => x !== option);
      } else {
        next = [...next, option];
      }
      onChange(next);
    }
  };

  return (
    <div className={`grid grid-cols-${columns} gap-3 mt-3`}>
      {options.map((option) => {
        const isActive = option === allLabel ? isAllSelected : selectedValues.includes(option);

        return (
          <button
            key={option}
            onClick={() => toggleOption(option)}
            className={`text-sm py-1.5 px-1 cursor-pointer transition-colors duration-150
              ${isActive
                ? "bg-[#1D4350] text-white hover:bg-[#173844]"
                : "bg-transparent text-gray-700 hover:bg-[#E8F1F1]"
              }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
