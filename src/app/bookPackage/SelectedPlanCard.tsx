import { CheckCircle, Users, Calendar, Clock, MapPin, XCircle } from "lucide-react";

interface SelectedPlanCardProps {
  // Package Details
  packageTitle?: string;
  fromLocation?: string;
  toLocation?: string;
  duration?: string;
  // Plan Details
  planName?: string;
  currencySymbol?: string;
  planPrice?: number;
  category?: string;
  minPeople?: number;
  maxPeople?: number;
  totalSlots?: number;
  bookedSlots?: number;
  exclusions?: string[];
  inclusions?: string[];
}

export default function SelectedPlanCard({
  packageTitle,
  fromLocation,
  toLocation,
  duration,
  planName,
  currencySymbol = "₹",
  planPrice,
  category,
  minPeople,
  maxPeople,
  totalSlots,
  bookedSlots,
  exclusions,
  inclusions,
}: SelectedPlanCardProps) {
  const availableSlots = (totalSlots || 0) - (bookedSlots || 0);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 border-t-4 border-t-[#276074]">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        Package & Plan Details
      </h2>
      
      {/* Package Details */}
      {packageTitle && (
        <div className="mb-4 pb-4 border-b border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Package Name</p>
          <p className="font-bold text-gray-900 text-lg mb-3">{packageTitle}</p>
          
          <div className="grid grid-cols-2 gap-3">
            {(fromLocation || toLocation) && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <MapPin className="w-4 h-4 text-[#276074]" />
                <div>
                  <p className="text-xs text-gray-500">Destination</p>
                  <p className="font-semibold text-gray-800 text-sm truncate">
                    {fromLocation} → {toLocation}
                  </p>
                </div>
              </div>
            )}
            
            {duration && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <Calendar className="w-4 h-4 text-[#276074]" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="font-semibold text-gray-800 text-sm">{duration}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Plan Details */}
      <div>
        <p className="text-sm text-gray-500 mb-2">Selected Plan</p>
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="font-bold text-[#276074] text-lg">
              {planName || "N/A"}
            </p>
            {category && (
              <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                {category}
              </span>
            )}
          </div>
          {planPrice !== undefined && planPrice > 0 && (
            <div className="text-right">
              <p className="text-sm text-gray-500">Price per person</p>
              <p className="font-bold text-gray-900 text-xl">
                {currencySymbol}
                {planPrice.toLocaleString()}
              </p>
            </div>
          )}
        </div>

        {/* Plan Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-100">
          {minPeople !== undefined && maxPeople !== undefined && (
            <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
              <Users className="w-4 h-4 text-[#276074]" />
              <div>
                <p className="text-xs text-gray-500">Group Size</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {minPeople} - {maxPeople}
                </p>
              </div>
            </div>
          )}

          {totalSlots !== undefined && (
            <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
              <Calendar className="w-4 h-4 text-green-600" />
              <div>
                <p className="text-xs text-gray-500">Total Slots</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {totalSlots}
                </p>
              </div>
            </div>
          )}

          {bookedSlots !== undefined && (
            <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
              <Clock className="w-4 h-4 text-orange-600" />
              <div>
                <p className="text-xs text-gray-500">Slots Left</p>
                <p className="font-semibold text-gray-800 text-sm">
                  {availableSlots}
                </p>
              </div>
            </div>
          )}
        </div>

        {((inclusions && inclusions.length > 0) || (exclusions && exclusions.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
            {inclusions && inclusions.length > 0 && (
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <h4 className="font-semibold text-green-800 mb-2 text-xs uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Inclusions
                </h4>
                <ul className="space-y-1">
                  {inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="mt-0.5 text-green-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {exclusions && exclusions.length > 0 && (
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <h4 className="font-semibold text-red-800 mb-2 text-xs uppercase tracking-wider flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> Exclusions
                </h4>
                <ul className="space-y-1">
                  {exclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="mt-0.5 text-red-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
