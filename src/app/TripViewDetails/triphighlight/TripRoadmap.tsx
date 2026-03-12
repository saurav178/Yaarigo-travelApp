"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import type { LatLngExpression } from "leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);
const Polyline = dynamic(
  () => import("react-leaflet").then((mod) => mod.Polyline),
  { ssr: false }
);

interface TripRoadmapProps {
  itinerary?: { location: string }[];
}

const locationCoords: Record<string, LatLngExpression> = {
  "North Goa": [15.6092, 73.7415],
  Panaji: [15.4909, 73.8278],
  "South Goa": [15.1594, 74.0157],
};

export default function TripRoadmap({ itinerary = [] }: TripRoadmapProps) {
  const [routePoints, setRoutePoints] = useState<LatLngExpression[]>([]);
  const [customIcon, setCustomIcon] = useState<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      const icon = new L.Icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -25],
      });
      setCustomIcon(icon);
    })();
  }, []);

  useEffect(() => {
    const coords = itinerary
      .map((p) => locationCoords[p.location])
      .filter(Boolean) as LatLngExpression[];
    setRoutePoints(coords);
  }, [itinerary]);

  if (!isMounted || !customIcon) {
    return <p className="p-4">Loading map...</p>;
  }

  return (
    <section className="bg-white p-2 shadow-md w-[390px]">
      <h2 className="text-xl font-bold mb-4">Trip Roadmap</h2>

      <div className="sticky top-20 h-[340px] w-[350px] border overflow-hidden ml-3">
        <MapContainer
          center={routePoints[0] || [15.4909, 73.8278]}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full"
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
              pathOptions={{ color: "red", weight: 3 }}
            />
          )}
        </MapContainer>
      </div>
    </section>
  );
}
