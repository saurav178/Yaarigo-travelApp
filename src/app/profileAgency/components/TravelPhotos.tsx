"use client";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface TravelPhotosProps {
  photos: string[];
}

export default function TravelPhotos({ photos }: TravelPhotosProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Body scroll disable when modal open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex]);

  if (photos.length === 0) return null;

  const prevPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  const nextPhoto = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  return (
    <>
      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {photos.map((photo, i) => (
          <img
            key={i}
            src={photo}
            alt={`Travel photo ${i + 1}`}
            className="w-full h-40 object-cover rounded-md cursor-pointer transform transition duration-300 hover:scale-105 shadow-sm hover:shadow-lg"
            onClick={() => setSelectedIndex(i)}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative">
            <img
              src={photos[selectedIndex]}
              alt="Selected"
              className="max-h-[90vh] max-w-[90vw] rounded-md shadow-lg"
            />

            {/* Left Arrow */}
            <button
              className="absolute left-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:text-gray-300 transition"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:text-gray-300 transition"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Close Button fixed at top-right of page */}
          <button
            className="fixed top-4 right-4 z-50 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-80 transition"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  );
}
