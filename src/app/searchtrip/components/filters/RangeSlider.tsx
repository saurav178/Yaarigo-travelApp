"use client";

type RangeSliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  valueFormatter?: (value: number) => string;
};

export default function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  valueFormatter = (v) => v.toString(),
}: RangeSliderProps) {
  return (
    <div>
      <label
        htmlFor={`range-${label.toLowerCase().replace(/\s+/g, '-')}`}
        className="block text-xs font-medium text-gray-500 mt-3 mb-2"
      >
        {label}
      </label>
      <input
        id={`range-${label.toLowerCase().replace(/\s+/g, '-')}`}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#1D4350]"
      />
      <div className="text-xs text-gray-500 mt-1">
        {valueFormatter(value)}
      </div>
    </div>
  );
}
