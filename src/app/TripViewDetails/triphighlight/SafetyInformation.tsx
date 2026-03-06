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

  return (
    <div className="p-2 bg-green-100 w-full shadow-lg hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3">
        <Image
          src="/icon/mingcute_safety-certificate-fill.png"
          alt="safety icon"
          width={36}
          height={36}
          className="object-contain filter brightness-150 hue-rotate-30 saturate-150"
        />
        <h2 className="font-semibold text-green-800 text-md">
          Safety Information
        </h2>
      </div>

      <p className="text-sm text-gray-700 mt-2">
        {trip.safetyInfo
          ? trip.safetyInfo
          : `All travelers are ${
              trip.verifiedTravelers ? "verified" : "not verified"
            }. Safety rating: ${
              trip.safetyRating ? `${trip.safetyRating}%` : "N/A"
            }`}
      </p>
    </div>
  );
};

export default SafetyInformation;