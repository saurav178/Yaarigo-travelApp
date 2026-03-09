import Image from "next/image";

interface SafetyInformationProps {
  trip: {
    safetyRating?: number;
    safetyInfo?: string;
    verifiedTravelers?: boolean;
  };
}

const SafetyInformation: React.FC<SafetyInformationProps> = ({ trip }) => {
  if (!trip) return null;

  const message = trip.safetyInfo
    ? trip.safetyInfo
    : `All travelers are ${trip.verifiedTravelers ? "verified" : "not verified"}. Safety rating: ${trip.safetyRating ? `${trip.safetyRating}%` : "N/A"}`;

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 w-full"
      style={{ background: "#f0faf4", border: "1px solid #bbf0d0" }}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full"
        style={{ background: "#d1fae5" }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-green-800 leading-none mb-1">Safety Information</p>
        <p className="text-[11px] text-green-700 leading-snug">{message}</p>
      </div>
    </div>
  );
};

export default SafetyInformation;