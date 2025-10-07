import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { format } from "date-fns";
import {
  CheckCircle,
  XCircle,
  Star,
  StarHalf,
  Info,
  Shield,
  MapPinned,
  CalendarDays,
} from "lucide-react";
import VerifiedBadge from "./VerifiedBadge";
import { Traveller } from "./data/travellers";

interface TravellerCardProps {
  id: number;
  name: string;
  location: string;
  Destination?: string;
  startDate?: string;
  endDate?: string;
  description: string;
  image?: string;
  verified?: boolean;
  age?: number;
  genderPreference?: string;
  compatibility?: number;
  rating?: number;
  onDismiss?: () => void;
  onInterested?: () => void;
  isActive: boolean;
  onToggle: (id: number) => void;
}

const calculateSafetyScore = (traveller: {
  verified?: boolean;
  age?: number;
  image?: string;
  rating?: number;
}) => {
  let score = 0;
  if (traveller.verified) score += 50;
  if (traveller.age && traveller.age >= 18) score += 10;
  if (traveller.image) score += 15;
  if (traveller.rating && traveller.rating >= 4) score += 20;
  return Math.min(score, 100);
};

const TravellerCard: FC<TravellerCardProps> = ({
  id,
  name,
  location,
  Destination,
  startDate,
  endDate,
  description,
  image = "/images/user.png",
  verified = false,
  age = 30,
  genderPreference = "Male",
  compatibility = 85,
  rating = 4.5,
  onDismiss,
  onInterested,
  isActive,
  onToggle,
}) => {
  const [status, setStatus] = useState<"none" | "interested" | "dismissed">(
    "none"
  );
  const [progress, setProgress] = useState(100);

  const traveller = { verified, age, image, rating };
  const safetyScore = calculateSafetyScore(traveller);

  // Safety Score Animation
  const [animatedScore, setAnimatedScore] = useState(0);
  const circleRadius = 26;
  const circleCircumference = 2 * Math.PI * circleRadius;

  useEffect(() => {
    let start = 0;
    const end = safetyScore;
    const duration = 1000;
    const increment = end / (duration / 16);

    const animate = () => {
      start += increment;
      if (start >= end) start = end;
      else requestAnimationFrame(animate);
      setAnimatedScore(Math.round(start));
    };

    requestAnimationFrame(animate);
  }, [safetyScore]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      setProgress(100);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval);
            onToggle(id);
            return 0;
          }
          return prev - 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isActive, onToggle, id]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={12} className="text-yellow-400" />);
    }
    if (halfStar)
      stars.push(<StarHalf key="half" size={12} className="text-yellow-400" />);
    return stars;
  };

  // State for description expand/collapse
  const [descExpanded, setDescExpanded] = useState(false);

  return (
    <div
      className={`bg-gradient-to-br from-blue-100/50 to-blue-200/30 backdrop-blur-md border border-white/20 rounded-2xl shadow-md p-2 flex flex-col gap-2 w-[300px] transition transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl relative ${
        descExpanded ? "min-h-[320px]" : "min-h-[180px]"
      }`}
    >
      {/* Info Icon */}
      <button
        onClick={() => onToggle(id)}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition z-10"
      >
        <Info className="w-4 h-4 text-gray-600" />
      </button>

      {/* Top Section */}
      <div className="flex items-center gap-2 relative">
        <Image
          src={image}
          alt={name || "profile image"}
          width={50}
          height={50}
          className="rounded-full border border-gray-300 relative -translate-y-2"
        />
        <div>
          <h3 className="text-base font-semibold flex items-center gap-1 text-gray-900 pt-2">
            {name} {verified && <VerifiedBadge size={16} />}
          </h3>

          <div className="flex items-center justify-start gap-[2px] mt-[1px] text-[9px] text-gray-700 font-medium">
            {renderStars(rating)}
            <span>{rating.toFixed(1)}</span>
          </div>

          <p className="text-[12px] text-gray-800">Location: {location}</p>

          {Destination && (
            <p
              className="flex items-center gap-1 text-[10px]"
              title="Destination"
            >
              <MapPinned className="w-3 h-3 text-[#3636e4]" /> {Destination}
            </p>
          )}

          {startDate && endDate && (
            <p
              className="flex items-center gap-1 text-[10px]"
              title="Travel Dates"
            >
              <CalendarDays className="w-3 h-3 text-[#3636e4]" />
              <span className="bg-[#d2d3d6de] rounded-[6px] px-1 py-[1px] text-black text-[9px]">
                {format(new Date(startDate), "dd MMM yy")} -{" "}
                {format(new Date(endDate), "dd MMM yy")}
              </span>
            </p>
          )}
        </div>

        {/* Popup */}
        {isActive && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[200px] bg-green-50 p-2 rounded-xl shadow-md z-20 text-center transition-opacity duration-300">
            <p className="text-gray-900 text-xs mt-1">
              Compatibility: {compatibility}%
            </p>
            <p className="text-gray-900 text-xs mt-1">Age: {age}</p>
            <p className="text-gray-900 text-xs mt-1">
              Gender: {genderPreference}
            </p>

            <div className="relative w-full bg-gray-200 rounded-full h-1 overflow-hidden mt-2">
              <div
                className="bg-blue-500 h-1 transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Description with toggle */}
      <p
        className={`text-xs text-gray-700 mt-1 overflow-hidden transition-all duration-300 ${
          descExpanded
            ? "h-auto line-clamp-none"
            : "h-8 line-clamp-2 cursor-pointer"
        }`}
        onClick={() => setDescExpanded(!descExpanded)}
      >
        {description || " "}
        {description.length > 50 && !descExpanded && " ... (click to expand)"}
        {descExpanded && " (click to collapse)"}
      </p>

      {/* Multi-Segment Safety Graph */}
      <div className="flex flex-col items-center mt-1">
        <div className="relative w-20 h-20 hover:scale-105 transition-transform duration-500 ease-out">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 64 64">
            {/* Gray background ring */}
            <circle
              className="text-gray-300"
              strokeWidth="6"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius}
              cx="32"
              cy="32"
            />

            {/* Outer Green Segment */}
            <circle
              className="text-green-400 transition-all duration-700 ease-out"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius}
              cx="32"
              cy="32"
              strokeDasharray={circleCircumference}
              strokeDashoffset={
                circleCircumference -
                (Math.min(animatedScore, 100) / 100) * circleCircumference
              }
              strokeLinecap="round"
            />

            {/* Middle Yellow Segment */}
            <circle
              className="text-blue-400 transition-all duration-700 ease-out"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius - 6}
              cx="32"
              cy="32"
              strokeDasharray={circleCircumference}
              strokeDashoffset={
                circleCircumference -
                ((Math.min(animatedScore - 50, 50) || 0) / 100) *
                  circleCircumference
              }
              strokeLinecap="round"
            />

            {/* Inner Red Segment */}
            <circle
              className="text-red-400 transition-all duration-700 ease-out"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={circleRadius - 8}
              cx="32"
              cy="32"
              strokeDasharray={circleCircumference}
              strokeDashoffset={
                circleCircumference -
                ((Math.min(animatedScore - 100, 50) || 0) / 100) *
                  circleCircumference
              }
              strokeLinecap="round"
            />
          </svg>

          {/* Center Number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-extrabold text-gray-800">
              {animatedScore}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="bg-green-500 text-white p-1 rounded-full flex items-center justify-center shadow-sm">
            <Shield size={12} />
          </span>
          <span className="text-sm text-gray-700 font-semibold">
            Safety Score
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-3 mt-2">
        <button
          onClick={() => {
            setStatus("dismissed");
            onDismiss?.();
          }}
          className={`px-3 py-1 rounded-md text-white text-xs flex items-center gap-1 transition ${
            status === "dismissed"
              ? "bg-gray-400"
              : "bg-gray-400 hover:bg-gray-600"
          }`}
        >
          <XCircle size={14} />
          {status === "dismissed" ? "Dismissed" : "Dismiss"}
        </button>

        <button
          onClick={() => {
            setStatus("interested");
            onInterested?.();
          }}
          className={`px-3 py-1 rounded-md text-white text-xs flex items-center gap-1 transition ${
            status === "interested"
              ? "bg-blue-500"
              : "bg-blue-400 hover:bg-blue-500"
          }`}
        >
          <CheckCircle size={14} />
          {status === "interested" ? "Interested ✅" : "Interested"}
        </button>
      </div>
    </div>
  );
};

export default TravellerCard;
