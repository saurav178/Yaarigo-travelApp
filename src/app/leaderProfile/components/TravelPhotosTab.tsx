import React, { useState } from "react";
import Image from "next/image";
import { travelPhotos } from "../data/profileData";

type Photo = {
  url: string;
  location: string;
  caption: string;
};

export default function TravelPhotosTab() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeZoom = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="mt-8">
      <div className="grid grid-cols-3 gap-1">
        {travelPhotos.map((photo, index) => (
          <div
            key={index}
            className="relative cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            onClick={() => handlePhotoClick(photo)}
          >
            <Image
              src={photo.url}
              alt={`Travel Photo ${index + 1}`}
              width={800}
              height={600}
              className="object-cover w-full h-64"
            />
          </div>
        ))}
      </div>

      {/* Zoom Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeZoom}
        >
          <div className="relative max-w-lg max-h-full p-4">
            <Image
              src={selectedPhoto.url}
              alt="Zoomed Travel Photo"
              width={800}
              height={600}
              className="object-contain w-full h-full"
            />
            <div className="mt-4 text-center bg-[#1D4350] bg-opacity-50 p-4 ">
              <p className="text-lg font-semibold text-white">{selectedPhoto.location}</p>
              <p className="text-sm text-white mt-2">{selectedPhoto.caption}</p>
            </div>
            <button
              className="absolute top-2 right-2 text-black text-2xl bg-white bg-opacity-75 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={closeZoom}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}