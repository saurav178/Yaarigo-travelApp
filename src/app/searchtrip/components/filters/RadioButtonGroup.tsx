"use client";

type RadioButtonGroupProps = {
  options: readonly string[];
  selectedValue: string;
  onChange: (value: string) => void;
  columns?: number;
  showClear?: boolean;
  onClear?: () => void;
};

export default function RadioButtonGroup({
  options,
  selectedValue,
  onChange,
  columns = 2,
  showClear = false,
  onClear,
}: RadioButtonGroupProps) {
  return (
    <div className={`grid grid-cols-${columns} gap-2 mt-3`}>
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-50 transition"
        >
          <input
            type="radio"
            name="radio-button-group"
            value={option}
            checked={selectedValue === option}
            onChange={() => onChange(option)}
            className="h-4 w-4 cursor-pointer accent-[#1D4350]"
          />
          <span className="text-sm text-gray-700">{option}</span>
        </label>
      ))}
      {showClear && (
        <button
          onClick={onClear}
          className="col-span-full text-xs text-gray-600 underline cursor-pointer"
        >
          Clear
        </button>
      )}
    </div>
  );
}
