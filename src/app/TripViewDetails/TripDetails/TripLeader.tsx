"use client";
import Image from "next/image";

interface Leader {
  photo?: string;          // updated field name based on payload
  fullName: string;
  rating?: number;
  reviews?: number;
  description?: string;
  contact?: string;        // optional extra field if payload has it
}

interface LeaderProps {
  leader: Leader;
}

export default function TripLeader({ leader }: LeaderProps) {
  return (
    <div className="p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
      <h3 className="text-md font-semibold mb-3">Hosted By</h3>

      <div className="flex items-center gap-3 mb-3">
        <Image
          src={leader.photo || "/default-profile.png"} // fallback image
          alt={leader.fullName}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{leader.fullName}</p>
          {leader.rating !== undefined && leader.reviews !== undefined && (
            <p className="text-sm text-gray-500">
              ⭐ {leader.rating.toFixed(1)} ({leader.reviews} reviews)
            </p>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-600">
        {leader.description || "No bio available."}
      </p>
    </div>
  );
}