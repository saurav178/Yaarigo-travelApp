import { CheckCircle, MapPin, Clock } from "lucide-react";

interface PackageDetailsCardProps {
  packageTitle: string;
  fromLocation: string;
  toLocation: string;
  duration: string;
  planName?: string;
  showPlan?: boolean;
}

export default function PackageDetailsCard({
  packageTitle,
  fromLocation,
  toLocation,
  duration,
}: PackageDetailsCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-green-600" />
        Package Details
      </h2>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-500 mb-1">Package Name</p>
          <p className="font-bold text-gray-900 text-lg">{packageTitle}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">
              <MapPin className="w-3 h-3" />
              <span>Destination</span>
            </div>
            <p
              className="font-semibold text-gray-800 text-sm truncate"
              title={`${fromLocation} → ${toLocation}`}
            >
              {fromLocation} → {toLocation}
            </p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-1 uppercase tracking-wider font-semibold">
              <Clock className="w-3 h-3" />
              <span>Duration</span>
            </div>
            <p className="font-semibold text-gray-800 text-sm">{duration}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
