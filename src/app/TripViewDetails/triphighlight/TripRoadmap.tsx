// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import "leaflet/dist/leaflet.css";
// import type { LatLngExpression } from "leaflet";

// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false },
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false },
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false },
// );
// const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
//   ssr: false,
// });
// const Polyline = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Polyline),
//   { ssr: false },
// );

// interface TripRoadmapProps {
//   itinerary?: { location: string }[];
// }

// const locationCoords: Record<string, LatLngExpression> = {
//   "North Goa": [15.6092, 73.7415],
//   Panaji: [15.4909, 73.8278],
//   "South Goa": [15.1594, 74.0157],
// };

// export default function TripRoadmap({ itinerary = [] }: TripRoadmapProps) {
//   const [routePoints, setRoutePoints] = useState<LatLngExpression[]>([]);
//   const [customIcon, setCustomIcon] = useState<any>(null);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     (async () => {
//       const L = await import("leaflet");
//       const icon = new L.Icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//         iconSize: [30, 30],
//         iconAnchor: [15, 30],
//         popupAnchor: [0, -25],
//       });
//       setCustomIcon(icon);
//     })();
//   }, []);

//   useEffect(() => {
//     const coords = itinerary
//       .map((p) => locationCoords[p.location])
//       .filter(Boolean) as LatLngExpression[];
//     setRoutePoints(coords);
//   }, [itinerary]);

//   if (!isMounted || !customIcon) {
//     return <p className="p-4">Loading map...</p>;
//   }

//   return (
//     <section className="bg-white w-full border border-gray-200">
//       <h2 className="text-xl font-bold px-4 pt-4 pb-3">Trip Roadmap</h2>

//       <div className="h-[280px] w-full overflow-hidden">
//         <MapContainer
//           center={routePoints[0] || [15.4909, 73.8278]}
//           zoom={8}
//           scrollWheelZoom={false}
//           className="h-full w-full"
//         >
//           <TileLayer
//             attribution="&copy; OpenStreetMap contributors"
//             url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
//           />

//           {routePoints.map((pos, i) => (
//             <Marker key={i} position={pos} icon={customIcon}>
//               <Popup>{itinerary[i]?.location}</Popup>
//             </Marker>
//           ))}

//           {routePoints.length > 1 && (
//             <Polyline
//               positions={routePoints}
//               pathOptions={{ color: "red", weight: 3 }}
//             />
//           )}
//         </MapContainer>
//       </div>
//     </section>
//   );
// }

// "use client";

// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import "leaflet/dist/leaflet.css";
// import type { LatLngExpression } from "leaflet";

// const MapContainer = dynamic(
//   () => import("react-leaflet").then((m) => m.MapContainer),
//   { ssr: false },
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((m) => m.TileLayer),
//   { ssr: false },
// );
// const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
//   ssr: false,
// });
// const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
//   ssr: false,
// });
// const Polyline = dynamic(
//   () => import("react-leaflet").then((m) => m.Polyline),
//   { ssr: false },
// );

// interface TripRoadmapProps {
//   itinerary?: { location: string }[];
// }

// const fallbackLocations = [
//   { name: "Panaji", coords: [15.4909, 73.8278] as LatLngExpression },
//   { name: "North Goa", coords: [15.6092, 73.7415] as LatLngExpression },
//   { name: "South Goa", coords: [15.1594, 74.0157] as LatLngExpression },
//   { name: "Belagavi", coords: [15.8497, 74.4977] as LatLngExpression },
// ];

// export default function TripRoadmap({ itinerary = [] }: TripRoadmapProps) {
//   const [routePoints, setRoutePoints] = useState<LatLngExpression[]>([]);
//   const [labels, setLabels] = useState<string[]>([]);
//   const [icon, setIcon] = useState<any>(null);

//   useEffect(() => {
//     (async () => {
//       const L = await import("leaflet");

//   const createNumberIcon = (number: number) => {
//   const L = require("leaflet");

//   return new L.DivIcon({
//     className: "custom-marker",
//     html: `
//       <div style="
//         width:30px;
//         height:30px;
//         border-radius:50%;
//         background:#d32a2a;
//         color:white;
//         display:flex;
//         align-items:center;
//         justify-content:center;
//         font-size:14px;
//         font-weight:bold;
//         border:2px solid white;
//         box-shadow:0 2px 6px rgba(0,0,0,0.3);
//       ">
//         ${number}
//       </div>
//     `,
//     iconSize: [30, 30],
//     iconAnchor: [15, 30],
//   });
// };
//       // const marker = new L.Icon({
//       //   iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
//       //   iconSize: [30, 30],
//       //   iconAnchor: [15, 30],
//       // });

//       setIcon(createNumberIcon);
//     })();
//   }, []);

//   useEffect(() => {
//     async function buildRoute() {
//       const validCoords: LatLngExpression[] = [];
//       const validLabels: string[] = [];

