"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

/* ✅ Proper dynamic imports with correct typing */
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
) as any;

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
) as any;

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
) as any;

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
) as any;

const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
) as any;

interface TripRoadmapProps {
  itinerary?: { location: string; activities?: any[] }[];
}

const dummyData = [
  { location: "North Goa" },
  { location: "Panaji" },
  { location: "South Goa" },
];

const locationCoords: Record<string, LatLngExpression> = {
  "North Goa": [15.6092, 73.7415],
  Panaji: [15.4909, 73.8278],
  "South Goa": [15.1594, 74.0157],
};

export default function TripRoadmap({
  itinerary = dummyData,
}: TripRoadmapProps) {
  const [routePoints, setRoutePoints] = useState<LatLngExpression[]>([]);
  const [customIcon, setCustomIcon] = useState<any>(null);

  // Load leaflet icon safely
  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      const icon = new L.Icon({
        iconUrl:
          "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -25],
      });
      setCustomIcon(icon);
    })();
  }, []);

  // Convert itinerary to coords
  useEffect(() => {
    const coords = itinerary
      ?.map((p) => locationCoords[p.location])
      .filter(Boolean) as LatLngExpression[];

    setRoutePoints(coords);
  }, [itinerary]);

  if (!customIcon) return <p className="p-4">Loading map...</p>;

  return (
    <div className="p-5 bg-white shadow-2xl transition-all duration-300">
      <h2 className="text-lg font-semibold mb-3">Trip Roadmap</h2>

      <div className="h-80 w-full overflow-hidden border">
        <MapContainer
          center={routePoints[0] || [15.4909, 73.8278]}
          zoom={8}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {routePoints.map((pos, i) => (
            <Marker key={i} position={pos} icon={customIcon}>
              <Popup>{itinerary[i]?.location}</Popup>
            </Marker>
          ))}

          {routePoints.length > 1 && (
            <Polyline
              positions={routePoints}
              pathOptions={{
                color: "red",
                weight: 3,
                opacity: 0.8,
              }}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}