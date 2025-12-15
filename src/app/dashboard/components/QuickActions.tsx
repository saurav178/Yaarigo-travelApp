// export default function QuickActions() {
//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left Side - 4 Action Cards */}
//         <div className="lg:col-span-2 grid grid-cols-2 gap-4">
//           {/* Explore Trip */}
//           <button className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//             <div className="relative h-32 overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
//                 alt="Explore Trip"
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="font-bold text-gray-800 mb-1">Explore Trip</h3>
//               <p className="text-sm text-gray-500">
//                 Find places to go based on your interests
//               </p>
//             </div>
//           </button>

//           {/* Nearby Essentials */}
//           <button className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//             <div className="relative h-32 overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&q=80"
//                 alt="Nearby Essentials"
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="font-bold text-gray-800 mb-1">Nearby Essentials</h3>
//               <p className="text-sm text-gray-500">Hospitals, ATMs</p>
//             </div>
//           </button>

//           {/* My Trip */}
//           <button className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//             <div className="relative h-32 overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80"
//                 alt="My Trip"
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-4">
//               <div className="flex items-center justify-between mb-1">
//                 <h3 className="font-bold text-gray-800">My Trip</h3>
//                 <span className="px-2 py-1 bg-[#1DA69B] text-white text-xs rounded font-medium">
//                   confirmed
//                 </span>
//               </div>
//               <p className="text-sm text-gray-500">View Itinerary</p>
//               <p className="text-sm text-gray-500">Tickets</p>
//             </div>
//           </button>

//           {/* Community */}
//           <button className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
//             <div className="relative h-32 overflow-hidden">
//               <img
//                 src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
//                 alt="Community"
//                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
//               />
//             </div>
//             <div className="p-4">
//               <h3 className="font-bold text-gray-800 mb-1">Community</h3>
//               <p className="text-sm text-gray-500">Meet our Travio community</p>
//             </div>
//           </button>
//         </div>

//         {/* Right Side - Smart Suggestions & Live Alerts */}
//         <div className="space-y-6">
//           {/* Smart Suggestions */}
//           <div className="bg-white shadow-md p-6">
//             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <svg
//                 className="w-5 h-5 text-[#1DA69B]"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                 />
//               </svg>
//               Smart Suggestions
//             </h3>
//             <div className="space-y-3">
//               <button className="w-full text-left flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors">
//                 <svg
//                   className="w-4 h-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//                   />
//                 </svg>
//                 <span className="text-sm text-gray-600">Hotels near you</span>
//               </button>
//               <button className="w-full text-left flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors">
//                 <svg
//                   className="w-4 h-4 text-gray-400"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
//                   />
//                 </svg>
//                 <span className="text-sm text-gray-600">Cab options</span>
//               </button>
//               <button className="w-full text-left flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors">
//                 <svg
//                   className="w-4 h-4 text-gray-400"
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
//                 <span className="text-sm text-gray-600">Explore weekend trips</span>
//               </button>
//             </div>
//           </div>

//           {/* Live Alerts */}
//           <div className="bg-white shadow-md p-6">
//             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <svg
//                 className="w-5 h-5 text-red-500"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//                 />
//               </svg>
//               Live Alerts
//             </h3>
//             <div className="space-y-3">
//               <div className="flex items-start gap-3 p-3 bg-blue-50">
//                 <svg
//                   className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span className="text-sm text-gray-700">3 new trip confirmations</span>
//               </div>
//               <div className="flex items-start gap-3 p-3 bg-orange-50">
//                 <svg
//                   className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 <span className="text-sm text-gray-700">Your London flight is delayed</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }











import Image from "next/image";

export default function QuickActions() {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side - 4 Action Cards */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          {/* Explore Trip */}
          <button className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-32 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80"
                alt="Explore Trip"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">Explore Trip</h3>
              <p className="text-sm text-gray-500">
                Find places to go based on your interests
              </p>
            </div>
          </button>

          {/* Nearby Essentials */}
          <button className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-32 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?w=800&q=80"
                alt="Nearby Essentials"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">Nearby Essentials</h3>
              <p className="text-sm text-gray-500">Hospitals, ATMs</p>
            </div>
          </button>

          {/* My Trip */}
          <button className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-32 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=800&q=80"
                alt="My Trip"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-gray-800">My Trip</h3>
                <span className="px-2 py-1 bg-[#1DA69B] text-white text-xs rounded font-medium">
                  confirmed
                </span>
              </div>
              <p className="text-sm text-gray-500">View Itinerary</p>
              <p className="text-sm text-gray-500">Tickets</p>
            </div>
          </button>

          {/* Community */}
          <button className="group relative overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-32 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80"
                alt="Community"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">Community</h3>
              <p className="text-sm text-gray-500">Meet our Travio community</p>
            </div>
          </button>
        </div>

        {/* Right Side - Smart Suggestions & Live Alerts */}
        <div className="space-y-6">
          {/* Smart Suggestions */}
          <div className="bg-white shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[#1DA69B]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              Smart Suggestions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="text-sm text-gray-600">Hotels near you</span>
              </button>
              <button className="w-full text-left flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
                <span className="text-sm text-gray-600">Cab options</span>
              </button>
              <button className="w-full text-left flex items-center gap-3 p-2 hover:bg-gray-50 transition-colors">
                <svg
                  className="w-4 h-4 text-gray-400"
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
                <span className="text-sm text-gray-600">Explore weekend trips</span>
              </button>
            </div>
          </div>

          {/* Live Alerts */}
          <div className="bg-white shadow-md p-6">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              Live Alerts
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50">
                <svg
                  className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-700">3 new trip confirmations</span>
              </div>
              <div className="flex items-start gap-3 p-3 bg-orange-50">
                <svg
                  className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-700">Your London flight is delayed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}