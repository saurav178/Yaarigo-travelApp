import { FaFacebookF, FaTwitter, FaLink } from "react-icons/fa";
import React from "react";

interface ShareThisTripProps {
  trip: {
    id?: string;
    title?: string;
    shareUrl?: string;
  };
}

const ShareThisTrip: React.FC<ShareThisTripProps> = ({ trip }) => {
  const shareUrl =
    trip?.shareUrl || `${typeof window !== "undefined" ? window.location.href : ""}`;

  const shareTitle = trip?.title || "Check out this trip";

  const handleCopy = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(shareTitle)}`,
      "_blank"
    );
  };

  return (
    <div className=" p-6 bg-white w-full shadow-lg hover:shadow-2xl transition-all duration-300">
      <h2 className="text-lg font-semibold mb-3">Share this trip</h2>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <button
            onClick={handleFacebookShare}
            className="p-2 bg-gray-900 rounded-full hover:bg-gray-200 text-white hover:text-gray-900 transition-colors duration-300 cursor-pointer"
          >
            <FaFacebookF />
          </button>

          <button
            onClick={handleTwitterShare}
            className="p-2 bg-gray-900 rounded-full hover:bg-gray-200 text-white hover:text-gray-900 transition-colors duration-300 cursor-pointer"
          >
            <FaTwitter />
          </button>

          <button
            onClick={handleCopy}
            className="p-2 bg-gray-900 rounded-full hover:bg-gray-200 text-white hover:text-gray-900 transition-colors duration-300 cursor-pointer"
          >
            <FaLink />
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="px-3 py-1 border bg-[#1D4350] text-white hover:bg-[#16333b] transition-colors duration-300 cursor-pointer"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default ShareThisTrip;