import { User } from "lucide-react";
import { Traveller } from "./types";

interface TravellersListCardProps {
  travellers: Traveller[];
}

export default function TravellersListCard({ travellers }: TravellersListCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-[#276074]" />
        Travellers ({travellers.length})
      </h2>
      {travellers.length > 0 ? (
        <div className="space-y-3">
          {travellers.map((t, i) => (
            <div
              key={i}
              className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">{t.name}</p>
                <p className="text-xs text-gray-500">
                  {t.email} • {t.contact}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-medium bg-white px-2 py-1 rounded border border-gray-200 text-gray-600">
                  {t.gender}, {t.age}y
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No travellers added.</p>
      )}
    </div>
  );
}