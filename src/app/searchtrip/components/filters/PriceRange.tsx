"use client";

type PriceRangeProps = {
  minPrice: number;
  maxPrice: number;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
  maxValue?: number;
};

export default function PriceRange({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  maxValue = 50000,
}: PriceRangeProps) {
  return (
    <div className="mt-3 space-y-3">
      <div>
        <label className="text-xs text-gray-500 block mb-1">
          Min: ₹{minPrice.toLocaleString()}
        </label>
        <input
          type="range"
          min={0}
          max={maxValue}
          step={1000}
          value={minPrice}
          onChange={(e) => onMinChange(Number(e.target.value))}
          className="w-full accent-[#1D4350]"
        />
      </div>
      <div>
        <label className="text-xs text-gray-500 block mb-1">
          Max: ₹{maxPrice.toLocaleString()}
        </label>
        <input
          type="range"
          min={0}
          max={maxValue}
          step={1000}
          value={maxPrice}
          onChange={(e) => onMaxChange(Number(e.target.value))}
          className="w-full accent-[#1D4350]"
        />
      </div>
    </div>
  );
}
