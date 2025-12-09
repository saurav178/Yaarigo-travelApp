"use client";

interface LeaderProps {
  leader: any;
}

export default function TripLeader({ leader }: LeaderProps) {
  return (
    <div className=" p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
      <h3 className="text-md font-semibold">Hosted By</h3>

      <div className="flex items-center gap-3">
        <img
          src={leader.photoUrl}
          alt={leader.name}
          className="w-12 h-12 object-cover"
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
