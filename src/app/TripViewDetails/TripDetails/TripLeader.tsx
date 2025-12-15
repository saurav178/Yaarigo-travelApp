"use client";
import Image from "next/image";

interface Leader {
  photoUrl: string;
  name: string;
  rating: number;
  reviewsCount: number;
  bio: string;
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
          src={leader.photoUrl}
          alt={leader.name}
          width={48}
          height={48}
          className="rounded-full object-cover"
        />
        <div>
          <p className="font-medium">{leader.name}</p>
          <p className="text-sm text-gray-500">
            ⭐ {leader.rating} ({leader.reviewsCount} reviews)
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600">{leader.bio}</p>
    </div>
  );
}