//       for (const item of itinerary) {
//         if (!item.location || item.location === "Unknown location") continue;

//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(item.location)}`,
//           );

//           const data = await res.json();

//           if (data && data.length > 0) {
//             validCoords.push([
//               parseFloat(data[0].lat),
//               parseFloat(data[0].lon),
//             ]);

//             validLabels.push(item.location);
//           }
//         } catch {}
//       }

//       // IMPORTANT FIX
//       if (validCoords.length >= 2) {
//         setRoutePoints(validCoords);
//         setLabels(validLabels);
//       } else {
//         setRoutePoints(fallbackLocations.map((l) => l.coords));
//         setLabels(fallbackLocations.map((l) => l.name));
//       }
//     }

//     buildRoute();
//   }, [itinerary]);

//   if (!icon) return null;




//   return (
//     <section className="bg-white border border-gray-200">
//       <h2 className="text-xl font-bold px-4 pt-4 pb-3">Trip Roadmap</h2>

//       <div className="h-[280px]">
//         <MapContainer
//           center={routePoints[0] || fallbackLocations[0].coords}
//           zoom={8}
//           scrollWheelZoom={false}
//           className="h-[280px] w-[90%] mx-auto"
//         >
//           <TileLayer
//             attribution="&copy; OpenStreetMap contributors"
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           {routePoints.map((pos, i) => (
//             <Marker key={i} position={pos} icon={createNumberIcon(i + 1)}>
//               <Popup>{labels[i]}</Popup>icon={createNumberIcon(i + 1)}
//             </Marker>
//           ))}

//           {routePoints.length > 1 && (
//             <Polyline
//               positions={routePoints}
//               pathOptions={{ color: "#d32a2a", weight: 3 }}
//             />
//           )}
//         </MapContainer>
//       </div>
//     </section>
//   );
// }



"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});
const Polyline = dynamic(
  () => import("react-leaflet").then((m) => m.Polyline),
  { ssr: false }
);

interface TripRoadmapProps {
  itinerary?: { location: string }[];
}

const fallbackLocations = [
  { name: "Panaji", coords: [15.4909, 73.8278] as LatLngExpression },
  { name: "North Goa", coords: [15.6092, 73.7415] as LatLngExpression },
  { name: "South Goa", coords: [15.1594, 74.0157] as LatLngExpression },
  { name: "Belagavi", coords: [15.8497, 74.4977] as LatLngExpression },
];

export default function TripRoadmap({ itinerary = [] }: TripRoadmapProps) {
  const [routePoints, setRoutePoints] = useState<LatLngExpression[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [L, setLeaflet] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setLeaflet(leaflet);
    });
  }, []);

 const createNumberIcon = (number: number) => {
  if (!L) return undefined;

  return new L.DivIcon({
    className: "",
    html: `
      <div style="
        position:relative;
        width:20px;
        height:20px;
        background:#d32a2a;
        border-radius:50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow:0 2px 6px rgba(0,0,0,0.35);
        border:2px solid white;
      ">
        <span style="
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%) rotate(45deg);
          color:white;
          font-weight:bold;
          font-size:14px;
        ">
          ${number}
        </span>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [20, 10],
  });
};

  useEffect(() => {
    async function buildRoute() {
      const validCoords: LatLngExpression[] = [];
      const validLabels: string[] = [];

      for (const item of itinerary) {
        if (!item.location || item.location === "Unknown location") continue;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              item.location
            )}`
          );

          const data = await res.json();

          if (data && data.length > 0) {
            validCoords.push([
              parseFloat(data[0].lat),
              parseFloat(data[0].lon),
            ]);

            validLabels.push(item.location);
          }
        } catch {}
      }

      if (validCoords.length >= 2) {
        setRoutePoints(validCoords);
        setLabels(validLabels);
      } else {
        setRoutePoints(fallbackLocations.map((l) => l.coords));
        setLabels(fallbackLocations.map((l) => l.name));
      }
    }

    buildRoute();
  }, [itinerary]);

  if (!L) return null;

  return (
    <section className="bg-white border border-gray-200">
      <h2 className="text-xl font-bold px-4 pt-4 pb-3">Trip Roadmap</h2>

      <div className="h-[280px]">
        <MapContainer
          center={routePoints[0] || fallbackLocations[0].coords}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[280px] w-[90%] mx-auto"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {routePoints.map((pos, i) => (
            <Marker key={i} position={pos} icon={createNumberIcon(i + 1)}>
              <Popup>{labels[i]}</Popup>
            </Marker>
          ))}

          {routePoints.length > 1 && (
            <Polyline
              positions={routePoints}
              pathOptions={{ color: "#d32a2a", weight: 3 }}
            />
          )}
        </MapContainer>
      </div>
    </section>
  );
}