"use client";

type RadioGroupProps = {
  options: readonly number[];
  selectedValue: number;
  onChange: (value: number) => void;
  labelFormatter?: (value: number) => string;
};

export default function RadioGroup({
  options,
  selectedValue,
  onChange,
  labelFormatter = (value) => (value === 0 ? "Any" : `${value}% +`),
}: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-2 mt-3">
      {options.map((option) => {
        const isActive = selectedValue === option;
        return (
          <label
            key={option}
            className={`flex items-center gap-2 p-2 cursor-pointer transition ${
              isActive ? "bg-[#E8F1F1]" : ""
            }`}
          >
            <input
              type="radio"
              name={`radio-group-${option}`}
              value={option}
              checked={isActive}
              onChange={() => onChange(option)}
              className="h-4 w-4 cursor-pointer accent-[#1D4350]"
            />
            <span className="text-sm text-gray-800">
              {labelFormatter(option)}
            </span>
          </label>
        );
      })}
    </div>
  );
}
