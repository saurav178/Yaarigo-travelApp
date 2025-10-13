// "use client";

// import { useState } from "react";
// import SearchBar from "./SearchBar";
// import FilterBar from "./FilterBar";
// import PlaceCard from "./PlaceCard";
// import MapView from "./MapView";

// const categories = [
//   { name: "Stays", key: "stays" },
//   { name: "Food", key: "food" },
//   { name: "Transport", key: "transport" },
//   { name: "Health", key: "health" },
//   { name: "Finance", key: "finance" },
// ];

// const places = [
//   {
//     name: "Cozy Inn",
//     category: "stays",
//     rating: 4.5,
//     reviews: 120,
//     distance: "0.5 miles",
//   },
//   {
//     name: "Delicious Bites",
//     category: "food",
//     rating: 4.2,
//     reviews: 85,
//     distance: "0.8 miles",
//   },
//   {
//     name: "Speedy Rides",
//     category: "transport",
//     rating: 4.6,
//     reviews: 60,
//     distance: "1.2 miles",
//   },
//   {
//     name: "Wellness Clinic",
//     category: "health",
//     rating: 4.8,
//     reviews: 95,
//     distance: "0.7 miles",
//   },
//   {
//     name: "Money Exchange",
//     category: "finance",
//     rating: 4.4,
//     reviews: 110,
//     distance: "0.9 miles",
//   },
// ];

// export default function EssentialsPage() {
//   const [topQuery, setTopQuery] = useState(""); // top search
//   const [mapQuery, setMapQuery] = useState(""); // map search
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);

//   // Filter places by selected category
//   const filteredPlaces = activeCategory
//     ? places.filter((p) => p.category === activeCategory)
//     : places;

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       <h1 className="text-3xl font-bold text-[#3B82F6]">Nearby Essentials</h1>
//       <div className="w-full h-1 bg-gray-300 rounded-md mb-4"></div>

//       {/* Top Search Bar */}
//       <SearchBar
//         value={topQuery}
//         onChange={setTopQuery}
//         placeholder="Where are you going?"
//       />

//       {/* Map with its own search bar */}
//       <MapView mapQuery={mapQuery} onMapQueryChange={setMapQuery} />

//       {/* Filter Buttons */}
//       <FilterBar
//         categories={categories}
//         active={activeCategory}
//         onSelect={setActiveCategory}
//       />

//       {/* Nearby Places */}
//       <div>
//         <h2 className="font-semibold text-lg mb-3">Nearby</h2>
//         <div className="space-y-4">
//           {filteredPlaces.map((place, idx) => {
//             // Use local images from public/images/places
//             const localImage = `/images/places/${place.name
//               .replace(/\s+/g, "-")
//               .toLowerCase()}.jpg`;

//             return (
//               <div
//                 key={idx}
//                 className="flex items-center gap-4 p-3 rounded-lg shadow-md shadow-blue-500/50 bg-white"
//               >
//                 <img
//                   src={localImage}
//                   alt={place.name}
//                   className="w-20 h-20 rounded-lg object-cover"
//                 />
//                 <div>
//                   <h3 className="font-medium">{place.name}</h3>
//                   <p className="text-sm text-gray-600">
//                     {place.rating} ({place.reviews} reviews) • {place.distance}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import PlaceCard from "./PlaceCard";
import MapView from "./MapView";

const categories = [
  { name: "Stays", key: "stays" },
  { name: "Food", key: "food" },
  { name: "Transport", key: "transport" },
  { name: "Health", key: "health" },
  { name: "Finance", key: "finance" },
];

const places = [
  {
    name: "Cozy Inn",
    category: "stays",
    rating: 4.5,
    reviews: 120,
    distance: "0.5 miles",
  },
  {
    name: "Delicious Bites",
    category: "food",
    rating: 4.2,
    reviews: 85,
    distance: "0.8 miles",
  },
  {
    name: "Speedy Rides",
    category: "transport",
    rating: 4.6,
    reviews: 60,
    distance: "1.2 miles",
  },
  {
    name: "Wellness Clinic",
    category: "health",
    rating: 4.8,
    reviews: 95,
    distance: "0.7 miles",
  },
  {
    name: "Money Exchange",
    category: "finance",
    rating: 4.4,
    reviews: 110,
    distance: "0.9 miles",
  },
];

export default function EssentialsPage() {
  const [topQuery, setTopQuery] = useState(""); // top search
  const [mapQuery, setMapQuery] = useState(""); // map search
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Filter places by selected category
  const filteredPlaces = activeCategory
    ? places.filter((p) => p.category === activeCategory)
    : places;

  return (
    <div className="p-6 max-w-8xl mx-auto bg-white space-y-6">
      {/* Page Title */}
      <h1 className="!text-[20px] font-bold text-[#3B82F6]">
        Nearby Essentials
      </h1>
      <div className="w-full h-1 bg-gray-300 rounded-md mb-4"></div>

      {/* Top Search Bar */}
      <SearchBar
        value={topQuery}
        onChange={setTopQuery}
        placeholder="Where are you going?"
      />

      {/* Map with its own search bar */}
      <MapView mapQuery={mapQuery} onMapQueryChange={setMapQuery} />

      {/* Filter Buttons */}
      <FilterBar
        categories={categories}
        active={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Nearby Places */}
      <div>
        <h2 className="!text-[20px] font-semibold mb-3">Nearby</h2>
        <div className="space-y-4">
          {filteredPlaces.map((place, idx) => {
            // Use local images from public/images/places
            const localImage = `/images/places/${place.name
              .replace(/\s+/g, "-")
              .toLowerCase()}.jpg`;

            return (
              <div
                key={idx}
                className="flex items-center gap-4 p-3 rounded-lg shadow-md shadow-blue-500/50 bg-white"
              >
                <img
                  src={localImage}
                  alt={place.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h3 className="!text-[15px] font-medium">{place.name}</h3>
                  <p className="!text-[13px] text-gray-700 mt-[2px]">
                    {place.rating} ({place.reviews} reviews) • {place.distance}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
