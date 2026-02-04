// "use client";
// import {initialProfile} from "../data"
// import { useState , useMemo} from "react";
// import {
//   TripStatus,
//   Profile,
//   SectionProps,
//   TripCardProps,
// } from "../Types";

// interface props{
//     profile:Profile
// }
// function TripsTab({profile}:props) {
//      const [tripsInnerTab, setTripsInnerTab] = useState<"upcoming" | "past">("upcoming");
     
     
    
//       // const [profile, setProfile] = useState<Profile>(initialProfile);

//      const upcomingTrips = useMemo(
//        () =>
//          profile.trips.filter(
//            (t) => t.status === "confirmed" || t.status === "planning"
//          ),
//        [profile.trips]
//      );
     
//      const pastTrips = useMemo(
//        () => profile.trips.filter((t) => t.status === "completed"),
//        [profile.trips]
//      );
     
//   return (
//     <div>
      
//             <div>
//               <Section>
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
//                   <h3 className="text-lg font-semibold text-black">My Trips</h3>
//                   <button className="px-3 py-2 bg-[#1D4350] text-white rounded-md w-full sm:w-auto text-sm">
//                     Plan New Trip
//                   </button>
//                 </div>

//                 <div className="mt-4 flex flex-wrap gap-3">
//                   <button
//                     onClick={() => setTripsInnerTab("upcoming")}
//                     className={`px-3 py-2 rounded-md text-sm ${
//                       tripsInnerTab === "upcoming"
//                         ? "bg-white shadow text-black"
//                         : "text-gray-500 bg-gray-100"
//                     }`}
//                   >
//                     Upcoming ({upcomingTrips.length})
//                   </button>
//                   <button
//                     onClick={() => setTripsInnerTab("past")}
//                     className={`px-3 py-2 rounded-md text-sm ${
//                       tripsInnerTab === "past"
//                         ? "bg-white shadow text-black"
//                         : "text-gray-500 bg-gray-100"
//                     }`}
//                   >
//                     Past Trips ({pastTrips.length})
//                   </button>
//                 </div>

//                 <div className="mt-6 space-y-6">
//                   {tripsInnerTab === "upcoming" &&
//                     upcomingTrips.map((t) => (
//                       <TripCard key={t.id} trip={t} />
//                     ))}

//                   {tripsInnerTab === "past" &&
//                     pastTrips.map((t) => <TripCard key={t.id} trip={t} />)}
//                 </div>
//               </Section>
//             </div>
          
//     </div>
//   );
// }

// function TripCard({ trip }: TripCardProps) {
//   const statusColors: Record<
//     TripStatus,
//     { bg: string; text: string; label: string }
//   > = {
//     confirmed: {
//       bg: "bg-green-100",
//       text: "text-green-700",
//       label: "Confirmed",
//     },
//     planning: {
//       bg: "bg-blue-100",
//       text: "text-blue-700",
//       label: "Planning",
//     },
//     completed: {
//       bg: "bg-gray-100",
//       text: "text-gray-700",
//       label: "Completed",
//     },
//   };

//   const badge = statusColors[trip.status] || statusColors.planning;

//   return (
//     <div className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
//       <img
//         src={trip.image}
//         className="w-full h-40 sm:w-36 sm:h-32 object-cover rounded-md"
//         alt={trip.title}
//       />
// {/* <Image
//   src={trip.image}
//   alt={trip.title}
//   width={144}
//   height={128}
//   className="object-cover rounded-md"
// /> */}

//       <div className="flex-1 w-full">
//         <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3">
//           <div>
//             <h4 className="text-lg font-semibold">{trip.title}</h4>
//             <p className="text-sm text-gray-500 mt-1">{trip.location}</p>

//             <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-4 items-center">
//               <div>
//                 📅 {trip.start} - {trip.end}
//               </div>
//               <div>👥 {trip.participants.length} people</div>
//             </div>
//           </div>

