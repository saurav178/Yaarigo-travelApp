// interface Trip {
//   id: string;
//   title: string;
//   image: string;
//   gradient: string;
//   status: {
//     label: string;
//     color: string;
//     emoji: string;
//   };
//   dates: string;
//   buttonText: string;
//   buttonStyle: string;
// }

// export default function RecentTrips() {
//   const recentTrips: Trip[] = [
//     {
//       id: "1",
//       title: "Paris Adventure",
//       image:
//         "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
//       gradient: "from-blue-400 via-purple-400 to-pink-400",
//       status: {
//         label: "Upcoming",
//         color: "text-blue-600",
//         emoji: "Rocket",
//       },
//       dates: "Dec 15 - Dec 22, 2024",
//       buttonText: "View Details",
//       buttonStyle:
//         "bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white hover:shadow-xl",
//     },
//     {
//       id: "2",
//       title: "Bali Getaway",
//       image:
//         "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
//       gradient: "from-green-400 via-teal-400 to-blue-400",
//       status: {
//         label: "Completed",
//         color: "text-green-600",
//         emoji: "Checkmark",
//       },
//       dates: "Nov 10 - Nov 17, 2024",
//       buttonText: "View Memories",
//       buttonStyle: "bg-gray-100 text-gray-700 hover:bg-gray-200",
//     },
//     {
//       id: "3",
//       title: "Tokyo Exploration",
//       image:
//         "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
//       gradient: "from-purple-400 via-pink-400 to-red-400",
//       status: {
//         label: "Planning",
//         color: "text-purple-600",
//         emoji: "Pencil",
//       },
//       dates: "Jan 5 - Jan 12, 2025",
//       buttonText: "Continue Planning",
//       buttonStyle:
//         "bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white hover:shadow-xl",
//     },
//   ];

//   return (
//     <div className="pb-8">
//       <div className="flex items-center justify-between mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Recent Trips</h2>
//         <button className="text-[#1DA69B] hover:text-[#1D4350] font-semibold transition-colors">
//           View All →
//         </button>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {recentTrips.map((trip) => (
//           <div
//             key={trip.id}
//             className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
//           >
//             {/* Trip Image with Hover Zoom */}
//             <div className="relative h-48 overflow-hidden">
//               <img
//                 src={trip.image}
//                 alt={trip.title}
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//               />
//               {/* Gradient Overlay */}
//               <div
//                 className={`absolute inset-0 bg-gradient-to-t ${trip.gradient} opacity-40`}
//               />

//               {/* Status Badge */}
//               <div className="absolute top-4 left-4">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm ${trip.status.color} shadow-lg`}
//                 >
//                   {trip.status.emoji} {trip.status.label}
//                 </span>
//               </div>

//               {/* Trip Title on Image */}
//               <div className="absolute bottom-4 left-4 right-4">
//                 <h3 className="text-2xl font-bold text-white drop-shadow-lg">
//                   {trip.title}
//                 </h3>
//               </div>
//             </div>

//             {/* Card Bottom */}
//             <div className="p-6">
//               <p className="text-gray-600 text-sm mb-4 flex items-center">
//                 <svg
//                   className="w-4 h-4 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//                 {trip.dates}
//               </p>
//               <button
//                 className={`w-full py-3 px-4 font-semibold transition-all duration-300 ${trip.buttonStyle}`}
//               >
//                 {trip.buttonText}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }












import Image from "next/image";

interface Trip {
  id: string;
  title: string;
  image: string;
  gradient: string;
  status: {
    label: string;
    color: string;
    emoji: string;
  };
  dates: string;
  buttonText: string;
  buttonStyle: string;
}

export default function RecentTrips() {
  const recentTrips: Trip[] = [
    {
      id: "1",
      title: "Paris Adventure",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
      gradient: "from-blue-400 via-purple-400 to-pink-400",
      status: {
        label: "Upcoming",
        color: "text-blue-600",
        emoji: "Rocket",
      },
      dates: "Dec 15 - Dec 22, 2024",
      buttonText: "View Details",
      buttonStyle:
        "bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white hover:shadow-xl",
    },
    {
      id: "2",
      title: "Bali Getaway",
      image:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
      gradient: "from-green-400 via-teal-400 to-blue-400",
      status: {
        label: "Completed",
        color: "text-green-600",
        emoji: "Checkmark",
      },
      dates: "Nov 10 - Nov 17, 2024",
      buttonText: "View Memories",
      buttonStyle: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    },
    {
      id: "3",
      title: "Tokyo Exploration",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
      gradient: "from-purple-400 via-pink-400 to-red-400",
      status: {
        label: "Planning",
        color: "text-purple-600",
        emoji: "Pencil",
      },
      dates: "Jan 5 - Jan 12, 2025",
      buttonText: "Continue Planning",
      buttonStyle:
        "bg-gradient-to-r from-[#1DA69B] to-[#1D4350] text-white hover:shadow-xl",
    },
  ];

  return (
    <div className="pb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Trips</h2>
        <button className="text-[#1DA69B] hover:text-[#1D4350] font-semibold transition-colors">
          View All →
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recentTrips.map((trip) => (
          <div
            key={trip.id}
            className="group bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
          >
            {/* Trip Image with Hover Zoom */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={trip.image}
                alt={trip.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${trip.gradient} opacity-40`}
              />

              {/* Status Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm ${trip.status.color} shadow-lg`}
                >
                  {trip.status.emoji} {trip.status.label}
                </span>
              </div>

              {/* Trip Title on Image */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-bold text-white drop-shadow-lg">
                  {trip.title}
                </h3>
              </div>
            </div>

            {/* Card Bottom */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {trip.dates}
              </p>
              <button
                className={`w-full py-3 px-4 font-semibold transition-all duration-300 ${trip.buttonStyle}`}
              >
                {trip.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}