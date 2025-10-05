
"use client";

import { GoogleMap, LoadScript } from "@react-google-maps/api";
import SearchBar from "../../components/SearchBar";

const containerStyle = {
  width: "100%",
  height: "250px",
  borderRadius: "0.75rem", // rounded-xl
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

export default function MapView({
  mapQuery,
  onMapQueryChange,
}: {
  mapQuery: string;
  onMapQueryChange: (val: string) => void;
}) {
  return (
    <div className="mt-5 w-full relative">
      {/* ===== Google Map ===== */}
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
      >
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12} />
      </LoadScript>

      {/* ===== Single Overlay Search Bar (centered on map) ===== */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90%] max-w-lg">
        <SearchBar
          value={mapQuery}
          onChange={onMapQueryChange}
          placeholder="Search for a place"
        />
      </div>
    </div>
  );
}
