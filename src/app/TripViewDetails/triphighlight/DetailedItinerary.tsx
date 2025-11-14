

 
// "use client";
 
// interface DayPlan {
//   location: string;
//   activities: string[];
// }
 
// const DetailedItinerary = ({ itinerary = [] }: { itinerary?: DayPlan[] }) => {
//   if (!itinerary.length) {
//     return (
//       <div className="border rounded-xl p-5 bg-white shadow-sm text-gray-500">
//         <h2 className="text-lg font-semibold mb-3">Detailed Itinerary</h2>
//         <p>No itinerary available.</p>
//       </div>
//     );
//   }
 
//   return (
//     <div className="border rounded-xl p-5 bg-white shadow-sm">
//       <h2 className="text-lg font-semibold mb-3">Detailed Itinerary</h2>
 
//       <div className="relative ml-4">
//         {/* Vertical line behind all dots */}
//         <div className="absolute left-[6px] top-3 bottom-3 w-[2px] bg-red-300"></div>
 
//         {itinerary.map((day, i) => (
//           <div key={i} className="relative flex items-start mb-6">
//             {/* Red dot */}
//             <div className="w-3 h-3 bg-red-500 rounded-full mt-1 z-10"></div>
 
//             {/* Content */}
//             <div className="ml-4">
//               <h3 className="font-semibold text-gray-800">{day.location}</h3>
//               <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
//                 {day.activities.map((activity, j) => (
//                   <li key={j}>{activity}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };
 
// export default DetailedItinerary;
 
 
 
"use client";
 
interface DayPlan {
  location: string;
  activities: string[];
}
 
const DetailedItinerary = ({ itinerary = [] }: { itinerary?: DayPlan[] }) => {
  if (!itinerary.length) {
    return (
      <div className="border rounded-xl p-5 bg-white shadow-sm text-gray-500">
        <h2 className="text-lg font-semibold mb-3">Detailed Itinerary</h2>
        <p>No itinerary available.</p>
      </div>
    );
  }
 
  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-3">Detailed Itinerary</h2>
 
      <div className="relative ml-6">
        {/* Vertical line behind all dots */}
        <div className="absolute left-[18px] top-6 bottom-6 w-[2px] bg-red-300"></div>
 
        {itinerary.map((day, i) => (
          <div key={i} className="relative flex items-start mb-6">
            {/* Numbered red dot */}
            <div className="w-9 h-9 flex items-center justify-center bg-red-500 text-white font-semibold rounded-full z-10">
              {i + 1}
            </div>
 
            {/* Content */}
            <div className="ml-4 mt-1">
              <h3 className="font-semibold text-gray-800">{day.location}</h3>
              <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                {day.activities.map((activity, j) => (
                  <li key={j}>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
 
export default DetailedItinerary;
 
 