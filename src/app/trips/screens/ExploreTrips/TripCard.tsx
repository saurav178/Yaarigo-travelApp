// import Image from "next/image";
// import RatingStars from "./RatingStars";
// import AvailabilityBadge from "./AvailabilityBadge";
// import SeasonTag from "./SeasonTag";

// export default function TripCard({ trip }) {
//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-3 flex flex-col space-y-2">
//       <Image
//         src={trip.image}
//         alt={trip.title}
//         width={400}
//         height={200}
//         className="rounded-lg object-cover w-full h-40"
//       />

//       <h3 className="font-semibold text-lg">{trip.title}</h3>
//       <p className="text-sm text-gray-600">{trip.description}</p>

//       {/* Rating */}
//       <RatingStars rating={trip.rating} />

//       {/* Availability + Season */}
//       <div className="flex items-center justify-between mt-2">
//         <AvailabilityBadge status={trip.availability} />
//         <SeasonTag season={trip.season} />
//       </div>

//       {/* Dates */}
//       <p className="text-xs text-gray-500 mt-1">
//         {trip.dates} • {trip.duration}
//       </p>
//     </div>
//   );
// }


import Image from "next/image";
import RatingStars from "./RatingStars";
import AvailabilityBadge from "./AvailabilityBadge";
import SeasonTag from "./SeasonTag";

export default function TripCard({ trip }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition p-3 flex flex-col space-y-2">
      <Image
        src={trip.image}
        alt={trip.title}
        width={400}
        height={200}
        className="rounded-lg object-cover w-full h-40"
      />

      <h3 className="font-semibold text-lg text-black">{trip.title}</h3>
      <p className="text-sm text-gray-600">{trip.description}</p>

      {/* Rating */}
      <RatingStars rating={trip.rating} />

      {/* Availability + Season */}
      <div className="flex items-center justify-between mt-2 text-black">
        <AvailabilityBadge status={trip.availability} />
        <SeasonTag season={trip.season} />
      </div>

      {/* Dates */}
      <p className="text-xs text-gray-500 mt-1">
        {trip.dates} • {trip.duration}
      </p>
    </div>
  );
}
