import React from "react";
import Image from "next/image";
import { travelPhotos } from "../data/profileData";

export default function TravelPhotosTab() {
  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-1">
        {travelPhotos.map((photo, index) => (
          <div key={index} className="relative">
            <Image
              src={photo}
              alt={`Travel Photo ${index + 1}`}
              width={800}
              height={600}
              className="object-cover w-full h-64"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