//           <div className="text-right w-full sm:w-auto">
//             <div
//               className={`inline-block px-3 py-1 rounded-full ${badge.bg} ${badge.text} text-sm`}
//             >
//               {badge.label}
//             </div>

//             {trip.status === "completed" && (
//               <div className="mt-3">
//                 <button className="px-3 py-2 bg-rose-400 text-white rounded-md text-sm w-full sm:w-auto">
//                   Leave Reviews
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Section({ children }: SectionProps) {
//   return (
//     <div className="p-4 sm:p-6 shadow-lg bg-white mt-6  ">
//       {children}
//     </div>
//   );
// }
// export default TripsTab;



"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import {
  TripStatus,
  Profile,
  SectionProps,
  TripCardProps,
} from "../Types";

interface Props {
  profile: Profile;
}

function TripsTab({ profile }: Props) {
  const [tripsInnerTab, setTripsInnerTab] = useState<"upcoming" | "past">(
    "upcoming"
  );

  const upcomingTrips = useMemo(
    () =>
      profile.trips.filter(
        (t) => t.status === "confirmed" || t.status === "planning"
      ),
    [profile.trips]
  );

  const pastTrips = useMemo(
    () => profile.trips.filter((t) => t.status === "completed"),
    [profile.trips]
  );

  return (
    <div>
      <Section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-lg font-semibold text-black">My Trips</h3>
          <button className="px-3 py-2 bg-[#1D4350] text-white rounded-md w-full sm:w-auto text-sm">
            Plan New Trip
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => setTripsInnerTab("upcoming")}
            className={`px-3 py-2 rounded-md text-sm ${
              tripsInnerTab === "upcoming"
                ? "bg-white shadow text-black"
                : "text-gray-500 bg-gray-100"
            }`}
          >
            Upcoming ({upcomingTrips.length})
          </button>

          <button
            onClick={() => setTripsInnerTab("past")}
            className={`px-3 py-2 rounded-md text-sm ${
              tripsInnerTab === "past"
                ? "bg-white shadow text-black"
                : "text-gray-500 bg-gray-100"
            }`}
          >
            Past Trips ({pastTrips.length})
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {tripsInnerTab === "upcoming" &&
            upcomingTrips.map((t) => (
              <TripCard key={t.id} trip={t} />
            ))}

          {tripsInnerTab === "past" &&
            pastTrips.map((t) => (
              <TripCard key={t.id} trip={t} />
            ))}
        </div>
      </Section>
    </div>
  );
}

function TripCard({ trip }: TripCardProps) {
  const statusColors: Record<
    TripStatus,
    { bg: string; text: string; label: string }
  > = {
    confirmed: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "Confirmed",
    },
    planning: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "Planning",
    },
    completed: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      label: "Completed",
    },
  };

  const badge = statusColors[trip.status] ?? statusColors.planning;

  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
      <Image
        src={trip.image}
        alt={trip.title}
        width={144}
        height={128}
        className="w-full h-40 sm:w-36 sm:h-32 object-cover rounded-md"
      />

      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div>
            <h4 className="text-lg font-semibold">{trip.title}</h4>
            <p className="text-sm text-gray-500 mt-1">{trip.location}</p>

            <div className="mt-3 text-sm text-gray-600 flex flex-wrap gap-4">
              <div>
                📅 {trip.start} - {trip.end}
              </div>
              <div>👥 {trip.participants.length} people</div>
            </div>
          </div>

          <div className="text-right w-full sm:w-auto">
            <div
              className={`inline-block px-3 py-1 rounded-full ${badge.bg} ${badge.text} text-sm`}
            >
              {badge.label}
            </div>

            {trip.status === "completed" && (
              <div className="mt-3">
                <button className="px-3 py-2 bg-rose-400 text-white rounded-md text-sm w-full sm:w-auto">
                  Leave Reviews
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ children }: SectionProps) {
  return (
    <div className="p-4 sm:p-6 shadow-lg bg-white mt-6">
      {children}
    </div>
  );
}

export default TripsTab;
