"use client";

type LocationInputsProps = {
  fromLocation: string;
  toLocation: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
};

export default function LocationInputs({
  fromLocation,
  toLocation,
  onFromChange,
  onToChange,
}: LocationInputsProps) {
  return (
    <div className="mt-3 space-y-2">
      <input
        type="text"
        placeholder="From location..."
        value={fromLocation}
        onChange={(e) => onFromChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#1D4350]"
      />
      <input
        type="text"
        placeholder="To location..."
        value={toLocation}
        onChange={(e) => onToChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-[#1D4350]"
      />
    </div>
  );
}
