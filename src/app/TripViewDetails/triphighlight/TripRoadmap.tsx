"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

// ✅ Dynamically import react-leaflet components (avoiding SSR)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), { ssr: false });

// ✅ Dummy data for testing
const dummyData = {
  itinerary: [
    { location: "North Goa", activities: [] },
    { location: "Panaji", activities: [] },
    { location: "South Goa", activities: [] },
  ],
};

// ✅ Known coordinates
const locationCoords: Record<string, [number, number]> = {
  "North Goa": [15.6092, 73.7415],
  Panaji: [15.4909, 73.8278],
  "South Goa": [15.1594, 74.0157],
  "Arrival in Goa": [15.4989, 73.8278],
};

interface TripRoadmapProps {
  itinerary?: { location: string; activities?: any[] }[];
}

const TripRoadmap = ({ itinerary = dummyData.itinerary }: TripRoadmapProps) => {
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);
  const [customIcon, setCustomIcon] = useState<any>(null);

  // ✅ Load custom marker icon dynamically (client side only)
  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      const redIcon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -25],
      });
      setCustomIcon(redIcon);
    })();
  }, []);

  // ✅ Convert itinerary locations to coordinates
  useEffect(() => {
    if (!itinerary || !Array.isArray(itinerary)) return;
    const coords = itinerary
      .map((p) => locationCoords[p.location])
      .filter(Boolean) as [number, number][];
    setRoutePoints(coords);
  }, [itinerary]);

  if (!customIcon) return <p>Loading map...</p>;

  return (
<<<<<<< HEAD
    <div className="shadow-2xl rounded-xl p-5 bg-white shadow-sm transition-all duration-300">
=======
    <div className="shadow-2xl p-5 bg-white shadow-sm transition-all duration-300">
>>>>>>> 63e90ead738cf5ea157132bf932819acaa4b2043
      <h2 className="text-lg font-semibold mb-3">Trip Roadmap</h2>

      <div className="h-80 w-full overflow-hidden border">
        <MapContainer
          center={routePoints[0] || [15.4989, 73.8278]}
          zoom={8}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {routePoints.map((pos, i) => (
            <Marker key={i} position={pos} icon={customIcon}>
              <Popup>{itinerary[i]?.location}</Popup>
            </Marker>
          ))}

          {routePoints.length > 1 && (
            <Polyline positions={routePoints} color="red" weight={3} opacity={0.8} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default TripRoadmap;
