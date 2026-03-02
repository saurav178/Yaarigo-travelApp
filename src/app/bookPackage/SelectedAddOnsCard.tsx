import { AddOnDetail } from "./types";

interface SelectedAddOnsCardProps {
  selectedAddOns: AddOnDetail[];
  currencySymbol: string;
}

export default function SelectedAddOnsCard({
  selectedAddOns,
  currencySymbol,
}: SelectedAddOnsCardProps) {
  if (selectedAddOns.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Selected Add-ons</h2>
      <div className="space-y-4">
        {selectedAddOns.map((addon) => (
          <div
            key={addon.id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-xl"
          >
            <div>
              <p className="font-semibold text-gray-800">{addon.title}</p>
              <p className="text-sm text-gray-500">{addon.desc}</p>
            </div>
            <span className="font-bold text-[#276074]">
              {currencySymbol}
              {addon.price.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}